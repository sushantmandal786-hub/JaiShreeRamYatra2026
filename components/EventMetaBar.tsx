import { LangText } from "@/components/LangText";
import { EVENT_DETAILS } from "@/lib/site-config";

export function EventMetaBar() {
  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
      <p className="text-cream/90">
        <strong className="text-gold">Date:</strong> {EVENT_DETAILS.dateLabel}
      </p>

      <a href={EVENT_DETAILS.mapUrl} target="_blank" rel="noreferrer" className="rounded-full border border-gold/40 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gold transition hover:bg-gold/10 sm:text-sm">
        <LangText
          en="Open Location"
          hi="लोकेशन खोलें"
          hing="Location kholen"
          textKey="open_location_label"
        />
      </a>
    </div>
  );
}
