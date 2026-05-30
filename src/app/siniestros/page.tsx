import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  Car,
  Home,
  CloudHail,
  Flame,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import { business } from '@/config/business';
import { buildMetadata, faqPageSchema, howToReportClaimSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = buildMetadata({
  title: 'Tuve un Siniestro: ¿Qué Hago? | Centro de Siniestros — Estudio Cadile',
  description:
    'Guía paso a paso ante un siniestro en Argentina: choque, robo, granizo o incendio. Plazos de denuncia (72 hs, Ley 17.418) y cómo te acompaña Estudio Cadile. Avisanos y gestionamos tu reclamo.',
  path: '/siniestros',
});

const generalSteps = [
  { title: 'Poné a salvo a las personas', desc: 'Lo primero es la seguridad. Si hay heridos, llamá al 911 o a emergencias médicas.' },
  { title: 'Asegurá el lugar', desc: 'Evitá que el daño se agrave (cortar agua, luz, gas según el caso).' },
  { title: 'Reuní información', desc: 'Sacá fotos y videos, anotá datos de involucrados y testigos.' },
  { title: 'Denuncia policial', desc: 'Hacela cuando corresponda (robo, hurto, vandalismo, accidente con terceros) y guardá el comprobante.' },
  { title: 'Avisanos', desc: `Contactá a ${business.name}: te indicamos la documentación y hacemos la denuncia.` },
  { title: 'Denunciá dentro de las 72 hs', desc: 'La denuncia a la aseguradora debe hacerse en general dentro de las 72 horas (Ley 17.418).' },
];

const byType = [
  {
    icon: Car,
    title: 'Choque o accidente de auto',
    points: [
      'No firmes acuerdos ni asumas culpa en el lugar.',
      'Intercambiá datos: nombre, DNI, patente, compañía y póliza.',
      'Tomá fotos de los vehículos, la ubicación y los daños.',
      'Si hay heridos o terceros, hacé la denuncia policial.',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Robo o hurto',
    points: [
      'Hacé la denuncia policial de inmediato (es requisito).',
      'Guardá el comprobante de la denuncia.',
      'En robo de vehículo, avisá también al Registro Automotor.',
      'Reuní facturas o pruebas de los bienes sustraídos.',
    ],
  },
  {
    icon: CloudHail,
    title: 'Granizo, tormenta o inundación',
    points: [
      'Documentá los daños con fotos antes de reparar.',
      'Conservá los restos dañados hasta la inspección.',
      'Denunciá rápido: tras un evento masivo hay muchos reclamos.',
    ],
  },
  {
    icon: Flame,
    title: 'Incendio',
    points: [
      'Llamá a los bomberos y conservá su informe.',
      'No descartes los bienes dañados hasta la inspección.',
      'Reuní documentación de los bienes afectados.',
    ],
  },
];

const faqs = [
  {
    q: '¿Cuánto tiempo tengo para denunciar un siniestro?',
    a: 'Por regla general, la denuncia a la aseguradora debe hacerse dentro de las 72 horas de ocurrido el siniestro (Ley de Seguros 17.418, art. 46). Algunos casos tienen plazos o requisitos particulares, por eso conviene avisarnos lo antes posible para no perder la cobertura.',
  },
  {
    q: '¿Qué documentación necesito para el reclamo?',
    a: 'Lo habitual es: póliza vigente, DNI del titular, denuncia policial (cuando corresponde), y fotos o comprobantes del daño. Según el tipo de siniestro pueden pedirse otros documentos; te pasamos la lista exacta cuando nos avisás.',
  },
  {
    q: '¿Ustedes hacen la denuncia por mí?',
    a: 'Te acompañamos en todo el proceso: te indicamos qué reunir, ayudamos a presentar la denuncia ante la compañía y hacemos el seguimiento del expediente hasta su resolución. Ese acompañamiento es el corazón de nuestro servicio.',
  },
  {
    q: '¿Qué es la destrucción total?',
    a: 'Se considera destrucción total cuando el costo de reparación supera un umbral cercano al 80% del valor del bien. En ese caso, la aseguradora indemniza como pérdida total en lugar de reparar.',
  },
];

export default function SiniestrosPage() {
  return (
    <div className="py-10 lg:py-14">
      <JsonLd data={[howToReportClaimSchema(), faqPageSchema(faqs)]} />

      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Siniestros', path: '/siniestros' }]} />

        {/* Hero con acción inmediata */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-rose-100 bg-rose-50/50 p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
            <AlertTriangle className="h-4 w-4" aria-hidden /> Centro de siniestros
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            ¿Tuviste un siniestro? Respirá: te decimos qué hacer.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/75">
            Seguí estos pasos y avisanos cuanto antes. Nos encargamos de la denuncia y del
            seguimiento del reclamo para que vos te ocupes de lo importante.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
              <MessageCircle className="h-4 w-4" aria-hidden /> Avisar por WhatsApp
            </a>
            <a href={`tel:${business.phone.e164}`} className="btn-secondary">
              <Phone className="h-4 w-4" aria-hidden /> Llamar al {business.phone.display}
            </a>
          </div>
        </div>

        {/* Pasos generales */}
        <section className="mt-16">
          <h2 className="text-3xl">Pasos generales ante cualquier siniestro</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {generalSteps.map((s, i) => (
              <li
                key={s.title}
                className="h-full rounded-2xl border border-petrol-100 bg-white/70 p-6"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-petrol text-sm font-semibold text-bone">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Por tipo de siniestro */}
        <section className="mt-16">
          <h2 className="text-3xl">Según el tipo de siniestro</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {byType.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="card h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-petrol-50 text-petrol">
                      <t.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-xl">{t.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-3xl">Preguntas frecuentes sobre siniestros</h2>
          <div className="mt-6 max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Recordatorio organismo de control */}
        <p className="mt-12 rounded-2xl border border-petrol-100 bg-petrol-50/40 p-5 text-sm text-petrol/70">
          Recordá que ante cualquier inconveniente con tu aseguradora podés contactar a la{' '}
          <a href={business.ssn.url} target="_blank" rel="noopener" className="font-semibold underline">
            Superintendencia de Seguros de la Nación
          </a>{' '}
          — {business.ssn.phoneLabel}. {business.name} te acompaña en todo el proceso.
        </p>
      </div>
    </div>
  );
}
