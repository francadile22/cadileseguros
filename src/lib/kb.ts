import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const KB_DIR = path.join(process.cwd(), 'content', 'kb');

export interface KbDoc {
  file: string;
  title: string;
  tags: string[];
  body: string;
}

let _cache: KbDoc[] | null = null;

/** Carga (y cachea) todos los documentos de la base de conocimiento. */
export function loadKb(): KbDoc[] {
  if (_cache) return _cache;
  if (!fs.existsSync(KB_DIR)) return [];
  _cache = fs
    .readdirSync(KB_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(KB_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        file,
        title: (data.title as string) ?? file,
        tags: (data.tags as string[]) ?? [],
        body: content.trim(),
      };
    });
  return _cache;
}

/**
 * RAG simple por keywords: puntúa cada doc según coincidencias de la consulta
 * con su título/tags/cuerpo y devuelve los más relevantes.
 * La arquitectura queda lista para enchufar embeddings/vector store más adelante.
 */
export function selectRelevantKb(query: string, maxDocs = 3): KbDoc[] {
  const docs = loadKb();
  if (docs.length === 0) return [];

  const terms = normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 3);

  if (terms.length === 0) return docs.slice(0, maxDocs);

  const scored = docs.map((doc) => {
    const hayTitle = normalize(doc.title);
    const hayTags = normalize(doc.tags.join(' '));
    const hayBody = normalize(doc.body);
    let score = 0;
    for (const t of terms) {
      if (hayTags.includes(t)) score += 5;
      if (hayTitle.includes(t)) score += 3;
      const matches = hayBody.split(t).length - 1;
      score += Math.min(matches, 5);
    }
    return { doc, score };
  });

  const relevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxDocs)
    .map((s) => s.doc);

  // Si nada matchea, devolvemos glosario + faq como base.
  return relevant.length > 0 ? relevant : docs.slice(0, maxDocs);
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
