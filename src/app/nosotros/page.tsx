import Link from 'next/link';
import { ShieldCheck, Award, Heart, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { business, partnerCompanies } from '@/config/business';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Nosotros | Estudio Cadile — Productor Asesor de Seguros (SSN 105506)',
  description:
    'Conocé a Estudio Cadile: Productor Asesor de Seguros matriculado (SSN 105506) en Gonnet, La Plata. Asesoramiento independiente, trayectoria y acompañamiento real en cada póliza y siniestro.',
  path: '/nosotros',
});

const values = [
  { icon: ShieldCheck, title: 'Transparencia', desc: 'Te explicamos qué cubre tu póliza y qué no, sin letra chica que no entiendas.' },
  { icon: Heart, title: 'Acompañamiento real', desc: 'Estamos cuando más importa: en el siniestro y en cada trámite.' },
  { icon: Award, title: 'Profesionalismo', desc: 'Somos PAS matriculados y nos capacitamos para asesorarte bien.' },
  { icon: Users, title: 'Cercanía', desc: 'Te atiende una persona, no un 0800. En La Plata y en todo el país.' },
];

export default function NosotrosPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Nosotros', path: '/nosotros' }]} />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
              Asesores en seguros, de los que dan la cara
            </h1>
            <div className="prose-cadile mt-6">
              <p>
                <strong>{business.name}</strong> es una productora de seguros: un{' '}
                <strong>Productor Asesor de Seguros (PAS)</strong> matriculado que trabaja como
                intermediario entre vos y las compañías aseguradoras. {business.whatItIs}
              </p>
              <p>
                Desde Gonnet, La Plata, asesoramos a personas, familias y empresas en todo el país.
                Comparamos coberturas y precios de las principales aseguradoras del mercado, te
                ayudamos a elegir lo que de verdad necesitás y te acompañamos en cada paso, sobre
                todo en el momento más sensible: cuando ocurre un siniestro.
              </p>
              <p>
                Nuestro compromiso es simple: que tengas la <strong>tranquilidad</strong> de estar
                bien asegurado y de tener a alguien de confianza del otro lado.
              </p>
            </div>
          </div>

          {/* Credenciales E-E-A-T */}
          <Reveal delay={100}>
            <div className="card bg-white/80">
              <h2 className="text-lg">Credenciales</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-petrol/60">Matrícula</dt>
                  <dd className="font-semibold text-petrol">{business.license.label}</dd>
                </div>
                <div>
                  <dt className="font-medium text-petrol/60">Condición</dt>
                  <dd className="text-ink/80">{business.legalRole} (intermediario, no aseguradora)</dd>
                </div>
                <div>
                  <dt className="font-medium text-petrol/60">Organismo de control</dt>
                  <dd className="text-ink/80">
                    <a href={business.ssn.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 underline">
                      {business.ssn.name} <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                    <br />
                    {business.ssn.phoneLabel}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-petrol/60">Trayectoria</dt>
                  <dd className="text-ink/80">{business.yearsLabel}</dd>
                </div>
                <div>
                  <dt className="font-medium text-petrol/60">Zona</dt>
                  <dd className="text-ink/80">{business.serviceArea}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Valores */}
        <section className="mt-16">
          <h2 className="text-3xl">Cómo trabajamos</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="card h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-petrol text-bone">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Equipo (placeholder editable) */}
        <section className="mt-16">
          <h2 className="text-3xl">Nuestro equipo</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Detrás de cada póliza hay personas reales que te conocen por tu nombre.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { name: 'Productor Asesor matriculado', role: `PAS · ${business.license.label}` },
              { name: 'Atención al cliente', role: 'Gestión y trámites' },
              { name: 'Siniestros', role: 'Acompañamiento de reclamos' },
            ].map((m) => (
              <div key={m.name} className="card flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-petrol-50 font-display text-xl font-semibold text-petrol">
                  {m.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-petrol">{m.name}</p>
                  <p className="text-xs text-petrol/60">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-petrol/50">
            Reemplazá por los nombres y fotos reales del equipo (refuerza el E-E-A-T y la confianza).
          </p>
        </section>

        {/* Compañías */}
        <section className="mt-16">
          <h2 className="text-3xl">Compañías con las que trabajamos</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {partnerCompanies.map((c) => (
              <span
                key={c.name}
                className="rounded-full border border-petrol-200 bg-white/70 px-4 py-2 text-sm font-medium text-petrol"
              >
                {c.name}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <Link href="/coberturas" className="btn-secondary">
            Ver nuestras coberturas <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
