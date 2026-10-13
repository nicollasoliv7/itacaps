import Image from "next/image";
import { ArrowRight, Instagram, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import LookBuilder from "@/components/LookBuilder";
import Fab from "@/components/Fab";
import ScrollReveal from "@/components/ScrollReveal";
import ProgressiveBlur from "@/components/ProgressiveBlur";
import { ADDRESS, INSTAGRAM, MAPS, MAP_EMBED, whatsappLink } from "@/lib/site";

const shelves = [
  {
    img: "/images/bones.webp",
    w: 460,
    h: 613,
    tag: "A assinatura da casa",
    title: "Bonés",
    text: "Tá no nome. Aba curva, aba reta e bordados que você não acha em qualquer lugar, de Nike a Mizuno.",
    cta: "Explorar caps",
    alt: "Manequins no alto da arara da ITACAPS usando bonés de aba curva e aba reta",
  },
  {
    img: "/images/araras.webp",
    w: 1200,
    h: 1600,
    tag: "A base do seu look",
    title: "Camisetas, polos e camisas de time",
    text: "Básicas, estampadas e as camisas da temporada. A peça que segura o visual inteiro.",
    cta: "Ver camisetas",
    alt: "Araras da ITACAPS com camisetas, polos e camisas de time, e manequins de boné no alto",
  },
  {
    img: "/images/bermudas.webp",
    w: 570,
    h: 760,
    tag: "Embaixo também conta",
    title: "Bermudas e jeans",
    text: "Jeans claro, escuro e destroyed, mais bermudas esportivas pra fechar o conjunto do jeito certo.",
    cta: "Ver bermudas",
    alt: "Arara com bermudas jeans claras e escuras e bermudas esportivas pretas em cabides de madeira",
  },
  {
    img: "/images/calcados.webp",
    w: 1200,
    h: 1600,
    tag: "Onde tudo começa",
    title: "Tênis e slides",
    text: "Uma parede inteira iluminada, da corrida ao dia a dia. Mizuno, Nike e o par que faltava.",
    cta: "Ver sneakers",
    alt: "Parede iluminada com tênis e chinelos ao lado de uma vitrine de perfumes",
  },
  {
    img: "/images/perfumaria.webp",
    w: 780,
    h: 900,
    tag: "A marca invisível",
    title: "Perfumaria árabe e importada",
    text: "Salvo, Asad e outras fragrâncias que deixam rastro. Sua presença sentida antes de você falar.",
    cta: "Ver fragrâncias",
    alt: "Vitrine de vidro iluminada com perfumes árabes e importados em caixas pretas e douradas",
  },
  {
    img: "/images/oculos.webp",
    w: 1200,
    h: 1600,
    tag: "O detalhe que fecha",
    title: "Óculos e relógios",
    text: "Óculos esportivos, de sol e relógios. O acessório que separa um look bom de um look completo.",
    cta: "Ver óculos",
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
            <ScrollReveal direction="left">
              <span className="label">Moda masculina · Itabirito-MG</span>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={150}>
              <h1>
                Seu estilo.
                <br />
                Do seu jeito.
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={300}>
              <p className="lead">
                Do boné ao tênis, as peças que completam o seu visual. Escolha na loja ou pelo
                WhatsApp: a gente separa, mostra as opções e envia pra todo o Brasil.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={450}>
              <div className="hero-actions">
                <a className="btn btn-black" href="#monte">
                  Montar meu look
                </a>
                <a className="btn btn-line" href={whatsappLink()} target="_blank" rel="noopener">
                  <MessageCircle size={18} aria-hidden />
                  Chamar no WhatsApp
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={600}>
              <ul className="facts">
                <li>Envio para todo o Brasil</li>
                <li>Aceitamos Alelo e VR</li>
                <li>Atendimento via WhatsApp</li>
              </ul>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={300} duration={800} className="hero-media">
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
          </ScrollReveal>
        </section>

        <section id="loja" className="shop wrap" aria-labelledby="loja-titulo">
          <div className="section-head">
            <ScrollReveal>
              <span className="label">Explore</span>
              <h2 id="loja-titulo">
                Encontre
                <br />
                seu estilo.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p>
                Mizuno, Nike, Adidas, Oakley, Lacoste e perfumaria árabe na mesma loja. O estoque
                gira rápido e as novidades saem primeiro no{" "}
                <a href={INSTAGRAM} target="_blank" rel="noopener">
                  Instagram
                </a>
                .
              </p>
            </ScrollReveal>
          </div>
          <div className="shelves">
            {shelves.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 3) * 150} className="shelf-reveal">
                <article className="shelf">
                  <div className="shelf-img">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={s.w}
                      height={s.h}
                      sizes="(max-width: 860px) 50vw, 33vw"
                    />
                  </div>
                  <span className="shelf-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <a
                    className="shelf-link"
                    href={whatsappLink(
                      `Olá! Vi ${s.title} no site da ITACAPS e quero ver as opções.`,
                    )}
                    target="_blank"
                    rel="noopener"
                  >
                    {s.cta}
                    <ArrowRight size={16} aria-hidden />
                  </a>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="monte" className="build" aria-labelledby="monte-titulo">
          <div className="wrap">
            <ScrollReveal threshold={0.05}>
              <div className="build-head">
                <span className="label label-light">Monte seu look</span>
                <h2 id="monte-titulo">Monte o visual.</h2>
                <p>
                  Toque nas peças, escolha o tamanho e chame no WhatsApp. A equipe te responde
                  com fotos e preços do que tem na loja.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} threshold={0.05}>
              <LookBuilder />
            </ScrollReveal>
          </div>
        </section>

        <section id="visite" className="visit wrap" aria-labelledby="visite-titulo">
          <div className="visit-text">
            <ScrollReveal>
              <span className="label">Loja física</span>
              <h2 id="visite-titulo">
                Online.
                <br />E em Itabirito.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="visit-address">
                <MapPin size={20} aria-hidden />
                {ADDRESS}
              </p>
              <p>
                O atendimento que você já conhece, agora também pelo site. Venha na loja ou receba
                em qualquer lugar do Brasil. Pagamento com Alelo e VR aceito na loja.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="hero-actions">
                <a className="btn btn-black" href={MAPS} target="_blank" rel="noopener">
                  Como chegar
                </a>
                <a className="btn btn-line" href={INSTAGRAM} target="_blank" rel="noopener">
                  <Instagram size={18} aria-hidden />
                  @itacaps1
                </a>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={200} duration={800}>
            <div className="map">
              <iframe
                title="Mapa da ITACAPS em Itabirito"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="footer">
        <ScrollReveal distance="20px" className="wrap footer-inner">
          <Image
            src="/images/logo-itacaps.png"
            alt="ITACAPS"
            width={369}
            height={360}
            className="footer-logo"
          />
          <span>{ADDRESS}</span>
          <a href={whatsappLink()} target="_blank" rel="noopener">
            Atendimento pelo WhatsApp
          </a>
        </ScrollReveal>
      </footer>
      <ProgressiveBlur />

      <Fab />
    </>
  );
}
