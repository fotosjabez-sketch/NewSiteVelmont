/**
 * Portão de pré-visualização.
 *
 * A fase 2 precisa mostrar o desenho de seções que dependem de dados que a
 * Velmont ainda não forneceu — números, depoimentos, frases das fundadoras e
 * cartões de conteúdo. Mostrar um placeholder para revisão é legítimo;
 * publicá-lo não é.
 *
 * Então o placeholder aparece em desenvolvimento e em builds de revisão
 * marcados com NEXT_PUBLIC_SHOW_PENDING=1, e some em qualquer outro build de
 * produção. `npm run check:launch` continua sendo a trava definitiva.
 */
export function showsPendingPlaceholders(): boolean {
  if (process.env.NEXT_PUBLIC_SHOW_PENDING === '1') return true;
  return process.env.NODE_ENV !== 'production';
}
