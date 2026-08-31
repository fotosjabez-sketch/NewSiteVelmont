/**
 * Dados institucionais com procedência explícita.
 *
 * Regra do projeto: nada de número, depoimento, credencial ou prazo inventado.
 * Todo dado sensível é ou `confirmed` (com a fonte registrada) ou `pending`
 * (com o que falta e quem precisa responder). Um valor `pending` nunca chega
 * ao HTML: os componentes simplesmente não renderizam o bloco.
 *
 * `npm run check:content` lista o que falta; com
 * VELMONT_REQUIRE_COMPLETE_CONTENT=1 ele falha, o que trava a publicação
 * enquanto houver placeholder — sem atrapalhar o desenvolvimento.
 */

export interface ConfirmedValue<T> {
  status: 'confirmed';
  value: T;
  /** De onde veio o dado. Ex.: "Apresentação Velmont 2026, p. 11". */
  source: string;
}

export interface PendingValue {
  status: 'pending';
  /** O que falta, em uma linha, na linguagem de quem vai responder. */
  label: string;
  /** Quem precisa fornecer. */
  owner: string;
  /** Impede o lançamento se continuar pendente. */
  blocksLaunch: boolean;
}

export type Sourced<T> = ConfirmedValue<T> | PendingValue;

export function confirmed<T>(value: T, source: string): ConfirmedValue<T> {
  return { status: 'confirmed', value, source };
}

export function pending(
  label: string,
  options: { owner?: string; blocksLaunch?: boolean } = {},
): PendingValue {
  return {
    status: 'pending',
    label,
    owner: options.owner ?? 'Velmont',
    blocksLaunch: options.blocksLaunch ?? true,
  };
}

export function isConfirmed<T>(entry: Sourced<T>): entry is ConfirmedValue<T> {
  return entry.status === 'confirmed';
}

/** Valor pronto para render, ou `null` quando ainda não foi confirmado. */
export function resolve<T>(entry: Sourced<T>): T | null {
  return isConfirmed(entry) ? entry.value : null;
}

/** Apenas os itens confirmados de uma lista. */
export function resolveAll<T>(entries: readonly Sourced<T>[]): T[] {
  return entries.filter(isConfirmed).map((entry) => entry.value);
}
