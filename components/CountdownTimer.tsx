"use client";

import { useEffect, useMemo, useState } from "react";
import { EVENT_DETAILS } from "@/lib/site-config";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diff(target: number): Countdown {
  const now = Date.now();
  const delta = Math.max(0, target - now);
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);
  const seconds = Math.floor((delta / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function CountdownTimer() {
  const target = useMemo(() => {
    const primary = new Date(EVENT_DETAILS.eventDateIso).getTime();
    const fallback = new Date(EVENT_DETAILS.fallbackDateIso).getTime();
    return Date.now() > primary ? fallback : primary;
  }, []);

  const [time, setTime] = useState<Countdown>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds]
  ] as const;

  return (
    <div className="glass grid grid-cols-4 gap-2 rounded-2xl p-3 sm:p-4">
      {blocks.map(([label, value]) => (
        <div key={label} className="rounded-xl bg-white/5 px-2 py-3 text-center">
          <div
            className="text-lg font-extrabold text-gold sm:text-2xl"
            style={{ textShadow: "0 0 10px rgba(244,195,90,0.45), 0 0 16px rgba(240,122,38,0.28)" }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-cream/70 sm:text-xs">{label}</div>
        </div>
      ))}
    </div>
  );
}
