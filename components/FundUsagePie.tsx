export function FundUsagePie() {
  const items = [
    { label: "Security & Route", percent: 28 },
    { label: "Prasad & Bhog", percent: 22 },
    { label: "Decor & Lighting", percent: 19 },
    { label: "Seva Logistics", percent: 17 },
    { label: "Clean-up & Essentials", percent: 14 }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-center">
      <div className="mx-auto h-56 w-56 rounded-full border border-gold/40 shadow-glow md:h-64 md:w-64">
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(#f07a26 0 28%, #c45113 28% 50%, #f4c35a 50% 69%, #8d2a1b 69% 86%, #f9d98e 86% 100%)"
          }}
          role="img"
          aria-label="Fund usage pie chart"
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={item.label} data-pop="true" data-sequence={idx + 1} className="glass rounded-xl p-3 text-sm sm:text-base">
            <span className="font-semibold text-gold">{item.percent}%</span> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
