/**
 * Conteúdos — dados locais tipados.
 *
 * Estes artigos ainda não existem. Os títulos vêm do plano editorial do
 * blueprint (seção 11) e os resumos descrevem o que cada texto vai responder,
 * então nada aqui é invenção de fato — mas nada aqui também é publicável.
 *
 * Por isso todo item carrega `status: 'exemplo'`, e a seção da home só
 * renderiza os cartões quando `showsPendingPlaceholders()` é verdadeiro.
 * Quando o CMS entrar (fase 8), este arquivo é substituído pela consulta ao
 * Sanity e o tipo `Article` continua valendo.
 */

export type ArticleCategory = 'marcas' | 'software-e-direitos-autorais' | 'patentes-e-inovacao';

export const articleCategories: Record<ArticleCategory, { label: string; href: string }> = {
  marcas: { label: 'Marcas e registro', href: '/conteudos/marcas' },
  'software-e-direitos-autorais': {
    label: 'Software e direitos autorais',
    href: '/conteudos/software-e-direitos-autorais',
  },
  'patentes-e-inovacao': {
    label: 'Patentes e inovação',
    href: '/conteudos/patentes-e-inovacao',
  },
};

export interface Article {
  slug: string;
  title: string;
  /** Resumo real: o que o artigo responde. Nunca uma frase de efeito. */
  excerpt: string;
  category: ArticleCategory;
  /** Serviço para onde o artigo conduz. Nenhum artigo é destino final. */
  relatedService: string;
  /** Minutos estimados de leitura. Só é exibido em artigo publicado. */
  readingMinutes: number;
  /** `exemplo` enquanto o texto não existe; `publicado` quando o CMS assumir. */
  status: 'exemplo' | 'publicado';
  /** Data de atualização, em ISO. Só é exibida em artigo publicado. */
  updatedAt?: string;
  /** Artigo pilar do cluster. Vai para o destaque da home. */
  isPillar?: boolean;
}

export const articles: readonly Article[] = [
  {
    slug: 'guia-registro-de-marca-no-brasil',
    title: 'Guia completo para registrar uma marca no Brasil',
    excerpt:
      'O caminho inteiro, do primeiro nome à concessão: o que a pesquisa de anterioridade revela, como a classe de produtos e serviços muda o pedido, o que acontece depois do protocolo e onde estão os pontos em que a decisão costuma ser tomada tarde demais.',
    category: 'marcas',
    relatedService: '/servicos/registro-de-marca',
    readingMinutes: 12,
    status: 'exemplo',
    isPillar: true,
  },
  {
    slug: 'como-saber-se-uma-marca-ja-existe',
    title: 'Como saber se uma marca já existe?',
    excerpt:
      'Buscar o nome no Google não responde a essa pergunta. O que responde é a pesquisa de anterioridade — e ela olha para sinais parecidos, não apenas idênticos, dentro do mesmo ramo de atividade.',
    category: 'marcas',
    relatedService: '/servicos/registro-de-marca',
    readingMinutes: 6,
    status: 'exemplo',
  },
  {
    slug: 'quem-e-dono-do-codigo-criado-por-terceiros',
    title: 'Quem é dono do código criado por funcionário ou fornecedor?',
    excerpt:
      'A resposta depende do vínculo e do que está escrito em contrato. Sem cláusula de titularidade, uma empresa pode descobrir tarde que não é dona do próprio produto.',
    category: 'software-e-direitos-autorais',
    relatedService: '/servicos/software-direitos-autorais-e-contratos',
    readingMinutes: 7,
    status: 'exemplo',
  },
  {
    slug: 'posso-divulgar-uma-invencao-antes-do-pedido-de-patente',
    title: 'Posso divulgar uma invenção antes do pedido de patente?',
    excerpt:
      'Mostrar a solução em feira, pitch ou rede social antes do depósito pode comprometer o requisito de novidade. Existe um período de graça, mas ele tem limites — e não vale do mesmo jeito em todo país.',
    category: 'patentes-e-inovacao',
    relatedService: '/servicos/patentes-e-desenho-industrial',
    readingMinutes: 5,
    status: 'exemplo',
  },
];

/** Artigo em destaque: o pilar mais recente. */
export function getFeaturedArticle(): Article | null {
  return articles.find((article) => article.isPillar) ?? articles[0] ?? null;
}

/** Os demais, na ordem em que devem aparecer na home. */
export function getRecentArticles(limit = 3): readonly Article[] {
  const featured = getFeaturedArticle();
  return articles.filter((article) => article.slug !== featured?.slug).slice(0, limit);
}
