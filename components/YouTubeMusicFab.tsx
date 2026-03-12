"use client";

import { useEffect, useRef, useState } from "react";

export function YouTubeMusicFab() {
  const FIXED_VOLUME = 0.08;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = FIXED_VOLUME;
    audio.muted = false;
    audio.setAttribute("playsinline", "true");

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryAutoplay = async () => {
      try {
        audio.volume = FIXED_VOLUME;
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    };

    void tryAutoplay();

    const onFirstInteraction = () => {
      if (audio.paused) {
        void tryAutoplay();
      }
    };

    const interactionEvents = ["click", "touchstart", "keydown"];
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onFirstInteraction, { passive: true });
    });

    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 90 && currentY > lastY + 4) {
        setIsHiddenByScroll(true);
      } else if (currentY < lastY - 4 || currentY < 50) {
        setIsHiddenByScroll(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onFirstInteraction);
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, [FIXED_VOLUME]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  return (
    <div className="fixed right-4 top-[108px] z-50 flex flex-col items-end gap-2">
      <audio ref={audioRef} src="/assets/ram-chanting-108-times.mp3" loop preload="auto" />

      {!isHiddenByScroll && isOpen ? (
        <div className="glass w-[min(90vw,286px)] rounded-2xl border border-gold/40 p-3 transition">
          <p className="text-xs uppercase tracking-[0.14em] text-gold/80">Ram Dhun</p>
          <p className="mt-1 text-sm text-cream/80">Ram Chanting - 108 Times</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-ink transition hover:bg-gold"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <p className="text-xs text-cream/70">Auto volume 8%</p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsHiddenByScroll(false);
          setIsOpen((value) => !value);
        }}
        className="rounded-full border border-gold/40 bg-ink/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold transition hover:bg-ink"
      >
        {isOpen ? "Hide Audio" : "Show Audio"}
      </button>
    </div>
  );
}
