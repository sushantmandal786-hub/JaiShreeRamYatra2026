"use client";

import { FormEvent, MouseEvent, useState } from "react";
import { LangText } from "@/components/LangText";
import { useDonateSettings } from "@/hooks/useDonateSettings";
import { submitToAppsScript } from "@/lib/form-submit";
import { EVENT_DETAILS } from "@/lib/site-config";

type FormStatus = "idle" | "loading" | "success" | "error";

export function DonationForms() {
  const [donationStatus, setDonationStatus] = useState<FormStatus>("idle");
  const [volunteerStatus, setVolunteerStatus] = useState<FormStatus>("idle");
  const {
    upiUrl,
    upiId,
    upiCandidates,
    upiNumber,
    upiIntentUrl,
    gpayIntentUrl,
    phonepeIntentUrl,
    paytmIntentUrl,
    upiIdLooksValid,
    donateLabel
  } = useDonateSettings({ amount: 501 });

  const openUpiCheckout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const isAndroid = /android/i.test(window.navigator.userAgent);

    if (isAndroid) {
      window.location.href = upiIntentUrl;
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.location.href = upiUrl;
        }
      }, 700);
      return;
    }

    window.location.href = upiUrl;
  };

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
      <article className="rounded-2xl border border-maroon/20 bg-white p-4 shadow-[0_14px_30px_rgba(111,28,20,0.08)] sm:p-6" id="donate-now">
        <h3 className="text-xl font-semibold text-maroon">
          <LangText
            en="Donate for Yatra Seva"
            hi="यात्रा सेवा हेतु दान"
            hing="Yatra seva ke liye donate karein"
            textKey="donation_form_heading"
          />
        </h3>
        <p className="mt-1 text-sm text-maroon/80">
          <LangText
            en="Use UPI instant payment or submit this form for pledge confirmation."
            hi="तुरंत UPI भुगतान करें या प्रतिज्ञा पुष्टि के लिए यह फॉर्म भरें।"
            hing="UPI se instant payment karein ya pledge confirmation ke liye form bhariye."
            textKey="donation_form_subheading"
          />
        </p>
        <p className="mt-2 text-xs text-deep-saffron">UPI Number: {upiNumber}</p>
        <p className="text-xs text-maroon/70">UPI Payee: {upiId}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={upiUrl}
            onClick={openUpiCheckout}
            className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold"
          >
            {donateLabel ? (
              donateLabel
            ) : (
              <LangText
                en="Open UPI App"
                hi="UPI ऐप खोलें"
                hing="UPI app kholen"
                textKey="donate_button_primary"
              />
            )}
          </a>
          <a
            href={`https://wa.me/91${EVENT_DETAILS.contacts[0]}`}
            className="rounded-full border border-deep-saffron/45 px-4 py-2 text-sm font-semibold text-deep-saffron transition hover:bg-deep-saffron/10"
          >
            <LangText
              en="WhatsApp Seva Desk"
              hi="व्हाट्सएप सेवा डेस्क"
              hing="WhatsApp seva desk"
              textKey="whatsapp_desk_label"
            />
          </a>
          <a href={gpayIntentUrl} className="rounded-full border border-maroon/30 px-3 py-2 text-xs font-semibold text-maroon/90 hover:bg-maroon/5">
            Open in GPay
          </a>
          <a href={phonepeIntentUrl} className="rounded-full border border-maroon/30 px-3 py-2 text-xs font-semibold text-maroon/90 hover:bg-maroon/5">
            Open in PhonePe
          </a>
          <a href={paytmIntentUrl} className="rounded-full border border-maroon/30 px-3 py-2 text-xs font-semibold text-maroon/90 hover:bg-maroon/5">
            Open in Paytm
          </a>
        </div>
        {!upiIdLooksValid ? (
          <p className="mt-2 text-xs text-red-500">
            UPI ID may be incorrect. Please set exact VPA in admin panel.
          </p>
        ) : null}
        <p className="mt-2 text-xs text-maroon/60">Fallback IDs: {upiCandidates.slice(0, 3).join(" • ")}</p>

        <form className="mt-4 space-y-3" onSubmit={handleDonation}>
          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <input
            name="amount"
            required
            type="number"
            min={11}
            placeholder="Donation Amount (INR)"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <textarea
            name="note"
            rows={3}
            placeholder="Any message for seva team"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />

          <button
            type="submit"
            disabled={donationStatus === "loading"}
            className="w-full rounded-xl bg-gradient-to-r from-saffron to-gold px-4 py-3 text-sm font-semibold text-ink transition hover:opacity-90 disabled:opacity-60"
          >
            {donationStatus === "loading" ? (
              "Submitting..."
            ) : (
              <LangText
                en="Submit Donation Form"
                hi="दान फॉर्म जमा करें"
                hing="Donation form submit karein"
                textKey="donation_form_submit"
              />
            )}
          </button>

          {donationStatus === "error" ? (
            <p className="text-xs text-red-300">Submission failed. Please try again or use the UPI button.</p>
          ) : null}
        </form>
      </article>

      <article className="rounded-2xl border border-maroon/20 bg-white p-4 shadow-[0_14px_30px_rgba(111,28,20,0.08)] sm:p-6">
        <h3 className="text-xl font-semibold text-maroon">
          <LangText
            en="Volunteer for Seva"
            hi="सेवा हेतु वॉलंटियर बनें"
            hing="Seva ke liye volunteer banein"
            textKey="volunteer_form_heading"
          />
        </h3>
        <p className="mt-1 text-sm text-maroon/80">
          <LangText
            en="Join coordination, crowd support, prasad distribution and cleanup seva."
            hi="समन्वय, भीड़ सहयोग, प्रसाद वितरण और स्वच्छता सेवा में शामिल हों।"
            hing="Coordination, crowd support, prasad distribution aur cleanup seva mein judiyega."
            textKey="volunteer_form_subheading"
          />
        </p>

        <form className="mt-4 space-y-3" onSubmit={handleVolunteer}>
          <input
            name="name"
            required
            placeholder="Volunteer Name"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <input
            name="area"
            required
            placeholder="Your Local Area"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />
          <input
            name="availability"
            placeholder="Availability (Morning / Afternoon / Full Day)"
            className="w-full rounded-xl border border-maroon/20 bg-cream px-4 py-3 text-sm text-maroon outline-none placeholder:text-maroon/40 focus:border-deep-saffron/55"
          />

          <button
            type="submit"
            disabled={volunteerStatus === "loading"}
            className="w-full rounded-xl border border-deep-saffron/60 px-4 py-3 text-sm font-semibold text-deep-saffron transition hover:bg-saffron/10 disabled:opacity-60"
          >
            {volunteerStatus === "loading" ? (
              "Submitting..."
            ) : (
              <LangText
                en="Submit Volunteer Form"
                hi="वॉलंटियर फॉर्म जमा करें"
                hing="Volunteer form submit karein"
                textKey="volunteer_form_submit"
              />
            )}
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
