"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LangText } from "@/components/LangText";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";
import { resolveLogoPath } from "@/lib/overrides";
const navItems = [
  { href: "#about", en: "About", hi: "परिचय", hing: "About", textKey: "nav_about" },
  { href: "#donation-impact", en: "Impact", hi: "प्रभाव", hing: "Impact", textKey: "nav_impact" },
  { href: "#gallery", en: "Gallery", hi: "गैलरी", hing: "Gallery", textKey: "nav_gallery" },
  { href: "#timeline", en: "Timeline", hi: "समयरेखा", hing: "Timeline", textKey: "nav_timeline" },
  { href: "#newsletter", en: "Newsletter", hi: "अपडेट", hing: "Newsletter", textKey: "nav_newsletter" },
  { href: "#donate-now", en: "Donate", hi: "दान", hing: "Donate", textKey: "nav_donate" }
];

export function SiteHeader() {
  const overrides = useSiteOverrides();
  const logoPath = resolveLogoPath(overrides);
  const [resolvedLogo, setResolvedLogo] = useState(logoPath);

  useEffect(() => {
    setResolvedLogo(logoPath);
  }, [logoPath]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="relative flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Image
            src={resolvedLogo}
            alt="Shri Ram Navami 2026"
            width={44}
            height={44}
            onError={() => setResolvedLogo("/assets/shree_ram.jpg")}
            className="h-10 w-10 rounded-full border border-gold/50 bg-black/40 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-tight text-gold sm:text-lg">
              <LangText en="Shri Ram Navami" hi="श्री राम नवमी" hing="Shri Ram Navami" textKey="brand_line_1" />
            </p>
            <p className="truncate text-[11px] font-medium tracking-[0.04em] text-cream/82 sm:text-sm">
              <LangText
                en="Bhavya Shobha Yatra 2026"
                hi="भव्य शोभा यात्रा 2026"
                hing="Bhavya Shobha Yatra 2026"
                textKey="brand_line_2"
              />
            </p>
          </div>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-5 text-sm text-cream/85 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-gold">
              <LangText en={item.en} hi={item.hi} hing={item.hing} textKey={item.textKey} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/mgmt-panel.html"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 text-gold transition hover:bg-gold/10"
            aria-label="Admin Login"
            title="Admin Login"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.14 0-7.5 2.24-7.5 5v1h15v-1c0-2.76-3.36-5-7.5-5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
