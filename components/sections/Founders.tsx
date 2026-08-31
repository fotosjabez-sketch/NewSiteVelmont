import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { MountainMark } from '@/components/ui/MountainMark';
import { PendingMark } from '@/components/ui/PendingMark';
import { TextLink } from '@/components/ui/TextLink';
import { founders, isConfirmed, resolve, showsPendingPlaceholders } from '@/lib/content';

/**
 * Fundadoras — proximidade com rosto e voz.
 *
 * Retratos verticais grandes, não recortes circulares. Enquanto as fotos não
 * chegam, o espaço 4:5 já fica reservado: a proporção é a mesma da imagem
 * final, então nada vai deslocar quando ela entrar.
 *
 * A formação vem da apresentação institucional e é dado confirmado. As frases
 * pessoais dependem de aprovação de cada uma — parafrasear o texto da
 * apresentação e publicar como citação seria inventar fala.
 */
export function Founders() {
  const showPending = showsPendingPlaceholders();

  return (
    <section data-surface="ink" id="fundadoras" className="py-(--section-y)">
      <Container>
        <div className="grid gap-(--space-lg) lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Quem conduz
            </p>
            <Heading level={2} size="xl" className="mt-(--space-md) max-w-[16ch]">
              Quem orienta também acompanha.
            </Heading>
          </div>
          <p className="max-w-(--measure) font-sans text-(length:--text-lg) leading-(--leading-snug) text-(--surface-muted) lg:col-span-6 lg:col-start-7 lg:self-end">
            Na Velmont, o relacionamento estratégico permanece próximo das fundadoras. Isso
            significa contexto preservado, decisões explicadas e responsabilidade em cada etapa.
          </p>
        </div>

        <div className="mt-(--space-2xl) grid gap-(--space-xl) md:grid-cols-2">
          {founders.map((founder) => {
            const portrait = resolve(founder.portrait);
            const background = resolve(founder.background) ?? [];

            return (
              <article key={founder.id} className="flex min-w-0 flex-col gap-(--space-md)">
                {/* Proporção 4:5 reservada desde já: quando a foto chegar,
                    nada se desloca. Sem foto e fora do modo de revisão o
                    quadro inteiro sai — um retângulo vazio dizendo "pendente"
                    é exatamente o placeholder que não pode ser publicado. */}
                {portrait ? (
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-(--radius-sm) bg-(--surface-fg)/6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={portrait.src}
                      alt={portrait.alt}
                      width={800}
                      height={1000}
                      className="size-full object-cover"
                    />
                  </div>
                ) : showPending ? (
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-(--radius-sm) bg-(--surface-fg)/6">
                    <div className="flex size-full flex-col items-center justify-center gap-4 border border-dashed border-(--surface-fg)/25 p-(--space-md) text-center">
                      <MountainMark hairline={1} className="w-24 text-(--surface-fg)/30" />
                      <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
                        Retrato 4:5 pendente
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-(length:--text-lg)">{founder.name}</h3>
                  <p className="font-sans text-(length:--text-sm) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
                    {founder.role}
                  </p>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {background.map((line) => (
                    <li
                      key={line}
                      className="font-sans text-(length:--text-sm) text-(--surface-muted)"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                {isConfirmed(founder.quote) ? (
                  <blockquote className="border-l border-(--surface-fg)/30 pl-(--space-md) font-serif text-(length:--text-lg) leading-(--leading-snug) text-(--surface-fg) italic">
                    {founder.quote.value}
                  </blockquote>
                ) : showPending ? (
                  <PendingMark label={founder.quote.label} className="font-serif">
                    Frase pessoal sobre a razão de existir da Velmont
                  </PendingMark>
                ) : null}
              </article>
            );
          })}
        </div>

        <TextLink href="/sobre" withArrow className="mt-(--space-xl) inline-flex">
          Conhecer a história completa
        </TextLink>
      </Container>
    </section>
  );
}
