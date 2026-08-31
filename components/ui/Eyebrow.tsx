import { cn } from '@/lib/cn';

export interface EyebrowProps extends React.ComponentPropsWithoutRef<'p'> {
  /** Numeração de capítulo, quando a seção faz parte de uma sequência. */
  index?: string;
}

/**
 * Linha curta acima do título. Sans, caixa alta, tracking largo.
 * É rótulo, não título — por isso nunca vira heading no DOM.
 */
export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-sans text-(length:--text-xs) uppercase',
        'tracking-(--tracking-eyebrow) text-(--surface-muted)',
        className,
      )}
      {...props}
    >
      {index ? (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-(--surface-rule)" />
        </>
      ) : null}
      {children}
    </p>
  );
}
