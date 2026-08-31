import { getWhatsAppNumber } from '@/lib/site';

/**
 * Monta o link oficial wa.me com a mensagem já preenchida.
 * O número nunca é escrito em componente: vem de `getWhatsAppNumber()`.
 */

export interface AnalysisRequest {
  nome: string;
  empresa: string;
  /** O que deseja proteger. */
  tipo: string;
  /** Em que momento o negócio está. */
  momento: string;
  /** Contexto adicional, opcional e curto. */
  contexto?: string;
}

/** Mensagem em texto puro, no formato definido no blueprint. */
export function buildAnalysisMessage(request: AnalysisRequest): string {
  const contexto = request.contexto?.trim();

  return [
    'Olá, Velmont. Vim pelo site e gostaria de solicitar uma análise estratégica.',
    '',
    `Nome: ${request.nome}`,
    `Empresa ou marca: ${request.empresa}`,
    `Quero proteger: ${request.tipo}`,
    `Momento atual: ${request.momento}`,
    `Contexto: ${contexto && contexto.length > 0 ? contexto : 'não informado'}`,
  ].join('\n');
}

/**
 * URL wa.me com o texto codificado.
 * Retorna `null` quando não há número configurado — assim a interface pode
 * degradar para o e-mail em vez de gerar um link quebrado.
 */
export function buildWhatsAppUrl(request: AnalysisRequest): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const params = new URLSearchParams({ text: buildAnalysisMessage(request) });
  return `https://wa.me/${number}?${params.toString()}`;
}

/** Link do WhatsApp sem contexto de formulário, para contato direto. */
export function buildPlainWhatsAppUrl(text?: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  if (!text) return `https://wa.me/${number}`;

  const params = new URLSearchParams({ text });
  return `https://wa.me/${number}?${params.toString()}`;
}
