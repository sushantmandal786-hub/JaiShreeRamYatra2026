"use client";

import { useMemo } from "react";
import { resolveDonateLabel, resolveUpiId, resolveUpiIdCandidates, isLikelyValidUpiId, resolveUpiNumber, resolveOrganizer } from "@/lib/overrides";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";

type DonateSettings = {
  upiUrl: string;
  upiId: string;
  upiCandidates: string[];
  upiNumber: string;
  upiIntentUrl: string;
  gpayIntentUrl: string;
  phonepeIntentUrl: string;
  paytmIntentUrl: string;
  bhimIntentUrl: string;
  credIntentUrl: string;
  amazonIntentUrl: string;
  upiIdLooksValid: boolean;
  donateLabel: string | null;
};

type UseDonateSettingsOptions = {
  amount?: number;
  note?: string;
};

export function useDonateSettings(options: UseDonateSettingsOptions = {}): DonateSettings {
  const overrides = useSiteOverrides();

  const upiId = useMemo(() => resolveUpiId(overrides), [overrides]);
  const upiCandidates = useMemo(() => resolveUpiIdCandidates(overrides), [overrides]);
  const upiNumber = useMemo(() => resolveUpiNumber(overrides), [overrides]);
  const upiIdLooksValid = useMemo(() => isLikelyValidUpiId(upiId), [upiId]);
  const donateLabel = useMemo(() => resolveDonateLabel(overrides), [overrides]);

  const organizerName = useMemo(() => resolveOrganizer(overrides).name, [overrides]);

  // Minimal UPI link: only payee address, no amount, no note.
  const upiUrl = useMemo(() => `upi://pay?pa=${encodeURIComponent(upiId)}`, [upiId]);

  const upiQuery = useMemo(() => upiUrl.replace(/^upi:\/\/pay\?/, ""), [upiUrl]);
  const upiIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;S.browser_fallback_url=${encodeURIComponent(upiUrl)};end`,
    [upiQuery, upiUrl]
  );
  const gpayIntentUrl = useMemo(() => `tez://upi/pay?${upiQuery}`, [upiQuery]);
  const phonepeIntentUrl = useMemo(() => `phonepe://pay?${upiQuery}`, [upiQuery]);
  const paytmIntentUrl = useMemo(() => `paytmmp://pay?${upiQuery}`, [upiQuery]);
  const bhimIntentUrl = useMemo(() => `bhim://pay?${upiQuery}`, [upiQuery]);
  const credIntentUrl = useMemo(() => `credpay://upi/pay?${upiQuery}`, [upiQuery]);
  const amazonIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`,
    [upiQuery]
  );

  return {
    upiUrl,
    upiId,
    upiCandidates,
    upiNumber,
    upiIntentUrl,
    gpayIntentUrl,
    phonepeIntentUrl,
    paytmIntentUrl,
    bhimIntentUrl,
    credIntentUrl,
    amazonIntentUrl,
    upiIdLooksValid,
    donateLabel
  };
}
