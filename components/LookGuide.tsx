"use client";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import { clothingSizes, pieces, shoeSizes } from "@/lib/site";

export type LookPreset = {
  pieces: string[];
  size: string;
  shoe: string;
  style: string;
  nonce: number;
};

type StyleId = "rua" | "boleiro" | "arrumado" | "basico" | "festa";

// Os estilos do "Qual é a sua?". `name` precisa existir em `styles` (lib/site.ts).
const STYLES: { id: StyleId; name: string; desc: string; pieces: string[]; img: string }[] = [
  { id: "rua", name: "De rua", desc: "Boné, camiseta larga e tênis.", pieces: ["bone", "camiseta", "bermuda", "tenis"], img: "/images/bones.webp" },
  { id: "boleiro", name: "Boleiro", desc: "Camisa de time, bermuda e chinelo.", pieces: ["time", "bermuda", "chinelo"], img: "/images/bermudas.webp" },
  { id: "arrumado", name: "Arrumadinho", desc: "Polo, calça e tênis limpo.", pieces: ["polo", "calca", "tenis"], img: "/images/araras.webp" },
  { id: "basico", name: "Básico", desc: "Camiseta lisa, calça e nada chamando atenção.", pieces: ["camiseta", "calca", "tenis"], img: "/images/calcados.webp" },
  { id: "festa", name: "Pra festa", desc: "Jaqueta, calça, relógio e perfume.", pieces: ["jaqueta", "calca", "relogio", "perfume"], img: "/images/perfumaria.webp" },
];

// As combinações prontas. São tipos de peça, não produtos: o estoque a equipe mostra no WhatsApp.
const LOOKS: { id: string; style: StyleId; name: string; pieces: string[] }[] = [
  { id: "role", style: "rua", name: "Rolê de fim de semana", pieces: ["bone", "camiseta", "bermuda", "tenis"] },
  { id: "jogo", style: "boleiro", name: "Dia de jogo", pieces: ["time", "bermuda", "chinelo"] },
  { id: "date", style: "arrumado", name: "Encontro", pieces: ["polo", "calca", "tenis", "perfume"] },
  { id: "trampo", style: "basico", name: "Trampo / facul", pieces: ["camiseta", "calca", "tenis", "relogio"] },
  { id: "noite", style: "festa", name: "Noite / festa", pieces: ["jaqueta", "calca", "tenis", "perfume"] },
];

const FITS = [
  { id: "justa", label: "Mais justa" },
  { id: "normal", label: "Normal" },
  { id: "larga", label: "Mais larga" },
] as const;

const labelOf = (id: string) => pieces.find((p) => p.id === id)?.label ?? id;
const styleOf = (id: StyleId) => STYLES.find((s) => s.id === id)!;

// Conta simples. Ajuste com a tabela de medidas da loja se precisar.
function guessSize(height: number, weight: number, fit: string) {
  let i = weight < 62 ? 0 : weight < 74 ? 1 : weight < 86 ? 2 : weight < 100 ? 3 : 4;
  if (height >= 186) i++;
  if (fit === "larga") i++;
  if (fit === "justa") i--;
  return clothingSizes[Math.max(0, Math.min(clothingSizes.length - 1, i))];
}

type Step = "start" | "style" | "size" | "looks" | "done";
const PROGRESS: { step: Step; label: string }[] = [
  { step: "style", label: "Estilo" },
  { step: "size", label: "Tamanho" },
  { step: "looks", label: "Look" },
];

