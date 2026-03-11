"use client";

import { FormEvent, useMemo, useState } from "react";
import { submitToAppsScript } from "@/lib/form-submit";
import { EVENT_DETAILS } from "@/lib/site-config";

type FormStatus = "idle" | "loading" | "success" | "error";

export function DonationForms() {
  const [donationStatus, setDonationStatus] = useState<FormStatus>("idle");
  const [volunteerStatus, setVolunteerStatus] = useState<FormStatus>("idle");

  const upiUrl = useMemo(() => {
    const amount = 501;
    return `upi://pay?pa=${encodeURIComponent(EVENT_DETAILS.primaryUpi)}&pn=${encodeURIComponent(
      "Shri Ram Navami Yatra"
    )}&am=${amount}&tn=${encodeURIComponent("Shri Ram Navami Shobha Yatra Donation")}`;
  }, []);

  const handleDonation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setDonationStatus("loading");
    try {
      await submitToAppsScript({
        formType: "donation",
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        amount: String(form.get("amount") ?? ""),
        note: String(form.get("note") ?? "")
      });
      setDonationStatus("success");
      event.currentTarget.reset();
      window.location.href = "/thank-you";
    } catch {
      setDonationStatus("error");
    }
  };

  const handleVolunteer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setVolunteerStatus("loading");
    try {
      await submitToAppsScript({
        formType: "volunteer",
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        area: String(form.get("area") ?? ""),
        availability: String(form.get("availability") ?? "")
      });
      setVolunteerStatus("success");
      event.currentTarget.reset();
    } catch {
      setVolunteerStatus("error");
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="glass rounded-2xl p-4 sm:p-6" id="donate-now">
        <h3 className="text-xl font-semibold text-gold">Donate for Yatra Seva</h3>
        <p className="mt-1 text-sm text-cream/75">
          Use UPI instant payment or submit this form for pledge confirmation.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={upiUrl}
            className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold"
          >
            Open UPI App
          </a>
          <a
            href={`https://wa.me/91${EVENT_DETAILS.contacts[0]}`}
            className="rounded-full border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            WhatsApp Seva Desk
          </a>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleDonation}>
          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <input
            name="amount"
            required
            type="number"
            min={11}
            placeholder="Donation Amount (INR)"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <textarea
            name="note"
            rows={3}
            placeholder="Any message for seva team"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />

          <button
            type="submit"
            disabled={donationStatus === "loading"}
            className="w-full rounded-xl bg-gradient-to-r from-saffron to-gold px-4 py-3 text-sm font-semibold text-ink transition hover:opacity-90 disabled:opacity-60"
          >
            {donationStatus === "loading" ? "Submitting..." : "Submit Donation Form"}
          </button>

          {donationStatus === "error" ? (
            <p className="text-xs text-red-300">Submission failed. Please try again or use the UPI button.</p>
          ) : null}
        </form>
      </article>

      <article className="glass rounded-2xl p-4 sm:p-6">
        <h3 className="text-xl font-semibold text-gold">Volunteer for Seva</h3>
        <p className="mt-1 text-sm text-cream/75">Join coordination, crowd support, prasad distribution and cleanup seva.</p>

        <form className="mt-4 space-y-3" onSubmit={handleVolunteer}>
          <input
            name="name"
            required
            placeholder="Volunteer Name"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <input
            name="area"
            required
            placeholder="Your Local Area"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />
          <input
            name="availability"
            placeholder="Availability (Morning / Afternoon / Full Day)"
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-cream/50 focus:border-gold/50"
          />

          <button
            type="submit"
            disabled={volunteerStatus === "loading"}
            className="w-full rounded-xl border border-saffron/70 px-4 py-3 text-sm font-semibold text-gold transition hover:bg-saffron/10 disabled:opacity-60"
          >
            {volunteerStatus === "loading" ? "Submitting..." : "Submit Volunteer Form"}
          </button>

          {volunteerStatus === "success" ? (
            <p className="text-xs text-emerald-300">Thank you. Our seva coordinator will contact you soon.</p>
          ) : null}
          {volunteerStatus === "error" ? (
            <p className="text-xs text-red-300">Submission failed. Please call the primary contact.</p>
          ) : null}
        </form>
      </article>
    </div>
  );
}
