import { cn } from '@/lib/cn';
import { Container, type ContainerProps } from './Container';

export type Surface = 'paper' | 'ivory' | 'sand' | 'wine' | 'ink';

export interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  /**
   * Tom da superfície. Define fundo, texto, texto secundário, régua e cor de
   * foco de uma vez — por isso o contraste continua correto sem ajuste manual.
   */
  surface?: Surface;
  /** Espaçamento vertical. `none` quando a seção controla o próprio ritmo. */
  spacing?: 'default' | 'compact' | 'none';
  /** `false` quando a seção precisa sangrar até a borda da viewport. */
  contained?: boolean;
  containerWidth?: ContainerProps['width'];
}

const spacings = {
  default: 'py-(--section-y)',
  compact: 'py-(--space-2xl)',
  none: '',
} as const;

export function Section({
  surface = 'paper',
  spacing = 'default',
  contained = true,
  containerWidth,
  className,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container {...(containerWidth ? { width: containerWidth } : {})}>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      data-surface={surface}
      className={cn('relative', spacings[spacing], className)}
      {...props}
    >
      {content}
    </section>
  );
}
