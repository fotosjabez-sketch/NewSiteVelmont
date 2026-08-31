'use client';

import { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from './gsap';
import { MOUNTAIN_ALTITUDES, MOUNTAIN_STROKES } from '@/lib/brand/mountain';

/**
 * Coreografia da subida.
 *
 * O conteúdo é renderizado no servidor por `components/sections/Ascent.tsx` e
 * chega aqui como `children`. Este componente não desenha nada: ele só encontra
 * os nós pelos atributos `data-ascent-*` e liga a timeline. Se o JavaScript
 * falhar, a seção continua exatamente como veio do servidor.
 *
 * DECISÕES
 *
 * 1. O palco é fixado por `position: sticky`, não por `pin` do ScrollTrigger.
 *    O `pin` insere um pin-spacer e remede a página; sticky é do navegador,
 *    não desloca nada, sobrevive a refresh no meio da página e já dá de graça
 *    o fallback estático. O ScrollTrigger fica só com o que ele faz de melhor:
 *    amarrar o progresso da timeline ao scroll.
 *
 * 2. `scrub: 0.6` em vez de `true`. O atraso curto absorve o scroll rápido sem
 *    soltar a linha da barra de rolagem.
 *
 * 3. As altitudes dos beats vêm de `MOUNTAIN_ALTITUDES` — o mesmo número que
 *    posiciona o recorte estático e a legenda "altitude 38%". Texto, desenho e
 *    rótulo não têm como sair de sincronia porque são a mesma constante.
 *
 * 4. Só `transform`, `opacity` e `strokeDashoffset` são animados. O
 *    dashoffset é a exceção deliberada: é ele que desenha a montanha, que é o
 *    ponto da seção.
 *
 * 5. `invalidateOnRefresh` recalcula start/end no redimensionamento, e um
 *    `refresh()` depois de `document.fonts.ready` corrige a altura medida antes
 *    de a Newsreader entrar.
 */

const BEAT_STOPS = [
  MOUNTAIN_ALTITUDES.ideia,
  MOUNTAIN_ALTITUDES.valor,
  MOUNTAIN_ALTITUDES.exposicao,
  MOUNTAIN_ALTITUDES.patrimonio,
] as const;

/** Quanto antes da própria altitude a troca de beat começa. */
const LEAD_IN = 0.13;
/** Duração da saída do beat anterior. */
const FADE_OUT = 0.05;
/** Duração da entrada do beat seguinte. */
const FADE_IN = 0.055;

const ridge = MOUNTAIN_STROKES[0];

function readHeaderHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  return Number.parseFloat(raw) || 0;
}

