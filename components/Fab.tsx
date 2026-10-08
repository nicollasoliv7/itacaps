"use client";
import { useEffect, useState } from "react";
import { Shirt } from "lucide-react";

// Botão fixo no celular; some quando o cliente já está montando o look.
export default function Fab() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("monte");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return (
    <a className="fab" href="#monte" data-hidden={hidden} tabIndex={hidden ? -1 : 0}>
      <Shirt size={20} aria-hidden />
      Montar meu look
    </a>
  );
}
