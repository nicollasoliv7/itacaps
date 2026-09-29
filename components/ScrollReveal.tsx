"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
type Props = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  once?: boolean;
  threshold?: number;
};
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = "30px",
  className = "",
  once = true,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) setVisible(false);
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);
  const movement = {
    up: `translateY(${distance})`,
    down: `translateY(-${distance})`,
    left: `translateX(-${distance})`,
    right: `translateX(${distance})`,
    none: "none",
  };
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : movement[direction],
    transition: `opacity ${duration}ms cubic-bezier(.25,.46,.45,.94) ${delay}ms, transform ${duration}ms cubic-bezier(.25,.46,.45,.94) ${delay}ms`,
  };
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
