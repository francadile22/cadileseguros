import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Check, Users, ClipboardList } from 'lucide-react';
import { business } from '@/config/business';
import {
  getCobertura,
  getAllCoberturaSlugs,
  coberturasFull,
} from '@/lib/coberturas';
import { buildMetadata, faqPageSchema, serviceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { CoverageTable } from '@/components/ui/CoverageTable';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return getAllCoberturaSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCobertura(params.slug);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/coberturas/${c.slug}`,
  });
}

export default function CoberturaPage({ params }: { params: { slug: string } }) {
  const c = getCobertura(params.slug);
  if (!c) notFound();

  const related = coberturasFull.filter((x) => x.published && x.slug !== c.slug).slice(0, 3);

  return (
    <article className="py-10 lg:py-14">
      <JsonLd
        data={[
          serviceSchema({ name: c.title, description: c.metaDescription, slug: c.slug }),
          faqPageSchema(c.faqs),
        ]}
      />

      <div className="container-page">
        <Breadcrumbs
          items={[
            { name: 'Coberturas', path: '/coberturas' },
            { name: c.title, path: `/coberturas/${c.slug}` },
          ]}
        />

        {/* HERO de la cobertura */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-petrol-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-petrol">
              <Icon name={c.icon} className="h-4 w-4" /> {c.category}
            </span>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{c.title}</h1>
            {/* Respuesta-primero para AEO */}
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{c.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={`/cotizar?cobertura=${c.slug}`} className="btn-primary">
                Cotizar {c.title.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
                <MessageCircle className="h-4 w-4" aria-hidden /> Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Highlights */}
          <Reveal delay={100}>
            <div className="card bg-white/80">
              <h2 className="text-lg">Qué cubre, en resumen</h2>
              <ul className="mt-4 space-y-2.5">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* TABLA CUBRE / NO CUBRE */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl">¿Qué cubre y qué no cubre?</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Un vistazo claro a lo que está incluido y a lo que conviene tener presente. El alcance
            final depende de la póliza y la compañía.
          </p>
          <div className="mt-6">
            <CoverageTable rows={c.coversTable} />
          </div>
        </section>

        {/* PARA QUIÉN + REQUISITOS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="card">
            <h2 className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-amber-500" aria-hidden /> ¿Para quién es?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {c.forWho.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <h2 className="flex items-center gap-2 text-xl">
              <ClipboardList className="h-5 w-5 text-amber-500" aria-hidden /> ¿Qué necesitás para cotizar?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {c.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* FAQ específica */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl">Preguntas frecuentes sobre {c.title.toLowerCase()}</h2>
          <div className="mt-6 max-w-3xl">
            <FaqAccordion faqs={c.faqs} />
          </div>
        </section>

        {/* CTA cobertura */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-petrol p-8 text-bone sm:p-12">
          <div className="grid items-center gap-6 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-bone text-2xl sm:text-3xl">¿Te cotizamos {c.title.toLowerCase()}?</h2>
              <p className="mt-3 text-bone/80">
                Comparamos varias compañías y te pasamos la mejor opción para tu caso. Sin compromiso.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link href={`/cotizar?cobertura=${c.slug}`} className="btn-primary w-full sm:w-auto">
                Cotizar ahora <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={business.phone.whatsapp}
                target="_blank"
                rel="noopener"
                className="btn-wa w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Relacionadas (enlazado interno) */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl">Otras coberturas</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/coberturas/${r.slug}`}
                  className="group card flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:border-amber"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-petrol-50 text-petrol">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-petrol">{r.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
