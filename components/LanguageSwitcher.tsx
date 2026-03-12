"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGE_LABELS, type LangCode } from "@/lib/site-config";

const CODES: LangCode[] = ["en", "hi", "hing"];

export function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("en");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = window.__getSiteLang?.() ?? "en";
    setActive(current);
  }, []);

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!wrapRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const applyLang = (code: LangCode) => {
    window.__setSiteLang?.(code);
    setActive(code);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="glass inline-flex min-w-[78px] items-center justify-center gap-2 rounded-full px-3 py-2 text-xs text-cream/90 transition hover:bg-white/10 sm:min-w-[90px] sm:text-sm"
        aria-expanded={open}
        aria-label="Open language options"
      >
        <span className="font-semibold text-gold">{LANGUAGE_LABELS[active]}</span>
        <svg viewBox="0 0 20 20" fill="none" className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}>
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="glass absolute right-0 top-[calc(100%+8px)] z-50 flex min-w-[130px] flex-col gap-1 rounded-xl p-1.5">
          {CODES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => applyLang(code)}
              className={[
                "rounded-lg px-3 py-2 text-left text-xs transition sm:text-sm",
                active === code
                  ? "bg-saffron text-ink shadow-glow"
                  : "bg-white/5 text-cream/85 hover:bg-white/10"
              ].join(" ")}
              aria-label={`Switch language to ${LANGUAGE_LABELS[code]}`}
            >
              {LANGUAGE_LABELS[code]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
