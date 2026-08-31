import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { ButtonLink } from '@/components/ui/Button';
import { ArticleCard } from '@/components/blog/ArticleCard';
import {
  articleCategories,
  getFeaturedArticle,
  getRecentArticles,
  showsPendingPlaceholders,
} from '@/lib/content';
import { TextLink } from '@/components/ui/TextLink';

/**
 * Conteúdos — "Entender vem antes de proteger."
 *
 * Os artigos ainda não existem. Os títulos vêm do plano editorial do blueprint
 * e os resumos descrevem o que cada texto vai responder, mas todos estão
 * marcados como exemplo: em produção sem NEXT_PUBLIC_SHOW_PENDING=1 os cartões
 * não são renderizados, só o convite para a área de conteúdos.
 */
export function Journal() {
  const featured = getFeaturedArticle();
  const recent = getRecentArticles(3);
  const showExamples = showsPendingPlaceholders();

  return (
    <section data-surface="ivory" id="conteudos" className="py-(--section-y)">
      <Container>
        <div className="grid gap-(--space-lg) lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Conteúdo para decidir melhor
            </p>
            <Heading level={2} size="xl" className="mt-(--space-md) max-w-[18ch]">
              Entender vem antes de proteger.
            </Heading>
          </div>
          <p className="max-w-(--measure) font-sans text-(length:--text-lg) leading-(--leading-snug) text-(--surface-muted) lg:col-span-5 lg:col-start-8 lg:self-end">
            Respostas claras para quem quer proteger marca, criação ou inovação com critério — não
            com medo.
          </p>
        </div>

        {/* Filtros pelas três categorias prioritárias. */}
        <nav aria-label="Categorias de conteúdo" className="mt-(--space-xl)">
          <ul className="flex flex-wrap gap-x-(--space-lg) gap-y-3">
            {Object.entries(articleCategories).map(([key, category]) => (
              <li key={key}>
                <TextLink href={category.href} className="text-(length:--text-sm)">
                  {category.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        {showExamples && featured ? (
          <div className="mt-(--space-xl) grid items-start gap-(--space-xl) lg:grid-cols-12">
            {/* Destaque e CTA dividem a coluna da esquerda: sem essa âncora, o
                pilar curto deixaria meia coluna vazia ao lado da pilha. */}
            <div className="flex flex-col gap-(--space-lg) lg:col-span-5">
              <ArticleCard article={featured} variant="featured" />
              <ButtonLink href="/conteudos" variant="outline" className="self-start">
                Ver todos os conteúdos
              </ButtonLink>
            </div>
            <div className="grid gap-(--space-lg) sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1">
              {recent.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : (
          <ButtonLink href="/conteudos" variant="outline" className="mt-(--space-xl)">
            Ver todos os conteúdos
          </ButtonLink>
        )}
      </Container>
    </section>
  );
}
