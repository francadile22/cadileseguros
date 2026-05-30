import { Resend } from 'resend';
import { business } from '@/config/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 60_000;
const MAX_REQ = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_REQ;
}

interface LeadBody {
  cobertura?: string;
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  detalle?: Record<string, string>;
  consentimiento?: boolean;
  source?: string;
  website?: string; // honeypot (debe venir vacío)
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'Demasiados envíos. Probá en un minuto.' }, { status: 429 });
  }

  let data: LeadBody;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  // Honeypot anti-spam: si el campo oculto viene completo, descartamos.
  if (data.website) {
    return Response.json({ ok: true }); // fingimos éxito para el bot
  }

  // Validación mínima del lado servidor
  const nombre = (data.nombre || '').trim();
  const telefono = (data.telefono || '').trim();
  const cobertura = (data.cobertura || 'Consulta general').trim();
  if (nombre.length < 2 || telefono.replace(/\D/g, '').length < 8) {
    return Response.json(
      { ok: false, error: 'Revisá tu nombre y teléfono.' },
      { status: 422 }
    );
  }
  if (!data.consentimiento) {
    return Response.json(
      { ok: false, error: 'Necesitamos tu consentimiento para contactarte.' },
      { status: 422 }
    );
  }

  const detalle = data.detalle
    ? Object.entries(data.detalle)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';

  const summaryText = [
    `Nueva solicitud — ${cobertura}`,
    `Origen: ${data.source || 'cotizador'}`,
    '',
    `Nombre: ${nombre}`,
    `Teléfono/WhatsApp: ${telefono}`,
    data.email ? `Email: ${data.email}` : null,
    detalle ? `\nDetalle:\n${detalle}` : null,
    data.mensaje ? `\nMensaje:\n${data.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  // 1) Webhook opcional (n8n / Routine / CRM)
  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ip, receivedAt: new Date().toISOString() }),
      });
    } catch (e) {
      console.error('[cotizar] webhook error', e);
    }
  }

  // 2) Email vía Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL || 'Estudio Cadile <onboarding@resend.dev>',
        to: process.env.LEAD_TO_EMAIL || business.email,
        replyTo: data.email || undefined,
        subject: `Nueva solicitud: ${cobertura} — ${nombre}`,
        text: summaryText,
      });
    } catch (e) {
      console.error('[cotizar] resend error', e);
      // Si falla el email pero hay webhook, igual consideramos recibido.
      if (!process.env.LEAD_WEBHOOK_URL) {
        return Response.json(
          { ok: false, error: 'No pudimos enviar tu solicitud. Escribinos por WhatsApp.' },
          { status: 502 }
        );
      }
    }
  } else if (!process.env.LEAD_WEBHOOK_URL) {
    // Sin Resend ni webhook configurados: dejamos registro en logs (dev).
    console.log('[cotizar] (sin envío configurado)\n', summaryText);
  }

  return Response.json({ ok: true });
}
