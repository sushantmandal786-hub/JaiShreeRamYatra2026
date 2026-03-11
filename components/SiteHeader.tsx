import Image from "next/image";
import { LangText } from "@/components/LangText";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { EVENT_DETAILS } from "@/lib/site-config";

const navItems = [
  { href: "#about", en: "About", hi: "परिचय", hing: "About", textKey: "nav_about" },
  { href: "#donation-impact", en: "Impact", hi: "प्रभाव", hing: "Impact", textKey: "nav_impact" },
  { href: "#gallery", en: "Gallery", hi: "गैलरी", hing: "Gallery", textKey: "nav_gallery" },
  { href: "#donate-now", en: "Donate", hi: "दान", hing: "Donate", textKey: "nav_donate" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Image src="/assets/logo.png" alt="Shri Ram Navami 2026" width={44} height={44} className="h-10 w-10 rounded-full border border-gold/50 bg-black/40 object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gold sm:text-base">Shri Ram Navami 2026</p>
            <p className="truncate text-[10px] uppercase tracking-[0.16em] text-cream/60 sm:text-xs">{EVENT_DETAILS.location}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-4 text-sm text-cream/85 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-gold">
              <LangText en={item.en} hi={item.hi} hing={item.hing} textKey={item.textKey} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/mgmt-panel.html"
            className="rounded-full border border-gold/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-gold transition hover:bg-gold/10 sm:text-xs"
          >
            <LangText en="Admin Login" hi="एडमिन लॉगिन" hing="Admin Login" textKey="admin_login_label" />
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
