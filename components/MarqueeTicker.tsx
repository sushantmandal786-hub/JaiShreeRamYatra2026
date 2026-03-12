export function MarqueeTicker() {
  const content = "॥ राम राम ॥ जय श्री राम ॥ ";

  return (
    <div className="sticky top-[72px] z-30 overflow-hidden border-y border-gold/25 bg-black/55 py-2 backdrop-blur-sm">
      <div className="marquee-track flex animate-ticker whitespace-nowrap font-marquee text-xl text-gold/90">
        <span className="pr-6">{content.repeat(16)}</span>
        <span>{content.repeat(16)}</span>
      </div>
    </div>
  );
}
