import Anthropic from '@anthropic-ai/sdk';

/** Modelo por defecto para generación de contenido (calidad editorial). */
export const CONTENT_MODEL = process.env.CONTENT_MODEL || 'claude-sonnet-4-6';

let _client: Anthropic | null = null;

export function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Falta ANTHROPIC_API_KEY. Cargala en el entorno o usá --dry para generar una plantilla sin IA.',
    );
  }
  if (!_client) _client = new Anthropic({ apiKey });
  return _client;
}

/** Llamada simple: devuelve el texto del primer bloque de la respuesta. */
export async function complete(
  system: string,
  user: string,
  maxTokens = 4000,
): Promise<string> {
  const client = getClient();
  const res = await client.messages.create({
    model: CONTENT_MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
  });
  const block = res.content.find((b) => b.type === 'text');
  return block && block.type === 'text' ? block.text : '';
}