export function AscentChoreography({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ridge) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        stage: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        wide: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        flow: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { stage, wide, flow } = context.conditions as {
          stage: boolean;
          wide: boolean;
          flow: boolean;
        };

        /* --------------------------------------------------------------
         * Palco fixado — tablet e desktop
         * ------------------------------------------------------------ */
        if (stage) {
          const section = root.querySelector<HTMLElement>('[data-ascent-section]');
          const stageEl = root.querySelector<HTMLElement>('[data-ascent-stage]');
          const beats = gsap.utils.toArray<HTMLElement>('[data-ascent-beat]', root);
          const ridgePath = root.querySelector<SVGPathElement>('[data-ascent-stroke="ridge"]');
          const structure = gsap.utils.toArray<SVGPathElement>(
            '[data-ascent-stroke="foreground-left"], [data-ascent-stroke="foreground-right"]',
            root,
          );
          const contours = gsap.utils.toArray<SVGLineElement>('[data-ascent-contour]', root);
          const readout = root.querySelector<HTMLElement>('[data-ascent-progress-value]');
          if (!section || !stageEl || !ridgePath || beats.length === 0) return;

          // O traço nasce apagado e é revelado pelo dashoffset.
          gsap.set(ridgePath, { strokeDasharray: ridge.length, strokeDashoffset: ridge.length });
          structure.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });
          gsap.set(contours, { opacity: 0, scaleX: 0.6, transformOrigin: 'left center' });

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              // O gatilho é o palco, não a seção: assim o progresso 0 cai
              // exatamente no instante em que o palco gruda no cabeçalho, e
              // não antes, enquanto a introdução ainda rola.
              trigger: stageEl,
              start: () => `top top+=${readHeaderHeight()}`,
              endTrigger: section,
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!readout) return;
                const next = `${Math.round(self.progress * 100)}%`;
                if (readout.textContent !== next) readout.textContent = next;
              },
            },
          });

          // O cume é desenhado do começo ao fim do percurso: duração 1, para
          // que a posição na timeline seja lida direto como fração do scroll.
          timeline.to(ridgePath, { strokeDashoffset: 0, duration: 1 }, 0);

          // A troca é sequencial, não um cruzamento: o beat que sai termina de
          // sumir antes de o próximo começar a entrar. Empilhados na mesma
          // célula do grid, dois textos a meio caminho se sobreporiam e ambos
          // ficariam ilegíveis.
          const handoverOf = (index: number) => Math.max((BEAT_STOPS[index] ?? 1) - LEAD_IN, 0.01);

          // Os dois picos da frente só aparecem no último beat: são a estrutura
          // que a proteção acrescenta, não enfeite que estava lá desde sempre.
          //
          // Nenhum filho pode terminar depois de 1. A duração total da timeline
          // é a do filho mais longo, e é ela que o scrub mapeia sobre o scroll:
          // um tween que passasse de 1 esticaria a timeline e faria o desenho
          // correr à frente das altitudes dos beats — que é justamente a
          // sincronia que esta seção existe para mostrar.
          const structureStart = handoverOf(3) + FADE_OUT;
          const structureStep = (1 - structureStart) / Math.max(structure.length, 1);
          structure.forEach((path, index) => {
            timeline.to(
              path,
              { strokeDashoffset: 0, duration: structureStep, ease: 'power1.out' },
              structureStart + index * structureStep,
            );
          });

          beats.forEach((beat, index) => {
            const nextStop = BEAT_STOPS[index + 1];

            // O primeiro beat já nasce visível pelo CSS: refazer isso aqui com
            // um fromTo o apagaria no progresso 0, que é justamente onde o
            // leitor chega.
            // A entrada começa pouco antes de a saída terminar. A sobreposição
            // é curta e acontece com os dois textos abaixo de 30% de opacidade,
            // então não vira texto duplo — mas fecha o vão em que a coluna
            // ficava vazia por um instante.
            const appearsAt = index === 0 ? 0 : handoverOf(index) + FADE_OUT * 0.7;

            if (index > 0) {
              timeline.fromTo(
                beat,
                { opacity: 0, yPercent: wide ? 6 : 3 },
                { opacity: 1, yPercent: 0, duration: FADE_IN, ease: 'power2.out' },
                appearsAt,
              );
            }

            const contour = contours[index];
            if (contour) {
              timeline.to(
                contour,
                { opacity: 1, scaleX: 1, duration: 0.12, ease: 'power2.out' },
                appearsAt,
              );
            }

            // O último beat não sai: ele fecha a sequência.
            if (nextStop === undefined) return;
            timeline.to(
              beat,
              { opacity: 0, yPercent: wide ? -6 : -3, duration: FADE_OUT, ease: 'power2.in' },
              handoverOf(index + 1),
            );
          });
        }

        /* --------------------------------------------------------------
         * Fluxo vertical — mobile
         * Sem palco fixado e sem scrub: cada bloco desenha o seu trecho uma
         * única vez ao entrar. Leitura natural, nada preso na tela.
         * ------------------------------------------------------------ */
        if (flow) {
          const beats = gsap.utils.toArray<HTMLElement>('[data-ascent-beat]', root);

          beats.forEach((beat) => {
            const path = beat.querySelector<SVGPathElement>('[data-ascent-beat-draw]');
            if (!path) return;

            const progress = Number.parseFloat(beat.dataset.ascentAltitude ?? '0');

            // Só o traço é animado. O texto nunca é escondido para depois ser
            // revelado: se o gatilho não disparar — aba em segundo plano, erro
            // no meio do caminho — o leitor ficaria sem o conteúdo. No mobile a
            // leitura vem primeiro.
            gsap.fromTo(
              path,
              { strokeDasharray: ridge.length, strokeDashoffset: ridge.length },
              {
                strokeDashoffset: ridge.length * (1 - progress),
                duration: 0.9,
                ease: 'power1.inOut',
                scrollTrigger: { trigger: beat, start: 'top 82%', once: true },
              },
            );
          });
        }
      },
    );

    // As métricas de texto mudam quando a Newsreader entra; sem este refresh a
    // seção fica medida com a fonte de fallback.
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      // Desfaz tweens, ScrollTriggers e todo estilo inline que o GSAP escreveu.
      mm.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
