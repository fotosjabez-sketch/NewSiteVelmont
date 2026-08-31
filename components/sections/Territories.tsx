import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { TextLink } from '@/components/ui/TextLink';
import { MOUNTAIN_STROKES, MOUNTAIN_VIEWBOX } from '@/lib/brand/mountain';
import { territories } from '@/lib/content';

/**
 * Territórios de proteção.
 *
 * Versão estática: três capítulos empilhados, cada um ocupando a largura toda
 * e alternando o lado da composição. É exatamente o comportamento que o
 * blueprint define para mobile, e serve de base para o trilho horizontal que
 * entra na fase de motion — sem mexer no conteúdo nem na ordem do DOM.
 *
 * Não são cards: cada painel sangra até a borda da coluna, tem número grande
 * e a linha de altitude como elemento de continuidade entre eles.
 */

const ridge = MOUNTAIN_STROKES[0];

/** Recorte do cume em três altitudes: um por território. */
function TerritoryGlyph({ step }: { step: number }) {
  if (!ridge) return null;
  const progress = (step + 1) / territories.length;

  return (
    <svg
      viewBox={`0 0 ${MOUNTAIN_VIEWBOX.width} ${MOUNTAIN_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
      className="h-auto w-full"
    >
      {MOUNTAIN_STROKES.map((stroke) => (
        <path
          key={stroke.id}
          d={stroke.d}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          className="text-(--surface-fg)/15"
        />
      ))}
      <path
        d={ridge.d}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray={`${ridge.length * progress} ${ridge.length}`}
        vectorEffect="non-scaling-stroke"
        className="text-(--surface-fg)/70"
      />
    </svg>
  );
}

export function Territories() {
  return (
    <section data-surface="wine" id="territorios" className="py-(--section-y)">
      <Container>
        <div className="flex flex-col gap-(--space-md) md:flex-row md:items-end md:justify-between">
          <Heading level={2} size="xl" className="max-w-[20ch]">
            O que a Velmont ajuda a proteger
          </Heading>
          <p className="max-w-(--measure) font-sans text-(--surface-muted)">
            Três territórios com lógicas próprias. O que muda entre eles não é o cuidado — é o tipo
            de prova, o órgão envolvido e o momento certo de agir.
          </p>
        </div>
      </Container>

      <div className="mt-(--space-2xl) flex flex-col">
        {territories.map((territory, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={territory.slug}
              className="border-t border-(--surface-rule) py-(--space-xl)"
            >
              <Container>
                <div className="grid items-start gap-(--space-lg) lg:grid-cols-12">
                  {/* Índice e recorte de altitude */}
                  <div
                    className={[
                      'flex items-center justify-between gap-(--space-md) lg:col-span-3 lg:flex-col lg:items-start',
                      isEven ? 'lg:order-1' : 'lg:order-3',
                    ].join(' ')}
                  >
                    <p className="font-serif text-(length:--text-2xl) leading-none text-(--surface-fg)/35 tabular-nums">
                      {territory.index}
                    </p>
                    <div className="w-32 shrink-0 lg:mt-(--space-lg) lg:w-full">
                      <TerritoryGlyph step={index} />
                      <p className="mt-3 font-sans text-(length:--text-xs) text-(--surface-muted) tabular-nums">
                        {territory.index} / {String(territories.length).padStart(2, '0')}
                      </p>
                    </div>
                  </div>

                  {/* Chamada e resumo */}
                  <div className="flex flex-col gap-(--space-md) lg:order-2 lg:col-span-5">
                    <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
                      {territory.name}
                    </p>
                    <h3 className="max-w-[22ch] font-serif text-(length:--text-xl) leading-(--leading-tight) tracking-(--tracking-tight) text-balance">
                      {territory.headline}
                    </h3>
                    <p className="max-w-(--measure) font-sans text-(--surface-muted)">
                      {territory.summary}
                    </p>
                    <TextLink href={territory.href} withArrow className="mt-2 self-start">
                      {territory.linkLabel}
                    </TextLink>
                  </div>

                  {/* Itens curtos */}
                  <ul
                    className={[
                      'flex flex-col lg:col-span-4',
                      isEven ? 'lg:order-3' : 'lg:order-1',
                    ].join(' ')}
                  >
                    {territory.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-(--surface-rule) py-3 font-sans text-(length:--text-sm) text-(--surface-fg)/85 first:border-t"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Container>
            </article>
          );
        })}
      </div>
    </section>
  );
}
