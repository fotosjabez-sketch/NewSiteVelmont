import { confirmed, pending, type Sourced } from './pending';

/**
 * Arquivo central de dados institucionais.
 *
 * Fonte confirmada até aqui: a apresentação institucional "Velmont 2026".
 * Tudo que ela não responde está marcado como `pending` — inclusive os números
 * que a home precisa na seção "Autoridade se demonstra".
 */

const PRESENTATION = 'Apresentação Velmont 2026';

/* -------------------------------------------------------------------------
 * Identidade
 * ---------------------------------------------------------------------- */

export const brand = {
  name: 'Velmont',
  legalName: pending('Razão social e CNPJ para o rodapé e o JSON-LD', {
    owner: 'Danielle',
  }),
  descriptor: 'Marcas e Patentes',
  bigIdea: 'O que você constrói merece continuar sendo seu.',
  signature: 'Da ideia ao patrimônio.',
  promise: 'Clareza para decidir. Estratégia para proteger. Presença para acompanhar.',
  /** Assinaturas que já existem no material oficial. */
  legacyTaglines: [
    confirmed('Protegendo ideias, estruturando negócios.', `${PRESENTATION}, p. 1`),
    confirmed('Trusted strategies, proven results.', `${PRESENTATION}, p. 1`),
  ],
} as const;

/* -------------------------------------------------------------------------
 * Contato
 * ---------------------------------------------------------------------- */

export const contact = {
  phoneDisplay: confirmed('(41) 98508-4026', `${PRESENTATION}, p. 11`),
  /** E.164, sem sinais — usado para montar o link do WhatsApp. */
  whatsappNumber: confirmed('5541985084026', `${PRESENTATION}, p. 11`),
  email: confirmed('contato@grupovelmont.com', `${PRESENTATION}, p. 11`),
  instagramHandle: confirmed('@velmontmarcas', `${PRESENTATION}, p. 11`),
  instagramUrl: confirmed('https://www.instagram.com/velmontmarcas/', `${PRESENTATION}, p. 11`),
  address: confirmed(
    {
      street: 'Avenida Iguaçu, 2820',
      complement: 'Edifício Corporativo',
      district: 'Água Verde',
      city: 'Curitiba',
      state: 'PR',
      postalCode: '80240-030',
      country: 'BR',
    },
    `${PRESENTATION}, p. 11`,
  ),
  /** A apresentação diz que o atendimento é presencial ou digital. */
  serviceNote: confirmed(
    'Atendimento presencial ou digital, com acompanhamento individualizado.',
    `${PRESENTATION}, p. 11`,
  ),
} as const;

/* -------------------------------------------------------------------------
 * Números e evidências — seção "Autoridade se demonstra"
 * Nenhum valor exato foi fornecido. A seção não é renderizada enquanto
 * nada aqui estiver confirmado.
 * ---------------------------------------------------------------------- */

export interface Metric {
  id: string;
  /** Rótulo lido pelo visitante. */
  label: string;
  value: Sourced<string>;
}

export const metrics: readonly Metric[] = [
  {
    id: 'experiencia',
    label: 'de experiência em propriedade industrial e intelectual',
    // A apresentação diz "mais de 10 anos" na página institucional e
    // "mais de 11 anos" na trajetória da Danielle. Precisa de um número único.
    value: pending('Número exato de anos de experiência da empresa (a apresentação traz 10 e 11)', {
      owner: 'Danielle',
    }),
  },
  {
    id: 'processos',
    label: 'processos conduzidos',
    value: pending('Total de processos conduzidos, verificável', { owner: 'Danielle' }),
  },
  {
    id: 'satisfacao',
    label: 'de satisfação dos clientes',
    value: pending('Índice de satisfação e como ele é medido', { owner: 'Danielle' }),
  },
];

/* -------------------------------------------------------------------------
 * Fundadoras
 * A trajetória vem da apresentação. As frases pessoais da home são sugestões
 * do blueprint e precisam ser aprovadas por cada uma antes de publicar.
 * ---------------------------------------------------------------------- */

