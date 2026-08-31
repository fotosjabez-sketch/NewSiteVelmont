import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Registro único do ScrollTrigger.
 *
 * `registerPlugin` é idempotente, mas concentrar aqui evita que cada
 * componente de motion precise lembrar de chamá-lo — e deixa um lugar só para
 * ajustar configuração global.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // A barra de endereço do mobile muda a altura da viewport ao rolar. Sem isto,
  // cada aparição dela dispara um refresh e a timeline salta.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
