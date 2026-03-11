export function MarqueeTicker() {
  const content = "॥ राम राम ॥ जय श्री राम ॥ ";

  return (
    <div className="relative overflow-hidden border-y border-gold/25 bg-black/35 py-2">
      <div className="marquee-track flex animate-ticker whitespace-nowrap font-marquee text-xl text-gold/90">
        <span className="pr-6">{content.repeat(16)}</span>
        <span>{content.repeat(16)}</span>
      </div>
    </div>
  );
}
