"use client";

import { useState } from "react";
import { YOUTUBE_EMBED_URL } from "@/lib/site-config";

export function YouTubeMusicFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="glass overflow-hidden rounded-2xl border border-gold/40">
          <iframe
            title="Ram Bhajan Player"
            className="h-48 w-72 max-w-[80vw]"
            src={YOUTUBE_EMBED_URL}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-saffron px-4 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-gold"
        aria-label="Toggle devotional music player"
      >
        {open ? "Close Bhajan" : "Play Bhajan"}
      </button>
    </div>
  );
}
