import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin, Instagram } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { ContactButton, SectionHeading, TrustBar } from "@/components/Shared";
import { categories, CONTACT, INSTAGRAM, MAPS } from "@/lib/catalog";
export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero">
        <Image
          src="/images/hero.webp"
          alt="Editorial ilustrativo: look urbano com boné, camiseta escura e calça cargo"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow hero-label">
            <i />
            STREETWEAR · SNEAKERS · LIFESTYLE
          </span>
          <h1>
            SEU ESTILO.
            <br />
            <span>DO SEU</span>
            <br />
            JEITO.
          </h1>
          <p>
            Do street ao casual, as peças que definem sua presença e completam
            seu visual.
          </p>
          <div className="hero-buttons">
            <Link href="#novidades" className="button button-light">
              VER NOVIDADES <ArrowUpRight size={18} />
            </Link>
            <a
              href={CONTACT}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              CHAMAR NO WHATSAPP <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#categorias">
            <ArrowDown size={16} /> EXPLORE A ITACAPS
          </a>
          <span>ITABIRITO, MG &nbsp; / &nbsp; ENVIO PARA TODO O BRASIL</span>
          <span className="image-note">Imagem editorial ilustrativa</span>
        </div>
        <span className="hero-side">PRESENÇA NÃO SE EXPLICA. SE VESTE.</span>
      </section>
      <div
        className="marquee"
        aria-label="ITACAPS, streetwear, sneakers, lifestyle, Itabirito, Brasil"
      >
        <div aria-hidden="true">
          {[0, 1].map((n) => (
            <span key={n}>
              ITACAPS <b>✳</b> STREETWEAR <b>✳</b> SNEAKERS <b>✳</b> LIFESTYLE{" "}
              <b>✳</b> ITABIRITO <b>✳</b> BRASIL <b>✳</b>{" "}
            </span>
          ))}
        </div>
      </div>
      <section className="section categories" id="categorias">
        <ScrollReveal>
          <div className="section-top">
            <SectionHeading
              label="01 / EXPLORE"
              first="ENCONTRE"
              second="SEU ESTILO."
            />
            <p>
              Não importa a ocasião.
              <br />
              Tem um jeito seu de chegar.
            </p>
          </div>
        </ScrollReveal>
        <div className="category-grid">
          {categories.slice(0, 6).map((c, i) => (
            <ScrollReveal
              key={c.slug}
              delay={(i % 3) * 80}
              className={`category-wrap category-${i}`}
            >
              <Link className="category-card" href={`/colecao/${c.slug}`}>
                <Image
                  src={`/images/${c.image}`}
                  alt={`Referência visual ilustrativa de ${c.name.toLowerCase()}`}
                  fill
                  sizes={
                    i < 2
                      ? "(max-width: 600px) 100vw, 50vw"
                      : "(max-width: 600px) 50vw, 25vw"
                  }
                />
                <span className="category-number">
                  0{i + 1} / {c.short}
                </span>
                <div className="category-copy">
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                  </div>
                  <span className="circle-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <p className="photo-disclaimer">
          Imagens ilustrativas de estilo. Modelos, valores e disponibilidade:
          consulte nossa equipe.
        </p>
      </section>
      <section className="section new-section" id="novidades">
        <ScrollReveal>
          <div className="section-top">
            <SectionHeading
              label="02 / DROP ATUAL"
              first="ACABOU"
              second="DE CHEGAR."
            />
            <a
              className="text-link"
              href={CONTACT}
              target="_blank"
              rel="noreferrer"
            >
              CONSULTAR O DROP <ArrowUpRight size={18} />
            </a>
          </div>
        </ScrollReveal>
        <div className="new-grid">
          {[
            { name: "Caps com personalidade", cat: categories[0] },
            { name: "Sneakers para o seu ritmo", cat: categories[1] },
            { name: "O look começa aqui", cat: categories[4] },
            { name: "Presença que fica", cat: categories[5] },
          ].map(({ name, cat }, i) => (
            <ScrollReveal key={cat.slug} delay={i * 60}>
              <Link href={`/colecao/${cat.slug}`} className="selection-card">
                <div className="selection-image">
                  <Image
                    src={`/images/${cat.image}`}
                    alt={`Inspiração de ${cat.name.toLowerCase()}, imagem ilustrativa`}
                    fill
                    sizes="(max-width: 600px) 50vw, 25vw"
                  />
                  <span className="selection-tag">{cat.short}</span>
                  <ArrowUpRight className="selection-arrow" size={20} />
                </div>
                <h3>{name}</h3>
                <span>
                  Conheça a seleção <ArrowUpRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="caps-spotlight">
        <div className="caps-photo">
          <Image
            src="/images/caps.jpg"
            alt="Boné em fotografia ilustrativa de estilo"
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="image-note">Imagem ilustrativa</span>
        </div>
        <ScrollReveal className="spotlight-copy" direction="right">
          <span className="eyebrow coral">A ASSINATURA DA CASA</span>
          <h2>
            A GENTE
            <br />
            USA <em>BONÉ.</em>
          </h2>
          <p>
            Mais que um acessório, é a nossa identidade. Detalhes bordados,
            shapes e a atitude de quem sabe onde quer chegar.
          </p>
          <Link href="/colecao/bones" className="button button-light">
            VER COLEÇÃO DE CAPS <ArrowUpRight size={18} />
          </Link>
          <div className="spotlight-index">
            <span>ITACAPS / ORIGINAL ATTITUDE</span>
            <span>01 — 09</span>
          </div>
        </ScrollReveal>
      </section>
      <section className="section sneaker-section">
        <ScrollReveal className="sneaker-copy">
          <span className="eyebrow">03 / SNEAKER CULTURE</span>
          <h2>
            DOS PÉS
            <br />
            PRO <em>LOOK.</em>
          </h2>
          <p>
            Performance, design e personalidade.
            <br />
            Encontre o par que acompanha o seu ritmo.
          </p>
          <Link href="/colecao/tenis" className="button button-dark">
            ENCONTRAR MEU PAR <ArrowUpRight size={18} />
          </Link>
          <span className="sneaker-caption">
            CONSULTE MODELOS, CORES E NUMERAÇÕES.
          </span>
        </ScrollReveal>
        <div className="sneaker-image">
          <Image
            src="/images/sneakers.jpg"
            alt="Tênis vermelho em uma composição editorial ilustrativa"
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="image-note">
            Inspiração de estilo · imagem ilustrativa
          </span>
        </div>
      </section>
      <section className="perfume-section">
        <div className="perfume-image">
          <Image
            src="/images/perfume.jpg"
            alt="Fotografia ilustrativa de perfumaria, sem representar o estoque da loja"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <span className="image-note">Imagem ilustrativa</span>
        </div>
        <ScrollReveal className="perfume-copy">
          <span className="eyebrow">04 / ALÉM DO VISUAL</span>
          <h2>
            O ESTILO
            <br />
            TAMBÉM FICA
            <br />
            <em>NA MEMÓRIA.</em>
          </h2>
          <p>
            Fragrâncias árabes e importadas que deixam rastro. Porque a sua
            presença também tem assinatura.
          </p>
          <Link className="text-link" href="/colecao/perfumes">
            ESCOLHER MINHA FRAGRÂNCIA <ArrowUpRight size={18} />
          </Link>
          <p className="perfume-brands">
            SALVO ELIXIR · MAISON ALHAMBRA
            <br />
            ASAD · LATTAFA
            <br />
            <small>Consulte disponibilidade no atendimento.</small>
          </p>
        </ScrollReveal>
      </section>
      <section className="section outlet" id="queimao">
        <ScrollReveal>
          <span className="eyebrow coral">QUEIMÃO ITACAPS</span>
          <h2>
            PREÇO BAIXOU.
            <br />
            <span>ESTILO CONTINUA.</span>
          </h2>
          <div className="outlet-bottom">
            <p>
              Seu próximo achado pode estar aqui.
              <br />
              Fale com a gente e confira as ofertas disponíveis.
            </p>
            <ContactButton>CONSULTAR O QUEIMÃO</ContactButton>
          </div>
        </ScrollReveal>
      </section>
      <section className="statement">
        <ScrollReveal>
          <span className="eyebrow">ITACAPS / MAIS QUE ROUPA</span>
          <p>
            NÃO É SÓ
            <br />O QUE VOCÊ VESTE.
            <br />
            <span>
              É COMO
              <br />
              VOCÊ CHEGA.
            </span>
          </p>
        </ScrollReveal>
      </section>
      <section className="section social-section">
        <ScrollReveal>
          <div className="section-top">
            <SectionHeading label="@ITACAPS1" first="NO SEU" second="RITMO." />
            <div>
              <p>
                Nossa comunidade, nossos clientes, nossa rua.
                <br />
                Os bastidores e as novidades estão no Instagram.
              </p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                <Instagram size={18} /> SEGUIR A ITACAPS{" "}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>
        <a
          href={INSTAGRAM}
          className="social-banner"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            DA RUA.
            <br />
            DA NOSSA GENTE.
          </span>
          <div>
            <Instagram size={34} />
            <span>
              @itacaps1 <ArrowUpRight />
            </span>
          </div>
        </a>
      </section>
      <TrustBar />
      <section className="section store-section" id="loja">
        <ScrollReveal>
          <SectionHeading
            label="05 / CHEGA MAIS"
            first="ONLINE."
            second="E EM ITABIRITO."
          />
          <p>
            A conveniência do site com o atendimento que você já conhece. Visite
            nossa loja física ou receba em qualquer lugar do Brasil.
          </p>
          <ContactButton>CONVERSAR COM A EQUIPE</ContactButton>
        </ScrollReveal>
        <div className="address-block">
          <span className="eyebrow">A GENTE SE ENCONTRA AQUI</span>
          <MapPin className="store-pin" size={44} strokeWidth={1} />
          <h3>Rua Dr. Guilherme, 272</h3>
          <p>
            Centro · Itabirito / MG
            <br />
            CEP 35457-004
          </p>
          <a href={MAPS} target="_blank" rel="noreferrer" className="text-link">
            COMO CHEGAR <ArrowUpRight size={18} />
          </a>
          <div className="address-line">
            <span>MINAS GERAIS, BRASIL</span>
            <span>ITACAPS ↗</span>
          </div>
        </div>
      </section>
      <section className="vip-section">
        <div>
          <span className="eyebrow">FIQUE POR DENTRO</span>
          <h2>
            ENTRE PRO <em>DROP.</em>
          </h2>
          <p>
            Quer saber das novidades? Chame nossa equipe e pergunte como
            acompanhar os próximos lançamentos.
          </p>
        </div>
        <ContactButton dark>QUERO SABER DOS DROPS</ContactButton>
      </section>
    </main>
  );
}
