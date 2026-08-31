import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MountainMark } from '@/components/ui/MountainMark';
import { brand } from '@/lib/content';
import { conversionCta } from '@/lib/site';

/**
 * Hero — a afirmação.
 *
 * Fundo vinho, tipografia editorial em areia, montanha em linha fina
 * parcialmente visível. Sem fotografia: a identidade é o primeiro impacto.
 *
 * Versão estática (fase 1). A entrada em dois tempos, a resposta ao ponteiro
 * e a antecipação da próxima seção entram na fase de motion.
 */
export function Hero() {
  return (
    <section
      data-surface="wine"
      className="relative isolate flex min-h-[max(640px,100svh)] flex-col justify-end overflow-hidden pt-(--header-height) pb-(--space-2xl)"
    >
      {/* A montanha entra como fragmento: sangra pela direita e é cortada
          pela borda inferior, sugerindo que a subida continua fora da tela. */}
      <MountainMark
        hairline={1}
        className="pointer-events-none absolute -right-[34%] -bottom-[4%] -z-10 w-[128%] text-(--surface-fg)/14 md:-right-[8%] md:bottom-[8%] md:w-[65%] md:text-(--surface-fg)/22"
      />

      <Container className="flex flex-col gap-(--space-lg)">
        <p className="max-w-lg font-sans text-(length:--text-sm) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
          Proteção estratégica para marcas, criações e inovações
        </p>

        <h1 className="max-w-[16ch] font-serif text-(length:--text-2xl) leading-(--leading-display) tracking-(--tracking-display) text-balance">
          {brand.bigIdea}
        </h1>

        <p className="max-w-(--measure) font-sans text-(length:--text-lg) leading-(--leading-snug) text-(--surface-muted)">
          A Velmont protege marcas, softwares, criações e inovações com estratégia, transparência e
          acompanhamento próximo em cada etapa.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={conversionCta.href} size="lg">
            Solicitar análise estratégica
          </ButtonLink>
          <ButtonLink href="/servicos" size="lg" variant="outline">
            Descobrir o que proteger
          </ButtonLink>
        </div>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-(length:--text-sm) text-(--surface-muted)">
          <span>Riscos explicados.</span>
          <span aria-hidden="true" className="h-px w-4 bg-(--surface-rule)" />
          <span>Caminhos claros.</span>
          <span aria-hidden="true" className="h-px w-4 bg-(--surface-rule)" />
          <span>Acompanhamento próximo.</span>
        </p>

        {/* Indicação de scroll: antecipa a subida e leva até ela por teclado. */}
        <a
          href="#a-subida"
          className="mt-(--space-lg) inline-flex items-center gap-3 self-start rounded-(--radius-xs) font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase transition-colors duration-(--duration-fast) hover:text-(--surface-fg) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--surface-ring)"
        >
          Comece pela ideia
          <span aria-hidden="true" className="h-px w-10 bg-(--surface-rule)" />
        </a>
      </Container>
    </section>
  );
}
