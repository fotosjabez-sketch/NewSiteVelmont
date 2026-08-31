import Link from 'next/link';
import { cn } from '@/lib/cn';

export interface TextLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  /** Acrescenta a seta de continuidade usada nos links de território. */
  withArrow?: boolean;
}

/**
 * Link de texto com sublinhado real — o sublinhado é o indicador, não a cor,
 * então continua legível para quem não distingue os tons da marca.
 */
export function TextLink({ withArrow = false, className, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        'group inline-flex items-baseline gap-1.5 font-sans',
        'underline decoration-(--surface-fg)/35 decoration-1 underline-offset-[0.35em]',
        'transition-colors duration-(--duration-fast) ease-(--ease-out)',
        'hover:decoration-(--surface-fg) focus-visible:decoration-(--surface-fg)',
        className,
      )}
      {...props}
    >
      {children}
      {withArrow ? (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
