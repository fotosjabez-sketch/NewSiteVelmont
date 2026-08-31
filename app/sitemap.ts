import type { MetadataRoute } from 'next';
import { primaryServices, secondaryServices, siteConfig } from '@/lib/site';

/**
 * Sitemap gerado a partir das rotas reais.
 * Rotas ainda não construídas não entram — um sitemap que aponta para 404
 * é pior que um sitemap curto.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const built: string[] = ['/'];

  const planned = [
    '/servicos',
    ...primaryServices.map((service) => service.href),
    ...secondaryServices.map((service) => service.href),
    '/como-atuamos',
    '/sobre',
    '/conteudos',
    '/analise-estrategica',
    '/politica-de-privacidade',
  ];

  void planned; // entram no sitemap conforme cada página é publicada

  return built.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
