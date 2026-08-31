import { cn } from '@/lib/cn';

type ContainerWidth = 'default' | 'narrow' | 'wide' | 'full';

const widths: Record<ContainerWidth, string> = {
  /** Largura editorial padrão. */
  default: 'max-w-(--container-max)',
  /** Leitura longa: artigos e blocos de texto corrido. */
  narrow: 'max-w-[76ch]',
  /** Composições que precisam respirar até a borda útil. */
  wide: 'max-w-[1680px]',
  /** Sem limite: o filho controla a própria largura. */
  full: 'max-w-none',
};

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: ContainerWidth;
  as?: 'div' | 'section' | 'header' | 'footer' | 'article' | 'nav';
}

/**
 * Margem lateral única do projeto: `clamp(20px, 5vw, 80px)`.
 * Nenhum componente deve reimplementar esse recuo.
 */
export function Container({
  width = 'default',
  as: Tag = 'div',
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-(--gutter)', widths[width], className)} {...props} />
  );
}
