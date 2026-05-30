import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { business } from '@/config/business';
import { getPost, getAllPostSlugs } from '@/lib/blog';
import { getCobertura } from '@/lib/coberturas';
import { buildMetadata, articleSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Estudio Cadile`,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const cta = post.cta ? getCobertura(post.cta) : undefined;

  return (
    <article className="py-10 lg:py-14">
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          author: post.author,
          datePublished: post.date,
          dateModified: post.updated,
        })}
      />

      <div className="container-page">
        <Breadcrumbs
          items={[
            { name: 'Guías', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-petrol-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-petrol">
            {post.category}
          </span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-ink/70">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-petrol/55">
            <span>Por {post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
            {post.readingMinutes && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readingMinutes} min de lectura
                </span>
              </>
            )}
          </div>
        </header>

        <div className="prose-cadile mx-auto mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* CTA al final del artículo */}
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl bg-petrol p-8 text-bone">
          <h2 className="text-bone text-2xl">
            {cta ? `¿Te cotizamos ${cta.title.toLowerCase()}?` : '¿Querés asesorarte sin compromiso?'}
          </h2>
          <p className="mt-3 text-bone/80">
            Comparamos compañías líderes y te acompañamos en todo el camino. Te responde una persona.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={cta ? `/cotizar?cobertura=${cta.slug}` : '/cotizar'}
              className="btn-primary"
            >
              Cotizar ahora <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-petrol/55">
          Información general orientativa. No sustituye el asesoramiento de un Productor Asesor de
          Seguros matriculado. Las coberturas, precios y condiciones dependen de cada compañía y del
          perfil de cada cliente.
        </p>

        <div className="mx-auto mt-8 max-w-3xl">
          <Link href="/blog" className="btn-ghost">
            ← Volver a las guías
          </Link>
        </div>
      </div>
    </article>
  );
}
