import { momentChoices, protectionChoices, showsPendingPlaceholders } from '@/lib/content';
import { Button } from '@/components/ui/Button';

/**
 * Formulário de análise estratégica — marcação da fase 2.
 *
 * Ainda não abre o WhatsApp: `lib/whatsapp.ts` já monta o link, mas ligar os
 * dois exige validação com React Hook Form + Zod, que é a fase do formulário.
 * Por enquanto isto é um componente de servidor com HTML de verdade — `label`
 * associada a cada campo, `fieldset`/`legend` nos grupos, `autocomplete` onde
 * faz sentido — de modo que a fase seguinte só precise adicionar o
 * comportamento, sem redesenhar a estrutura.
 */

const fieldLabel = 'font-sans text-(length:--text-sm) text-(--surface-fg)';
const fieldControl =
  'min-h-11 w-full rounded-(--radius-sm) border border-(--surface-fg)/30 bg-transparent ' +
  'px-3 py-2.5 font-sans text-(length:--text-base) text-(--surface-fg) ' +
  'placeholder:text-(--surface-muted) ' +
  'focus-visible:border-(--surface-ring) focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-(--surface-ring)';

export function AnalysisForm() {
  const showPhaseNote = showsPendingPlaceholders();

  return (
    <form
      {...(showPhaseNote ? { 'aria-describedby': 'analise-status' } : {})}
      className="flex flex-col gap-(--space-md)"
      // Sem `action` e sem handler: a integração entra na fase do formulário.
    >
      <div className="grid gap-(--space-md) sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="analise-nome" className={fieldLabel}>
            Nome
          </label>
          <input
            id="analise-nome"
            name="nome"
            type="text"
            autoComplete="name"
            className={fieldControl}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="analise-empresa" className={fieldLabel}>
            Empresa ou marca
          </label>
          <input
            id="analise-empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            className={fieldControl}
          />
        </div>
      </div>

      <fieldset className="flex min-w-0 flex-col gap-2 border-0 p-0">
        <label htmlFor="analise-tipo" className={fieldLabel}>
          O que deseja proteger?
        </label>
        <select id="analise-tipo" name="tipo" defaultValue="" className={fieldControl}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {protectionChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2 border-0 p-0">
        <label htmlFor="analise-momento" className={fieldLabel}>
          Em que momento está?
        </label>
        <select id="analise-momento" name="momento" defaultValue="" className={fieldControl}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {momentChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </fieldset>

      <div className="flex min-w-0 flex-col gap-2">
        <label htmlFor="analise-contexto" className={fieldLabel}>
          Contexto adicional <span className="text-(--surface-muted)">— opcional</span>
        </label>
        <textarea
          id="analise-contexto"
          name="contexto"
          rows={3}
          maxLength={400}
          className={`${fieldControl} resize-y`}
        />
        <p className="font-sans text-(length:--text-xs) text-(--surface-muted)">
          Duas ou três linhas bastam. O detalhe fica para a conversa.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="analise-privacidade"
          name="privacidade"
          type="checkbox"
          className="mt-1 size-5 shrink-0 rounded-(--radius-xs) border border-(--surface-fg)/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--surface-ring)"
        />
        <label
          htmlFor="analise-privacidade"
          className="font-sans text-(length:--text-sm) text-(--surface-muted)"
        >
          Autorizo o contato da Velmont e li a{' '}
          <a
            href="/politica-de-privacidade"
            className="text-(--surface-fg) underline decoration-1 underline-offset-[0.3em]"
          >
            política de privacidade
          </a>
          .
        </label>
      </div>

      {/* `type="button"` de propósito: sem handler, um submit recarregaria a
          página e daria a impressão de que a mensagem foi enviada. */}
      <Button type="button" size="lg" className="mt-(--space-sm) self-start">
        Continuar no WhatsApp
      </Button>

      {/* Nota de fase: aparece na revisão e some em produção, como qualquer
          outro placeholder. O formulário ainda não enviar continua sendo
          bloqueio de lançamento — registrado em docs/qa-checklist.md. */}
      {showPhaseNote ? (
        <p id="analise-status" className="font-sans text-(length:--text-xs) text-(--surface-muted)">
          Fase 2: estrutura do formulário em revisão. O envio para o WhatsApp entra junto com a
          validação, na fase do formulário.
        </p>
      ) : null}
    </form>
  );
}
