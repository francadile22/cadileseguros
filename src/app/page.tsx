import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  ShieldAlert,
  FileText,
  MessageCircle,
  Scale,
  Search,
  Handshake,
  ShieldCheck,
  Quote,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { business } from '@/config/business';
import { buildMetadata, faqPageSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NeedExplorer } from '@/components/home/NeedExplorer';
import { PartnerLogos } from '@/components/home/PartnerLogos';
import { Newsletter } from '@/components/Newsletter';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Estudio Cadile | Seguros con asesoramiento real en La Plata y todo el país',
  description:
    'Productor Asesor de Seguros matriculado (SSN 105506). Comparamos compañías líderes, te asesoramos sin costo y te acompañamos en el siniestro. Cotizá auto, hogar, ART, caución y más.',
  path: '/',
});

const quickAccess = [
  { href: '/cotizar', icon: Calculator, title: 'Cotizar', desc: 'Pedí precios sin compromiso.' },
  { href: '/siniestros', icon: ShieldAlert, title: 'Tuve un siniestro', desc: 'Qué hacer, paso a paso.' },
  { href: '/tramites', icon: FileText, title: 'Hacer un trámite', desc: 'Formularios y teléfonos útiles.' },
  { href: business.phone.whatsapp, icon: MessageCircle, title: 'Hablar con un asesor', desc: 'Te responde una persona.', external: true },
];

const whyPas = [
  {
    icon: Scale,
    title: 'Asesoramiento independiente',
    desc: 'No representamos a una sola compañía: trabajamos para vos. Te decimos qué cobertura necesitás de verdad, sin venderte de más.',
  },
  {
    icon: Search,
    title: 'Comparamos por vos',
    desc: 'Cotizamos en varias aseguradoras líderes y te traemos las mejores opciones según tu perfil y tu presupuesto.',
  },
  {
    icon: Handshake,
    title: 'Te acompañamos en el siniestro',
    desc: 'El momento clave es cuando algo pasa. Ahí gestionamos el reclamo y te acompañamos hasta que se resuelva.',
  },
];

const steps = [
  { n: '01', title: 'Consultá', desc: 'Contanos qué querés asegurar por web, WhatsApp o teléfono.' },
  { n: '02', title: 'Comparamos', desc: 'Cotizamos en varias compañías y analizamos coberturas y precios.' },
  { n: '03', title: 'Contratás', desc: 'Elegís la mejor opción y emitimos tu póliza, todo de forma remota.' },
  { n: '04', title: 'Te acompañamos', desc: 'Renovaciones, dudas y, sobre todo, el siniestro: estamos con vos.' },
];

const testimonials = [
  {
    quote: 'Me resolvieron el seguro del auto en el día y cuando tuve el choque se encargaron de todo. Cero vueltas.',
    name: 'Martín G.',
    role: 'Cliente · La Plata',
  },
  {
    quote: 'Necesitaba la caución para alquilar y no tenía garante. Me explicaron todo y la conseguí enseguida.',
    name: 'Carla R.',
    role: 'Cliente · Gonnet',
  },
  {
    quote: 'Como pyme nos ordenaron la ART y los seguros del local. Se nota que saben y que están cuando los necesitás.',
    name: 'Estudio Contable B.',
    role: 'Cliente empresa',
  },
];

