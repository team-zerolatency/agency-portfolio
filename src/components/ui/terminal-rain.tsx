"use client";

import { useEffect, useRef } from "react";

interface TerminalRainProps {
  className?: string;
  columnSpacing?: number;
}

export function TerminalRain({ className, columnSpacing = 28 }: TerminalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    interface Stream {
      x: number;
      y: number;
      speed: number;
      length: number;
      dotSize: number;
      opacity: number;
    }

    let streams: Stream[] = [];

    const initStreams = (width: number, height: number) => {
      const numCols = Math.max(12, Math.floor(width / columnSpacing));
      streams = Array.from({ length: numCols }, (_, i) => ({
        x: i * columnSpacing + columnSpacing / 2 + (Math.random() * 4 - 2),
        y: Math.random() * -height * 1.5,
        speed: 0.7 + Math.random() * 1.1,
        length: Math.floor(7 + Math.random() * 12),
        dotSize: 1.1 + Math.random() * 0.5,
        opacity: 0.18 + Math.random() * 0.25,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initStreams(rect.width, rect.height);
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(43, 140, 255, 0.45)";

      const step = 8; // spacing between dots in the line

      for (const stream of streams) {
        for (let j = 0; j < stream.length; j++) {
          const dotY = stream.y - j * step;
          if (dotY < -10 || dotY > rect.height + 10) continue;

          // Soft fade towards the tail
          const alphaFactor = Math.pow(1 - j / stream.length, 1.2);
          const alpha = stream.opacity * alphaFactor;

          if (j === 0) {
            // Soft leading head dot (soft cyan-blue, not harsh)
            ctx.fillStyle = `rgba(180, 220, 255, ${Math.min(alpha * 1.4, 0.65)})`;
            ctx.beginPath();
            ctx.arc(stream.x, dotY, stream.dotSize * 1.15, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Soft blue dotted trail
            ctx.fillStyle = `rgba(43, 140, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(stream.x, dotY, stream.dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        stream.y += stream.speed;

        if (stream.y - stream.length * step > rect.height) {
          stream.y = Math.random() * -80;
          stream.speed = 0.7 + Math.random() * 1.1;
          stream.length = Math.floor(7 + Math.random() * 12);
          stream.opacity = 0.18 + Math.random() * 0.25;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      observer.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      observer?.disconnect();
    };
  }, [columnSpacing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ filter: "blur(0.6px)" }}
    />
  );
}
