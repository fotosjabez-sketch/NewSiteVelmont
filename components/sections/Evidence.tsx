import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { PendingBlock, PendingNote, PendingValue } from '@/components/ui/PendingMark';
import {
  isConfirmed,
  metrics,
  partnerLogos,
  resolveAll,
  showsPendingPlaceholders,
} from '@/lib/content';

/**
 * Números e evidências — "Autoridade se demonstra".
 *
 * Nenhum dos três números foi fornecido. Em revisão, a seção mostra o desenho
 * com placeholders inequívocos (borda tracejada e o que falta escrito ao lado).
 * Em produção sem NEXT_PUBLIC_SHOW_PENDING=1, ela some por inteiro — não faz
 * sentido publicar "Autoridade se demonstra" sem demonstrar nada.
 */

const placeholderByMetric: Record<string, string> = {
  experiencia: '[X]+ anos',
  processos: '[Y]+ processos',
  satisfacao: '[Z]/5',
};

export function Evidence() {
  const confirmedMetrics = metrics.filter((metric) => isConfirmed(metric.value));
  const confirmedLogos = resolveAll(partnerLogos);
  const showPending = showsPendingPlaceholders();

  const hasSomethingToShow = confirmedMetrics.length > 0 || confirmedLogos.length > 0;
  if (!hasSomethingToShow && !showPending) return null;

  return (
    <section data-surface="paper" id="evidencias" className="py-(--section-y)">
      <Container>
        <div className="flex flex-col gap-(--space-md) md:flex-row md:items-end md:justify-between">
          <Heading level={2} size="xl" className="max-w-[16ch]">
            Autoridade se demonstra.
          </Heading>
          <p className="max-w-(--measure) font-sans text-(--surface-muted)">
            Só entram aqui dados verificáveis e aprovados pela Velmont. Enquanto um número não for
            confirmado, ele não é publicado.
          </p>
        </div>

        <dl className="mt-(--space-xl) grid gap-(--space-lg) border-t border-(--surface-rule) pt-(--space-lg) sm:grid-cols-3">
          {metrics.map((metric) => {
            if (isConfirmed(metric.value)) {
              return (
                <div key={metric.id} className="flex min-w-0 flex-col gap-2">
                  <dd className="font-serif text-(length:--text-xl) leading-none tabular-nums">
                    {metric.value.value}
                  </dd>
                  <dt className="max-w-[24ch] font-sans text-(length:--text-sm) text-(--surface-muted)">
                    {metric.label}
                  </dt>
                </div>
              );
            }

            if (!showPending) return null;

            // Valor, depois o rótulo da métrica, depois a legenda do que falta:
            // a legenda no meio quebraria a leitura do par número/rótulo.
            return (
              <div key={metric.id} className="flex min-w-0 flex-col gap-2">
                <dd className="font-serif text-(length:--text-xl) leading-none">
                  <PendingValue>{placeholderByMetric[metric.id] ?? '[—]'}</PendingValue>
                </dd>
                <dt className="max-w-[24ch] font-sans text-(length:--text-sm) text-(--surface-muted)">
                  {metric.label}
                </dt>
                <PendingNote label={metric.value.label} className="mt-1 max-w-[32ch]" />
              </div>
            );
          })}
        </dl>

        {/* Parceiros: faixa limpa e monocromática, nunca uma nuvem de logos. */}
        <div className="mt-(--space-2xl)">
          <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
            Clientes e parceiros
          </h3>

          {confirmedLogos.length > 0 ? (
            <ul className="mt-(--space-md) flex flex-wrap items-center gap-x-(--space-xl) gap-y-(--space-md)">
              {confirmedLogos.map((logo) => (
                <li key={logo.id} className="font-sans text-(length:--text-sm)">
                  {logo.name}
                </li>
              ))}
            </ul>
          ) : showPending ? (
            <PendingBlock
              className="mt-(--space-md) max-w-2xl"
              title="Faixa de clientes e parceiros"
              items={[
                'logos autorizados, em SVG ou PNG transparente',
                'autorização de uso por escrito, cliente a cliente',
                'a apresentação traz os logos em bitmap e sem lista de autorizações',
              ]}
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
