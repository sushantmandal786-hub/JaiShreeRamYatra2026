import { APPS_SCRIPT_ENDPOINT, OVERRIDE_STORAGE_KEY } from "@/lib/site-config";

type Payload = Record<string, string | number | boolean | null>;

function resolveEndpoint() {
  if (typeof window === "undefined") {
    return APPS_SCRIPT_ENDPOINT;
  }

  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) {
      return APPS_SCRIPT_ENDPOINT;
    }

    const parsed = JSON.parse(raw) as { appsScriptUrl?: string };
    if (parsed.appsScriptUrl && parsed.appsScriptUrl.startsWith("https://")) {
      return parsed.appsScriptUrl;
    }
  } catch {
    // ignore malformed local storage
  }

  return APPS_SCRIPT_ENDPOINT;
}

export async function submitToAppsScript(payload: Payload) {
  const endpoint = resolveEndpoint();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: "shri-ram-navami-site"
    })
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response;
}
