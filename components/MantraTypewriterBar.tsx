"use client";

import { useEffect, useRef, useState } from "react";

const MANTRA = "राम रामेति रामेति, रमे रामे मनोरमे । सहस्रनाम तत्तुल्यं, रामनाम वरानने ॥";

type Phase = "typing" | "hold" | "fade";

export function MantraTypewriterBar() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [index, setIndex] = useState(0);
  const holdMsRef = useRef(3600);

  useEffect(() => {
    const timers: number[] = [];

    if (phase === "typing") {
      if (index < MANTRA.length) {
        timers.push(
          window.setTimeout(() => {
            setIndex((value) => value + 1);
          }, 45)
        );
      } else {
        holdMsRef.current = 3000 + Math.floor(Math.random() * 2000);
        setPhase("hold");
      }
    } else if (phase === "hold") {
      timers.push(
        window.setTimeout(() => {
          setPhase("fade");
        }, holdMsRef.current)
      );
    } else {
      timers.push(
        window.setTimeout(() => {
          setIndex(0);
          setPhase("typing");
        }, 650)
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [index, phase]);

  return (
    <section className="sanskrit-fire-bar" aria-live="polite">
      <div className={`sanskrit-fire-write-wrap ${phase === "fade" ? "is-fading" : ""}`}>
        <p className="sanskrit-fire-text">
          {MANTRA.slice(0, index)}
          {phase !== "fade" ? <span className="sanskrit-caret">|</span> : null}
        </p>
      </div>
    </section>
  );
}
