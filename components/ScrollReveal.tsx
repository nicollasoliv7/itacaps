"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  threshold?: number;
};

const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

function offset(direction: Direction, distance: string) {
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}, 0)`;
    case "down":
      return `translate3d(0, -${distance}, 0)`;
    case "left":
      return `translate3d(-${distance}, 0, 0)`;
    case "right":
      return `translate3d(${distance}, 0, 0)`;
    default:
      return "translate3d(0, 0, 0)";
  }
}

// Anima o conteúdo quando ele entra na tela. Sem dependências: só IntersectionObserver.
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = "40px",
  className,
  style,
  once = true,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offset(direction, distance),
        transition: reduced
          ? "none"
          : `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
