/** Junta classes ignorando valores falsos. Sem dependência externa. */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}
