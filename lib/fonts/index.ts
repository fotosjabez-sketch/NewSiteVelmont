import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';

/**
 * Newsreader — serif editorial.
 * Títulos, frases-manifesto, citações e corpo de artigo.
 * Arquivo variável (200–800) servido do próprio bundle: sem requisição a
 * terceiros e sem layout shift. `display: swap` + métricas de fallback
 * mantêm o CLS em zero enquanto a fonte carrega.
 */
export const newsreader = localFont({
  src: [
    {
      path: './files/newsreader-latin-variable.woff2',
      weight: '200 800',
      style: 'normal',
    },
    {
      path: './files/newsreader-latin-italic-variable.woff2',
      weight: '200 800',
      style: 'italic',
    },
  ],
  variable: '--font-newsreader',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
  preload: true,
});

/**
 * Geist Sans — sans de interface.
 * Navegação, botões, legendas, formulários e textos curtos.
 * Provisória até o manual de marca confirmar a sans oficial.
 */
export const geistSans = GeistSans;

/** Classe única aplicada em <html> para publicar as duas variáveis. */
export const fontVariables = `${newsreader.variable} ${geistSans.variable}`;
