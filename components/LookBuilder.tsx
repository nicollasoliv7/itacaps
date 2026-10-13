"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, MessageCircle } from "lucide-react";
import {
  CONTACT,
  WHATSAPP,
  clothingSizes,
  groupNames,
  pieces,
  shoeSizes,
  whatsappLink,
  type PieceGroup,
} from "@/lib/site";

const groups = Object.keys(groupNames) as PieceGroup[];
const DONT_KNOW = "Não sei";

// Atalhos: um toque marca as peças de uma combinação comum.
const QUICK_LOOKS = [
  { label: "Rolê", pieces: ["bone", "camiseta", "bermuda", "tenis"] },
  { label: "Dia de jogo", pieces: ["time", "bermuda", "chinelo"] },
  { label: "Encontro", pieces: ["polo", "calca", "tenis", "perfume"] },
  { label: "Trampo / facul", pieces: ["camiseta", "calca", "tenis", "relogio"] },
];

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((x) => b.includes(x));

export default function LookBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [shoe, setShoe] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [barOn, setBarOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // A barra fixa do celular só aparece enquanto o formulário está na tela.
  useEffect(() => {
    setMounted(true);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBarOn(e.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chosen = pieces.filter((p) => selected.includes(p.id));
  const needsSize = chosen.some((p) => p.group === "cima" || p.group === "baixo");
  const needsShoe = chosen.some((p) => p.group === "pes");
  const nameStep = needsSize || needsShoe ? 3 : 2;

  const toggle = (id: string) => {
    setError("");
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const applyQuick = (ids: string[]) => {
    setError("");
    setSelected(sameSet(selected, ids) ? [] : ids);
  };

  const message = useMemo(() => {
    const lines = [
      `Olá, ITACAPS!${name.trim() ? ` Sou ${name.trim()}.` : ""} Montei um look no site:`,
      "",
      `• Peças: ${chosen.length ? chosen.map((p) => p.label).join(", ") : "—"}`,
    ];
    if (needsSize && size)
      lines.push(`• Tamanho de roupa: ${size === DONT_KNOW ? "não sei, me ajuda" : size}`);
    if (needsShoe && shoe) lines.push(`• Número do calçado: ${shoe}`);
    lines.push("", "Pode me mostrar as opções?");
    return lines.join("\n");
  }, [chosen, needsSize, needsShoe, size, shoe, name]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  const send = async () => {
    if (!chosen.length) {
      setError("Escolha pelo menos uma peça.");
      goTo("passo-pecas");
      return;
    }
    if (!name.trim()) {
      setError("Falta só seu nome.");
      goTo("lead-nome");
      return;
    }
    setError("");
    if (WHATSAPP) {
      window.open(whatsappLink(message), "_blank", "noopener");
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(CONTACT, "_blank", "noopener");
  };

  const count = `${chosen.length} ${chosen.length === 1 ? "peça" : "peças"}`;
  const note =
    error ||
    (copied
      ? "Pedido copiado. Cole na conversa que abriu e envie."
      : "Preço, cor e estoque a equipe confirma na conversa.");

  return (
    <div className="builder" ref={rootRef}>
      <div className="builder-steps">
        <fieldset className="step">
          <legend>
            <span className="step-n">1</span> O que você procura?
          </legend>

          <div className="quick">
            <span className="quick-label">Sem ideia? Toque num look pronto:</span>
            <div className="quick-row">
              {QUICK_LOOKS.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  className="chip chip-quick"
                  aria-pressed={sameSet(selected, q.pieces)}
                  onClick={() => applyQuick(q.pieces)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <p className="step-hint">Ou escolha as peças, quantas quiser:</p>
          <div id="passo-pecas" tabIndex={-1} className="piece-groups">
            {groups.map((g) => (
              <div key={g} className="piece-group">
                <span className="piece-group-name">{groupNames[g]}</span>
                <div className="chips">
                  {pieces
                    .filter((p) => p.group === g)
                    .map((p) => {
                      const on = selected.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className="chip"
                          aria-pressed={on}
                          onClick={() => toggle(p.id)}
                        >
                          {on && <Check size={15} aria-hidden />}
                          {p.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {(needsSize || needsShoe) && (
          <fieldset className="step step-in">
            <legend>
              <span className="step-n">2</span> Seu tamanho
            </legend>
            {needsSize && (
              <div className="field">
                <span className="field-label">Roupa</span>
                <div className="chips chips-grid">
                  {[...clothingSizes, DONT_KNOW].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`chip chip-sm${s === DONT_KNOW ? " chip-wide" : ""}`}
                      aria-pressed={size === s}
                      onClick={() => setSize(size === s ? "" : s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {needsShoe && (
              <div className="field">
                <span className="field-label">Tênis / chinelo</span>
                <div className="chips chips-grid">
                  {shoeSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chip chip-sm"
                      aria-pressed={shoe === s}
                      onClick={() => setShoe(shoe === s ? "" : s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </fieldset>
        )}

        <fieldset className="step">
          <legend>
            <span className="step-n">{nameStep}</span> Seu nome
          </legend>
          <label className="field">
            <span className="sr-only">Seu nome</span>
            <input
              id="lead-nome"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Como podemos te chamar?"
              autoComplete="given-name"
              enterKeyHint="send"
            />
          </label>
          <button type="button" className="btn btn-wood btn-block send-inline" onClick={send}>
            <MessageCircle size={18} aria-hidden />
            Chamar no WhatsApp
          </button>
        </fieldset>
      </div>

      <aside className="ticket" aria-label="Resumo do seu look">
        <div className="ticket-head">
          <span>Seu look</span>
          <span>{count}</span>
        </div>
        {chosen.length ? (
          <ul className="ticket-list">
            {chosen.map((p) => (
              <li key={p.id}>
                <span>{p.label}</span>
                <button type="button" onClick={() => toggle(p.id)} aria-label={`Tirar ${p.label}`}>
                  Tirar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ticket-empty">Toque nas peças ao lado para montar seu look.</p>
        )}
        {((needsSize && size) || (needsShoe && shoe)) && (
          <dl className="ticket-meta">
            {needsSize && size && (<><dt>Roupa</dt><dd>{size}</dd></>)}
            {needsShoe && shoe && (<><dt>Calçado</dt><dd>{shoe}</dd></>)}
          </dl>
        )}
        <button type="button" className="btn btn-wood btn-block" onClick={send}>
          <MessageCircle size={18} aria-hidden />
          Enviar no WhatsApp
        </button>
        <p className={`ticket-note${error ? " is-error" : ""}`} role="status" aria-live="polite">
          {note}
        </p>
      </aside>

      {mounted &&
        createPortal(
          <div className="look-bar" data-on={barOn} aria-hidden={!barOn}>
            {error && <p className="look-bar-error">{error}</p>}
            <div className="look-bar-inner">
              <div className="look-bar-info">
                <strong>{chosen.length ? count : "Seu look"}</strong>
                <span>
                  {chosen.length ? chosen.map((p) => p.label).join(" · ") : "Toque nas peças acima"}
                </span>
              </div>
              <button
                type="button"
                className="look-bar-send"
                onClick={send}
                tabIndex={barOn ? 0 : -1}
              >
                <MessageCircle size={18} aria-hidden />
                Chamar no Zap
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
