# Ativos de marca — Velmont

## Origem dos arquivos desta pasta

Todos os arquivos aqui foram **derivados da apresentação institucional oficial**
(`Apresentação Velmont 2026`), único material de marca disponível até o momento.
Nenhum arquivo vetorial original (`.ai`, `.svg`, `.eps`) foi fornecido ainda.

| Arquivo | O que é | Status |
|---|---|---|
| `velmont-lockup-sand.png` | Lockup completo (montanha + VELMONT + MARCAS E PATENTES), areia `#E9D4B3` | derivado, 506×258 |
| `velmont-lockup-ivory.png` | Mesmo lockup em marfim `#F7F2E8`, para fundos vinho | derivado |
| `velmont-lockup-wine.png` | Mesmo lockup em vinho `#2D0414`, para fundos claros | derivado |
| `velmont-mountain.svg` | Contorno da montanha reconstruído como vetor | **reconstrução**, ver abaixo |

### Como o lockup foi gerado

A apresentação traz o lockup como bitmap 800×800 com fundo preto e o desenho em
creme. A luminância desse bitmap é uma matte de alfa limpa (o desenho é
monocromático), então o alfa foi extraído da luminância e o RGB substituído pela
cor de cada variante. O resultado é um PNG com transparência real e bordas
antisserrilhadas, tingível sem halo escuro.

### Como a montanha foi reconstruída

`velmont-mountain.svg` **não é um traçado automático de PNG**. A geometria foi
medida diretamente na máscara de pixels do lockup oficial: o eixo central de cada
traço foi extraído coluna a coluna, os três traços foram separados e ajustados por
otimização de sobreposição contra a máscara original (IoU 0.65 com a espessura
oficial de traço, limitada apenas pela largura do traço e pelo antisserrilhamento
do bitmap de origem — os eixos coincidem).

A montanha tem **três traços independentes**, e essa separação é o que permite
animá-los em sequência:

1. `M0 96 L80 33 L99 42` — pico menor à frente, à esquerda
2. `M42 89 L146 0 L196 41` — cume principal (o traço longo da narrativa)
3. `M142 91 L206 33 L270 90` — pico menor à frente, à direita

`viewBox="0 0 270 96"`, proporção 2.8125:1. A espessura oficial no lockup
equivale a `stroke-width="9"` nesse sistema de coordenadas; a versão de linha fina
usada na narrativa do site usa espessuras menores, definidas em
`lib/brand/mountain.ts`.

## Pendências de ativos

Estes itens ainda **não** foram recebidos e são bloqueantes para o lançamento:

- [ ] Logo oficial em **SVG**, positivo e negativo (substitui os PNGs acima)
- [ ] Símbolo da montanha isolado em SVG oficial (valida a reconstrução)
- [ ] Manual de marca completo (confirma códigos de cor e tipografia oficiais)
- [ ] Retrato vertical 4:5 de Danielle Cubas de Azevedo
- [ ] Retrato vertical 4:5 de Lisandra Ferreira dos Santos
- [ ] Foto horizontal 3:2 das duas fundadoras
- [ ] 3 a 6 fotografias de detalhe reais (atendimento/ambiente)
- [ ] Logos de clientes e parceiros autorizados, em SVG ou PNG transparente
- [ ] Depoimentos com nome, empresa e autorização por escrito

Ver `docs/content-inventory.md` para o inventário completo de conteúdo pendente.
