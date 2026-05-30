import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-semibold text-amber">404</span>
      <h1 className="mt-4 text-3xl">No encontramos esta página</h1>
      <p className="mt-3 max-w-md text-ink/70">
        Puede que el enlace esté roto o que la página se haya movido. Volvé al inicio o cotizá tu
        seguro sin compromiso.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-secondary">
          <Home className="h-4 w-4" aria-hidden /> Ir al inicio
        </Link>
        <Link href="/cotizar" className="btn-primary">
          Cotizar un seguro <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
