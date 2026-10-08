import Image from "next/image";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import LookBuilder from "@/components/LookBuilder";
import Fab from "@/components/Fab";
import { ADDRESS, INSTAGRAM, MAPS, MAP_EMBED, whatsappLink } from "@/lib/site";

const shelves = [
  {
    img: "/images/araras.webp",
    title: "Camisetas, polos e camisas de time",
    text: "Básicas, estampadas e as camisas da temporada, com bermudas e calças pra fechar o conjunto.",
    alt: "Araras da ITACAPS com camisetas, polos e camisas de time, e manequins de boné no alto",
  },
  {
    img: "/images/calcados.webp",
    title: "Tênis, chinelos e perfumes",
    text: "Parede de tênis e slides, e uma vitrine de perfumaria árabe e importada.",
    alt: "Parede iluminada com tênis e chinelos ao lado de uma vitrine de perfumes",
  },
  {
    img: "/images/oculos.webp",
    title: "Óculos e relógios",
    text: "Vitrine de óculos e relógios pra completar o visual.",
    alt: "Vitrine de óculos de sol abaixo do letreiro ITACAPS na parede",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="topo">
        <section className="hero wrap">
          <div className="hero-text">
            <h1>Do boné ao tênis, o look sai daqui.</h1>
            <p className="lead">
              Moda masculina no centro de Itabirito. Escolha na loja ou pelo WhatsApp: a gente
              separa, mostra as opções e envia pra todo o Brasil.
            </p>
            <div className="hero-actions">
              <a className="btn btn-black" href="#monte">
                Montar meu look
              </a>
              <a className="btn btn-line" href={whatsappLink()} target="_blank" rel="noopener">
                <MessageCircle size={18} aria-hidden />
                Falar com a loja
              </a>
            </div>
            <ul className="facts">
              <li>Enviamos para todo o Brasil</li>
              <li>Aceitamos Alelo e VR</li>
              <li>Rua Dr. Guilherme, 272</li>
            </ul>
          </div>
          <figure className="hero-photo">
            <Image
              src="/images/fachada.webp"
              alt="Manequim com boné e camiseta Mizuno na entrada da ITACAPS"
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 860px) 100vw, 46vw"
            />
          </figure>
        </section>

        <section id="loja" className="shop wrap" aria-labelledby="loja-titulo">
          <div className="section-head">
            <h2 id="loja-titulo">O que tem na loja</h2>
            <p>
              Mizuno, Nike, Adidas, Oakley, Lacoste e perfumaria árabe, entre outras marcas. O
              estoque gira rápido: as novidades saem primeiro no{" "}
              <a href={INSTAGRAM} target="_blank" rel="noopener">
                Instagram
              </a>
              .
            </p>
          </div>
          <div className="shelves">
            {shelves.map((s) => (
              <article key={s.title} className="shelf">
                <div className="shelf-img">
                  <Image src={s.img} alt={s.alt} width={1200} height={1600} sizes="(max-width: 860px) 100vw, 33vw" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="monte" className="build" aria-labelledby="monte-titulo">
          <div className="wrap">
            <div className="section-head section-head-dark">
              <h2 id="monte-titulo">Monte seu look</h2>
              <p>
                Escolha as peças, o tamanho e como quer receber. Seu pedido chega pronto no
                WhatsApp da loja e a equipe responde com fotos e preços do que tem disponível.
              </p>
            </div>
            <LookBuilder />
          </div>
        </section>

        <section id="visite" className="visit wrap" aria-labelledby="visite-titulo">
          <div className="visit-text">
            <h2 id="visite-titulo">Venha conhecer</h2>
            <p className="visit-address">
              <MapPin size={20} aria-hidden />
              {ADDRESS}
            </p>
            <p>Pagamento com Alelo e VR aceito na loja. Pra fora de Itabirito, enviamos para todo o Brasil.</p>
            <div className="hero-actions">
              <a className="btn btn-black" href={MAPS} target="_blank" rel="noopener">
                Abrir no mapa
              </a>
              <a className="btn btn-line" href={INSTAGRAM} target="_blank" rel="noopener">
                <Instagram size={18} aria-hidden />
                @itacaps1
              </a>
            </div>
          </div>
          <div className="map">
            <iframe
              title="Mapa da ITACAPS em Itabirito"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="wordmark">ITACAPS</span>
          <span>{ADDRESS}</span>
          <a href={whatsappLink()} target="_blank" rel="noopener">
            Atendimento pelo WhatsApp
          </a>
        </div>
      </footer>

      <Fab />
    </>
  );
}
