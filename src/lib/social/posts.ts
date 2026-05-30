import fs from 'fs';
import path from 'path';

/**
 * Posteos para redes (Instagram / Facebook / LinkedIn), guardados como archivos
 * JSON en /content/social. El generador de Fase 2 crea borradores acá y el panel
 * /studio los muestra para aprobar/descartar. No requiere base de datos.
 */

export type PostKind = 'dato' | 'concepto' | 'promo';
export type PostStatus = 'borrador' | 'aprobado' | 'publicado';

export interface SocialPost {
  id: string;
  kind: PostKind;
  tema?: string;
  eyebrow: string;
  title: string;
  body: string;
  footerNote: string;
  carousel?: string[];
  captions: string[];
  hashtags: string[];
  imagePrompt?: string;
  status: PostStatus;
  fecha?: string | null;
}

const SOCIAL_DIR = path.join(process.cwd(), 'content', 'social');

export function getAllSocialPosts(): SocialPost[] {
  if (!fs.existsSync(SOCIAL_DIR)) return [];
  return fs
    .readdirSync(SOCIAL_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(SOCIAL_DIR, f), 'utf-8')) as SocialPost)
    .sort((a, b) => +new Date(b.fecha ?? 0) - +new Date(a.fecha ?? 0));
}

export function getPost(id: string): SocialPost | undefined {
  const file = path.join(SOCIAL_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as SocialPost;
}

/** Primer id disponible (para el default del generador de imágenes). */
export function firstPostId(): string {
  return getAllSocialPosts()[0]?.id ?? '';
}