export default function LookGuide({ onApply }: { onApply: (preset: LookPreset) => void }) {
  const [step, setStep] = useState<Step>("start");
  const [idx, setIdx] = useState(0);
  const [likes, setLikes] = useState<Partial<Record<StyleId, boolean>>>({});
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);
  const [fit, setFit] = useState("normal");
  const [shoe, setShoe] = useState("41");
  const [picked, setPicked] = useState<string | null>(null);
  const [dx, setDx] = useState(0);
  const dragStart = useRef<number | null>(null);

  const size = guessSize(height, weight, fit);
  const liked = STYLES.filter((s) => likes[s.id]);
  const styleText = liked.length ? liked.slice(0, 2).map((s) => s.name).join(" + ") : "Ainda não sei";
  const looks = [...LOOKS]
    .sort((a, b) => Number(!!likes[b.style]) - Number(!!likes[a.style]))
    .slice(0, 3);
  const current = STYLES[idx];
  const progressAt = step === "style" ? 0 : step === "size" ? 1 : 2;

  const answer = (yes: boolean) => {
    setLikes((l) => ({ ...l, [current.id]: yes }));
    if (idx + 1 >= STYLES.length) {
      setIdx(0);
      setStep("size");
    } else {
      setIdx(idx + 1);
    }
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current !== null) setDx(e.clientX - dragStart.current);
  };
  const onUp = () => {
    if (dx > 90) answer(true);
    else if (dx < -90) answer(false);
    dragStart.current = null;
    setDx(0);
  };

  const pick = (lookId: string) => {
    const look = LOOKS.find((l) => l.id === lookId)!;
    setPicked(lookId);
    setStep("done");
    onApply({
      pieces: look.pieces,
      size,
      shoe,
      style: liked[0]?.name ?? styleOf(look.style).name,
      nonce: Date.now(),
    });
    requestAnimationFrame(() =>
      document.getElementById("montar")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const restart = () => {
    setStep("start");
    setIdx(0);
    setLikes({});
    setPicked(null);
  };

  const pickedLook = LOOKS.find((l) => l.id === picked);

  return (
    <div className="guide">
      <div className="guide-top">
        <span className="label label-light">Monte seu look</span>
        {step !== "start" && step !== "done" && (
          <ol className="guide-progress" aria-label="Seu progresso">
            {PROGRESS.map((p, i) => (
              <li key={p.step} className={i <= progressAt ? "is-on" : ""} aria-current={i === progressAt ? "step" : undefined}>
                <span aria-hidden />
                {p.label}
              </li>
            ))}
          </ol>
        )}
      </div>

      {step === "start" && (
        <div className="guide-card guide-intro">
          <h2 id="monte-titulo">
            Não sabe por onde começar?
            <br />A gente monta com você.
          </h2>
          <p>
            Responde 3 coisas rápidas: o que você curte, seu tamanho e qual combinação quer. No
            final, é só chamar no Zap que a equipe te mostra o que tem na loja.
          </p>
          <ul className="guide-pills" aria-label="Como funciona">
            <li>1. Qual é a sua?</li>
            <li>2. Seu tamanho</li>
            <li>3. Escolhe o look</li>
          </ul>
          <div className="guide-actions">
            <button type="button" className="btn btn-wood guide-go" onClick={() => setStep("style")}>
              Bora começar
            </button>
            <a href="#montar" className="guide-skip">
              Prefiro escolher peça por peça
            </a>
          </div>
        </div>
      )}

      {step === "style" && (
        <div className="guide-step">
          <div className="guide-head">
            <div>
              <h2 id="monte-titulo">Qual é a sua?</h2>
              <p>Curtiu? Arrasta pra direita ou toca no ✓. Não curtiu? Pra esquerda ou no ✕.</p>
            </div>
            <span className="guide-count">
              {idx + 1} de {STYLES.length}
            </span>
          </div>

          <div className="swipe">
            <div className="swipe-back swipe-back-2" aria-hidden />
            <div className="swipe-back swipe-back-1" aria-hidden />
            <div
              key={current.id}
              className="swipe-card"
              style={{ transform: `translateX(${dx}px) rotate(${dx / 18}deg)` }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div className="swipe-img">
                <Image src={current.img} alt="" fill sizes="400px" draggable={false} />
                {dx > 30 && <span className="swipe-stamp swipe-stamp-yes">Curti</span>}
                {dx < -30 && <span className="swipe-stamp swipe-stamp-no">Passo</span>}
                <div className="swipe-tags">
                  {current.pieces.map((p) => (
                    <span key={p}>{labelOf(p)}</span>
                  ))}
                </div>
              </div>
              <div className="swipe-text">
                <strong>{current.name}</strong>
                <span>{current.desc}</span>
              </div>
            </div>
          </div>

          <div className="swipe-buttons">
            <button type="button" className="swipe-no" aria-label={`Não curti ${current.name}`} onClick={() => answer(false)}>
              <X size={26} aria-hidden />
            </button>
            <button type="button" className="swipe-yes" aria-label={`Curti ${current.name}`} onClick={() => answer(true)}>
              <Check size={30} aria-hidden />
            </button>
          </div>
          <button type="button" className="guide-skip guide-center" onClick={() => setStep("size")}>
            Pular essa parte
          </button>
        </div>
      )}

      {step === "size" && (
        <div className="guide-step">
          <div className="guide-head">
            <div>
              <h2 id="monte-titulo">Qual seu tamanho?</h2>
              <p>Arrasta as barrinhas que a gente te fala o tamanho.</p>
            </div>
          </div>

          <div className="size-grid">
            <div className="guide-card size-inputs">
              <label className="range">
                <span>
                  Sua altura <b>{(height / 100).toFixed(2).replace(".", ",")} m</b>
                </span>
                <input type="range" min={150} max={200} value={height} onChange={(e) => setHeight(Number(e.target.value))} />
              </label>
              <label className="range">
                <span>
                  Seu peso <b>{weight} kg</b>
                </span>
                <input type="range" min={45} max={130} value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
              </label>
              <div>
                <span className="field-label">Gosta de roupa…</span>
                <div className="chips">
                  {FITS.map((f) => (
                    <button key={f.id} type="button" className="chip" aria-pressed={fit === f.id} onClick={() => setFit(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="size-side">
              <div className="size-result" aria-live="polite">
                <span>Seu tamanho deve ser</span>
                <strong>{size}</strong>
                <small>Na dúvida, a equipe confirma com você no Zap.</small>
              </div>
              <div className="guide-card">
                <span className="field-label">Número do tênis / chinelo</span>
                <div className="chips">
                  {shoeSizes.map((n) => (
                    <button key={n} type="button" className="chip chip-sm" aria-pressed={shoe === n} onClick={() => setShoe(n)}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="guide-nav">
            <button type="button" className="guide-back" onClick={() => { setIdx(0); setStep("style"); }}>
              <ArrowLeft size={18} aria-hidden /> Voltar
            </button>
            <button type="button" className="btn btn-wood" onClick={() => setStep("looks")}>
              Ver combinações
            </button>
          </div>
        </div>
      )}

      {step === "looks" && (
        <div className="guide-step">
          <div className="guide-head">
            <div>
              <h2 id="monte-titulo">Separamos essas pra você</h2>
              <p>
                Seu estilo: <b>{styleText}</b> · Tamanho <b>{size}</b> · Tênis <b>{shoe}</b>
              </p>
            </div>
          </div>

          <div className="looks">
            {looks.map((l) => (
              <article key={l.id} className="look">
                <div className="look-img">
                  <Image src={styleOf(l.style).img} alt="" fill sizes="(max-width: 760px) 90vw, 33vw" />
                  {likes[l.style] && <span className="look-badge">Sua cara</span>}
                </div>
                <h3>{l.name}</h3>
                <ul>
                  {l.pieces.map((p) => (
                    <li key={p}>{labelOf(p)}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-white btn-block" onClick={() => pick(l.id)}>
                  Quero essa
                </button>
              </article>
            ))}
          </div>

          <p className="guide-note">A gente te mostra no WhatsApp o que tem na loja pra essa combinação.</p>
          <div className="guide-nav">
            <button type="button" className="guide-back" onClick={() => setStep("size")}>
              <ArrowLeft size={18} aria-hidden /> Voltar
            </button>
          </div>
        </div>
      )}

      {step === "done" && pickedLook && (
        <div className="guide-card guide-done" role="status">
          <div>
            <h2 id="monte-titulo">Fechou! {pickedLook.name}</h2>
            <p>
              Já marcamos as peças, o tamanho <b>{size}</b> e o tênis <b>{shoe}</b> aqui embaixo.
              Confere, coloca seu nome e chama no Zap.
            </p>
          </div>
          <div className="guide-actions">
            <a href="#montar" className="btn btn-wood">
              <ArrowDown size={18} aria-hidden /> Conferir meu look
            </a>
            <button type="button" className="guide-skip" onClick={restart}>
              <RotateCcw size={15} aria-hidden /> Refazer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
