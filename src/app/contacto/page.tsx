import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle, ShieldCheck } from 'lucide-react';
import { business } from '@/config/business';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Cotizador } from '@/components/Cotizador';

export const metadata = buildMetadata({
  title: 'Contacto | Estudio Cadile — La Plata y todo el país',
  description:
    'Contactá a Estudio Cadile: WhatsApp (221) 540-1604, email cadile.contacto@gmail.com. Atención de lunes a viernes de 8 a 16 hs. Gonnet, La Plata. PAS matriculado SSN 105506.',
  path: '/contacto',
});

const items = [
  { icon: Phone, label: 'Teléfono / WhatsApp', value: business.phone.display, href: business.phone.whatsapp },
  { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
  { icon: Instagram, label: 'Instagram', value: business.instagram.handle, href: business.instagram.url },
  { icon: Clock, label: 'Horario', value: business.hours },
  {
    icon: MapPin,
    label: 'Dónde estamos',
    value: `${business.address.street}, ${business.address.locality}, ${business.address.city}`,
  },
];

export default function ContactoPage() {
  const mapsQuery = encodeURIComponent(
    `${business.address.street}, ${business.address.locality}, ${business.address.city}`
  );

  return (
    <div className="py-10 lg:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Contacto', path: '/contacto' }]} />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Datos */}
          <div>
            <span className="eyebrow">Contacto</span>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">Hablemos</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Escribinos por el medio que prefieras. Te responde una persona del equipo, sin
              compromiso y en horario de atención.
            </p>

            <ul className="mt-8 space-y-4">
              {items.map((it) => (
                <li key={it.label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-petrol-50 text-petrol">
                    <it.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-petrol/55">{it.label}</p>
                    {it.href ? (
                      <a
                        href={it.href}
                        {...(it.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                        className="font-medium text-petrol hover:underline"
                      >
                        {it.value}
                      </a>
                    ) : (
                      <p className="font-medium text-petrol">{it.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa mt-8">
              <MessageCircle className="h-4 w-4" aria-hidden /> Escribir por WhatsApp
            </a>

            {/* Mapa */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-petrol-100">
              <iframe
                title={`Ubicación de ${business.name}`}
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>

            <p className="mt-6 flex items-start gap-2 rounded-2xl border border-petrol-100 bg-petrol-50/40 p-4 text-xs leading-relaxed text-petrol/70">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
              {business.name} es {business.legalRole} ({business.license.label}). Intermediario
              matriculado, no compañía aseguradora. Organismo de control: SSN — {business.ssn.phone}.
            </p>
          </div>

          {/* Formulario (reutiliza el cotizador como contacto) */}
          <div>
            <h2 className="mb-4 text-2xl">Dejanos tu consulta</h2>
            <Cotizador />
          </div>
        </div>
      </div>
    </div>
  );
}
