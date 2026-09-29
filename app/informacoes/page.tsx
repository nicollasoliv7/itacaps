import { ContactButton } from "@/components/Shared";
export const metadata = { title: "Informações e atendimento" };
export default function Information() {
  return (
    <main id="conteudo" className="information section">
      <span className="eyebrow">ITACAPS / ATENDIMENTO</span>
      <h1>
        PODE
        <br />
        PERGUNTAR.
      </h1>
      <section>
        <h2>Compras e entregas</h2>
        <p>
          O site apresenta as categorias da ITACAPS. A compra é combinada
          diretamente com a equipe pelo canal de contato oficial. Enviamos para
          todo o Brasil. Antes de fechar o pedido, confirme disponibilidade,
          preço, frete, prazo e condições de pagamento.
        </p>
      </section>
      <section>
        <h2>Trocas e dúvidas sobre seu pedido</h2>
        <p>
          Converse com a equipe da loja para receber as condições aplicáveis à
          sua compra e orientações de atendimento.
        </p>
      </section>
      <section>
        <h2>Privacidade e navegação</h2>
        <p>
          Esta versão do site não oferece cadastro, formulário de e-mail ou
          checkout, e não utiliza ferramentas próprias de publicidade ou análise
          de visitantes. O provedor de hospedagem pode processar informações
          técnicas necessárias à entrega e segurança das páginas, como endereço
          IP e registros de acesso. Ao acessar WhatsApp, Instagram ou Google
          Maps, você passa a utilizar um serviço externo, com suas próprias
          práticas de privacidade.
        </p>
      </section>
      <section>
        <h2>Sobre as imagens</h2>
        <p>
          As fotografias desta versão são referências editoriais ilustrativas;
          não representam produtos disponíveis ou pessoas e instalações da loja.
          Confirme os modelos reais diretamente com o atendimento.
        </p>
      </section>
      <ContactButton />
    </main>
  );
}
