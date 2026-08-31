import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { TextLink } from '@/components/ui/TextLink';
import { diagnosticOptions, type DiagnosticOption } from '@/lib/content';
import { conversionCta } from '@/lib/site';

/**
 * Diagnóstico de entrada — "O que você está construindo?".
 *
 * A seleção usa radios reais, então funciona por teclado, por leitor de tela e
 * sem uma linha de JavaScript. Nada depende de hover: o estado é `:checked` e o
 * painel correspondente aparece por `peer-checked`.
 *
 * Os radios precisam vir antes de rótulos e painéis no DOM, porque `peer` só
 * alcança irmãos posteriores. Visualmente eles são invisíveis, e o anel de
 * foco aparece no rótulo via `peer-focus-visible`.
 *
 * As classes `peer-checked/...` são escritas por extenso de propósito: o
 * Tailwind extrai classe por leitura estática do código, então interpolar o
 * nome do peer geraria uma classe que nunca chega ao CSS.
 */

/**
 * Cada escolha é uma linha editorial de largura inteira, não um card em grade:
 * três caixas iguais lado a lado são exatamente o padrão que o blueprint
 * manda evitar.
 */
const optionRow =
  'group grid cursor-pointer grid-cols-[auto_1fr_auto] items-baseline gap-(--space-md) ' +
  'border-t border-(--surface-rule) py-(--space-md) ' +
  'transition-colors duration-(--duration-fast) ease-(--ease-out)';

/** Cada trilha carrega as classes literais do seu peer. */
const tracks = [
  {
    peer: 'peer/marca',
    row:
      'hover:text-(--surface-fg) peer-checked/marca:text-(--surface-fg) ' +
      'peer-focus-visible/marca:outline-2 peer-focus-visible/marca:outline-offset-2 ' +
      'peer-focus-visible/marca:outline-(--surface-ring)',
    marker:
      'peer-checked/marca:scale-100 peer-checked/marca:border-(--surface-fg) peer-checked/marca:bg-(--surface-fg)',
    panel: 'hidden peer-checked/marca:block',
  },
  {
    peer: 'peer/criacao',
    row:
      'hover:text-(--surface-fg) peer-checked/criacao:text-(--surface-fg) ' +
      'peer-focus-visible/criacao:outline-2 peer-focus-visible/criacao:outline-offset-2 ' +
      'peer-focus-visible/criacao:outline-(--surface-ring)',
    marker:
      'peer-checked/criacao:scale-100 peer-checked/criacao:border-(--surface-fg) peer-checked/criacao:bg-(--surface-fg)',
    panel: 'hidden peer-checked/criacao:block',
  },
  {
    peer: 'peer/inovacao',
    row:
      'hover:text-(--surface-fg) peer-checked/inovacao:text-(--surface-fg) ' +
      'peer-focus-visible/inovacao:outline-2 peer-focus-visible/inovacao:outline-offset-2 ' +
      'peer-focus-visible/inovacao:outline-(--surface-ring)',
    marker:
      'peer-checked/inovacao:scale-100 peer-checked/inovacao:border-(--surface-fg) peer-checked/inovacao:bg-(--surface-fg)',
    panel: 'hidden peer-checked/inovacao:block',
  },
] as const;

/** Junta a opção de conteúdo com as classes da sua trilha. */
const trails = diagnosticOptions.map((option, index) => ({
  option,
  track: tracks[index],
  position: String(index + 1).padStart(2, '0'),
  // A régua de fechamento fica no último rótulo: os painéis vêm depois dele
  // no DOM, então `last:` já não alcança a lista de escolhas.
  isLast: index === diagnosticOptions.length - 1,
}));

function ExplanationPanel({ option }: { option: DiagnosticOption }) {
  return (
    <div className="mt-(--space-md) flex flex-col gap-(--space-md) border-t border-(--surface-fg)/25 pt-(--space-md) md:flex-row md:items-end md:justify-between md:gap-(--space-lg)">
      <p className="max-w-(--measure) font-sans text-(--surface-muted)">{option.explanation}</p>
      <TextLink href={option.href} withArrow className="shrink-0 text-(--surface-fg)">
        {option.ctaLabel}
      </TextLink>
    </div>
  );
}

export function Diagnostic() {
  return (
    <section data-surface="paper" id="diagnostico" className="py-(--section-y)">
      <Container>
        <div className="grid gap-(--space-lg) lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              O que você está construindo?
            </p>
            <Heading level={2} size="xl" className="mt-(--space-md)">
              Nem todo ativo se protege do mesmo jeito.
            </Heading>
          </div>
          <p className="max-w-(--measure) font-sans text-(length:--text-lg) leading-(--leading-snug) text-(--surface-muted) lg:col-span-6 lg:col-start-7 lg:self-end">
            A análise começa entendendo o que você criou, em que estágio está e onde o risco
            realmente existe.
          </p>
        </div>

        {/* Radios, rótulos e painéis são TODOS irmãos diretos do fieldset:
            `peer-*` usa o combinador de irmão (~), então qualquer wrapper
            entre eles quebraria a seleção inteira. Os radios são
            `visually-hidden` com posição absoluta, logo não ocupam espaço no
            flex. */}
        <fieldset className="mt-(--space-xl) flex flex-col border-0 p-0 text-(--surface-fg)/70">
          <legend className="visually-hidden">Selecione o que você está construindo</legend>

          {trails.map(({ option, track }) => (
            <input
              key={option.id}
              type="radio"
              name="diagnostico"
              id={`diagnostico-${option.id}`}
              className={`${track?.peer ?? ''} visually-hidden`}
            />
          ))}

          {trails.map(({ option, track, position, isLast }) => (
            <label
              key={option.id}
              htmlFor={`diagnostico-${option.id}`}
              className={`${optionRow} ${track?.row ?? ''} ${isLast ? 'border-b border-(--surface-rule)' : ''}`}
            >
              <span className="font-sans text-(length:--text-sm) text-(--surface-muted) tabular-nums">
                {position}
              </span>
              <span className="font-serif text-(length:--text-lg) leading-(--leading-snug) text-balance md:text-(length:--text-xl)">
                {option.label}
              </span>
              {/* Marcador de seleção: losango derivado da linha da montanha. */}
              <span
                aria-hidden="true"
                className={`size-2.5 shrink-0 origin-center scale-75 rotate-45 border border-(--surface-fg)/50 bg-transparent transition duration-(--duration-fast) ease-(--ease-out) group-hover:border-(--surface-fg) ${track?.marker ?? ''}`}
              />
            </label>
          ))}

          {trails.map(({ option, track }) => (
            <div key={option.id} className={track?.panel ?? 'hidden'}>
              <ExplanationPanel option={option} />
            </div>
          ))}
        </fieldset>

        <p className="mt-(--space-md) font-sans text-(length:--text-sm) text-(--surface-muted)">
          Ainda não sei o que preciso proteger.{' '}
          <Link
            href={conversionCta.href}
            className="text-(--surface-fg) underline decoration-1 underline-offset-[0.35em]"
          >
            Começar pela análise estratégica
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
