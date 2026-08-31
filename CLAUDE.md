# Velmont Website — Project Rules

Read `/docs/velmont-blueprint.md` before changing UI, copy, content models or animations.

## Product goal

Create a premium, clear and transparent website for Velmont that turns complex
intellectual-property services into an understandable journey and converts
visitors into strategic-analysis requests.

## Non-negotiable creative direction

- The main concept is: "O que você constrói merece continuar sendo seu."
- The mountain from the official logo is the narrative system, not decoration.
  Its geometry lives in `lib/brand/mountain.ts`; render it with
  `components/ui/MountainMark.tsx`. Never redraw it by hand elsewhere.
- Use the official SVG; never trace a low-resolution PNG when a vector is
  available. The current paths are a measured reconstruction because no vector
  file exists yet — see `public/brand/README.md`. Replace them the day the
  official SVG arrives.
- Avoid generic legal imagery and generic AI-site patterns.
- Do not use glassmorphism, neon gradients, excessive rounded cards or random
  icon grids. Corners stay between 0 and 10px — never pills.
- Motion must explain hierarchy, progress or relationship. If it does none of
  the three, remove it.
- Keep navigation and conversion obvious.

## Content integrity

- Never invent metrics, client names, testimonials, credentials, deadlines or
  legal outcomes.
- Unconfirmed facts live in `lib/content/institutional.ts`, typed as
  `pending(...)`. Components render `resolve(...)` and simply omit the block
  when a value is still pending — a placeholder never reaches the HTML.
- `npm run check:launch` fails while any launch-blocking value is pending. Run
  it before any production deploy.
- Sections that need data the Velmont has not supplied use the review gate in
  `lib/content/preview.ts`. `showsPendingPlaceholders()` is true in development
  and in builds carrying `NEXT_PUBLIC_SHOW_PENDING=1`; everywhere else the
  placeholder — and, when nothing confirmed is left, the whole section — is not
  rendered. Any new placeholder, dev note or example content must go through
  that gate. Verify with a plain `npm run build` and grep the HTML.
- Do not promise registration, approval or grant. Distinguish protocol,
  analysis, follow-up and grant.
- Never state a universal deadline: it depends on the órgão, the class and the
  case.
- Explain legal and technical terms in plain Portuguese, at first use.

## Engineering

- TypeScript strict mode, with `noUncheckedIndexedAccess` and
  `exactOptionalPropertyTypes` on.
- Prefer server components; create client components only where interaction
  requires them.
- Keep animation code isolated in `/components/motion`.
- Respect `prefers-reduced-motion` in both CSS and JavaScript.
- Build mobile behavior intentionally; do not merely scale desktop.
- No horizontal overflow at 320px. Long unbroken strings (e-mail, URLs) need
  `break-words` and their grid/flex parent needs `min-w-0`.
- Never write a raw colour, size, spacing or duration in a component. Every
  value comes from `styles/tokens.css`.
- Colour comes from the surface contract (`data-surface` + `--surface-*`), so
  the same component keeps AA contrast on any background.
- Run `npm run check` (lint + typecheck + build) after meaningful changes.
- Preserve semantic HTML, keyboard operation and visible focus.

## Workflow

- Before implementation, inspect existing files and state a concise plan.
- Make one coherent phase at a time.
- Do not redesign unrelated sections without explicit instruction.
- At the end, report files changed, validation results, assumptions and
  remaining placeholders.

## Commands

| Command                 | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Development server                                  |
| `npm run check`         | lint + typecheck + production build                 |
| `npm run check:content` | Lists pending institutional data                    |
| `npm run check:launch`  | Same, but exits non-zero if something blocks launch |
| `npm run format`        | Prettier                                            |
