"use client";

import { useMemo } from "react";
import {
  buildUpiLink,
  resolveDonateLabel,
  resolveUpiId,
  resolveUpiNumber
} from "@/lib/overrides";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";

type DonateSettings = {
  upiUrl: string;
  upiId: string;
  upiNumber: string;
  donateLabel: string | null;
};

type UseDonateSettingsOptions = {
  amount?: number;
  note?: string;
};

export function useDonateSettings(options: UseDonateSettingsOptions = {}): DonateSettings {
  const overrides = useSiteOverrides();

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
    upiId,
    upiNumber,
    donateLabel
  };
}
