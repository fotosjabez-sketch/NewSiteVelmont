import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { PendingBlock } from '@/components/ui/PendingMark';
import { resolveAll, showsPendingPlaceholders, testimonials } from '@/lib/content';

/**
 * Depoimentos — "Confiança se constrói em cada atualização."
 *
 * Nenhum depoimento autorizado foi entregue. A apresentação traz prints de
 * conversas reais, sem nome, sem empresa e sem autorização, então nada dali
 * pode virar citação no site.
 *
 * Sem depoimento confirmado a seção some em produção. A pilha editorial abaixo
 * é o desenho que os relatos vão ocupar — sem autoplay, sem carrossel: no
 * desktop viram uma pilha alternada, no mobile ficam empilhados na ordem de
 * leitura.
 */
export function Testimonials() {
  const confirmed = resolveAll(testimonials);
  const showPending = showsPendingPlaceholders();

  if (confirmed.length === 0 && !showPending) return null;

  return (
    <section data-surface="sand" id="depoimentos" className="py-(--section-y)">
      <Container>
        <div className="flex flex-col gap-(--space-md) md:flex-row md:items-end md:justify-between">
          <Heading level={2} size="xl" className="max-w-[20ch]">
            Confiança se constrói em cada atualização.
          </Heading>
          <p className="max-w-(--measure) font-sans text-(--surface-muted)">
            Relatos completos, com nome, empresa e autorização — priorizando clareza, acompanhamento
            e segurança na tomada de decisão.
          </p>
        </div>

        {confirmed.length > 0 ? (
          <ul className="mt-(--space-2xl) flex flex-col gap-(--space-xl)">
            {confirmed.map((testimonial, index) => (
              <li
                key={testimonial.id}
                className={[
                  'max-w-3xl border-t border-(--surface-rule) pt-(--space-lg)',
                  index % 2 === 1 ? 'md:ml-auto' : '',
                ].join(' ')}
              >
                <figure className="flex flex-col gap-(--space-md)">
                  <blockquote className="font-serif text-(length:--text-lg) leading-(--leading-snug) text-balance">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="font-sans text-(length:--text-sm) text-(--surface-muted)">
                    {testimonial.author} — {testimonial.company}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <PendingBlock
            className="mt-(--space-xl) max-w-2xl"
            title="Depoimentos de clientes"
            items={[
              'texto completo do relato, na íntegra',
              'nome e empresa de quem escreveu',
              'autorização de publicação por escrito',
              'os prints da apresentação não têm identificação nem autorização',
            ]}
          />
        )}
      </Container>
    </section>
  );
}
