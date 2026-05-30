import { Suspense } from 'react';
import { ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { business } from '@/config/business';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CotizadorWrapper } from './CotizadorWrapper';

export const metadata = buildMetadata({
  title: 'Cotizar un Seguro | Estudio Cadile — Sin compromiso',
  description:
    'Cotizá tu seguro sin compromiso con Estudio Cadile. Elegí la cobertura, dejanos tus datos y te contactamos con las mejores opciones de compañías líderes. Respuesta rápida.',
  path: '/cotizar',
});

const perks = [
  { icon: ShieldCheck, text: 'Sin compromiso' },
  { icon: Clock, text: 'Respuesta en minutos' },
  { icon: UserCheck, text: 'Te asesora una persona' },
];

export default function CotizarPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ name: 'Cotizar', path: '/cotizar' }]} />

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Cotización online</span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Cotizá tu seguro en un par de pasos
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Decinos qué querés asegurar y te traemos las mejores opciones de varias compañías. Es
            gratis, no te compromete a nada y te responde una persona del equipo.
          </p>
          <ul className="mt-7 space-y-3">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-petrol">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-amber/20 text-amber-600">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-medium">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl border border-petrol-100 bg-white/60 p-4 text-sm text-petrol/70">
            ¿Preferís hablar? Escribinos por WhatsApp al{' '}
            <a href={business.phone.whatsapp} className="font-semibold underline" target="_blank" rel="noopener">
              {business.phone.display}
            </a>{' '}
            o llamanos en horario de atención ({business.hours}).
          </p>
        </div>

        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <CotizadorWrapper />
        </Suspense>
      </div>
    </div>
  );
}
