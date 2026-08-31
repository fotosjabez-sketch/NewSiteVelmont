import Link from 'next/link';

import { articleCategories, type Article } from '@/lib/content';
import { cn } from '@/lib/cn';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export interface ArticleCardProps {
  article: Article;
  /** `featured` é o artigo pilar em destaque. */
  variant?: 'featured' | 'compact';
}

/**
 * Cartão de conteúdo.
 *
 * Mostra data e tempo de leitura apenas em artigo publicado. Enquanto o texto
 * é exemplo, o cartão diz "conteúdo de exemplo" no lugar — inventar uma data
 * de atualização seria inventar um fato.
 */
export function ArticleCard({ article, variant = 'compact' }: ArticleCardProps) {
  const category = articleCategories[article.category];
  const isFeatured = variant === 'featured';
  const isPublished = article.status === 'publicado';

  return (
    <article
      className={cn(
        'group flex min-w-0 flex-col gap-(--space-sm) border-t border-(--surface-rule) pt-(--space-md)',
        isFeatured && 'md:gap-(--space-md)',
      )}
    >
      <p className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
        {category.label}
      </p>

      <h3
        className={cn(
          'font-serif leading-(--leading-snug) text-balance',
          isFeatured
            ? 'text-(length:--text-xl) leading-(--leading-tight)'
            : 'text-(length:--text-lg)',
        )}
      >
        <Link
          href={`/conteudos/${article.slug}`}
          className="underline-offset-[0.3em] transition-colors duration-(--duration-fast) group-hover:underline group-hover:decoration-1"
        >
          {article.title}
        </Link>
      </h3>

      <p
        className={cn(
          'font-sans text-(--surface-muted)',
          isFeatured ? 'max-w-(--measure) text-(length:--text-base)' : 'text-(length:--text-sm)',
        )}
      >
        {article.excerpt}
      </p>

      <p className="mt-auto pt-2 font-sans text-(length:--text-xs) text-(--surface-muted)">
        {isPublished && article.updatedAt ? (
          <>
            <span>Atualizado em {dateFormatter.format(new Date(article.updatedAt))}</span>
            <span aria-hidden="true"> · </span>
            <span>{article.readingMinutes} min de leitura</span>
          </>
        ) : (
          <span className="border border-dashed border-(--surface-fg)/40 px-2 py-0.5 tracking-(--tracking-eyebrow) uppercase">
            conteúdo de exemplo — não publicável
          </span>
        )}
      </p>
    </article>
  );
}
