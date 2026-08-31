import { cn } from '@/lib/cn';

export interface ProseProps extends React.ComponentPropsWithoutRef<'div'> {
  /** `marketing` usa sans; `article` usa serif com medida de leitura maior. */
  tone?: 'marketing' | 'article';
  size?: 'base' | 'lg';
}

/** Bloco de texto corrido com medida controlada — nunca mais que 65ch. */
export function Prose({ tone = 'marketing', size = 'base', className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        'space-y-(--space-md) text-(--surface-muted)',
        tone === 'article' ? 'max-w-(--measure-article) font-serif' : 'max-w-(--measure) font-sans',
        size === 'lg'
          ? 'text-(length:--text-lg) leading-(--leading-snug)'
          : 'leading-(--leading-relaxed)',
        className,
      )}
      {...props}
    />
  );
}
