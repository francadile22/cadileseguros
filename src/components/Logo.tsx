import { business } from '@/config/business';

/** Logotipo tipográfico de Estudio Cadile (sin imagen externa, escalable y nítido). */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-lg bg-petrol text-bone shadow-soft"
      >
        <span className="font-display text-lg font-semibold leading-none">C</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold text-petrol">Estudio Cadile</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-petrol/55">
            Asesores en seguros · SSN {business.license.number}
          </span>
        </span>
      )}
    </span>
  );
}
