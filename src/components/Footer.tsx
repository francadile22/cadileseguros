import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { business } from '@/config/business';
import { Logo } from '@/components/Logo';

const cols = [
  {
    title: 'Coberturas',
    links: [
      { href: '/coberturas/seguro-automotor', label: 'Seguro de auto' },
      { href: '/coberturas/seguro-hogar', label: 'Seguro de hogar' },
      { href: '/coberturas/art-riesgos-del-trabajo', label: 'ART' },
      { href: '/coberturas/caucion-alquiler', label: 'Caución de alquiler' },
      { href: '/coberturas', label: 'Ver todas' },
    ],
  },
  {
    title: 'Te ayudamos',
    links: [
      { href: '/cotizar', label: 'Cotizar un seguro' },
      { href: '/siniestros', label: 'Tuve un siniestro' },
      { href: '/tramites', label: 'Trámites y formularios' },
      { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    ],
  },
  {
    title: 'Estudio',
    links: [
      { href: '/nosotros', label: 'Quiénes somos' },
      { href: '/blog', label: 'Guías y notas' },
      { href: '/contacto', label: 'Contacto' },
      { href: '/aviso-legal', label: 'Aviso legal' },
      { href: '/privacidad', label: 'Privacidad' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-petrol-100 bg-petrol-50/60">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-petrol/75">
              Productor Asesor de Seguros matriculado. Te asesoramos sin costo, comparamos compañías
              líderes y te acompañamos cuando más lo necesitás.
            </p>
            <div className="mt-5 space-y-2 text-sm text-petrol/80">
              <a href={`tel:${business.phone.e164}`} className="flex items-center gap-2 hover:text-petrol">
                <Phone className="h-4 w-4 text-amber-500" aria-hidden /> {business.phone.display}
              </a>
              <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-petrol">
                <Mail className="h-4 w-4 text-amber-500" aria-hidden /> {business.email}
              </a>
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 hover:text-petrol"
              >
                <Instagram className="h-4 w-4 text-amber-500" aria-hidden /> {business.instagram.handle}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                {business.address.street}, {business.address.locality}, {business.address.city}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" aria-hidden /> {business.hours}
              </p>
            </div>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-petrol">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-petrol/75 transition-colors hover:text-petrol">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bloque legal obligatorio (seguros AR) */}
        <div className="mt-12 rounded-2xl border border-petrol-100 bg-white/70 p-5 text-xs leading-relaxed text-petrol/70">
          <p className="font-semibold text-petrol">
            {business.name} · {business.legalRole} · {business.license.label}
          </p>
          <p className="mt-2">
            {business.name} es un <strong>intermediario matriculado</strong> (Productor Asesor de
            Seguros): asesora y coloca pólizas en compañías aseguradoras.{' '}
            <strong>No es una compañía aseguradora</strong> y no asegura, cubre ni indemniza por sí
            mismo. Organismo de control:{' '}
            <a href={business.ssn.url} target="_blank" rel="noopener" className="underline">
              {business.ssn.name} (SSN)
            </a>
            . {business.ssn.phoneLabel}.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href={business.ssn.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-petrol-100 bg-bone px-3 py-2 font-medium text-petrol"
            >
              Logo SSN
            </a>
            {/* Reemplazar por el QR real de AFIP / Data Fiscal */}
            <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-petrol-200 bg-bone px-3 py-2 text-petrol/60">
              [ Reemplazar por QR AFIP / Data Fiscal ]
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-petrol/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
          </p>
          <p>Hecho en {business.address.city}, Argentina.</p>
        </div>
      </div>
    </footer>
  );
}
