'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { needGroups, coberturasFull, otherCoverages, type NeedGroupId } from '@/lib/coberturas';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function NeedExplorer() {
  const [active, setActive] = useState<NeedGroupId>('auto');

  const full = coberturasFull.filter((c) => c.published && c.need === active);
  const others = otherCoverages.filter((c) => c.need === active);

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Coberturas por necesidad"
        className="flex flex-wrap gap-2"
      >
        {needGroups.map((g) => {
          const isActive = g.id === active;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(g.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'border-petrol bg-petrol text-bone shadow-soft'
                  : 'border-petrol-200 bg-white/70 text-petrol hover:border-petrol/40'
              )}
            >
              <Icon name={g.icon} className="h-4 w-4" />
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div role="tabpanel" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {full.map((c) => (
          <Link
            key={c.slug}
            href={`/coberturas/${c.slug}`}
            className="group card flex flex-col transition-all hover:-translate-y-1 hover:border-amber hover:shadow-lift"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-petrol-50 text-petrol transition-colors group-hover:bg-amber group-hover:text-white">
              <Icon name={c.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl">{c.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{c.summary.split('.')[0]}.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol">
              Ver cobertura <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}

        {others.length > 0 && (
          <div className="card flex flex-col bg-petrol-50/40">
            <h3 className="text-lg">También en {needGroups.find((g) => g.id === active)?.label.toLowerCase()}</h3>
            <ul className="mt-3 flex flex-1 flex-wrap gap-2">
              {others.map((o) => (
                <li
                  key={o.label}
                  className="rounded-full border border-petrol-200 bg-white px-3 py-1 text-xs text-petrol/80"
                >
                  {o.label}
                </li>
              ))}
            </ul>
            <Link href="/cotizar" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol">
              Consultanos por cualquiera <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
