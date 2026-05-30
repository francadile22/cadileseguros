import { partnerCompanies } from '@/config/business';

/** Banda de "logos" de compañías (tipográficos, sin assets externos). Señal de confianza. */
export function PartnerLogos() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-steel-200 bg-steel-200 sm:grid-cols-3 lg:grid-cols-3">
      {partnerCompanies.map((c) => (
        <div
          key={c.name}
          className="group flex flex-col items-center justify-center gap-1 bg-white px-4 py-7 text-center transition-colors hover:bg-petrol-50"
        >
          <span className="font-display text-lg font-semibold text-petrol transition-colors group-hover:text-amber">{c.name}</span>
          <span className="text-[11px] uppercase tracking-wide text-steel-400">{c.line}</span>
        </div>
      ))}
    </div>
  );
}
