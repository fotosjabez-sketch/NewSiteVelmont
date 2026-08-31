import { Hero } from '@/components/sections/Hero';
import { Ascent } from '@/components/sections/Ascent';
import { Diagnostic } from '@/components/sections/Diagnostic';
import { Territories } from '@/components/sections/Territories';
import { Method } from '@/components/sections/Method';
import { Evidence } from '@/components/sections/Evidence';
import { Founders } from '@/components/sections/Founders';
import { Testimonials } from '@/components/sections/Testimonials';
import { Journal } from '@/components/sections/Journal';
import { FinalConversion } from '@/components/sections/FinalConversion';

/**
 * Home.
 *
 * O ritmo segue os capítulos do blueprint em vez de alternar claro e escuro
 * mecanicamente: impacto em vinho, narrativa em marfim, diagnóstico em papel,
 * território em vinho, método em marfim, prova em papel, fundadoras em tinta,
 * depoimentos em areia, conteúdos em marfim e fechamento em vinho.
 *
 * Fase 2: tudo estático. Nenhum ScrollTrigger, nenhum smooth scroll. As seções
 * já estão na ordem de leitura final, então a fase de motion anima o que
 * existe em vez de reorganizar o DOM.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ascent />
      <Diagnostic />
      <Territories />
      <Method />
      <Evidence />
      <Founders />
      <Testimonials />
      <Journal />
      <FinalConversion />
    </>
  );
}
