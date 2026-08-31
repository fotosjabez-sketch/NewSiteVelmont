/**
 * Copy da home.
 *
 * Os títulos, chamadas e textos de apoio vêm do blueprint (seção 7). O texto
 * conectivo foi escrito seguindo as regras de linguagem da seção 8: português
 * simples, termo técnico explicado na primeira aparição, nenhuma promessa de
 * deferimento e nenhum prazo universal.
 */

/* -------------------------------------------------------------------------
 * 7.3 — A subida
 * ---------------------------------------------------------------------- */

export interface AscentBeat {
  id: 'ideia' | 'valor' | 'exposicao' | 'patrimonio';
  /** Palavra-chave que se fixa na altitude correspondente. */
  keyword: string;
  title: string;
  support: string;
}

export const ascentBeats: readonly AscentBeat[] = [
  {
    id: 'ideia',
    keyword: 'ideia',
    title: 'Primeiro, existe uma ideia.',
    support: 'Um nome. Um código. Um desenho. Uma solução que ainda não existia.',
  },
  {
    id: 'valor',
    keyword: 'valor',
    title: 'Depois, ela ganha valor.',
    support: 'Entra no mercado, conquista clientes, acumula reputação e passa a mover o negócio.',
  },
  {
    id: 'exposicao',
    keyword: 'risco',
    title: 'Quanto mais cresce, mais exposta fica.',
    support: 'Cópias, conflitos de titularidade, impedimentos e decisões tomadas tarde demais.',
  },
  {
    id: 'patrimonio',
    keyword: 'patrimônio',
    title: 'Proteger não é frear o crescimento. É dar estrutura para ele continuar.',
    support:
      'A proteção define o que é seu, em que território e por quanto tempo — e é isso que transforma uma criação em ativo do negócio.',
  },
];

/* -------------------------------------------------------------------------
 * 7.4 — Diagnóstico de entrada
 * ---------------------------------------------------------------------- */

export interface DiagnosticOption {
  id: string;
  /** Rótulo da escolha, na voz de quem está construindo. */
  label: string;
  /** Explicação de duas linhas, exibida ao selecionar. */
  explanation: string;
  ctaLabel: string;
  href: string;
}

export const diagnosticOptions: readonly DiagnosticOption[] = [
  {
    id: 'marca',
    label: 'Tenho uma marca ou um nome em uso.',
    explanation:
      'O primeiro passo é uma pesquisa de anterioridade: verificar se já existe sinal igual ou parecido no mesmo ramo de atividade. É ela que mostra se o caminho está livre, se exige estratégia ou se há risco real de conflito.',
    ctaLabel: 'Entender a proteção de marca',
    href: '/servicos/registro-de-marca',
  },
  {
    id: 'criacao',
    label: 'Criei software, conteúdo ou outra obra.',
    explanation:
      'Aqui a pergunta central é de titularidade: quem é dono do que foi criado, e com que prova. Contrato, registro e documentação de autoria definem se a criação pertence à empresa ou continua com quem a produziu.',
    ctaLabel: 'Entender a proteção de criações',
    href: '/servicos/software-direitos-autorais-e-contratos',
  },
  {
    id: 'inovacao',
    label: 'Desenvolvi um produto, desenho ou tecnologia.',
    explanation:
      'Antes de mostrar ao mercado, vale entender o que pode ser protegido e o que a divulgação antecipada inviabiliza. A busca de anterioridade indica se a solução é nova diante do que já foi publicado no mundo.',
    ctaLabel: 'Entender a proteção de inovações',
    href: '/servicos/patentes-e-desenho-industrial',
  },
];

/* -------------------------------------------------------------------------
 * 7.5 — Territórios de proteção
 * ---------------------------------------------------------------------- */

export interface Territory {
  index: string;
  slug: string;
  name: string;
  headline: string;
  summary: string;
  items: readonly string[];
  linkLabel: string;
  href: string;
}

export const territories: readonly Territory[] = [
  {
    index: '01',
    slug: 'marcas',
    name: 'Marcas',
    headline: 'Seu nome já circula. Mas ele está protegido para crescer?',
    summary:
      'Pesquisa, estratégia de registro, acompanhamento e monitoramento para marcas em diferentes estágios.',
    items: [
      'pesquisa de anterioridade',
      'análise de viabilidade',
      'registro e acompanhamento',
      'monitoramento e estratégia de proteção',
    ],
    linkLabel: 'Proteger uma marca',
    href: '/servicos/registro-de-marca',
  },
  {
    index: '02',
    slug: 'software-autoria-contratos',
    name: 'Software, autoria e contratos',
    headline: 'Código, conteúdo e autoria também são patrimônio.',
    summary:
      'Proteção de software e criações, definição de titularidade, registros, cessões e licenciamentos.',
    items: [
      'registro de software',
      'direitos autorais',
      'prova de autoria e anterioridade',
      'contratos, cessão e licenciamento',
    ],
    linkLabel: 'Proteger uma criação',
    href: '/servicos/software-direitos-autorais-e-contratos',
  },
  {
    index: '03',
    slug: 'patentes-desenho-industrial',
    name: 'Patentes e desenho industrial',
    headline: 'Antes de mostrar uma inovação ao mercado, entenda o que pode ser protegido.',
    summary:
      'Análise técnica e estratégica para invenções, modelos de utilidade, desenho industrial e liberdade de operação.',
    items: [
      'busca de anterioridade',
      'patentes e modelos de utilidade',
      'desenho industrial',
      'análise de Freedom-to-Operate',
    ],
    linkLabel: 'Proteger uma inovação',
    href: '/servicos/patentes-e-desenho-industrial',
  },
];

/* -------------------------------------------------------------------------
 * 7.6 — Método
 * ---------------------------------------------------------------------- */

export interface MethodStep {
  index: string;
  title: string;
  support: string;
}

export const methodSteps: readonly MethodStep[] = [
  {
    index: '01',
    title: 'Entendemos o ativo',
    support: 'O que foi criado, em que estágio está e qual papel exerce no negócio.',
  },
  {
    index: '02',
    title: 'Investigamos o cenário',
    support: 'Anterioridades, riscos, possibilidades e caminhos de proteção.',
  },
  {
    index: '03',
    title: 'Explicamos as escolhas',
    support: 'O cliente entende o que faz sentido, o que não faz e por quê.',
  },
  {
    index: '04',
    title: 'Acompanhamos a execução',
    support: 'Atualizações proativas e proximidade durante cada etapa.',
  },
];

/* -------------------------------------------------------------------------
 * 7.11 — Formulário de análise
 * ---------------------------------------------------------------------- */

export const protectionChoices = [
  { value: 'marca', label: 'Marca' },
  { value: 'software-ou-criacao', label: 'Software ou criação' },
  { value: 'produto-desenho-tecnologia', label: 'Produto, desenho ou tecnologia' },
  { value: 'ainda-nao-sei', label: 'Ainda não sei' },
] as const;

export const momentChoices = [
  { value: 'comecando', label: 'Estou começando' },
  { value: 'em-operacao', label: 'Já está em operação' },
  { value: 'lancamento-proximo', label: 'Pretendo lançar em breve' },
  { value: 'risco-ou-conflito', label: 'Existe um risco ou conflito' },
] as const;
