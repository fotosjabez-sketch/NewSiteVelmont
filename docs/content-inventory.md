# Inventário de conteúdo — Velmont

Última atualização: 31 de agosto de 2026 (fase 1).

Este arquivo é a lista única do que já está confirmado e do que ainda falta.
A fonte técnica correspondente é `lib/content/institutional.ts`; rode
`npm run check:content` para ver as pendências direto do código.

---

## 1. Confirmado

Tudo abaixo veio da apresentação institucional oficial "Velmont 2026" e já
está tipado no projeto com a página de origem registrada.

### Contato

| Dado                  | Valor                                                                                | Origem |
| --------------------- | ------------------------------------------------------------------------------------ | ------ |
| Telefone / WhatsApp   | (41) 98508-4026                                                                      | p. 11  |
| E-mail                | contato@grupovelmont.com                                                             | p. 11  |
| Instagram             | @velmontmarcas                                                                       | p. 11  |
| Endereço              | Avenida Iguaçu, 2820 — Edifício Corporativo, Água Verde, Curitiba/PR, CEP 80.240-030 | p. 11  |
| Modelo de atendimento | Presencial ou digital, com acompanhamento individualizado                            | p. 11  |

### Institucional

| Dado                                                                                                        | Origem |
| ----------------------------------------------------------------------------------------------------------- | ------ |
| Origem da empresa ("nasceu do inconformismo…")                                                              | p. 2   |
| Missão                                                                                                      | p. 2   |
| Visão                                                                                                       | p. 2   |
| Assinaturas existentes: "Protegendo ideias, estruturando negócios." e "Trusted strategies, proven results." | p. 1   |

### Fundadoras

| Dado                                                             | Origem |
| ---------------------------------------------------------------- | ------ |
| Danielle Cubas de Azevedo — Founder & CEO, formação e trajetória | p. 3   |
| Lisandra Ferreira dos Santos — Founder & CEO, formação e atuação | p. 4   |

### Serviços

A apresentação descreve quatro territórios (p. 5 a 8): estruturação de
empresas, propriedade industrial, propriedade intelectual, naming e identidade
visual. O blueprint reorganiza isso em três territórios comerciais
prioritários mais duas capacidades complementares — a reorganização é
editorial e não inventa serviço nenhum.

### Marca

| Ativo                                           | Situação                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Lockup (montanha + VELMONT + MARCAS E PATENTES) | disponível apenas como bitmap; derivado para PNG com alfa em `public/brand/` |
| Cor vinho `#2D0414`                             | medida na apresentação                                                       |
| Cor areia `#E9D4B3`                             | medida na apresentação                                                       |
| Geometria da montanha                           | reconstruída e verificada — `public/brand/README.md`                         |

---

## 2. Pendente — bloqueia o lançamento

### Números da seção "Autoridade se demonstra"

| Item                               | Responsável | Observação                                                                                                                                                                                             |
| ---------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Anos de experiência (número único) | Danielle    | A apresentação diz "mais de 10 anos" no institucional (p. 2) e "mais de 11 anos" na trajetória da Danielle (p. 3). Precisa de um número só, e da definição de quem ele descreve: a empresa ou a sócia. |
| Total de processos conduzidos      | Danielle    | Precisa ser verificável.                                                                                                                                                                               |
| Índice de satisfação               | Danielle    | Precisa do valor **e** de como é medido (base, período, instrumento).                                                                                                                                  |

Enquanto os três estiverem pendentes, a seção inteira não é renderizada.

### Depoimentos

| Item                                                              | Responsável |
| ----------------------------------------------------------------- | ----------- |
| Depoimentos completos com nome, empresa e autorização por escrito | Velmont     |

A apresentação (p. 10) traz prints de conversas reais, sem identificação e sem
autorização. Nada disso pode ir ao site como está.

### Logos de clientes e parceiros

| Item                                                                  | Responsável |
| --------------------------------------------------------------------- | ----------- |
| Logos autorizados, em SVG ou PNG transparente, com autorização de uso | Velmont     |

A apresentação (p. 9) mostra logos em bitmap, sem lista de autorizações.

### Fundadoras — home

| Item                                        | Responsável |
| ------------------------------------------- | ----------- |
| Frase pessoal da Danielle, aprovada por ela | Danielle    |
| Frase pessoal da Lisandra, aprovada por ela | Lisandra    |
| Retrato vertical 4:5 da Danielle            | Velmont     |
| Retrato vertical 4:5 da Lisandra            | Velmont     |

O blueprint sugere duas frases; as duas precisam de aprovação antes de
publicar. As frases derivadas do texto da apresentação seriam paráfrases — por
isso ficam pendentes, não pré-preenchidas.

### Jurídico e rodapé

| Item                                                     | Responsável |
| -------------------------------------------------------- | ----------- |
| Razão social e CNPJ (rodapé e JSON-LD de `Organization`) | Danielle    |
| Texto final da política de privacidade                   | Velmont     |

---

## 3. Pendente — ativos de imagem

| Item                                                                  | Formato | Responsável |
| --------------------------------------------------------------------- | ------- | ----------- |
| Logo oficial em vetor, positivo e negativo                            | SVG     | Velmont     |
| Símbolo da montanha isolado                                           | SVG     | Velmont     |
| Manual de marca completo                                              | PDF     | Velmont     |
| Foto horizontal das duas fundadoras                                   | 3:2     | Velmont     |
| 3 a 6 fotografias de detalhe reais (atendimento, ambiente, materiais) | —       | Velmont     |

Direção dos retratos e o que evitar: ver blueprint, seção 14.

---

## 4. Decisões de conteúdo ainda em aberto

| Questão                                                                | Quem decide      |
| ---------------------------------------------------------------------- | ---------------- |
| A sans de interface continua Geist, ou o manual de marca define outra? | Velmont + manual |
| "Velmont Explica" será usado como assinatura editorial do blog?        | Velmont          |
| O endereço entra no rodapé de todas as páginas?                        | Velmont          |
| Ferramenta de analytics (GA4, Plausible ou outra)                      | Velmont          |
