import { cn } from '@/lib/cn';

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = 'display' | '2xl' | 'xl' | 'lg';

const sizes: Record<HeadingSize, string> = {
  display: 'text-(length:--text-display) leading-(--leading-display) tracking-(--tracking-display)',
  '2xl': 'text-(length:--text-2xl) leading-(--leading-display) tracking-(--tracking-display)',
  xl: 'text-(length:--text-xl) leading-(--leading-tight) tracking-(--tracking-tight)',
  lg: 'text-(length:--text-lg) leading-(--leading-snug) tracking-(--tracking-tight)',
};

export interface HeadingProps extends React.ComponentPropsWithoutRef<'h2'> {
  /** Nível semântico. Escolhido pela hierarquia da página, não pelo tamanho. */
  level?: HeadingLevel;
  /** Tamanho visual. Independente do nível, de propósito. */
  size?: HeadingSize;
}

/**
 * Título em serif editorial. Nível e tamanho são separados para que a
 * hierarquia do DOM continue correta mesmo quando o desenho pede outra escala.
 */
export function Heading({ level = 2, size = 'xl', className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn('font-serif text-balance', sizes[size], className)} {...props} />;
}
