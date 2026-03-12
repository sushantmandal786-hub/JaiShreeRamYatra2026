"use client";

import { useDonationFeed } from "@/hooks/useDonationFeed";

function formatTime(iso: string | null) {
  if (!iso) {
    return "Just now";
  }
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) {
    return "Just now";
  }
  return value.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function RecentDonations() {
  const { recent, isLoading, hasRemoteFeed, error, lastUpdated } = useDonationFeed();

  return (
    <section className="rounded-3xl border border-maroon/20 bg-white p-5 shadow-[0_14px_30px_rgba(111,28,20,0.08)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-maroon sm:text-2xl">Live Donation Updates</h3>
        <p className="text-xs uppercase tracking-[0.14em] text-maroon/60">
          {lastUpdated ? `Last update: ${formatTime(lastUpdated)}` : "Awaiting updates"}
        </p>
      </div>

      {!hasRemoteFeed ? (
        <p className="mt-3 text-sm text-maroon/75">
          Add `Donation Feed URL` in admin panel to show real-time donation entries from Google Sheets/App Script.
        </p>
      ) : null}

      {isLoading ? <p className="mt-3 text-sm text-maroon/70">Fetching latest donations...</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      <div className="mt-4 space-y-2">
        {recent.length === 0 ? (
          <p className="rounded-xl border border-maroon/15 bg-cream px-4 py-3 text-sm text-maroon/70">
            Recent donations will appear here as soon as live feed data is available.
          </p>
        ) : (
          recent.slice(0, 6).map((item, index) => (
            <article
              key={`${item.name}-${item.amount}-${index}`}
              className="flex items-center justify-between rounded-xl border border-maroon/15 bg-cream px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-maroon">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-maroon/55">{formatTime(item.timestamp)}</p>
              </div>
              <p className="text-sm font-semibold text-deep-saffron">₹{Math.round(item.amount).toLocaleString("en-IN")}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
