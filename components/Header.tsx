import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <nav className="nav" aria-label="Seções">
          <a href="#loja">A loja</a>
          <a href="#monte">Monte seu look</a>
          <a href="#visite">Como chegar</a>
        </nav>
        <div className="header-right">
          <a className="btn btn-black btn-sm" href={whatsappLink()} target="_blank" rel="noopener">
            <MessageCircle size={16} aria-hidden />
            WhatsApp
          </a>
          <a href="#topo" className="header-logo" aria-label="ITACAPS, voltar ao início">
            <Image src="/images/logo-itacaps.png" alt="ITACAPS" width={369} height={360} priority />
          </a>
        </div>
      </div>
    </header>
  );
}
