# QA — Velmont

Rodar antes de fechar cada fase. O que já é automatizado está marcado com o
comando; o resto é verificação manual.

---

## Automatizado

| Verificação                    | Comando                 | Status na fase 1                            |
| ------------------------------ | ----------------------- | ------------------------------------------- |
| Lint                           | `npm run lint`          | ✓ limpo                                     |
| Tipos (strict)                 | `npm run typecheck`     | ✓ limpo                                     |
| Build de produção              | `npm run build`         | ✓ 5 rotas estáticas                         |
| Formatação                     | `npm run format:check`  | ✓                                           |
| Dados institucionais pendentes | `npm run check:content` | 10 pendências listadas                      |
| Trava de publicação            | `npm run check:launch`  | ✗ bloqueia — esperado até os dados chegarem |

Tudo de uma vez: `npm run check`.

---

## Responsividade

- [x] Sem scroll lateral em 320px (`document.scrollWidth === clientWidth`)
- [x] Sem scroll lateral em 390px
- [x] Sem scroll lateral em 1440px
- [ ] Conferir em 768px e 1024px quando houver seções com pin
- [x] Strings longas sem espaço (e-mail) quebram em vez de esticar a coluna

Como verificar rápido, com o servidor rodando:

```js
// no console do navegador
document.documentElement.scrollWidth - document.documentElement.clientWidth; // deve ser 0
```

---

## Acessibilidade

- [x] `h1` único por página
- [x] Hierarquia de títulos sem pular nível
- [x] Link "pular para o conteúdo" como primeiro elemento focável
- [x] Foco visível em todas as superfícies (a cor vem de `--surface-ring`)
- [x] Alvo de toque mínimo de 44px nos botões e no toggle do menu
- [x] Menu mobile: `aria-expanded`, `aria-controls`, Escape fecha, foco volta
      ao botão, scroll de fundo travado
- [x] Menu mobile fora do DOM quando fechado — nada invisível recebe Tab
- [x] `prefers-reduced-motion` respeitado no CSS global
- [x] Cor nunca é o único indicador (links têm sublinhado real)
- [x] Contraste AA verificado, por cálculo, em todos os pares em uso:

| Par                                    |           Razão | Uso                                     |
| -------------------------------------- | --------------: | --------------------------------------- |
| areia `#E9D4B3` sobre vinho `#2D0414`  |         12.76:1 | texto principal em superfície vinho     |
| areia-600 `#C9B394` sobre vinho        |          9.09:1 | texto secundário em vinho               |
| areia sobre tinta `#1A0209`            |         13.76:1 | texto principal no rodapé               |
| areia-600 sobre tinta                  |          9.80:1 | texto secundário no rodapé              |
| tinta `#1E1116` sobre marfim `#F7F2E8` |         16.41:1 | texto principal em fundo claro          |
| tinta sobre papel `#FFFDF8`            |         18.01:1 | texto de leitura                        |
| argila-tinta `#6E524B` sobre marfim    |          6.33:1 | texto secundário em fundo claro         |
| `#1A0209` sobre areia                  |         13.76:1 | texto na superfície areia               |
| `#503935` sobre areia                  |          7.35:1 | texto secundário na superfície areia    |
| botão sólido, todas as superfícies     | 12.76 a 18.01:1 | `--surface-accent` sobre `--surface-bg` |
| argila `#8B6C63` sobre marfim          |          4.26:1 | **só borda e decoração — nunca texto**  |

- [ ] Auditoria axe automatizada (entra junto com o Playwright, fase de QA)
- [ ] Navegação por leitor de tela nas seções com pin (fase de motion)

---

## Conteúdo

- [x] Nenhum número inventado no HTML
- [x] Nenhum depoimento sem autorização
- [x] Nenhum placeholder publicado — valores pendentes não renderizam
- [x] Aviso no rodapé: conteúdo informativo não substitui análise específica
- [x] Nenhuma promessa de deferimento ou prazo universal
- [ ] Revisão de copy pelas fundadoras

---

## SEO

- [x] `title` e `description` únicos por página
- [x] Canonical em todas as páginas indexáveis
- [x] `robots.txt` explícito, com `/style-guide` e `/studio` fora do índice
- [x] `sitemap.xml` gerado — só com rotas que existem
- [x] `/style-guide` com `noindex`
- [ ] JSON-LD de `Organization` — depende da razão social e do CNPJ
- [ ] Open Graph com imagem — depende do ativo social
- [ ] Search Console configurado no lançamento

---

## Performance

- [x] Fontes locais via `next/font`, sem requisição a terceiros
- [x] `adjustFontFallback` configurado — sem layout shift na troca de fonte
- [x] Imagens com dimensões declaradas
- [x] `next/image` servindo o tamanho certo (256px para o lockup de 132px)
- [ ] Lighthouse mobile e desktop (rodar quando a home estiver completa)
- [ ] Verificar timelines de scroll após carregamento de fontes e imagens
      (fase de motion)

---

## Sem JavaScript

- [x] Conteúdo essencial visível sem JS (hero, rodapé, navegação do rodapé)
- [ ] Formulário de análise precisa de alternativa sem JS (fase do formulário)
