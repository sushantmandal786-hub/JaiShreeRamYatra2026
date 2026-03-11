"use client";

import { useEffect, useState } from "react";
import { LANGUAGE_LABELS, type LangCode } from "@/lib/site-config";

const CODES: LangCode[] = ["en", "hi", "hing"];

export function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("en");

  useEffect(() => {
    const current = window.__getSiteLang?.() ?? "en";
    setActive(current);
  }, []);

  const applyLang = (code: LangCode) => {
    window.__setSiteLang?.(code);
    setActive(code);
  };

  return (
    <div className="glass inline-flex items-center gap-1 rounded-full p-1 text-xs sm:text-sm">
      {CODES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => applyLang(code)}
          className={[
            "rounded-full px-3 py-1.5 transition",
            active === code
              ? "bg-saffron text-ink shadow-glow"
              : "bg-white/5 text-cream/80 hover:bg-white/10"
          ].join(" ")}
          aria-label={`Switch language to ${LANGUAGE_LABELS[code]}`}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
