import { contact, resolve } from '@/lib/content';

/**
 * Configuração de site. O número do WhatsApp e a URL canônica vivem aqui —
 * nunca espalhados por componentes.
 */

/**
 * Domínio de origem, quando nada mais responde.
 * PENDENTE: o domínio final ainda não foi definido — ver docs/content-inventory.md.
 */
const FALLBACK_SITE_URL = 'https://www.grupovelmont.com';

/**
 * Resolve a URL canônica do site.
 *
 * `??` não serve aqui: ele só cai no fallback para `null` e `undefined`. Uma
 * variável de ambiente declarada e vazia — que é o que a Vercel entrega quando
 * o campo existe sem valor — passava direto, `siteConfig.url` virava string
 * vazia e `new URL('')` derrubava o build inteiro na coleta de configuração.
 *
 * Então cada candidata é testada de verdade: espaços fora, esquema
 * acrescentado quando vem só o domínio, e `new URL` dentro de try/catch. Se
 * nenhuma servir, vale o domínio de origem — nunca uma string vazia.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Domínio de produção do projeto na Vercel. Estável entre deploys, ao
    // contrário de VERCEL_URL, que muda a cada um e faria a canonical de um
    // preview apontar para ele mesmo.
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (!trimmed) continue;

    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // Valor inválido: tenta a próxima candidata em vez de derrubar o build.
      continue;
    }
  }

  return FALLBACK_SITE_URL;
}

export const siteConfig = {
  name: 'Velmont',
  title: 'Velmont — Marcas e Patentes',
  description:
    'A Velmont protege marcas, softwares, criações e inovações com estratégia, transparência e acompanhamento próximo em cada etapa.',
  locale: 'pt-BR',
  url: resolveSiteUrl(),
} as const;

/**
 * Número do WhatsApp em E.164, sem sinais.
 * Vem da variável de ambiente quando existir; senão, do dado confirmado na
 * apresentação institucional.
 */
export function getWhatsAppNumber(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '');
  if (fromEnv) return fromEnv;
  return resolve(contact.whatsappNumber);
}

export interface NavItem {
  label: string;
  href: string;
}

/** Navegação principal. Sem mega menu no primeiro lançamento. */
export const primaryNav: readonly NavItem[] = [
  { label: 'O que protegemos', href: '/servicos' },
  { label: 'Como atuamos', href: '/como-atuamos' },
  { label: 'Conteúdos', href: '/conteudos' },
  { label: 'Sobre a Velmont', href: '/sobre' },
];

export const conversionCta = {
  label: 'Solicitar análise',
  href: '/analise-estrategica',
} as const;

/**
 * Os três territórios comerciais prioritários. Estruturação empresarial e
 * naming existem, mas entram como capacidades complementares — não disputam
 * o primeiro nível de atenção.
 */
export const primaryServices = [
  {
    slug: 'registro-de-marca',
    href: '/servicos/registro-de-marca',
    navLabel: 'Registro de marca',
    linkLabel: 'Proteger uma marca',
  },
  {
    slug: 'software-direitos-autorais-e-contratos',
    href: '/servicos/software-direitos-autorais-e-contratos',
    navLabel: 'Software, autoria e contratos',
    linkLabel: 'Proteger uma criação',
  },
  {
    slug: 'patentes-e-desenho-industrial',
    href: '/servicos/patentes-e-desenho-industrial',
    navLabel: 'Patentes e desenho industrial',
    linkLabel: 'Proteger uma inovação',
  },
] as const;

export const secondaryServices = [
  {
    slug: 'estruturacao-empresarial',
    href: '/servicos/estruturacao-empresarial',
    navLabel: 'Estruturação empresarial',
  },
  {
    slug: 'naming-e-identidade',
    href: '/servicos/naming-e-identidade',
    navLabel: 'Naming e identidade',
  },
] as const;
