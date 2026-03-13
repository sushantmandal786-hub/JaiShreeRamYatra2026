"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useDonateSettings } from "@/hooks/useDonateSettings";

export function StickyDonateBar() {
  const [visible, setVisible] = useState(false);
  const { upiUrl, upiIntentUrl, donateLabel } = useDonateSettings();

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
    const input = window.prompt(
      "Enter donation amount in INR (minimum ₹100).\n\nQuick options: 501, 1001, 2001, 5001, 10001",
      "501"
    );
    if (!input) return;
    const amount = Number(input.replace(/[^\d]/g, ""));
    if (!Number.isFinite(amount) || amount < 100) {
      window.alert("Minimum donation amount is ₹100.");
      return;
    }

    // #region agent log
    fetch("http://127.0.0.1:7277/ingest/151e46c7-9098-4746-8011-ac22d155f9eb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "2022aa"
      },
      body: JSON.stringify({
        sessionId: "2022aa",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "components/StickyDonateBar.tsx:openUpiCheckout",
        message: "Sticky donate bar click",
        data: { amount, upiUrl, upiIntentUrl, userAgent: window.navigator.userAgent },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion

    const base = new URL(upiUrl);
    base.searchParams.set("am", String(Math.round(amount)));
    const upiWithAmount = base.toString();
    const query = upiWithAmount.replace(/^upi:\/\/pay\?/, "");
    const intentWithAmount = `intent://pay?${query}#Intent;scheme=upi;S.browser_fallback_url=${encodeURIComponent(
      upiWithAmount
    )};end`;
    const isAndroid = /android/i.test(window.navigator.userAgent);

    if (isAndroid) {
      const before = Date.now();
      window.location.href = intentWithAmount;

      const fallbackTimer = window.setTimeout(() => {
        if (document.visibilityState === "hidden") return;
        if (Date.now() - before > 3000) return;
        window.location.href = upiWithAmount;
      }, 2000);

      document.addEventListener(
        "visibilitychange",
        () => {
          if (document.visibilityState === "hidden") {
            clearTimeout(fallbackTimer);
          }
        },
        { once: true }
      );
      return;
    }

    window.location.href = upiWithAmount;
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
