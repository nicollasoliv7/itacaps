import Link from "next/link";
export default function NotFound() {
  return (
    <main id="conteudo" className="information section">
      <span className="eyebrow">404 / FORA DA ROTA</span>
      <h1>
        VAMOS
        <br />
        VOLTAR?
      </h1>
      <p>Esta página não foi encontrada.</p>
      <Link href="/" className="button button-light">
        EXPLORAR A ITACAPS ↗
      </Link>
    </main>
  );
}
