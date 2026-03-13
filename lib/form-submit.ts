import { APPS_SCRIPT_ENDPOINT, OVERRIDE_STORAGE_KEY, type SiteOverrides } from "@/lib/site-config";

type Payload = Record<string, string | number | boolean | null>;

function resolveEndpoint() {
  if (typeof window === "undefined") {
    return APPS_SCRIPT_ENDPOINT;
  }

  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) return APPS_SCRIPT_ENDPOINT;

    const parsed = JSON.parse(raw) as SiteOverrides;
    if (parsed.appsScriptUrl && parsed.appsScriptUrl.startsWith("https://")) {
      return parsed.appsScriptUrl;
    }
  } catch {
    // ignore malformed local storage
  }

  return APPS_SCRIPT_ENDPOINT;
}

/**
 * Fire-and-forget submit to Google Apps Script.
 * Uses mode: "no-cors" so we don't depend on CORS headers.
 * We assume success if the fetch does not throw.
 */
export async function submitToAppsScript(payload: Payload) {
  const endpoint = resolveEndpoint();

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: "shri-ram-navami-site"
    })
  });
}
