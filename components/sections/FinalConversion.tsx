import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { MountainMark } from '@/components/ui/MountainMark';
import { AnalysisForm } from '@/components/forms/AnalysisForm';
import { contact, resolve } from '@/lib/content';

/**
 * Conversão final.
 *
 * Fechamento em vinho, como manda o ritmo de capítulos do blueprint. A
 * montanha reaparece aqui em linha fina — é o fim da subida que começou no
 * hero, não um enfeite novo.
 */
export function FinalConversion() {
  const phone = resolve(contact.phoneDisplay);
  const email = resolve(contact.email);

  return (
    <section
      data-surface="wine"
      id="analise-estrategica"
      className="relative isolate overflow-hidden py-(--section-y)"
    >
      <MountainMark
        hairline={1}
        className="pointer-events-none absolute -bottom-[10%] -left-[20%] -z-10 w-[110%] text-(--surface-fg)/12 lg:-left-[6%] lg:w-[58%]"
      />

      <Container>
        <div className="grid gap-(--space-xl) lg:grid-cols-12">
          <div className="flex flex-col gap-(--space-md) lg:col-span-5">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Análise estratégica
            </p>
            <Heading level={2} size="xl" className="max-w-[18ch]">
              Você sabe o que está construindo. Vamos entender como proteger.
            </Heading>
            <p className="max-w-(--measure) font-sans text-(--surface-muted)">
              Conte brevemente o momento do seu negócio. A equipe da Velmont analisará o contexto e
              continuará a conversa pelo WhatsApp.
            </p>

            <dl className="mt-(--space-md) flex flex-col gap-2 border-t border-(--surface-rule) pt-(--space-md)">
              {phone ? (
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-sans text-(length:--text-sm) text-(--surface-muted)">
                    Telefone
                  </dt>
                  <dd className="font-sans text-(length:--text-sm)">{phone}</dd>
                </div>
              ) : null}
              {email ? (
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-sans text-(length:--text-sm) text-(--surface-muted)">
                    E-mail
                  </dt>
                  <dd className="font-sans text-(length:--text-sm) break-words">{email}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <AnalysisForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
