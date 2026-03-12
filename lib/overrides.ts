import {
  APPS_SCRIPT_ENDPOINT,
  DEFAULT_NEWSLETTER_POSTS,
  DEFAULT_ORGANIZER,
  DEFAULT_YATRA_TIMELINE,
  EVENT_DETAILS,
  OVERRIDE_STORAGE_KEY,
  type NewsletterPost,
  type OrganizerProfile,
  type YatraTimelinePoint,
  type SiteOverrides
} from "@/lib/site-config";

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
  const candidates = resolveUpiIdCandidates(overrides);
  return candidates.find((item) => isLikelyValidUpiId(item)) ?? candidates[0] ?? EVENT_DETAILS.primaryUpi;
}

export function resolveUpiNumber(overrides: SiteOverrides): string {
  if (overrides.upiNumber && /^\d+$/.test(overrides.upiNumber)) {
    return overrides.upiNumber;
  }
  return EVENT_DETAILS.primaryUpiNumber;
}

export function resolveUpiIdCandidates(overrides: SiteOverrides): string[] {
  const candidates = new Set<string>();
  const upiNumber = resolveUpiNumber(overrides);
  const rawUpi = overrides.upiId?.trim();

  if (rawUpi) {
    if (rawUpi.includes("@")) {
      candidates.add(rawUpi.toLowerCase());
    } else if (/^\d+$/.test(rawUpi)) {
      candidates.add(`${rawUpi}@ybl`);
      candidates.add(`${rawUpi}@ibl`);
      candidates.add(`${rawUpi}@axl`);
      candidates.add(`${rawUpi}@okaxis`);
    }
  } else if (upiNumber) {
    candidates.add(`${upiNumber}@ybl`);
    candidates.add(`${upiNumber}@ibl`);
    candidates.add(`${upiNumber}@axl`);
    candidates.add(`${upiNumber}@okaxis`);
  }

  candidates.add(EVENT_DETAILS.primaryUpi);

  return Array.from(candidates);
}

export function resolveDonateLabel(overrides: SiteOverrides): string | null {
  const value = overrides.buttons?.donateNow?.trim();
  return value ? value : null;
}

export function resolveHeroBackground(overrides: SiteOverrides): string {
  const value = overrides.hero?.backgroundImage?.trim();
  return value || "/assets/hanuman-meditating.jpeg";
}

export function resolveHeroOpacity(overrides: SiteOverrides): number {
  const raw = overrides.hero?.opacity;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.min(0.95, Math.max(0.1, raw));
  }
  return 0.48;
}

export function resolveLogoPath(overrides: SiteOverrides): string {
  const custom = overrides.logoPath?.trim();
  return custom || "/assets/shree_ram.jpg";
}

export function resolveOrganizer(overrides: SiteOverrides): OrganizerProfile {
  const incomingName = overrides.organizer?.name?.trim() || DEFAULT_ORGANIZER.name;
  const normalizedName = incomingName.toLowerCase() === "nagesh samrta" ? "Nagesh Samrat" : incomingName;

  return {
    name: normalizedName,
    designation: overrides.organizer?.designation?.trim() || DEFAULT_ORGANIZER.designation,
    phone: overrides.organizer?.phone?.trim() || DEFAULT_ORGANIZER.phone,
    whatsapp: overrides.organizer?.whatsapp?.trim() || DEFAULT_ORGANIZER.whatsapp,
    facebook: overrides.organizer?.facebook?.trim() || DEFAULT_ORGANIZER.facebook,
    image: overrides.organizer?.image?.trim() || DEFAULT_ORGANIZER.image
  };
}

export function resolveNewsletterPosts(overrides: SiteOverrides): NewsletterPost[] {
  const posts = overrides.newsletterPosts;
  if (!Array.isArray(posts) || posts.length === 0) {
    return DEFAULT_NEWSLETTER_POSTS;
  }

  return posts
    .filter((post) => post && typeof post.title === "string" && typeof post.content === "string")
    .map((post) => ({
      title: post.title.trim(),
      content: post.content.trim(),
      date: String(post.date || "").trim() || new Date().toISOString().slice(0, 10),
      image: post.image?.trim()
    }))
    .filter((post) => post.title && post.content)
    .slice(0, 20);
}

export function resolveYatraTimeline(overrides: SiteOverrides): YatraTimelinePoint[] {
  const points = overrides.yatraTimeline;
  if (!Array.isArray(points) || points.length === 0) {
    return DEFAULT_YATRA_TIMELINE;
  }

  return points
    .filter((point) => point && typeof point.time === "string" && typeof point.place === "string")
    .map((point) => ({
      time: point.time.trim(),
      place: point.place.trim(),
      note: point.note?.trim()
    }))
    .filter((point) => point.time && point.place)
    .slice(0, 20);
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
  params.set("cu", "INR");
  // Unique transaction reference to satisfy UPI app validation and avoid silent rejects.
  params.set("tr", `YATRA-${Date.now()}`);
  if (amount && amount > 0) {
    params.set("am", String(amount));
  }

  return `upi://pay?${params.toString().replace(/\+/g, "%20")}`;
}

export function isLikelyValidUpiId(upiId: string): boolean {
  const value = upiId.trim().toLowerCase();
  if (!value) {
    return false;
  }
  // Allow full numbers (e.g. 8651352594@ybl) and standard VPAs.
  if (!/^[a-z0-9.\-_]{2,256}@[a-z0-9A-Z]{2,64}$/.test(value)) {
    return false;
  }
  return true;
}

export async function fetchRemoteOverrides(): Promise<SiteOverrides | null> {
  if (typeof window === "undefined") {
    return null;
  }

  let endpoint = APPS_SCRIPT_ENDPOINT;
  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SiteOverrides;
      if (parsed.appsScriptUrl && parsed.appsScriptUrl.startsWith("https://")) {
        endpoint = parsed.appsScriptUrl;
      }
    }
  } catch {
    // ignore malformed local storage
  }

  if (!endpoint) {
    return null;
  }

  try {
    const url = new URL(endpoint);
    url.searchParams.set("mode", "overrides");
    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as SiteOverrides;
    if (!data || typeof data !== "object") {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
