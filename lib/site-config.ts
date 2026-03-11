export type LangCode = "en" | "hi" | "hing";

export const EVENT_DETAILS = {
  dateLabel: "Friday, 27 March 2026 • 1:00 PM onwards",
  location: "Rupaspur, Patna, Bihar",
  mapUrl: "https://maps.google.com/?q=Rupaspur+Patna+Bihar",
  organisers: [
    "Hindu Putra Sangathan, Rupaspur Madhyapur",
    "Shri Ram Navami Shobha Yatra Samiti, Patna, Bihar"
  ],
  contacts: ["8651352594", "9525407043", "9693597872", "77759941329", "79797800991"],
  primaryUpi: "8651352594@upi",
  fallbackDateIso: "2027-04-15T13:00:00+05:30",
  eventDateIso: "2026-03-27T13:00:00+05:30"
} as const;

export const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec";

export const YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&loop=1&playlist=5qap5aO4i9A";

export const OVERRIDE_STORAGE_KEY = "shri_ram_overrides";

export const DEFAULT_COUNTERS = {
  donationAmount: 2451200,
  devoteeCount: 18240,
  volunteerCount: 512
};

export const LANGUAGE_LABELS: Record<LangCode, string> = {
  en: "EN",
  hi: "हिं",
  hing: "HING"
};
