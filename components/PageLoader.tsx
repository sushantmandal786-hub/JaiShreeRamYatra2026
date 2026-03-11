"use client";

import { useEffect, useState } from "react";

type PageLoaderProps = {
  durationMs?: number;
};

export function PageLoader({ durationMs = 3000 }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const EXIT_ANIMATION_MS = 650;
    const exitAt = Math.max(0, durationMs - EXIT_ANIMATION_MS);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, exitAt);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = previousOverflow;
    }, durationMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [durationMs]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`preloader-overlay ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Shri Ram Navami website"
    >
      <div className="preloader-content">
        <svg className="preloader-svg" viewBox="0 0 760 180" aria-hidden="true">
          <text x="50%" y="56%" textAnchor="middle" className="preloader-script-text">
            Jai Shree Ram
          </text>
        </svg>
        <p className="preloader-devanagari">॥ जय श्री राम ॥</p>
        <video
          className="preloader-flag-video"
          src="/assets/saffron-flag.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}
