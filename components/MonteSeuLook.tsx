"use client";
import { useState } from "react";
import LookBuilder from "@/components/LookBuilder";
import LookGuide, { type LookPreset } from "@/components/LookGuide";
import ScrollReveal from "@/components/ScrollReveal";

// O passo a passo guiado em cima; as pílulas de sempre embaixo.
// Quando a pessoa escolhe uma combinação, o guiado preenche as pílulas.
export default function MonteSeuLook() {
  const [preset, setPreset] = useState<LookPreset | null>(null);
  return (
    <>
      <ScrollReveal threshold={0.05}>
        <LookGuide onApply={setPreset} />
      </ScrollReveal>
      <ScrollReveal delay={150} threshold={0.05}>
        <div id="montar" className="build-manual">
          <p className="build-or">
            <span>Prefere escolher peça por peça?</span> Monte do seu jeito aqui embaixo.
          </p>
          <LookBuilder preset={preset} />
        </div>
      </ScrollReveal>
    </>
  );
}
