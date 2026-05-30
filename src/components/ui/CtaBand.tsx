import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { business } from '@/config/business';

export function CtaBand({
  title = '¿Hablamos? Te asesora una persona, sin compromiso.',
  description = 'Cotizá online o escribinos por WhatsApp. Comparamos compañías líderes y te acompañamos en todo el camino.',
  quoteHref = '/cotizar',
  quoteLabel = 'Cotizar sin compromiso',
}: {
  title?: string;
  description?: string;
  quoteHref?: string;
  quoteLabel?: string;
}) {
  return (
    <section className="container-page my-20">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-12 text-bone shadow-lift sm:px-12 sm:py-16"
        style={{ background: 'linear-gradient(135deg, #0B2A4A 0%, #163E6B 55%, #1D4FD0 125%)' }}
      >
        {/* textura sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber/30 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-bone text-3xl leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-bone/80">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={quoteHref} className="btn-primary">
              {quoteLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa">
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp {business.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
