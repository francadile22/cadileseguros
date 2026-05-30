import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO
  updated?: string;
  author: string;
  category: string;
  /** Respuesta-primero: resumen citable para AEO. */
  excerpt: string;
  readingMinutes?: number;
  draft?: boolean;
  cta?: string; // slug de cobertura a la que invitar a cotizar
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

function readPostFile(file: string): Post | null {
  const slug = file.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.draft) return null; // los borradores no se publican
  return { slug, content, ...fm };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Incluye borradores (para el panel /studio). */
export function getAllPostsRaw(): (Post & { draft: boolean })[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      return { slug, content, ...fm, draft: Boolean(fm.draft) };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
