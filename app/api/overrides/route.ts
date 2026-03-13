import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const endpoint = process.env.APPS_SCRIPT_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json({ error: "APPS_SCRIPT_ENDPOINT not configured in .env.local" }, { status: 500 });
    }

    const url = new URL(endpoint);
    url.searchParams.set("mode", "overrides_get");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch overrides from GAS" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/overrides:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const endpoint = process.env.APPS_SCRIPT_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json({ error: "APPS_SCRIPT_ENDPOINT not configured in .env.local" }, { status: 500 });
    }

    const body = await request.json();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "overrides_set",
        data: body,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to sync overrides to GAS" }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/overrides:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
