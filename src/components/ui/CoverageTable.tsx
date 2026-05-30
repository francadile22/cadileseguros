import { Check, X } from 'lucide-react';
import type { CoverageRow } from '@/lib/coberturas';

/** Tabla "qué cubre / qué no cubre". Los motores de IA la extraen muy bien (AEO). */
export function CoverageTable({ rows }: { rows: CoverageRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-petrol-100">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Qué cubre y qué no cubre esta cobertura</caption>
        <thead>
          <tr className="bg-petrol text-bone">
            <th scope="col" className="px-4 py-3 text-left font-semibold">
              Concepto
            </th>
            <th scope="col" className="w-28 px-4 py-3 text-center font-semibold">
              ¿Cubre?
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-petrol-100">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 ? 'bg-petrol-50/30' : 'bg-white/60'}>
              <td className="px-4 py-3 align-top">
                <span className="font-medium text-ink">{row.item}</span>
                {row.note && <span className="mt-0.5 block text-xs text-petrol/60">{row.note}</span>}
              </td>
              <td className="px-4 py-3 text-center align-top">
                {row.covered ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <Check className="h-3.5 w-3.5" aria-hidden /> Sí
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    <X className="h-3.5 w-3.5" aria-hidden /> No
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
