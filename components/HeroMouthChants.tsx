"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type Chant = {
  id: number;
  text: string;
  dx: number;
  dy: number;
  rotate: number;
  duration: number;
};

const CHANT_TEXT = ["राम", "राम", "श्री राम", "राम राम", "जय श्री राम"];

let globalId = 1;

export function HeroMouthChants() {
  const [chants, setChants] = useState<Chant[]>([]);

  const seedTexts = useMemo(() => CHANT_TEXT, []);

  useEffect(() => {
    const spawn = () => {
      const count = 3 + Math.floor(Math.random() * 2);
      const batch: Chant[] = Array.from({ length: count }).map((_, index) => ({
        id: globalId++,
        text: seedTexts[Math.floor(Math.random() * seedTexts.length)],
        dx: 56 + Math.random() * 62,
        dy: -30 - Math.random() * 76,
        rotate: -10 + Math.random() * 18,
        duration: 2200 + Math.random() * 920 + index * 95
      }));

      setChants((current) => [...current, ...batch]);

      batch.forEach((item) => {
        window.setTimeout(() => {
          setChants((current) => current.filter((entry) => entry.id !== item.id));
        }, item.duration + 120);
      });
    };

    spawn();
    const timer = window.setInterval(spawn, 1700);

    return () => window.clearInterval(timer);
  }, [seedTexts]);

  return (
    <div className="hero-mouth-origin" aria-hidden="true">
      {chants.map((chant) => (
        <span
          key={chant.id}
          className="hero-mouth-mantra"
          style={
            {
              "--dx": `${chant.dx}px`,
              "--dy": `${chant.dy}px`,
              "--rot": `${chant.rotate}deg`,
              "--dur": `${chant.duration}ms`
            } as CSSProperties
          }
        >
          {chant.text}
        </span>
      ))}
    </div>
  );
}
