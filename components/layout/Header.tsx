'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { conversionCta, primaryNav } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Cabeçalho.
 *
 * Transparente sobre o hero, sólido depois do primeiro trecho de scroll.
 * O CTA fica sempre visível no desktop; no mobile abre um menu de tela cheia
 * com as mesmas rotas e o CTA destacado.
 *
 * Todas as páginas do site começam com um hero escuro, por isso o cabeçalho é
 * sempre da superfície vinho. Se algum dia existir uma página de topo claro,
 * ela precisará de uma variante — e não de um ajuste pontual aqui.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Enquanto o menu está aberto: sem scroll atrás, Escape fecha, foco entra
  // no painel e volta para o botão ao sair.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      data-surface="wine"
      data-scrolled={isScrolled ? '' : undefined}
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-(--duration-base) ease-(--ease-out)',
        (isScrolled || isMenuOpen) && 'border-b border-(--surface-rule) bg-(--surface-bg)',
      )}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-6">
        <Logo
          tone="ivory"
          width={132}
          priority
          className="w-[104px] md:w-[132px]"
          onClick={() => setIsMenuOpen(false)}
        />

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => {
            const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'font-sans text-(length:--text-sm) text-(--surface-fg)/85',
                  'underline-offset-[0.5em] transition-colors duration-(--duration-fast)',
                  'hover:text-(--surface-fg) aria-[current=page]:text-(--surface-fg)',
                  'aria-[current=page]:underline aria-[current=page]:decoration-1',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* O wrapper controla a visibilidade: aplicar `hidden` direto no
              botão competiria com o `inline-flex` da própria base. */}
          <div className="hidden lg:block">
            <ButtonLink href={conversionCta.href}>{conversionCta.label}</ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-principal"
            className={cn(
              'flex min-h-11 min-w-11 items-center justify-center gap-2 lg:hidden',
              'font-sans text-(length:--text-sm) text-(--surface-fg)',
            )}
          >
            <span className="sr-only sm:not-sr-only">{isMenuOpen ? 'Fechar' : 'Menu'}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-current transition-transform duration-(--duration-fast) ease-(--ease-out)',
                  isMenuOpen && 'top-1/2 rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-(--duration-fast) ease-(--ease-out)',
                  isMenuOpen && 'bottom-1/2 -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Menu de tela cheia. Fica no DOM apenas quando aberto, então nada
          invisível recebe foco por tabulação. */}
      {isMenuOpen ? (
        <div
          id="menu-principal"
          ref={panelRef}
          data-surface="wine"
          className="fixed inset-x-0 top-(--header-height) bottom-0 overflow-y-auto bg-(--surface-bg) lg:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between gap-(--space-xl) py-(--space-xl)">
            <nav aria-label="Navegação principal" className="flex flex-col">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-(--surface-rule) py-5 font-serif text-(length:--text-lg) text-(--surface-fg)"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-(--space-md)">
              <ButtonLink
                href={conversionCta.href}
                size="lg"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {conversionCta.label}
              </ButtonLink>
              <p className="font-sans text-(length:--text-xs) text-(--surface-muted)">
                Riscos explicados. Caminhos claros. Acompanhamento próximo.
              </p>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