const homeFaqs = [
  {
    q: '¿Estudio Cadile es una compañía de seguros?',
    a: 'No. Estudio Cadile es una productora de seguros: un Productor Asesor de Seguros (PAS) matriculado que actúa como intermediario. Te asesoramos y colocamos tu póliza en compañías aseguradoras líderes, pero la cobertura la brinda la aseguradora, no nosotros.',
  },
  {
    q: '¿Cuánto cuesta asesorarme con ustedes?',
    a: 'El asesoramiento no tiene costo adicional para vos: el productor se remunera a través de la compañía. Pagás la misma prima que pagarías contratando directo, pero con el acompañamiento de un asesor matriculado.',
  },
  {
    q: '¿Atienden solo en La Plata?',
    a: 'Tenemos base en Gonnet, La Plata, pero gestionamos seguros de forma remota en todo el país. Podés cotizar, contratar y hacer trámites online o por WhatsApp, estés donde estés.',
  },
  {
    q: '¿Cómo cotizo un seguro?',
    a: 'Entrá a la sección Cotizar, elegí la cobertura y dejanos tus datos: te contactamos con las mejores opciones. También podés escribirnos por WhatsApp y te asesora una persona del equipo.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-mesh-hero">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-amber/15 blur-3xl animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-petrol/10 blur-3xl"
        />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> {business.license.label}
            </span>
            <h1 className="mt-5 text-balance text-5xl leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
              Tu seguro, con{' '}
              <span className="text-gradient whitespace-nowrap">asesoramiento</span> real.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
              Somos una productora de seguros. Comparamos compañías líderes, te recomendamos lo que
              necesitás de verdad y te acompañamos cuando más importa: en el siniestro.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cotizar" className="btn-primary text-base">
                Cotizar sin compromiso <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-secondary text-base">
                <MessageCircle className="h-5 w-5" aria-hidden /> Escribinos por WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-petrol/70">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-500" aria-hidden /> {business.yearsLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-500" aria-hidden /> 9 compañías líderes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-500" aria-hidden /> Gestión en todo el país
              </span>
            </div>
          </div>

          {/* Tarjeta de confianza / acceso rápido */}
          <Reveal className="lg:justify-self-end" delay={120}>
            <div className="card glass w-full max-w-md shadow-glass">
              <p className="font-display text-lg font-semibold text-petrol">¿Qué necesitás resolver hoy?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {quickAccess.map((q) => {
                  const className =
                    'group flex flex-col gap-2 rounded-xl border border-steel-200 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-amber hover:shadow-soft';
                  const inner = (
                    <>
                      <q.icon className="h-6 w-6 text-petrol transition-colors group-hover:text-amber-500" aria-hidden />
                      <span className="text-sm font-semibold text-petrol">{q.title}</span>
                      <span className="text-xs leading-snug text-ink/60">{q.desc}</span>
                    </>
                  );
                  return q.external ? (
                    <a key={q.title} href={q.href} target="_blank" rel="noopener" className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link key={q.title} href={q.href} className={className}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-xs text-petrol/50">{business.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COBERTURAS POR NECESIDAD */}
      <section className="container-page py-12 lg:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Coberturas por necesidad"
            title="¿Qué querés proteger?"
            description="Elegí desde lo que te importa, no desde un listado técnico. Te llevamos a la cobertura justa."
          />
        </Reveal>
        <Reveal className="mt-10" delay={80}>
          <NeedExplorer />
        </Reveal>
      </section>

      {/* POR QUÉ UNA PRODUCTORA */}
      <section className="bg-petrol-50/40 py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Por qué una productora"
              title="Una productora trabaja para vos, no para la aseguradora"
              description="Contratar directo te deja solo frente a la compañía. Un Productor Asesor matriculado te representa y te acompaña."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyPas.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-petrol text-bone">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPAÑÍAS PARTNER */}
      <section className="container-page py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Compañías con las que trabajamos"
            title="Comparamos entre aseguradoras líderes"
            description="Colocamos tu póliza en compañías de primer nivel del mercado argentino."
            centered
          />
        </Reveal>
        <Reveal className="mt-10" delay={80}>
          <PartnerLogos />
        </Reveal>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="container-page py-12 lg:py-16">
        <Reveal>
          <SectionHeading eyebrow="Cómo trabajamos" title="Simple, claro y de punta a punta" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-petrol-100 bg-white/70 p-6">
                <span className="font-display text-4xl font-semibold text-amber/70">{s.n}</span>
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="bg-petrol-50/40 py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Lo que dicen nuestros clientes" title="Tranquilidad que se siente" centered />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="card flex h-full flex-col">
                  <Quote className="h-7 w-7 text-amber" aria-hidden />
                  <div className="mt-2 flex gap-0.5" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber text-amber" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-ink/80">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 border-t border-petrol-100 pt-3">
                    <span className="block font-semibold text-petrol">{t.name}</span>
                    <span className="text-xs text-petrol/60">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-petrol/50">
            Testimonios ilustrativos. Reemplazá por reseñas reales de Google / Instagram.
          </p>
        </div>
      </section>

      {/* CENTRO DE SINIESTROS DESTACADO */}
      <section className="container-page py-16 lg:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-petrol-100 bg-white/70 p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="eyebrow text-rose-500">
                  <ShieldAlert className="h-4 w-4" aria-hidden /> Centro de siniestros
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl">¿Tuviste un siniestro? Respirá, estamos con vos.</h2>
                <p className="mt-4 max-w-xl text-lg text-ink/70">
                  Es el momento donde más se nota tener un asesor. Te decimos qué hacer paso a paso,
                  preparamos la documentación y gestionamos el reclamo por vos.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/siniestros" className="btn-primary">
                    Ver qué hacer ahora <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
                    <MessageCircle className="h-4 w-4" aria-hidden /> Avisar ahora
                  </a>
                </div>
              </div>
              <ul className="space-y-3 rounded-2xl bg-petrol-50/60 p-6 text-sm">
                {[
                  'Poné a salvo a las personas',
                  'Sacá fotos y reuní datos',
                  'Denuncia policial si corresponde',
                  'Avisanos: denunciamos en ≤ 72 hs',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-petrol text-xs font-semibold text-bone">
                      {i + 1}
                    </span>
                    <span className="text-ink/80">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Lo que más nos consultan"
              description="¿Te quedan dudas? Escribinos por WhatsApp o probá el asistente, abajo a la izquierda."
            />
            <Link href="/preguntas-frecuentes" className="btn-secondary mt-6">
              Ver todas las preguntas
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <FaqAccordion faqs={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER + CTA FINAL */}
      <section className="container-page py-12">
        <Reveal>
          <div className="rounded-3xl border border-petrol-100 bg-white/70 p-8 text-center sm:p-12">
            <h2 className="text-3xl">Sumate a nuestras guías de seguros</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/70">
              Consejos prácticos para asegurarte mejor, entender tu póliza y no pagar de más. Sin spam.
            </p>
            <div className="mx-auto mt-7 max-w-lg">
              <Newsletter />
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
