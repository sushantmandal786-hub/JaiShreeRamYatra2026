"use client";

import Image from "next/image";
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
        <Image
          className="preloader-temple-art"
          src="/assets/ram-mandir-glow.png"
          alt="Ram Mandir art"
          width={2048}
          height={2048}
          priority
        />
        <div className="preloader-title-wrap">
          <div className="loader-typewriter" aria-hidden="true">
            <span className="loader-main-text">जय श्री राम</span>
          </div>
          <p className="preloader-devanagari">हिन्दू पुत्र संगठन</p>
        </div>
      </div>
    </div>
  );
}
