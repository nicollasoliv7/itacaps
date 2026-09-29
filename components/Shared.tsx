import Link from "next/link";
import {
  ArrowUpRight,
  Truck,
  CreditCard,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { CONTACT, INSTAGRAM, categories } from "@/lib/catalog";
export function ContactButton({
  children = "CHAMAR NO WHATSAPP",
  dark = false,
}: {
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <a
      className={`button ${dark ? "button-dark" : "button-light"}`}
      href={CONTACT}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function SectionHeading({
  label,
  first,
  second,
}: {
  label: string;
  first: string;
  second: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>
        {first}
        <br />
        <span>{second}</span>
      </h2>
    </div>
  );
}
export function TrustBar() {
  return (
    <div className="trust-bar">
      <span>
        <Truck />
        Envio para todo o Brasil
      </span>
      <span>
        <CreditCard />
        Aceitamos Alelo e VR
      </span>
      <span>
        <MessageCircle />
        Atendimento via WhatsApp
      </span>
      <span>
        <MapPin />
        Itabirito / MG
      </span>
    </div>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link className="wordmark" href="/">
            ITACAPS<i>®</i>
          </Link>
          <p>
            Da rua pro seu estilo.
            <br />
            Moda masculina, sneakers e atitude.
            <br />
            Itabirito para todo o Brasil.
          </p>
        </div>
        <div>
          <h3>EXPLORE</h3>
          {categories.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/colecao/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>MAIS ESTILO</h3>
          {categories.slice(6).map((c) => (
            <Link key={c.slug} href={`/colecao/${c.slug}`}>
              {c.name}
            </Link>
          ))}
          <Link href="/#queimao">Queimão</Link>
        </div>
        <div>
          <h3>VAMOS CONVERSAR</h3>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href={CONTACT} target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
          <p>
            Rua Dr. Guilherme, 272
            <br />
            Centro, Itabirito / MG
            <br />
            CEP 35457-004
          </p>
          <Link href="/informacoes">Entregas, trocas e privacidade</Link>
        </div>
      </div>
      <div className="footer-brand" aria-hidden="true">
        ITACAPS
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ITACAPS. Todos os direitos reservados.
        </span>
        <span>SEU ESTILO. DO SEU JEITO.</span>
      </div>
    </footer>
  );
}
export function FloatingContact() {
  return (
    <a
      href={CONTACT}
      className="floating-contact"
      aria-label="Conversar com a ITACAPS pelo WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 .8A15.1 15.1 0 0 0 3 23.6L.8 31l7.6-2A15.2 15.2 0 1 0 16 .8Zm0 27.7a12.6 12.6 0 0 1-6.4-1.8l-.5-.3-4.5 1.2 1.2-4.4-.3-.5a12.6 12.6 0 1 1 10.5 5.8Zm7-9.4c-.4-.2-2.2-1.1-2.5-1.2-.4-.1-.6-.2-.9.2-.2.4-.9 1.2-1.1 1.4-.2.3-.4.3-.8.1-1.8-.9-3.3-2.3-4.3-4-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1.1-2.7c-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.3 3.6 1.5 3.8c.2.3 2.6 4 6.3 5.5 2.3 1 3.3 1.1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
      </svg>
    </a>
  );
}
