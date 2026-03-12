"use client";

import { useEffect, useState } from "react";
import { readSiteOverrides } from "@/lib/overrides";
import { OVERRIDE_STORAGE_KEY, type SiteOverrides } from "@/lib/site-config";

export function useSiteOverrides() {
  const [overrides, setOverrides] = useState<SiteOverrides>({});

  useEffect(() => {
    const load = () => setOverrides(readSiteOverrides());
    load();

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
    };
  }, []);

  return overrides;
}
