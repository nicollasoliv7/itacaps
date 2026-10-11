import type { CSSProperties } from "react";

// Faixa fixa no rodapé da tela com desfoque que aumenta de cima pra baixo.
// Server Component, só estilos inline. A altura vem de --pblur-h (globals.css),
// que é menor no celular para não atrapalhar a leitura nem o botão fixo.
const BLURS = [0.25, 0.5, 1, 2, 4, 8, 16, 32];

function mask(i: number) {
  const s = 12.5;
  const a = i * s;
  const stops = [`transparent ${a}%`, `black ${a + s}%`];
  if (i < 7) stops.push(`black ${a + 2 * s}%`);
  if (i < 6) stops.push(`transparent ${a + 3 * s}%`);
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

export default function ProgressiveBlur() {
  const container: CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "var(--pblur-h, 200px)",
    zIndex: 999,
    pointerEvents: "none",
  };

  return (
    <div aria-hidden="true" style={container}>
      {BLURS.map((blur, i) => {
        const m = mask(i);
        const layer: CSSProperties = {
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: m,
          WebkitMaskImage: m,
        };
        return <div key={blur} style={layer} />;
      })}
    </div>
  );
}
