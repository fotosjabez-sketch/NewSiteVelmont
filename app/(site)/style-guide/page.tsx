import type { Metadata } from 'next';

import { Button, ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Logo } from '@/components/ui/Logo';
import { MountainMark } from '@/components/ui/MountainMark';
import { Prose } from '@/components/ui/Prose';
import { Section, type Surface } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { MOUNTAIN_STROKES, MOUNTAIN_WEIGHT } from '@/lib/brand/mountain';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Style guide',
  description: 'Sistema visual da Velmont: cor, tipografia, grid, componentes e estados.',
  path: '/style-guide',
  noIndex: true,
});

/* ------------------------------------------------------------------------ */

const palette: {
  token: string;
  hex: string;
  role: string;
  status: 'oficial' | 'derivado';
}[] = [
  {
    token: '--color-wine',
    hex: '#2D0414',
    role: 'Fundos de impacto, header, CTA',
    status: 'oficial',
  },
  { token: '--color-wine-950', hex: '#1A0209', role: 'Fechamentos e rodapé', status: 'derivado' },
  { token: '--color-ember', hex: '#632523', role: 'Acento secundário', status: 'derivado' },
  {
    token: '--color-sand',
    hex: '#E9D4B3',
    role: 'Texto sobre vinho, áreas editoriais',
    status: 'oficial',
  },
  {
    token: '--color-sand-600',
    hex: '#C9B394',
    role: 'Texto secundário sobre vinho',
    status: 'derivado',
  },
  { token: '--color-ivory', hex: '#F7F2E8', role: 'Fundo principal claro', status: 'derivado' },
  { token: '--color-paper', hex: '#FFFDF8', role: 'Superfícies de leitura', status: 'derivado' },
  { token: '--color-ink', hex: '#1E1116', role: 'Texto em fundos claros', status: 'derivado' },
  {
    token: '--color-clay',
    hex: '#8B6C63',
    role: 'Bordas e elementos decorativos',
    status: 'derivado',
  },
  {
    token: '--color-clay-ink',
    hex: '#6E524B',
    role: 'Texto secundário em fundo claro',
    status: 'derivado',
  },
];

const typeScale = [
  { token: '--text-display', label: 'Display', sample: 'Da ideia ao patrimônio' },
  { token: '--text-2xl', label: '2XL — título de hero', sample: 'O que você constrói' },
  { token: '--text-xl', label: 'XL — título de seção', sample: 'Autoridade se demonstra' },
  {
    token: '--text-lg',
    label: 'LG — texto de apoio',
    sample: 'Nem todo ativo se protege do mesmo jeito.',
  },
  {
    token: '--text-base',
    label: 'Base — corpo',
    sample: 'A análise começa entendendo o que você criou.',
  },
  { token: '--text-sm', label: 'SM — interface', sample: 'Solicitar análise estratégica' },
  { token: '--text-xs', label: 'XS — eyebrow e legenda', sample: 'Proteção estratégica' },
];

const surfaces: { name: Surface; label: string; note: string }[] = [
  { name: 'paper', label: 'Papel', note: 'Superfície de leitura. Provas e artigos.' },
  { name: 'ivory', label: 'Marfim', note: 'Fundo claro padrão. Narrativa e método.' },
  { name: 'sand', label: 'Areia', note: 'Capítulo editorial quente. Territórios.' },
  { name: 'wine', label: 'Vinho', note: 'Impacto. Hero, header e conversão final.' },
  { name: 'ink', label: 'Tinta', note: 'Fechamento. Rodapé e transições profundas.' },
];

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-(length:--text-xs) text-(--surface-muted)">{children}</code>
  );
}

/* ------------------------------------------------------------------------ */