export interface Founder {
  id: string;
  name: string;
  role: string;
  /** Formação resumida, no máximo três linhas. */
  background: Sourced<readonly string[]>;
  /** Frase pessoal sobre a razão de existir da Velmont. */
  quote: Sourced<string>;
  portrait: Sourced<{ src: string; alt: string }>;
}

export const founders: readonly Founder[] = [
  {
    id: 'danielle',
    name: 'Danielle Cubas de Azevedo',
    role: 'Founder & CEO',
    background: confirmed(
      [
        'Formada em Economia, com pós-graduação em Propriedade Intelectual e Direito Digital.',
        'MBA em Consultoria em Vendas e Marketing, com foco em aceleração de negócios e gestão.',
        'Mais de 11 anos atuando em propriedade industrial e intelectual.',
      ],
      `${PRESENTATION}, p. 3`,
    ),
    quote: pending('Aprovar a frase pessoal da Danielle para a home', { owner: 'Danielle' }),
    portrait: pending('Retrato vertical 4:5 da Danielle, com direção de luz definida', {
      owner: 'Velmont',
    }),
  },
  {
    id: 'lisandra',
    name: 'Lisandra Ferreira dos Santos',
    role: 'Founder & CEO',
    background: confirmed(
      [
        'Advogada especialista em Propriedade Industrial e Intelectual.',
        'Atuação nas áreas cível, trabalhista, empresarial e previdenciária.',
        'Responsável pela visão jurídica e pela gestão de patrimônio dos clientes.',
      ],
      `${PRESENTATION}, p. 4`,
    ),
    quote: pending('Aprovar a frase pessoal da Lisandra para a home', { owner: 'Lisandra' }),
    portrait: pending('Retrato vertical 4:5 da Lisandra, com direção de luz definida', {
      owner: 'Velmont',
    }),
  },
];

/* -------------------------------------------------------------------------
 * Provas
 * ---------------------------------------------------------------------- */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

/**
 * A apresentação traz prints de conversas reais, sem nome, empresa ou
 * autorização. Nada disso pode ir ao site como está.
 */
export const testimonials: readonly Sourced<Testimonial>[] = [
  pending('Depoimentos completos, com nome, empresa e autorização por escrito', {
    owner: 'Velmont',
  }),
];

export interface PartnerLogo {
  id: string;
  name: string;
  src: string;
}

export const partnerLogos: readonly Sourced<PartnerLogo>[] = [
  pending('Logos de clientes e parceiros autorizados, em SVG ou PNG transparente', {
    owner: 'Velmont',
  }),
];

/* -------------------------------------------------------------------------
 * Textos institucionais confirmados
 * ---------------------------------------------------------------------- */

export const about = {
  origin: confirmed(
    'A Velmont nasceu do inconformismo com um mercado onde grandes ideias, marcas e negócios nem sempre recebem a proteção e a estratégia que merecem.',
    `${PRESENTATION}, p. 2`,
  ),
  mission: confirmed(
    'Proporcionar segurança jurídica e visão estratégica, transformando marcas e ativos de propriedade intelectual em instrumentos de crescimento, diferenciação e geração de valor.',
    `${PRESENTATION}, p. 2`,
  ),
  vision: confirmed(
    'Ser referência nacional em proteção estratégica de negócios, construindo relações baseadas em honestidade, respeito e compromisso com o crescimento.',
    `${PRESENTATION}, p. 2`,
  ),
} as const;

/**
 * Tudo o que precisa de resposta antes do lançamento, em um só lugar.
 * `npm run check:content` lê esta lista.
 */
export const pendingRegistry = {
  brand: [brand.legalName],
  metrics: metrics.map((metric) => metric.value),
  founders: founders.flatMap((founder) => [founder.quote, founder.portrait]),
  testimonials,
  partnerLogos,
} as const;
