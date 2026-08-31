import { MOUNTAIN_STROKES, MOUNTAIN_VIEWBOX, MOUNTAIN_WEIGHT } from '@/lib/brand/mountain';
import { cn } from '@/lib/cn';

export interface MountainMarkProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'> {
  /**
   * Espessura proporcional, em unidades do viewBox — escala junto com o
   * desenho, como no lockup oficial. `narrative` é o padrão do site.
   */
  weight?: keyof typeof MOUNTAIN_WEIGHT | number;
  /**
   * Espessura fixa em pixels de tela, independente do tamanho renderizado.
   * É o que mantém a linha fina realmente fina quando a montanha ocupa meia
   * viewport. Quando definida, ignora `weight`.
   */
  hairline?: number;
  /** Quais traços desenhar. Útil para usar só o cume como detalhe. */
  strokes?: 'all' | 'ridge';
  /** Texto acessível. Sem ele o símbolo é tratado como decoração. */
  title?: string;
}

/**
 * O símbolo da montanha como sistema, não como enfeite.
 *
 * Herda `currentColor`, então funciona em qualquer superfície. Os três traços
 * saem separados e nomeados (`data-stroke`) para que a fase de motion possa
 * animar `stroke-dashoffset` de cada um sem tocar neste componente.
 */
export function MountainMark({
  weight = 'narrative',
  hairline,
  strokes = 'all',
  title,
  className,
  ...props
}: MountainMarkProps) {
  const strokeWidth = hairline ?? (typeof weight === 'number' ? weight : MOUNTAIN_WEIGHT[weight]);
  const visible = strokes === 'ridge' ? MOUNTAIN_STROKES.slice(0, 1) : MOUNTAIN_STROKES;

  return (
    <svg
      viewBox={`0 0 ${MOUNTAIN_VIEWBOX.width} ${MOUNTAIN_VIEWBOX.height}`}
      fill="none"
      className={cn('h-auto w-full', className)}
      {...(title ? { role: 'img' } : { 'aria-hidden': true, focusable: false })}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      >
        {visible.map((stroke) => (
          <path
            key={stroke.id}
            d={stroke.d}
            data-stroke={stroke.id}
            data-length={stroke.length}
            {...(hairline === undefined ? {} : { vectorEffect: 'non-scaling-stroke' as const })}
          />
        ))}
      </g>
    </svg>
  );
}
