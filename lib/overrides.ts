import { EVENT_DETAILS, OVERRIDE_STORAGE_KEY, type SiteOverrides } from "@/lib/site-config";

export function readSiteOverrides(): SiteOverrides {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as SiteOverrides;
  } catch {
    return {};
  }
}

export function resolveUpiId(overrides: SiteOverrides): string {
  if (overrides.upiNumber && /^\d+$/.test(overrides.upiNumber)) {
    return `${overrides.upiNumber}@upi`;
  }

  if (overrides.upiId && overrides.upiId.includes("@")) {
    return overrides.upiId;
  }

  return EVENT_DETAILS.primaryUpi;
}

export function resolveUpiNumber(overrides: SiteOverrides): string {
  if (overrides.upiNumber && /^\d+$/.test(overrides.upiNumber)) {
    return overrides.upiNumber;
  }
  return EVENT_DETAILS.primaryUpiNumber;
}

export function resolveDonateLabel(overrides: SiteOverrides): string | null {
  const value = overrides.buttons?.donateNow?.trim();
  return value ? value : null;
}

export function buildUpiLink({
  upiId,
  payeeName,
  amount,
  note
}: {
  upiId: string;
  payeeName: string;
  amount?: number;
  note: string;
}) {
  const params = new URLSearchParams();
  params.set("pa", upiId);
  params.set("pn", payeeName);
  params.set("tn", note);
  if (amount && amount > 0) {
    params.set("am", String(amount));
  }

  return `upi://pay?${params.toString()}`;
}
