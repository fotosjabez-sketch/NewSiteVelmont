import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * Base de metadados. Cada página indexável define `title` e `description`
 * próprios e a canonical sai daqui, a partir do path.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Metadados de uma página interna, com canonical resolvida. */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
    },
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
