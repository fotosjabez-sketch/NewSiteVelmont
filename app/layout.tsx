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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
