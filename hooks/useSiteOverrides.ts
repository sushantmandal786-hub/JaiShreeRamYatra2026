"use client";

import { useEffect, useState } from "react";
import { fetchRemoteOverrides, readSiteOverrides } from "@/lib/overrides";
import { OVERRIDE_STORAGE_KEY, type SiteOverrides } from "@/lib/site-config";

export function useSiteOverrides() {
  const [overrides, setOverrides] = useState<SiteOverrides>({});

  useEffect(() => {
    const load = () => setOverrides(readSiteOverrides());
    load();

    const syncRemote = async () => {
      const base = readSiteOverrides();
      const remote = await fetchRemoteOverrides();
      if (!remote || Object.keys(remote).length === 0) {
        return;
      }

      const merged: SiteOverrides = {
        ...base,
        ...remote,
        hero: { ...(base.hero || {}), ...(remote.hero || {}) },
        buttons: { ...(base.buttons || {}), ...(remote.buttons || {}) },
        organizer: { ...(base.organizer || {}), ...(remote.organizer || {}) },
        counters: { ...(base.counters || {}), ...(remote.counters || {}) },
        textOverrides: { ...(base.textOverrides || {}), ...(remote.textOverrides || {}) }
      };

      try {
        localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event("shri-ram-overrides-change"));
      } catch {
        // ignore localStorage errors
      }

      setOverrides(merged);
    };

    void syncRemote();
    // Poll more frequently so admin panel changes feel near real-time.
    const interval = window.setInterval(syncRemote, 10000);

    const onFocus = () => {
      void syncRemote();
    };

    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== OVERRIDE_STORAGE_KEY) {
        return;
      }
      load();
    };

    const onCustomUpdate = () => load();

    window.addEventListener("storage", onStorage);
    window.addEventListener("shri-ram-overrides-change", onCustomUpdate);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("shri-ram-overrides-change", onCustomUpdate);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      window.clearInterval(interval);
    };
  }, []);

  return overrides;
}
