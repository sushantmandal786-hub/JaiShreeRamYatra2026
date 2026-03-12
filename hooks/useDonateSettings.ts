"use client";

import { useMemo } from "react";
import {
  buildUpiLink,
  resolveDonateLabel,
  resolveUpiId,
  resolveUpiIdCandidates,
  isLikelyValidUpiId,
  resolveUpiNumber
} from "@/lib/overrides";
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

  const upiQuery = useMemo(() => upiUrl.replace(/^upi:\/\/pay\?/, ""), [upiUrl]);
  const upiIntentUrl = useMemo(() => `intent://pay?${upiQuery}#Intent;scheme=upi;end`, [upiQuery]);
  const gpayIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
    [upiQuery]
  );
  const phonepeIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`,
    [upiQuery]
  );
  const paytmIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`,
    [upiQuery]
  );
  const bhimIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
    [upiQuery]
  );
  const credIntentUrl = useMemo(
    () => `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.dreamplug.androidapp;end`,
    [upiQuery]
  );
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