export default function StyleGuidePage() {
  return (
    <>
      <Section
        surface="wine"
        spacing="compact"
        className="pt-[calc(var(--header-height)+var(--space-xl))]"
      >
        <Eyebrow>Fase 1 — base do sistema</Eyebrow>
        <Heading level={1} size="2xl" className="mt-(--space-md) max-w-[18ch]">
          Style guide
        </Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Os tokens abaixo são a fonte da verdade do site. Nenhum componente escreve uma cor, um
            tamanho ou uma duração fora desta lista. Página fora do índice de busca.
          </p>
        </Prose>
      </Section>

      {/* -------------------------------------------------------------- Cor */}
      <Section surface="ivory" id="cor">
        <Eyebrow index="01">Cor</Eyebrow>
        <Heading className="mt-(--space-sm)">Paleta</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Vinho e areia foram medidos diretamente na apresentação institucional oficial. Os demais
            tons são derivados e aguardam confirmação no manual de marca.
          </p>
        </Prose>

        <ul className="mt-(--space-xl) grid gap-x-(--space-lg) gap-y-(--space-md) sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((color) => (
            <li key={color.token} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                style={{ backgroundColor: color.hex }}
                className="mt-1 size-14 shrink-0 rounded-(--radius-xs) ring-1 ring-(--surface-rule) ring-inset"
              />
              <span className="flex flex-col gap-0.5">
                <Ref>{color.token}</Ref>
                <span className="font-sans text-(length:--text-sm) tabular-nums">{color.hex}</span>
                <span className="font-sans text-(length:--text-xs) text-(--surface-muted)">
                  {color.role}
                </span>
                <span className="font-sans text-(length:--text-xs) text-(--surface-muted)">
                  {color.status === 'oficial'
                    ? '✓ confirmado na apresentação'
                    : '△ derivado — confirmar'}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- Superfícies */}
      <Section surface="paper" id="superficies">
        <Eyebrow index="02">Superfícies</Eyebrow>
        <Heading className="mt-(--space-sm)">Cinco tons, um contrato</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Cada superfície define fundo, texto, texto secundário, régua e cor de foco de uma vez. É
            por isso que o mesmo botão e o mesmo link funcionam em qualquer capítulo da página sem
            variante extra — e o contraste continua em AA.
          </p>
        </Prose>

        <div className="mt-(--space-xl) grid gap-(--space-md) md:grid-cols-2 xl:grid-cols-3">
          {surfaces.map((surface) => (
            <div
              key={surface.name}
              data-surface={surface.name}
              className="flex flex-col gap-4 rounded-(--radius-sm) p-(--space-md) ring-1 ring-(--surface-rule) ring-inset"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-(length:--text-lg)">{surface.label}</span>
                <Ref>data-surface=&quot;{surface.name}&quot;</Ref>
              </div>
              <p className="font-sans text-(length:--text-sm) text-(--surface-muted)">
                {surface.note}
              </p>
              <hr className="rule-hairline" />
              <div className="flex flex-wrap items-center gap-3">
                <Button size="md">Ação</Button>
                <Button variant="outline">Alternativa</Button>
                <TextLink href="/style-guide#superficies">Link</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- Tipografia */}
      <Section surface="ivory" id="tipografia">
        <Eyebrow index="03">Tipografia</Eyebrow>
        <Heading className="mt-(--space-sm)">Newsreader e Geist Sans</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Serif editorial nos títulos, manifestos, citações e corpo dos artigos. Sans na
            navegação, botões, legendas e formulários. Duas famílias, carregadas localmente com
            <Ref> next/font</Ref> — sem requisição externa e sem layout shift.
          </p>
        </Prose>

        <dl className="mt-(--space-xl) flex flex-col divide-y divide-(--surface-rule)">
          {typeScale.map((step) => (
            <div key={step.token} className="flex flex-col gap-2 py-(--space-md)">
              <dt className="flex flex-wrap items-baseline gap-3">
                <span className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
                  {step.label}
                </span>
                <Ref>var({step.token})</Ref>
              </dt>
              <dd
                style={{ fontSize: `var(${step.token})` }}
                className="font-serif leading-(--leading-tight) tracking-(--tracking-tight)"
              >
                {step.sample}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-(--space-xl) grid gap-(--space-lg) lg:grid-cols-2">
          <div>
            <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Corpo de marketing — sans, até 65ch
            </h3>
            <Prose className="mt-3">
              <p>
                A análise começa entendendo o que você criou, em que estágio está e onde o risco
                realmente existe. Cada decisão é explicada antes de ser tomada: sem processos no
                escuro, sem promessas que ninguém pode garantir.
              </p>
            </Prose>
          </div>
          <div>
            <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Corpo de artigo — serif, 60 a 70 caracteres
            </h3>
            <Prose tone="article" className="mt-3">
              <p>
                Registrar uma marca começa por uma pesquisa de anterioridade: verificar se já existe
                um sinal igual ou semelhante, na mesma classe de produtos ou serviços. É essa etapa
                que separa um pedido com chance real de um pedido feito no escuro.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- Montanha */}
      <Section surface="wine" id="montanha">
        <Eyebrow index="04">Símbolo</Eyebrow>
        <Heading className="mt-(--space-sm)">A montanha como sistema</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Três traços independentes, medidos no lockup oficial. A separação é o que permite
            desenhá-los em sequência na narrativa da home e reaproveitá-los depois como divisores,
            marcadores e indicadores de progresso.
          </p>
        </Prose>

        <div className="mt-(--space-xl) grid gap-(--space-xl) lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-(--space-lg)">
            {(Object.keys(MOUNTAIN_WEIGHT) as (keyof typeof MOUNTAIN_WEIGHT)[]).map((weight) => (
              <div key={weight} className="flex flex-col gap-3">
                <Ref>
                  weight=&quot;{weight}&quot; — {MOUNTAIN_WEIGHT[weight]} unidades do viewBox,
                  proporcional
                </Ref>
                <MountainMark weight={weight} className="w-full max-w-md text-(--surface-fg)" />
              </div>
            ))}
            <div className="flex flex-col gap-3">
              <Ref>hairline={'{1}'} — 1px de tela em qualquer tamanho</Ref>
              <MountainMark hairline={1} className="w-full max-w-md text-(--surface-fg)" />
            </div>
          </div>

          <div className="flex flex-col gap-(--space-md)">
            <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Traços e comprimentos
            </h3>
            <ul className="flex flex-col divide-y divide-(--surface-rule)">
              {MOUNTAIN_STROKES.map((stroke) => (
                <li key={stroke.id} className="flex flex-col gap-1 py-3">
                  <span className="font-sans text-(length:--text-sm)">{stroke.id}</span>
                  <Ref>{stroke.d}</Ref>
                  <span className="font-sans text-(length:--text-xs) text-(--surface-muted)">
                    comprimento {stroke.length} — usado no stroke-dashoffset
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-(--space-md) font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Lockup
            </h3>
            <div className="flex flex-wrap items-center gap-(--space-lg)">
              <Logo tone="sand" width={180} href={null} />
              <div data-surface="ivory" className="rounded-(--radius-sm) bg-(--surface-bg) p-4">
                <Logo tone="wine" width={180} href={null} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ Componentes */}
      <Section surface="paper" id="componentes">
        <Eyebrow index="05">Componentes</Eyebrow>
        <Heading className="mt-(--space-sm)">Botões, links e estados</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Cantos quase retos, nunca cápsulas. Altura mínima de 44px em qualquer tamanho. O foco é
            sempre visível e usa a cor de foco da superfície — nunca o contorno padrão do navegador
            removido sem substituto.
          </p>
        </Prose>

        <div className="mt-(--space-xl) grid gap-(--space-lg) md:grid-cols-2">
          <div className="flex flex-col gap-(--space-md)">
            <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Variantes
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="solid" size="lg">
                Solicitar análise
              </Button>
              <Button variant="outline" size="lg">
                Descobrir o que proteger
              </Button>
              <Button variant="quiet">Ver todos os conteúdos</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="solid">Tamanho md</Button>
              <Button variant="solid" disabled>
                Desabilitado
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-(--space-md)">
            <h3 className="font-sans text-(length:--text-xs) tracking-(--tracking-eyebrow) text-(--surface-muted) uppercase">
              Links
            </h3>
            <div className="flex flex-col items-start gap-3">
              <TextLink href="/servicos/registro-de-marca" withArrow>
                Proteger uma marca
              </TextLink>
              <TextLink href="/conteudos">Ver todos os conteúdos</TextLink>
              <ButtonLink href="/analise-estrategica" variant="outline">
                Link com desenho de botão
              </ButtonLink>
            </div>
            <p className="font-sans text-(length:--text-sm) text-(--surface-muted)">
              Navegue com <kbd className="font-mono">Tab</kbd> para conferir os estados de foco em
              cada superfície desta página.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Grid */}
      <Section surface="ivory" id="grid">
        <Eyebrow index="06">Grid e ritmo</Eyebrow>
        <Heading className="mt-(--space-sm)">12 colunas, margem elástica</Heading>
        <Prose className="mt-(--space-md)">
          <p>
            Largura máxima de <Ref>1400px</Ref>, margem lateral <Ref>clamp(20px, 5vw, 80px)</Ref> e
            espaçamento vertical de seção <Ref>clamp(88px, 12vw, 190px)</Ref>. Doze colunas no
            desktop, seis no tablet, quatro no mobile.
          </p>
        </Prose>

        <div
          aria-hidden="true"
          className="mt-(--space-xl) grid h-40 grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-12"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className={[
                'h-full rounded-(--radius-xs) bg-(--color-clay)/12 ring-1 ring-(--surface-rule) ring-inset',
                index >= 4 && 'hidden md:block',
                index >= 6 && 'md:hidden lg:block',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
