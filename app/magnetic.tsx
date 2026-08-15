"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const box = el.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) {
      return;
    }
    el.style.transform = "translate(0, 0)";
  }

  return (
    <div className={`magnetic ${className}`.trim()} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
