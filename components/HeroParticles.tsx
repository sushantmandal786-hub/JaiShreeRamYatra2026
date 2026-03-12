"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Chant = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  text: string;
};

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animation = 0;
    const particles: Particle[] = [];
    const chants: Chant[] = [];

    const createParticles = (width: number, height: number) => {
      particles.length = 0;
      chants.length = 0;
      const count = Math.max(36, Math.floor(width / 28));
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.6 + 0.8
        });
      }

      const chantCount = 2;
      for (let i = 0; i < chantCount; i += 1) {
        chants.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.07 + 0.06,
          vy: (Math.random() - 0.5) * 0.03,
          size: Math.random() * 10 + 18,
          alpha: Math.random() * 0.08 + 0.1,
          text: Math.random() > 0.5 ? "राम" : "राम राम"
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(width, height);
    };

    const step = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
        }
        if (p.y < 0 || p.y > height) {
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(244, 195, 90, 0.72)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const chant of chants) {
        chant.x += chant.vx;
        chant.y += chant.vy;

        if (chant.x > width + 120) {
          chant.x = -140;
          chant.y = Math.random() * height;
        }
        if (chant.y < -20) {
          chant.y = height + 20;
        }
        if (chant.y > height + 20) {
          chant.y = -20;
        }

        ctx.font = `${chant.size}px "Hind", "Noto Sans Devanagari", sans-serif`;
        ctx.fillStyle = `rgba(255, 235, 198, ${chant.alpha})`;
        ctx.fillText(chant.text, chant.x, chant.y);
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = 1 - dist / 110;
            ctx.strokeStyle = `rgba(240, 122, 38, ${alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animation = requestAnimationFrame(step);
    };

    resize();
    animation = requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
