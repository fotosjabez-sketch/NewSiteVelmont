import { getImageProps } from 'next/image';

import heroDesktop from '@/public/images/hero/hero-desktop.webp';
import heroMobile from '@/public/images/hero/hero-mobile.webp';

/**
 * Fundo fotográfico do hero, com direção de arte por breakpoint.
 *
 * São dois enquadramentos diferentes — paisagem no desktop, retrato no
 * mobile — não a mesma imagem redimensionada. Por isso `next/image` sozinho
 * não resolve: ele varia o tamanho de um arquivo, não troca de arquivo.
 * `getImageProps` monta um `<picture>` nativo com `<source>` por media query,
 * do jeito que a própria documentação do Next recomenda para direção de arte
 * responsiva — assim o navegador baixa só a imagem certa, nunca as duas.
 *
 * Puramente decorativo: o que a imagem transmite já está no texto ao lado.
 * `alt=""` é o correto aqui, não uma omissão.
 */
export function HeroBackground() {
  const common = {
    alt: '',
    fill: true,
    priority: true,
    sizes: '100vw',
  } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: heroDesktop });
  const { props: mobileProps } = getImageProps({ ...common, src: heroMobile });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img {...mobileProps} alt="" className="object-cover object-bottom" />
    </picture>
  );
}
