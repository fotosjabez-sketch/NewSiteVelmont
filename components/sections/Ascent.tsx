import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { MOUNTAIN_ALTITUDES, MOUNTAIN_STROKES, MOUNTAIN_VIEWBOX } from '@/lib/brand/mountain';
import { ascentBeats, brand } from '@/lib/content';

/**
 * A subida — estrutura estática dos quatro beats.
 *
 * Versão de fase 2: quatro blocos verticais com o traço desenhado ao lado,
 * exatamente o comportamento que o blueprint define para mobile. A fase de
 * motion transforma isto em um palco fixado no desktop, sem mexer no conteúdo
 * nem na ordem do DOM — o texto já está legível sem nenhum JavaScript.
 *
 * O `stroke-dasharray` de cada beat mostra qual trecho do cume corresponde
 * àquela altitude. É o mesmo cálculo que a timeline vai animar depois.
 */

const ridge = MOUNTAIN_STROKES[0];

function AltitudeGlyph({ progress, label }: { progress: number; label: string }) {
  if (!ridge) return null;
  const drawn = ridge.length * progress;

  return (
    <svg
      viewBox={`0 0 ${MOUNTAIN_VIEWBOX.width} ${MOUNTAIN_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
      className="h-auto w-full"
    >
      {/* traço completo, quase invisível: a montanha inteira sempre está lá */}
      <path
        d={ridge.d}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        className="text-(--surface-fg)/18"
      />
      {/* trecho correspondente a esta altitude */}
      <path
        d={ridge.d}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray={`${drawn} ${ridge.length}`}
        vectorEffect="non-scaling-stroke"
        className="text-(--surface-fg)"
      >
        <title>{label}</title>
      </path>
    </svg>
  );
}

export function Ascent() {
  return (
    <section data-surface="ivory" id="a-subida" className="py-(--section-y)">
      <Container>
        <div className="max-w-[54ch]">
          <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
            A subida
          </p>
          <Heading level={2} size="xl" className="mt-(--space-md)">
            Todo patrimônio começou como uma ideia sem proteção nenhuma.
          </Heading>
        </div>

        <ol className="mt-(--space-2xl) flex flex-col">
          {ascentBeats.map((beat, index) => {
            const progress = MOUNTAIN_ALTITUDES[beat.id];
            const isLast = index === ascentBeats.length - 1;

            return (
              <li
                key={beat.id}
                className="grid gap-(--space-md) border-t border-(--surface-rule) py-(--space-xl) md:grid-cols-12 md:gap-(--space-lg)"
              >
                {/* Altitude e palavra-chave */}
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

                {/* Texto do beat */}
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

                {/* Trecho do cume correspondente à altitude */}
                <div className="md:col-span-3 md:self-center">
                  <AltitudeGlyph progress={progress} label={`Altitude da etapa ${beat.keyword}`} />
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
