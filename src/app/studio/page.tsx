import { getAllSocialPosts } from '@/lib/social/posts';
import { getAllPostsRaw } from '@/lib/blog';
import { StudioBoard } from './StudioBoard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Studio · Estudio Cadile', robots: { index: false, follow: false } };

export default function StudioPage() {
  const social = getAllSocialPosts();
  const blog = getAllPostsRaw().map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    draft: p.draft,
    date: p.date,
  }));

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <span className="eyebrow">Panel interno · no indexable</span>
        <h1 className="mt-3 text-4xl">Studio de contenido</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Revisá los borradores generados, mirá el arte con el branding y aprobá o descartá. Aprobar
          publica el contenido; descartar lo elimina.
        </p>
      </header>
      <StudioBoard social={social} blog={blog} />
    </div>
  );
}
