import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

import lockupIvory from '@/public/brand/velmont-lockup-ivory.png';
import lockupSand from '@/public/brand/velmont-lockup-sand.png';
import lockupWine from '@/public/brand/velmont-lockup-wine.png';

const lockups = {
  sand: lockupSand,
  ivory: lockupIvory,
  wine: lockupWine,
} as const;

export interface LogoProps {
  /** Tom do lockup. `ivory`/`sand` sobre vinho, `wine` sobre fundo claro. */
  tone?: keyof typeof lockups;
  /** Largura renderizada em px. A altura segue a proporção 506×258. */
  width?: number;
  /** Envolve em um link para a home. */
  href?: string | null;
  priority?: boolean;
  className?: string;
  /** Encaminhado ao link — o cabeçalho usa para fechar o menu ao navegar. */
  onClick?: () => void;
}

/**
 * Lockup oficial (montanha + VELMONT + MARCAS E PATENTES).
 *
 * PENDENTE: hoje é um PNG derivado da apresentação institucional, porque o
 * arquivo vetorial ainda não foi entregue. Ao receber o SVG oficial, trocar
 * apenas este componente — nada mais no site referencia o arquivo.
 */
export function Logo({
  tone = 'sand',
  width = 168,
  href = '/',
  priority,
  className,
  onClick,
}: LogoProps) {
  const image = (
    <Image
      src={lockups[tone]}
      alt="Velmont — Marcas e Patentes"
      width={width}
      height={Math.round((width * 258) / 506)}
      priority={priority ?? false}
      sizes={`${width}px`}
      className={cn('h-auto', className)}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      {...(onClick ? { onClick } : {})}
      className="inline-block rounded-(--radius-xs) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--surface-ring)"
      aria-label="Velmont — página inicial"
    >
      {image}
    </Link>
  );
}
