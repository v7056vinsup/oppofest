import { useEffect, useRef } from "react";

export default function SpeedLines() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const line = document.createElement("div");
      const top = Math.random() * 100;
      const width = 60 + Math.random() * 200;
      const duration = 1.2 + Math.random() * 2;
      const delay = Math.random() * 3;
      const opacity = 0.03 + Math.random() * 0.07;

      line.style.cssText = `
        position: absolute;
        left: -${width}px;
        top: ${top}%;
        width: ${width}px;
        height: ${1 + Math.random() * 2}px;
        background: linear-gradient(90deg, transparent, rgba(224,27,27,${opacity * 10}), transparent);
        animation: speed-lines ${duration}s ${delay}s linear infinite;
        pointer-events: none;
      `;
      container.appendChild(line);
      lines.push(line);
    }

    return () => {
      lines.forEach((l) => l.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
