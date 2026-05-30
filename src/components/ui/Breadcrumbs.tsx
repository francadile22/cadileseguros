import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const full = [{ name: 'Inicio', path: '/' }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Migas de pan" className="text-sm text-petrol/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          {full.map((item, i) => {
            const last = i === full.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-petrol">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition-colors hover:text-petrol">
                    {item.name}
                  </Link>
                )}
                {!last && <ChevronRight className="h-3.5 w-3.5 text-petrol/30" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
