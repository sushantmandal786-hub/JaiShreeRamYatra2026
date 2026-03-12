export type LangCode = "en" | "hi" | "hing";

export type OrganizerProfile = {
  name: string;
  designation: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  image: string;
};

export type NewsletterPost = {
  title: string;
  content: string;
  date: string;
  image?: string;
};

export type YatraTimelinePoint = {
  time: string;
  place: string;
  note?: string;
};

export const EVENT_DETAILS = {
  dateLabel: "Friday, 27 March 2026 • 1:00 PM onwards",
  location: "Rupaspur, Patna, Bihar",
  mapUrl: "https://maps.google.com/?q=Rupaspur+Patna+Bihar",
  organisers: [
    "Hindu Putra Sangathan, Rupaspur Madhyapur",
    "Shri Ram Navami Shobha Yatra Samiti, Patna, Bihar"
  ],
  contacts: ["8651352594", "9525407043", "9693597872", "77759941329", "79797800991"],
  primaryUpiNumber: "7909041154",
  primaryUpi: "7909041154@upi",
  fallbackDateIso: "2027-04-15T13:00:00+05:30",
  eventDateIso: "2026-03-27T13:00:00+05:30"
} as const;

export const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw8vH3y9DWFbNVK00filTzgE_UEIChF75osSFIzJRwaI_67sVphTjmi_VK35gzxW4gw/exec";

export const YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&loop=1&playlist=5qap5aO4i9A";

export const OVERRIDE_STORAGE_KEY = "shri_ram_overrides";

export const DEFAULT_COUNTERS = {
  donationAmount: 2451200,
  devoteeCount: 18240,
  volunteerCount: 512
};

export const DEFAULT_ORGANIZER: OrganizerProfile = {
  name: "Nagesh Samrat",
  designation: "मुख्य संयोजक (Chief Organizer)",
  phone: "8651352594",
  whatsapp: "8651352594",
  facebook: "",
  image: "/assets/nagesh.jpg"
};

export const DEFAULT_NEWSLETTER_POSTS: NewsletterPost[] = [
  {
    title: "Route Seva Planning Completed",
    content:
      "Core volunteer teams finalized route support, hydration points, and discipline checkpoints for smooth procession movement.",
    date: "2026-03-10",
    image: "/assets/moment1.jpg"
  },
  {
    title: "Bhajan Mandali Rehearsal Update",
    content:
      "Local bhajan groups completed coordinated rehearsal for evening devotion segments and kirtan transitions.",
    date: "2026-03-09",
    image: "/assets/moment2.jpg"
  }
];

export const DEFAULT_YATRA_TIMELINE: YatraTimelinePoint[] = [
  { time: "01:00 PM", place: "Rupaspur Main Gate", note: "Shobha Yatra flag-off and sankalp" },
  { time: "02:00 PM", place: "Madhyapur Chowk", note: "Bhajan halt and jal seva" },
  { time: "03:15 PM", place: "Hanuman Mandir Stop", note: "Aarti and mantra path" },
  { time: "04:30 PM", place: "Samudayik Ground", note: "Prasad distribution and seva announcements" }
];

export type SiteOverrides = {
  appsScriptUrl?: string;
  donationFeedUrl?: string;
  upiId?: string;
  upiNumber?: string;
  logoPath?: string;
  hero?: {
    backgroundImage?: string;
    opacity?: number;
  };
  buttons?: {
    donateNow?: string;
  };
  organizer?: Partial<OrganizerProfile>;
  newsletterPosts?: NewsletterPost[];
  yatraTimeline?: YatraTimelinePoint[];
  counters?: Partial<typeof DEFAULT_COUNTERS>;
  textOverrides?: Record<
    string,
    {
      en?: string;
      hi?: string;
      hing?: string;
    }
  >;
};

export const LANGUAGE_LABELS: Record<LangCode, string> = {
  en: "EN",
  hi: "हिं",
  hing: "HING"
};
