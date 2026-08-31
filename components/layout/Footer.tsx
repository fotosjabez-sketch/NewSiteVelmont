import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { MountainMark } from '@/components/ui/MountainMark';
import { brand, contact, resolve } from '@/lib/content';
import { primaryNav, primaryServices, secondaryServices } from '@/lib/site';

// `break-words` porque o e-mail é uma string longa sem espaços: sem isso ela
// define a largura mínima da coluna e estoura o grid em telas de 320px.
const linkClass =
  'font-sans text-(length:--text-sm) text-(--surface-muted) underline-offset-[0.4em] ' +
  'break-words transition-colors duration-(--duration-fast) ' +
  'hover:text-(--surface-fg) hover:underline';

export function Footer() {
  const address = resolve(contact.address);
  const phone = resolve(contact.phoneDisplay);
  const email = resolve(contact.email);
  const instagram = resolve(contact.instagramUrl);
  const handle = resolve(contact.instagramHandle);
  const year = new Date().getFullYear();

  return (
    <footer data-surface="ink" className="bg-(--surface-bg) text-(--surface-fg)">
      <Container className="py-(--space-2xl)">
        <div className="flex flex-col gap-(--space-xl) border-b border-(--surface-rule) pb-(--space-xl) lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-(--space-md)">
            <Logo tone="sand" width={148} href="/" />
            <p className="font-serif text-(length:--text-lg) text-(--surface-fg)">
              {brand.signature}
            </p>
            <MountainMark weight="detail" className="w-40 text-(--surface-fg)/25" />
          </div>

          <div className="grid grid-cols-1 gap-(--space-lg) min-[420px]:grid-cols-2 sm:grid-cols-3 lg:gap-(--space-xl)">
            <nav aria-label="Navegação do rodapé" className="flex min-w-0 flex-col gap-3">
              <h2 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-fg) uppercase">
                Navegar
              </h2>
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Serviços" className="flex min-w-0 flex-col gap-3">
              <h2 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-fg) uppercase">
                O que protegemos
              </h2>
              {[...primaryServices, ...secondaryServices].map((service) => (
                <Link key={service.slug} href={service.href} className={linkClass}>
                  {service.navLabel}
                </Link>
              ))}
            </nav>

            <div className="flex min-w-0 flex-col gap-3">
              <h2 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-fg) uppercase">
                Contato
              </h2>
              {phone ? (
                <a href={`tel:+55${phone.replace(/\D/g, '')}`} className={linkClass}>
                  {phone}
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              ) : null}
              {instagram && handle ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {handle}
                </a>
              ) : null}
              {address ? (
                <address className="font-sans text-(length:--text-sm) text-(--surface-muted) not-italic">
                  {address.street}
                  <br />
                  {address.complement}
                  <br />
                  {address.district}, {address.city}/{address.state}
                  <br />
                  CEP {address.postalCode}
                </address>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-(--space-md) pt-(--space-lg) md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl font-sans text-(length:--text-xs) leading-(--leading-relaxed) text-(--surface-muted)">
            Os conteúdos publicados neste site são informativos e não substituem a análise
            específica de cada caso. Prazos e resultados de processos dependem do órgão competente e
            das particularidades de cada pedido.
          </p>

          <div className="flex flex-col gap-2 md:items-end">
            <Link href="/politica-de-privacidade" className={linkClass}>
              Política de privacidade
            </Link>
            <p className="font-sans text-(length:--text-xs) text-(--surface-muted)">
              © {year} {brand.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
