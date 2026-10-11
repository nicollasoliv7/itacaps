"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import {
  CONTACT,
  WHATSAPP,
  clothingSizes,
  groupNames,
  pieces,
  shoeSizes,
  styles,
  whatsappLink,
  type PieceGroup,
} from "@/lib/site";
import type { LookPreset } from "@/components/LookGuide";

const groups = Object.keys(groupNames) as PieceGroup[];

export default function LookBuilder({ preset }: { preset?: LookPreset | null }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [shoe, setShoe] = useState("");
  const [style, setStyle] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Recebe o que foi escolhido no passo a passo guiado.
  useEffect(() => {
    if (!preset) return;
    setSelected(preset.pieces);
    setSize(preset.size);
    setShoe(preset.shoe);
    setStyle(preset.style);
    setError("");
  }, [preset]);

  const chosen = pieces.filter((p) => selected.includes(p.id));
  const needsSize = chosen.some((p) => p.group === "cima" || p.group === "baixo");
  const needsShoe = chosen.some((p) => p.group === "pes");

  const toggle = (id: string) => {
    setError("");
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const message = useMemo(() => {
    const lines = [
      `Olá, ITACAPS!${name.trim() ? ` Sou ${name.trim()}.` : ""} Montei um look no site:`,
      "",
      `• Peças: ${chosen.length ? chosen.map((p) => p.label).join(", ") : "—"}`,
    ];
    if (needsSize && size) lines.push(`• Tamanho de roupa: ${size}`);
    if (needsShoe && shoe) lines.push(`• Número do calçado: ${shoe}`);
    if (style) lines.push(`• Estilo: ${style}`);
    lines.push("", "Pode me mostrar as opções?");
    return lines.join("\n");
  }, [chosen, needsSize, needsShoe, size, shoe, style, name]);

  const send = async () => {
    if (!chosen.length) {
      setError("Escolha pelo menos uma peça no passo 1.");
      document.getElementById("passo-pecas")?.focus();
      return;
    }
    if (!name.trim()) {
      setError("Digite seu nome no passo 3 para a equipe saber com quem fala.");
      document.getElementById("lead-nome")?.focus();
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

  return (
    <div className="builder">
      <div className="builder-steps">
        <fieldset className="step">
          <legend>
            <span className="step-n">1</span> O que você procura?
          </legend>
          <p className="step-hint">Escolha quantas peças quiser.</p>
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
        <fieldset className="step">
          <legend>
            <span className="step-n">2</span> Tamanho
          </legend>
          {needsSize && (
            <div className="field">
              <span className="field-label">Tamanho de roupa</span>
              <div className="chips">
                {clothingSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chip chip-sm"
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
              <span className="field-label">Número do calçado</span>
              <div className="chips">
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
            <span className="step-n">3</span> Seu nome
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
              placeholder="Como podemos te chamar?"
              autoComplete="given-name"
            />
          </label>
        </fieldset>
      </div>

      <aside className="ticket" aria-label="Resumo do seu look">
        <div className="ticket-head">
          <span>Seu look</span>
          <span>{chosen.length} {chosen.length === 1 ? "peça" : "peças"}</span>
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
        {((needsSize && size) || (needsShoe && shoe) || style) && (
        <dl className="ticket-meta">
          {needsSize && size && (<><dt>Roupa</dt><dd>{size}</dd></>)}
          {needsShoe && shoe && (<><dt>Calçado</dt><dd>{shoe}</dd></>)}
          {style && (<><dt>Estilo</dt><dd>{style}</dd></>)}
        </dl>
        )}
        <button type="button" className="btn btn-wood btn-block" onClick={send}>
          <MessageCircle size={18} aria-hidden />
          Enviar no WhatsApp
        </button>
        <p className={`ticket-note${error ? " is-error" : ""}`} role="status" aria-live="polite">
          {error ||
            (copied
              ? "Pedido copiado. Cole na conversa que abriu e envie."
              : "Preço, cor e estoque a equipe confirma na conversa.")}
        </p>
      </aside>
    </div>
  );
}
