import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { methodSteps } from '@/lib/content';

/**
 * Método — transparência como experiência.
 *
 * A linha vertical que sobe entre as etapas é desenhada em CSS, não em SVG:
 * ela precisa acompanhar a altura real do texto, que muda com a tipografia
 * fluida. Nenhum texto está escondido atrás de animação — a fase de motion só
 * vai revelar progressivamente o que já está legível aqui.
 */
export function Method() {
  return (
    <section data-surface="ivory" id="metodo" className="py-(--section-y)">
      <Container>
        <div className="grid gap-(--space-lg) lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Como conduzimos
            </p>
            <Heading level={2} size="xl" className="mt-(--space-md) max-w-[20ch]">
              Você não deveria contratar proteção sem entender o caminho.
            </Heading>
          </div>
          <p className="max-w-(--measure) font-sans text-(length:--text-lg) leading-(--leading-snug) text-(--surface-muted) lg:col-span-5 lg:col-start-8 lg:self-end">
            Na Velmont, cada decisão é explicada antes de ser tomada. Sem processos no escuro. Sem
            promessas que ninguém pode garantir.
          </p>
        </div>

        <ol className="relative mt-(--space-2xl) flex flex-col gap-(--space-xl) pl-(--space-lg) md:pl-(--space-xl)">
          {/* Trilha vertical contínua entre as etapas. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-0 w-px bg-(--surface-rule)"
          />

          {methodSteps.map((step) => (
            <li key={step.index} className="relative grid gap-(--space-sm) md:grid-cols-12">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-(--space-lg) size-2 -translate-x-1/2 rotate-45 bg-(--surface-fg) md:-left-(--space-xl)"
              />
              <p className="font-sans text-(length:--text-sm) text-(--surface-muted) tabular-nums md:col-span-2">
                {step.index}
              </p>
              <h3 className="font-serif text-(length:--text-lg) leading-(--leading-snug) md:col-span-4">
                {step.title}
              </h3>
              <p className="max-w-(--measure) font-sans text-(--surface-muted) md:col-span-6">
                {step.support}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
