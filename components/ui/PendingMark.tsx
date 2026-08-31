import { cn } from '@/lib/cn';

/**
 * Placeholders que não têm como ser confundidos com dado real: borda
 * tracejada, rótulo "pendente" e o que falta escrito ao lado.
 *
 * Só são renderizados dentro de blocos protegidos por `showsPendingPlaceholders()`.
 */

/** A caixa tracejada com o valor de exemplo. */
export function PendingValue({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block border border-dashed border-(--surface-fg)/45 px-2 py-0.5 text-(--surface-fg)/70',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A legenda que diz o que falta. */
export function PendingNote({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'block font-sans text-(length:--text-xs) leading-(--leading-snug) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase',
        className,
      )}
    >
      pendente — {label}
    </span>
  );
}

/** Valor e legenda juntos, para os casos simples. */
export function PendingMark({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex flex-col items-start gap-1.5', className)}>
      <PendingValue>{children}</PendingValue>
      <PendingNote label={label} />
    </span>
  );
}

/** Aviso de bloco inteiro pendente, para seções sem nenhum dado confirmado. */
export function PendingBlock({
  title,
  items,
  className,
}: {
  title: string;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-(--radius-sm) border border-dashed border-(--surface-fg)/35 p-(--space-md)',
        className,
      )}
    >
      <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
        Bloco pendente — não publicável
      </p>
      <p className="mt-2 font-serif text-(length:--text-lg) text-(--surface-fg)">{title}</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="font-sans text-(length:--text-sm) text-(--surface-muted) before:mr-2 before:content-['—']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
