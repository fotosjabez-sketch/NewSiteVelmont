import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { brand } from '@/lib/content';
import { conversionCta } from '@/lib/site';

import { HeroBackground } from './HeroBackground';

/**
 * Hero — a afirmação.
 *
 * Fundo fotográfico — paisagem no desktop, retrato no mobile — com scrim em
 * duas camadas por cima: uma base uniforme, que unifica a cor da foto com a
 * marca, e um reforço radial atrás da coluna de texto. A foto tem pontos de
 * brilho reais no relevo da rocha; medi o pixel mais claro das duas imagens
 * e testei o composto contra as cores de texto (--color-sand e
 * --color-sand-600) até garantir AA mesmo se um brilho cair em cima de uma
 * letra — uma camada uniforme sozinha não segurava isso sem apagar a foto
 * inteira. Ver styles/hero.css.
 *
 * Versão estática (fase 1). A entrada em dois tempos, a resposta ao ponteiro
 * e a antecipação da próxima seção entram na fase de motion.
 */
export function Hero() {
  return (
    <section
      data-surface="wine"
      className="relative isolate flex min-h-[max(640px,100svh)] flex-col justify-center overflow-hidden pt-[calc(var(--header-height)+var(--space-lg))] pb-(--space-2xl)"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <HeroBackground />
      </div>
      <div aria-hidden="true" className="hero-scrim-base absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-scrim-focus absolute inset-0 -z-10" />

      <Container className="flex flex-col items-center gap-(--space-lg) text-center">
        <p className="font-sans text-(length:--text-sm) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
          Proteção estratégica para marcas, criações e inovações
        </p>

        <h1 className="max-w-[18ch] font-serif text-(length:--text-2xl) leading-(--leading-display) tracking-(--tracking-display) text-balance">
          {brand.bigIdea}
        </h1>

        {/* Medida curta de propósito: um parágrafo longo centralizado é
            justamente o que a seção 3 do blueprint manda evitar. Em duas ou
            três linhas o eixo central ainda ajuda a leitura. */}
        <p className="max-w-[46ch] font-sans text-(length:--text-lg) leading-(--leading-snug) text-balance text-(--surface-muted)">
          A Velmont protege marcas, softwares, criações e inovações com estratégia, transparência e
          acompanhamento próximo em cada etapa.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <ButtonLink href={conversionCta.href} size="lg">
            Solicitar análise estratégica
          </ButtonLink>
          <ButtonLink href="/servicos" size="lg" variant="outline">
            Descobrir o que proteger
          </ButtonLink>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-(length:--text-sm) text-(--surface-muted)">
          <span>Riscos explicados.</span>
          <span aria-hidden="true" className="h-px w-4 bg-(--surface-rule)" />
          <span>Caminhos claros.</span>
          <span aria-hidden="true" className="h-px w-4 bg-(--surface-rule)" />
          <span>Acompanhamento próximo.</span>
        </p>

        {/* Indicação de scroll: antecipa a subida e leva até ela por teclado. */}
        <a
          href="#a-subida"
          className="group mt-(--space-lg) inline-flex flex-col items-center gap-3 rounded-(--radius-xs) font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase transition-colors duration-(--duration-fast) hover:text-(--surface-fg) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--surface-ring)"
        >
          Comece pela ideia
          {/* No eixo central o traço desce, em vez de apontar para o lado:
              é a direção que o leitor vai seguir. */}
          <span
            aria-hidden="true"
            className="h-10 w-px origin-top bg-(--surface-rule) transition-transform duration-(--duration-base) ease-(--ease-out) group-hover:scale-y-125"
          />
        </a>
      </Container>
    </section>
  );
}
