import { AscentChoreography } from '@/components/motion/AscentChoreography';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import {
  MOUNTAIN_ALTITUDES,
  MOUNTAIN_STROKES,
  MOUNTAIN_VIEWBOX,
  pointAtProgress,
} from '@/lib/brand/mountain';
import { ascentBeats, brand } from '@/lib/content';

/**
 * A subida.
 *
 * Componente de servidor: todo o texto vem pronto do HTML, na ordem de leitura,
 * e a seção é legível sem uma linha de JavaScript. `AscentChoreography` só
 * encontra os nós pelos atributos `data-ascent-*` e liga a timeline por cima.
 *
 * Existem duas montanhas no DOM, e o CSS mostra uma de cada vez:
 * — os recortes por beat (`ascent__beat-glyph`), que são o estado base, o que
 *   vale sem JS, com movimento reduzido e no mobile;
 * — a montanha do palco (`ascent__stage-mountain`), que só aparece quando o
 *   palco fixado entra, de tablet para cima.
 *
 * PENDENTE: o traço é a reconstrução medida do símbolo, não o vetor oficial —
 * ver `public/brand/README.md`. Quando o SVG oficial chegar, só
 * `lib/brand/mountain.ts` muda; nada aqui nem na timeline precisa mexer.
 */

const ridge = MOUNTAIN_STROKES[0];
const viewBox = `0 0 ${MOUNTAIN_VIEWBOX.width} ${MOUNTAIN_VIEWBOX.height}`;

/**
 * Recorte do cume até a altitude do beat. É o estado base, servido pronto.
 *
 * Sem `vector-effect: non-scaling-stroke` aqui, de propósito: com ele o
 * navegador passa a medir o tracejado em pixels de tela enquanto
 * `getTotalLength()` continua em unidades do viewBox, e as duas medidas se
 * desencontram — o traço desenhado deixa de corresponder à altitude. A
 * espessura vai em unidades do viewBox e escala junto com o desenho.
 */
function BeatGlyph({ progress }: { progress: number }) {
  if (!ridge) return null;

  return (
    <svg viewBox={viewBox} fill="none" aria-hidden="true" className="h-auto w-full">
      <path
        d={ridge.d}
        stroke="currentColor"
        strokeWidth={0.5}
        className="text-(--surface-fg)/20"
      />
      <path
        data-ascent-beat-draw
        d={ridge.d}
        stroke="currentColor"
        strokeWidth={0.9}
        strokeDasharray={`${ridge.length * progress} ${ridge.length}`}
        className="text-(--surface-fg)"
      />
    </svg>
  );
}

/**
 * Montanha do palco: os três traços mais as linhas topográficas.
 *
 * Cada linha topográfica fica na altura exata em que o cume está naquela
 * altitude — `pointAtProgress` tira isso da própria geometria, em vez de
 * chutar valores de y.
 */
function StageMountain() {
  if (!ridge) return null;

  return (
    <svg viewBox={viewBox} fill="none" aria-hidden="true" className="h-auto w-full">
      {/* Linhas topográficas, na altura exata de cada beat. */}
      <g>
        {ascentBeats.map((beat) => {
          const { x, y } = pointAtProgress('ridge', MOUNTAIN_ALTITUDES[beat.id]);
          return (
            <line
              key={beat.id}
              data-ascent-contour
              x1={0}
              y1={y}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth={0.35}
              className="text-(--surface-fg)/30"
            />
          );
        })}
      </g>

      {/* Fantasma: a montanha inteira, muito apagada. Sem ela o traço em
          construção fica solto no espaço, sem forma que o explique. */}
      {MOUNTAIN_STROKES.map((stroke) => (
        <path
          key={`ghost-${stroke.id}`}
          d={stroke.d}
          stroke="currentColor"
          strokeWidth={0.45}
          strokeLinejoin="miter"
          className="text-(--surface-fg)/16"
        />
      ))}

      {/* Traços animados. Espessura em unidades do viewBox: ver BeatGlyph. */}
      {MOUNTAIN_STROKES.map((stroke) => (
        <path
          key={stroke.id}
          data-ascent-stroke={stroke.id}
          d={stroke.d}
          stroke="currentColor"
          strokeWidth={stroke.id === 'ridge' ? 1 : 0.75}
          strokeLinejoin="miter"
          className={stroke.id === 'ridge' ? 'text-(--surface-fg)' : 'text-(--surface-fg)/65'}
        />
      ))}
    </svg>
  );
}

export function Ascent() {
  return (
    <AscentChoreography>
      <section
        data-surface="ivory"
        data-ascent-section
        id="a-subida"
        className="ascent py-(--section-y)"
      >
        <Container>
          <div className="max-w-[54ch]">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              A subida
            </p>
            <Heading level={2} size="xl" className="mt-(--space-md)">
              Todo patrimônio começou como uma ideia sem proteção nenhuma.
            </Heading>
          </div>
        </Container>

        <div data-ascent-stage className="ascent__stage mt-(--space-2xl)">
          <Container>
            <div className="grid gap-(--space-lg) md:grid-cols-12 md:items-center">
              <ol className="ascent__beats md:col-span-6">
                {ascentBeats.map((beat, index) => {
                  const progress = MOUNTAIN_ALTITUDES[beat.id];
                  const isLast = index === ascentBeats.length - 1;

                  return (
                    <li
                      key={beat.id}
                      data-ascent-beat
                      data-ascent-altitude={progress}
                      className="ascent__beat grid gap-(--space-md) border-t border-(--surface-rule) py-(--space-xl) md:grid-cols-9 md:gap-(--space-lg)"
                    >
                      <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
                        <span className="font-sans text-(length:--text-xs) text-(--surface-muted) tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-(length:--text-xs) tracking-(--tracking-caps) text-(--surface-fg) uppercase">
                          {beat.keyword}
                        </span>
                        <span className="ml-auto font-sans text-(length:--text-xs) text-(--surface-muted) tabular-nums md:ml-0">
                          altitude {Math.round(progress * 100)}%
                        </span>
                      </div>

                      <div className="flex flex-col gap-(--space-sm) md:col-span-6">
                        <h3
                          className={
                            isLast
                              ? 'font-serif text-(length:--text-xl) leading-(--leading-tight) tracking-(--tracking-tight) text-balance'
                              : 'font-serif text-(length:--text-lg) leading-(--leading-snug) text-balance'
                          }
                        >
                          {beat.title}
                        </h3>
                        <p className="max-w-(--measure) font-sans text-(--surface-muted)">
                          {beat.support}
                        </p>
                        {isLast ? (
                          <p className="mt-(--space-sm) font-serif text-(length:--text-lg) text-(--surface-fg) italic">
                            {brand.signature}
                          </p>
                        ) : null}
                      </div>

                      {/* Estado base: o recorte de altitude ao lado do texto. */}
                      <div className="ascent__beat-glyph md:col-span-9">
                        <BeatGlyph progress={progress} />
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Palco: uma montanha só, desenhada conforme a subida avança. */}
              {/* A montanha sangra até a borda útil do contêiner: mais presença sem
                  criar scroll lateral, porque a margem negativa equivale
                  exatamente à goteira. */}
              <div className="ascent__stage-mountain md:col-span-6 md:col-start-7 md:-mr-(--gutter)">
                <StageMountain />
                <p
                  aria-hidden="true"
                  className="mt-(--space-md) font-sans text-(length:--text-xs) text-(--surface-muted) tabular-nums"
                >
                  altitude <span data-ascent-progress-value>0%</span>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </AscentChoreography>
  );
}
