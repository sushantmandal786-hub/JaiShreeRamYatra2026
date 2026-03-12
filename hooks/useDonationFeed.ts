"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";

export type RecentDonation = {
  name: string;
  amount: number;
  timestamp: string | null;
};

type DonationFeedState = {
  totalDonation: number | null;
  recent: RecentDonation[];
  lastUpdated: string | null;
  isLoading: boolean;
  hasRemoteFeed: boolean;
  error: string | null;
};

function toAmount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

function toTimestamp(value: unknown): string | null {
  if (!value) {
    return null;
  }
  const parsed = new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed.toISOString();
}

function normalizeRecent(items: unknown): RecentDonation[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const row = item as Record<string, unknown>;
      const amount =
        toAmount(row.amount) ??
        toAmount(row.donationAmount) ??
        toAmount(row.total) ??
        toAmount(row.value) ??
        null;

      if (!amount) {
        return null;
      }

      const name =
        String(row.name ?? row.donorName ?? row.donor ?? row.devotee ?? row.person ?? `Donor ${index + 1}`).trim();

      const timestamp =
        toTimestamp(row.timestamp) ??
        toTimestamp(row.time) ??
        toTimestamp(row.date) ??
        toTimestamp(row.submittedAt) ??
        null;

      return {
        name: name || `Donor ${index + 1}`,
        amount,
        timestamp
      };
    })
    .filter((item): item is RecentDonation => Boolean(item))
    .sort((a, b) => {
      if (!a.timestamp || !b.timestamp) {
        return 0;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
}

function parseFeedPayload(payload: unknown) {
  if (Array.isArray(payload)) {
    const recent = normalizeRecent(payload);
    const total = recent.reduce((sum, row) => sum + row.amount, 0);
    return {
      totalDonation: total || null,
      recent,
      lastUpdated: recent[0]?.timestamp ?? null
    };
  }

  if (!payload || typeof payload !== "object") {
    return { totalDonation: null, recent: [], lastUpdated: null };
  }

  const data = payload as Record<string, unknown>;
  const listCandidate =
    data.recentDonations ??
    data.recent ??
    data.donations ??
    data.transactions ??
    data.rows ??
    data.entries ??
    data.data ??
    [];

  const recent = normalizeRecent(listCandidate);
  const totalDonation =
    toAmount(data.totalDonation) ??
    toAmount(data.total_donation) ??
    toAmount(data.totalAmount) ??
    toAmount(data.total) ??
    toAmount(data.amountSum) ??
    (recent.length ? recent.reduce((sum, row) => sum + row.amount, 0) : null);

  const lastUpdated =
    toTimestamp(data.lastUpdated) ??
    toTimestamp(data.lastDonationTime) ??
    toTimestamp(data.last_donation_time) ??
    recent[0]?.timestamp ??
    null;

  return { totalDonation, recent, lastUpdated };
}

export function useDonationFeed() {
  const overrides = useSiteOverrides();
  const [state, setState] = useState<DonationFeedState>({
    totalDonation: null,
    recent: [],
    lastUpdated: null,
    isLoading: false,
    hasRemoteFeed: false,
    error: null
  });

  const endpoint = useMemo(() => {
    const custom = overrides.donationFeedUrl?.trim();
    if (custom && custom.startsWith("http")) {
      return custom;
    }

    const appsScript = overrides.appsScriptUrl?.trim();
    if (appsScript && appsScript.startsWith("http")) {
      const separator = appsScript.includes("?") ? "&" : "?";
      return `${appsScript}${separator}mode=donation_feed`;
    }

    return "";
  }, [overrides.appsScriptUrl, overrides.donationFeedUrl]);

  useEffect(() => {
    if (!endpoint) {
      setState((previous) => ({
        ...previous,
        hasRemoteFeed: false,
        isLoading: false,
        error: null
      }));
      return;
    }

    let disposed = false;

    const load = async () => {
      setState((previous) => ({ ...previous, isLoading: true, hasRemoteFeed: true }));
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = (await response.json()) as unknown;
        const parsed = parseFeedPayload(json);

        if (!disposed) {
          setState({
            totalDonation: parsed.totalDonation,
            recent: parsed.recent.slice(0, 8),
            lastUpdated: parsed.lastUpdated,
            isLoading: false,
            hasRemoteFeed: true,
            error: null
          });
        }
      } catch {
        if (!disposed) {
          setState((previous) => ({
            ...previous,
            isLoading: false,
            hasRemoteFeed: true,
            error: "Live feed unavailable"
          }));
        }
      }
    };

    load();
    const interval = window.setInterval(load, 45000);

    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [endpoint]);

  return state;
}
