import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

/**
 * Casca do site: cabeçalho fixo, conteúdo e rodapé.
 * O link de pular conteúdo é o primeiro elemento focável da página.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}
