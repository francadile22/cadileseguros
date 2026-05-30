import { partnerCompanies } from '@/config/business';

/** Banda de "logos" de compañías (tipográficos, sin assets externos). Señal de confianza. */
export function PartnerLogos() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-petrol-100 bg-petrol-100 sm:grid-cols-3 lg:grid-cols-3">
      {partnerCompanies.map((c) => (
        <div
          key={c.name}
          className="flex flex-col items-center justify-center gap-1 bg-bone px-4 py-7 text-center transition-colors hover:bg-white"
        >
          <span className="font-display text-lg font-semibold text-petrol">{c.name}</span>
          <span className="text-[11px] uppercase tracking-wide text-petrol/45">{c.line}</span>
        </div>
      ))}
    </div>
  );
}
