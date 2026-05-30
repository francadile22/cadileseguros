import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { needGroups, coberturasFull, otherCoverages } from '@/lib/coberturas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Coberturas y Seguros | Estudio Cadile — Auto, Hogar, ART, Caución y más',
  description:
    'Todas las coberturas que gestionamos: seguros patrimoniales, personales, ART y riesgos del trabajo, comerciales, cauciones y agro. Cotizá con un Productor Asesor matriculado (SSN 105506).',
  path: '/coberturas',
});

export default function CoberturasHubPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Coberturas', path: '/coberturas' }]} />
        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Coberturas</span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Asegurá lo que importa, con la cobertura justa
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Trabajamos prácticamente todas las líneas del mercado. Encontrá la tuya por necesidad:
            si no la ves, escribinos y la cotizamos igual.
          </p>
        </div>
      </div>

      {/* Por cada grupo de necesidad */}
      <div className="container-page mt-14 space-y-16">
        {needGroups.map((group) => {
          const full = coberturasFull.filter((c) => c.published && c.need === group.id);
          const others = otherCoverages.filter((o) => o.need === group.id);
          return (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-petrol text-bone">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl">{group.label}</h2>
                    <p className="text-sm text-ink/60">{group.blurb}</p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {full.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 60}>
                    <Link
                      href={`/coberturas/${c.slug}`}
                      className="group card flex h-full flex-col transition-all hover:-translate-y-1 hover:border-amber hover:shadow-lift"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-petrol-50 text-petrol group-hover:bg-amber group-hover:text-petrol-900">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-lg">{c.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                        {c.summary.split('.')[0]}.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol">
                        Ver cobertura{' '}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                ))}

                {others.map((o, i) => (
                  <Reveal key={o.label} delay={(full.length + i) * 40}>
                    <Link
                      href={`/cotizar?cobertura=${encodeURIComponent(o.label)}`}
                      className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-petrol-200 bg-white/50 p-5 transition-colors hover:border-amber hover:bg-white"
                    >
                      <h3 className="text-base font-medium text-petrol">{o.label}</h3>
                      <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-amber-600">
                        Cotizar →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand />
    </div>
  );
}
