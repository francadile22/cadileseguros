import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed text-ink/70', centered && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
