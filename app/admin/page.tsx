"use client";

import { useEffect } from "react";

export default function AdminRedirectPage() {
  useEffect(() => {
    window.location.replace("/mgmt-panel.html");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-cream">
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-sm text-cream/80">Opening admin panel...</p>
        <a href="/mgmt-panel.html" className="mt-3 inline-block text-sm font-semibold text-gold underline">
          Click here if not redirected
        </a>
      </div>
    </main>
  );
}
