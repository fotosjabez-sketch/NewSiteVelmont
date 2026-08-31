/**
 * A montanha da Velmont como sistema visual.
 *
 * A geometria foi medida na máscara de pixels do lockup oficial (ver
 * `public/brand/README.md`). São três traços independentes — e é essa
 * separação que permite desenhá-los em sequência na narrativa da home.
 *
 * Os pontos são a fonte da verdade: `d` e `length` são derivados deles, de
 * modo que os dois nunca saem de sincronia.
 *
 * PENDENTE: quando o SVG oficial do símbolo for entregue, substituir estes
 * pontos pelos originais e revalidar a proporção do viewBox.
 */

export const MOUNTAIN_VIEWBOX = { width: 270, height: 96 } as const;

export type MountainStrokeId = 'ridge' | 'foreground-left' | 'foreground-right';

type Point = readonly [x: number, y: number];

const POINTS: Record<MountainStrokeId, readonly Point[]> = {
  /** Cume principal — o traço longo que conduz a narrativa. */
  ridge: [
    [42, 89],
    [146, 0],
    [196, 41],
  ],
  /** Pico menor à frente, à esquerda. */
  'foreground-left': [
    [0, 96],
    [80, 33],
    [99, 42],
  ],
  /** Pico menor à frente, à direita. */
  'foreground-right': [
    [142, 91],
    [206, 33],
    [270, 90],
  ],
};

function toPathData(points: readonly Point[]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
}

function toLength(points: readonly Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    total += Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
  return Math.round(total * 100) / 100;
}

export interface MountainStroke {
  id: MountainStrokeId;
  /** `d` do path, no sistema de coordenadas do viewBox acima. */
  d: string;
  /** Comprimento do traço, para animar `stroke-dashoffset` sem medir em runtime. */
  length: number;
}

/** Na ordem de desenho da narrativa: o cume principal primeiro. */
export const MOUNTAIN_STROKES: readonly MountainStroke[] = (
  ['ridge', 'foreground-left', 'foreground-right'] as const
).map((id) => ({
  id,
  d: toPathData(POINTS[id]),
  length: toLength(POINTS[id]),
}));

/**
 * Espessura proporcional, em unidades do viewBox: escala junto com o desenho,
 * como acontece no lockup oficial.
 *
 * Para uma linha que precisa continuar fina em qualquer tamanho — a montanha
 * ocupando meia viewport, por exemplo — use a prop `hairline` do
 * `MountainMark`, que fixa a espessura em pixels de tela.
 */
export const MOUNTAIN_WEIGHT = {
  /** Proporção do lockup oficial: 9/270 do desenho. */
  logo: 9,
  /** Traço da narrativa. */
  narrative: 2.5,
  /** Detalhes discretos: divisores, marcadores, indicadores de progresso. */
  detail: 1.5,
} as const;

/**
 * Altitudes dos quatro beats da narrativa, como fração do avanço do traço
 * principal (0 = base, 1 = cume). Usadas na fase de motion para sincronizar
 * o texto de cada beat com o desenho da linha.
 */
export const MOUNTAIN_ALTITUDES = {
  ideia: 0.08,
  valor: 0.36,
  exposicao: 0.66,
  patrimonio: 1,
} as const;
