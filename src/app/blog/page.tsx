import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Guías y Notas sobre Seguros | Blog de Estudio Cadile',
  description:
    'Guías claras para entender tus seguros, ahorrar y no pagar de más: seguro de auto en La Plata, qué cubre el hogar, ART, caución de alquiler, siniestros y más.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-10 lg:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Guías', path: '/blog' }]} />
        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Guías y notas</span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Entendé tus seguros, decidí mejor
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Explicamos en criollo lo que importa: qué cubre cada seguro, cómo funcionan los
            siniestros y cómo asegurarte sin pagar de más.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-ink/60">Pronto vas a encontrar acá nuestras primeras guías.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group card flex h-full flex-col transition-all hover:-translate-y-1 hover:border-amber hover:shadow-lift"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-petrol-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-petrol">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-xl leading-snug group-hover:text-petrol-700">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-petrol-100 pt-4 text-xs text-petrol/55">
                    <span>{formatDate(post.date)}</span>
                    {post.readingMinutes && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readingMinutes} min
                      </span>
                    )}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-petrol">
                    Leer guía{' '}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <CtaBand />
    </div>
  );
}
