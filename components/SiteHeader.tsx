import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { EVENT_DETAILS } from "@/lib/site-config";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#donation-impact", label: "Impact" },
  { href: "#gallery", label: "Gallery" },
  { href: "#donate-now", label: "Donate" }
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
              {item.label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
