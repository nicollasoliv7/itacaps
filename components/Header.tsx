import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a href="#topo" className="wordmark" aria-label="ITACAPS, início">
          ITACAPS
        </a>
        <nav className="nav" aria-label="Seções">
          <a href="#loja">A loja</a>
          <a href="#monte">Monte seu look</a>
          <a href="#visite">Como chegar</a>
        </nav>
        <a className="btn btn-black btn-sm" href={whatsappLink()} target="_blank" rel="noopener">
          <MessageCircle size={16} aria-hidden />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
