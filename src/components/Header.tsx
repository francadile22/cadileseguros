'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { business } from '@/config/business';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/coberturas', label: 'Coberturas' },
  { href: '/siniestros', label: 'Siniestros' },
  { href: '/tramites', label: 'Trámites' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Guías' },
  { href: '/preguntas-frecuentes', label: 'Preguntas' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-petrol-100 bg-bone/85 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label={`${business.name} — inicio`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-petrol/8 text-petrol' : 'text-petrol/70 hover:bg-petrol/5 hover:text-petrol'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${business.phone.e164}`}
            className="btn-ghost px-3"
            aria-label={`Llamar al ${business.phone.display}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="text-sm">{business.phone.display}</span>
          </a>
          <Link href="/cotizar" className="btn-primary">
            Cotizar
          </Link>
        </div>

        <button
          type="button"
          className="btn-ghost p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-petrol-100 bg-bone lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-petrol hover:bg-petrol/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-petrol-100 pt-4">
              <Link href="/cotizar" className="btn-primary w-full">
                Cotizar sin compromiso
              </Link>
              <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa w-full">
                WhatsApp {business.phone.display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
