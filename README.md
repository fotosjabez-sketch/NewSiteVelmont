# Velmont — site

Site institucional da Velmont (marcas e patentes). Next.js App Router,
TypeScript estrito, Tailwind v4 com tokens próprios.

## Começar

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` se precisar sobrescrever a URL do site
ou o número do WhatsApp.

## Comandos

| Comando                 | O que faz                                      |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento                    |
| `npm run build`         | Build de produção                              |
| `npm run check`         | lint + typecheck + build                       |
| `npm run check:content` | Lista os dados institucionais ainda pendentes  |
| `npm run check:launch`  | Igual, mas falha se algo bloqueia o lançamento |
| `npm run format`        | Prettier                                       |

## Onde as coisas estão

| Caminho                        | O que é                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| `styles/tokens.css`            | Fonte da verdade de cor, tipografia, ritmo, forma e movimento   |
| `lib/content/institutional.ts` | Dados institucionais, cada um confirmado ou pendente            |
| `lib/brand/mountain.ts`        | Geometria do símbolo da montanha                                |
| `lib/whatsapp.ts`              | Montagem do link `wa.me` com a mensagem preenchida              |
| `components/ui/`               | Componentes base próprios                                       |
| `/style-guide`                 | Sistema visual renderizado (fora do índice de busca)            |
| `docs/velmont-blueprint.md`    | Blueprint completo — ler antes de mexer em UI, copy ou animação |
| `docs/content-inventory.md`    | O que já está confirmado e o que falta                          |
| `docs/qa-checklist.md`         | Checklist de QA por fase                                        |
| `CLAUDE.md`                    | Regras permanentes do projeto                                   |

## Regra que não se negocia

Nenhum número, depoimento, credencial ou prazo é inventado. Dado não
confirmado fica tipado como `pending(...)` e simplesmente não é renderizado.
`npm run check:launch` trava a publicação enquanto houver pendência
bloqueante.
