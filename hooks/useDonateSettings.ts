"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildUpiLink,
  readSiteOverrides,
  resolveDonateLabel,
  resolveUpiId,
  resolveUpiNumber
} from "@/lib/overrides";
import { OVERRIDE_STORAGE_KEY, type SiteOverrides } from "@/lib/site-config";

type DonateSettings = {
  upiUrl: string;
  upiNumber: string;
  donateLabel: string | null;
};

type UseDonateSettingsOptions = {
  amount?: number;
  note?: string;
};

export function useDonateSettings(options: UseDonateSettingsOptions = {}): DonateSettings {
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

  const upiId = useMemo(() => resolveUpiId(overrides), [overrides]);
  const upiNumber = useMemo(() => resolveUpiNumber(overrides), [overrides]);
  const donateLabel = useMemo(() => resolveDonateLabel(overrides), [overrides]);

  const upiUrl = useMemo(
    () =>
      buildUpiLink({
        upiId,
        payeeName: "Shri Ram Navami Yatra",
        amount: options.amount,
        note: options.note ?? "Shri Ram Navami Shobha Yatra Donation"
      }),
    [options.amount, options.note, upiId]
  );

  return {
    upiUrl,
    upiNumber,
    donateLabel
  };
}
