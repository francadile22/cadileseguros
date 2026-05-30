'use client';

import { useSearchParams } from 'next/navigation';
import { Cotizador } from '@/components/Cotizador';
import { coberturasFull } from '@/lib/coberturas';

/** Lee ?cobertura=<slug|titulo> para precargar el cotizador desde una landing. */
export function CotizadorWrapper() {
  const params = useSearchParams();
  const raw = params.get('cobertura') || undefined;
  const bySlug = raw ? coberturasFull.find((c) => c.slug === raw)?.title : undefined;
  return <Cotizador initialCoverage={bySlug ?? raw} />;
}
