"use client";

import { useEffect, useMemo, useState } from "react";
import { useDonationFeed } from "@/hooks/useDonationFeed";
import { DEFAULT_COUNTERS, OVERRIDE_STORAGE_KEY } from "@/lib/site-config";

type Counters = typeof DEFAULT_COUNTERS;

function loadCounters(): Counters {
  if (typeof window === "undefined") {
    return DEFAULT_COUNTERS;
  }

  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_COUNTERS;
    }

    const parsed = JSON.parse(raw) as { counters?: Partial<Counters> };
    return {
      ...DEFAULT_COUNTERS,
      ...parsed.counters
    };
  } catch {
    return DEFAULT_COUNTERS;
  }
}

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.floor(target * progress));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export function LiveCounters() {
  const [counters, setCounters] = useState<Counters>(DEFAULT_COUNTERS);
  const { totalDonation, lastUpdated } = useDonationFeed();

  useEffect(() => setCounters(loadCounters()), []);

  const targetDonation = totalDonation ?? counters.donationAmount;
  const donation = useCountUp(targetDonation, 1500);
  const devotees = useCountUp(counters.devoteeCount, 1300);
  const volunteers = useCountUp(counters.volunteerCount, 1100);

  const cards = useMemo(
    () => [
      {
        label: "Total Donations",
        value: `₹${donation.toLocaleString("en-IN")}`
      },
      {
        label: "Devotees Joined",
        value: devotees.toLocaleString("en-IN")
      },
      {
        label: "Volunteers",
        value: volunteers.toLocaleString("en-IN")
      }
    ],
    [donation, devotees, volunteers]
  );

  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((card, idx) => (
        <article
          key={card.label}
          data-pop="true"
          data-sequence={idx + 1}
          className="glass rounded-2xl p-4 text-center sm:p-5"
        >
          <p
            className="text-xl font-extrabold text-gold sm:text-2xl"
            style={{ textShadow: "0 0 10px rgba(244,195,90,0.45), 0 0 16px rgba(240,122,38,0.28)" }}
          >
            {card.value}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cream/70 sm:text-sm">{card.label}</p>
          {idx === 0 && lastUpdated ? (
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/45 sm:text-xs">
              Updated {new Date(lastUpdated).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
