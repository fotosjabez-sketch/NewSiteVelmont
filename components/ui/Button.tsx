import Link from 'next/link';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'solid' | 'outline' | 'quiet';
export type ButtonSize = 'md' | 'lg';

/**
 * Botões sólidos e legíveis, cantos quase retos, foco sempre visível.
 * As cores vêm da superfície onde o botão está — o mesmo botão funciona
 * sobre marfim e sobre vinho sem variante extra.
 */
const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium ' +
  'rounded-(--radius-sm) border transition-colors duration-(--duration-fast) ' +
  'ease-(--ease-out) select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--surface-ring) ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<ButtonVariant, string> = {
  solid:
    'bg-(--surface-accent) text-(--surface-bg) border-(--surface-accent) ' +
    'hover:bg-(--surface-fg) hover:border-(--surface-fg)',
  outline:
    'bg-transparent text-(--surface-fg) border-(--surface-fg)/35 ' +
    'hover:border-(--surface-fg) hover:bg-(--surface-fg)/6',
  quiet:
    'bg-transparent text-(--surface-fg) border-transparent px-0 ' + 'hover:text-(--surface-accent)',
};

/** Altura mínima de 44px em qualquer tamanho: alvo de toque adequado. */
const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 py-2.5 text-(length:--text-sm) tracking-[0.01em]',
  lg: 'min-h-13 px-7 py-3.5 text-(length:--text-base) tracking-[0.01em]',
};

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(base, variants[variant], variant === 'quiet' ? 'min-h-11' : sizes[size], className);
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = 'solid', size = 'md', className, ...props }: ButtonProps) {
  return <button className={classes(variant, size, className)} {...props} />;
}

export interface ButtonLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Mesmo desenho do Button, mas navega. Usa Link para rotas internas. */
export function ButtonLink({
  variant = 'solid',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={classes(variant, size, className)} {...props} />;
}
