import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/chat-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Modelo y límites (ver README → control de costos).
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 700; // respuestas breves => menor costo
const MAX_HISTORY = 10; // recorta el contexto para limitar tokens
const MAX_INPUT_CHARS = 1500;

// Rate limiting simple en memoria (por IP). Para producción multi-instancia,
// reemplazar por un store compartido (Upstash/Redis). Documentado en README.
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_REQ_PER_WINDOW;
}

interface InMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('El asistente no está configurado (falta ANTHROPIC_API_KEY).', {
      status: 503,
    });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return new Response('Demasiadas consultas en poco tiempo. Probá de nuevo en un minuto.', {
      status: 429,
    });
  }

  let body: { messages?: InMsg[] };
  try {
    body = await req.json();
  } catch {
    return new Response('Solicitud inválida.', { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  if (incoming.length === 0) {
    return new Response('Faltan mensajes.', { status: 400 });
  }

  // Saneo y recorte de contexto
  const messages = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_CHARS) }));

  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const system = buildSystemPrompt(lastUser);

  const anthropic = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llmStream = anthropic.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          // Cache del system (KB + instrucciones) para abaratar mensajes repetidos.
          system: [
            {
              type: 'text',
              text: system,
              cache_control: { type: 'ephemeral' },
            },
          ] as unknown as Anthropic.Messages.TextBlockParam[],
          messages,
        });

        llmStream.on('text', (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await llmStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error('[chat] error', err);
        controller.enqueue(
          encoder.encode(
            'Disculpá, tuve un problema para responder. Escribinos por WhatsApp y te ayudamos.'
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
