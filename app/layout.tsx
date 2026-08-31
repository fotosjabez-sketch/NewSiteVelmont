import type { Metadata, Viewport } from 'next';

import { fontVariables } from '@/lib/fonts';
import { baseMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/site';

import '@/styles/globals.css';

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: '#2D0414',
  colorScheme: 'light',
};

/**
 * Marca a presença de JavaScript antes da primeira pintura.
 *
 * O CSS da subida decide entre o fluxo vertical e o palco fixado a partir de
 * `[data-js='on']`. Como este script roda no `<head>`, síncrono, o layout já
 * nasce certo: sem ele a seção mudaria de altura depois da hidratação, e isso
 * é layout shift. Sem JavaScript o atributo nunca aparece e a versão estática
 * é a que vale.
 */
const MARK_JS = "document.documentElement.dataset.js='on'";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARK_JS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
