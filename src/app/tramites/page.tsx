import {
  FileText,
  Download,
  RefreshCw,
  CreditCard,
  FileX2,
  UserCog,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { business } from '@/config/business';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Trámites y Formularios | Estudio Cadile',
  description:
    'Hacé tus trámites de seguros con Estudio Cadile: pago de pólizas, renovaciones, cambios de datos, bajas, denuncias y formularios. Teléfonos útiles y acompañamiento del productor.',
  path: '/tramites',
});

const tramites = [
  { icon: CreditCard, title: 'Pago de póliza', desc: 'Consultá medios de pago, vencimientos y cómo regularizar una cuota.' },
  { icon: RefreshCw, title: 'Renovación', desc: 'Te avisamos antes del vencimiento y gestionamos la renovación con la mejor opción.' },
  { icon: UserCog, title: 'Cambio de datos', desc: 'Domicilio, medio de pago, vehículo, beneficiarios u otros datos de tu póliza.' },
  { icon: FileX2, title: 'Baja o cancelación', desc: 'Te explicamos el procedimiento y los plazos para dar de baja una cobertura.' },
  { icon: FileText, title: 'Denuncia de siniestro', desc: 'Iniciá tu denuncia con nuestro acompañamiento.', href: '/siniestros' },
  { icon: Download, title: 'Solicitar tu póliza o certificado', desc: 'Pedinos una copia de tu póliza, certificado de cobertura o libre deuda.' },
];

const usefulPhones = [
  { name: business.name, phone: business.phone.display, note: business.hours },
  { name: 'Atención al asegurado (SSN)', phone: business.ssn.phone, note: 'Superintendencia de Seguros de la Nación' },
  { name: 'Emergencias', phone: '911', note: 'Policía / emergencias' },
];

export default function TramitesPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Trámites', path: '/tramites' }]} />
        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Trámites y formularios</span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">Resolvé tu trámite sin vueltas</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            ¿Necesitás pagar, renovar, cambiar un dato o pedir tu póliza? Te lo gestionamos nosotros.
            Elegí lo que necesitás y te acompañamos en el proceso.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tramites.map((t, i) => {
            const Wrapper = t.href ? 'a' : 'div';
            return (
              <Reveal key={t.title} delay={i * 60}>
                <Wrapper
                  {...(t.href ? { href: t.href } : {})}
                  className="card flex h-full flex-col"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-petrol-50 text-petrol">
                    <t.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-lg">{t.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{t.desc}</p>
                  <a
                    href={t.href ?? business.phone.whatsapp}
                    {...(!t.href ? { target: '_blank', rel: 'noopener' } : {})}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-petrol"
                  >
                    {t.href ? 'Ir a la sección' : 'Iniciar por WhatsApp'}
                  </a>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        {/* Teléfonos útiles */}
        <section className="mt-16">
          <h2 className="text-3xl">Teléfonos útiles</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {usefulPhones.map((p) => (
              <div key={p.name} className="card">
                <p className="text-sm font-medium text-petrol/60">{p.name}</p>
                <a
                  href={`tel:${p.phone.replace(/\D/g, '')}`}
                  className="mt-1 block font-display text-2xl font-semibold text-petrol"
                >
                  {p.phone}
                </a>
                <p className="mt-1 text-xs text-petrol/55">{p.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nota descargas */}
        <p className="mt-10 rounded-2xl border border-dashed border-petrol-200 bg-white/50 p-5 text-sm text-petrol/65">
          <strong className="text-petrol">Formularios descargables:</strong> sumá acá los PDF de cada
          compañía (denuncia, cambio de datos, baja). Colocá los archivos en{' '}
          <code className="rounded bg-petrol-50 px-1.5 py-0.5">/public/formularios/</code> y enlazalos
          desde esta sección.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
            <MessageCircle className="h-4 w-4" aria-hidden /> Hacer un trámite por WhatsApp
          </a>
          <a href={`tel:${business.phone.e164}`} className="btn-secondary">
            <Phone className="h-4 w-4" aria-hidden /> Llamar al {business.phone.display}
          </a>
        </div>
      </div>

      <CtaBand
        title="¿No sabés qué trámite necesitás?"
        description="Escribinos y te orientamos. Si es algo de tu póliza, lo resolvemos nosotros."
        quoteLabel="Consultar ahora"
        quoteHref="/contacto"
      />
    </div>
  );
}
