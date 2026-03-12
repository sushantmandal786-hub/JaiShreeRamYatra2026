"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useDonateSettings } from "@/hooks/useDonateSettings";

export function StickyDonateBar() {
  const [visible, setVisible] = useState(false);
  const { upiUrl, upiIntentUrl, donateLabel } = useDonateSettings({ amount: 501 });

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openUpiCheckout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const isAndroid = /android/i.test(window.navigator.userAgent);

    if (isAndroid) {
      window.location.href = upiIntentUrl;
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.location.href = upiUrl;
        }
      }, 700);
      return;
    }

    window.location.href = upiUrl;
  };

  return (
    <a
      href={upiUrl}
      onClick={openUpiCheckout}
      className={[
        "fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-gold/50 bg-ink/90 px-5 py-3 text-sm font-semibold text-gold shadow-glow transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      ].join(" ")}
    >
      {donateLabel ?? "Donate Now"} • Jai Shri Ram
    </a>
  );
}
