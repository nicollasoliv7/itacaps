"use client";
import Link from "next/link";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, CONTACT } from "@/lib/catalog";
export default function Header() {
  const [panel, setPanel] = useState<"menu" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 25);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (panel) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);
  const close = () => {
    setPanel(null);
    setQuery("");
    trigger.current?.focus();
  };
  const results = categories.filter((c) =>
    (c.name + " " + c.short)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
      ),
  );
  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="wordmark" aria-label="ITACAPS, início">
          ITA<span>CAPS</span>
          <i>®</i>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <Link href="/#novidades">Novidades</Link>
          <Link href="/colecao/bones">Bonés</Link>
          <Link href="/colecao/tenis">Tênis</Link>
          <Link href="/colecao/conjuntos">Roupas</Link>
          <Link href="/colecao/perfumes">Perfumes</Link>
          <Link href="/#loja">A loja</Link>
        </nav>
        <div className="header-actions">
          <button
            aria-label="Buscar categorias"
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setPanel("search");
            }}
          >
            <Search size={20} />
          </button>
          <a
            className="header-contact"
            href={CONTACT}
            target="_blank"
            rel="noreferrer"
          >
            Fale com a gente <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label="Abrir menu"
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setPanel("menu");
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        aria-label={panel === 'search' ? 'Buscar categorias' : 'Menu de navegação'}
        className="nav-dialog"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-top">
          <span className="eyebrow">
            {panel === "search" ? "ENCONTRE SEU ESTILO" : "EXPLORE A ITACAPS"}
          </span>
          <button onClick={close} aria-label="Fechar">
            <X />
          </button>
        </div>
        {panel === "search" && (
          <label className="search-field">
            <Search />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você procura?"
              aria-label="Buscar categoria"
            />
          </label>
        )}
        <nav
          aria-label={panel === "search" ? "Resultados da busca" : "Menu"}
          className="dialog-links"
        >
          {panel === "menu" && (
            <Link onClick={close} href="/#novidades">
              Novidades <ArrowUpRight />
            </Link>
          )}
          {results.map((c) => (
            <Link onClick={close} key={c.slug} href={`/colecao/${c.slug}`}>
              {c.name}
              <ArrowUpRight />
            </Link>
          ))}
          {results.length === 0 && (
            <p>
              Nenhuma categoria encontrada. Tente “bonés”, “tênis” ou
              “perfumes”.
            </p>
          )}
        </nav>
      </dialog>
    </>
  );
}
