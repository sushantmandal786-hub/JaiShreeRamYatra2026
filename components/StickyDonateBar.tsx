"use client";

import { useEffect, useState } from "react";

export function StickyDonateBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#donate-now"
      className={[
        "fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-gold/50 bg-ink/90 px-5 py-3 text-sm font-semibold text-gold shadow-glow transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      ].join(" ")}
    >
      Donate Now • Jai Shri Ram
    </a>
  );
}
