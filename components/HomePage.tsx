"use client";

import Image from "next/image";
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DonationForms } from "@/components/DonationForms";
import { FundUsagePie } from "@/components/FundUsagePie";
import { HeroMouthChants } from "@/components/HeroMouthChants";
import { HeroParticles } from "@/components/HeroParticles";
import { LangText } from "@/components/LangText";
import { LiveCounters } from "@/components/LiveCounters";
import { MantraTypewriterBar } from "@/components/MantraTypewriterBar";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { PageLoader } from "@/components/PageLoader";
import { RecentDonations } from "@/components/RecentDonations";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyDonateBar } from "@/components/StickyDonateBar";
import { YouTubeMusicFab } from "@/components/YouTubeMusicFab";
import { useDonateSettings } from "@/hooks/useDonateSettings";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import {
  resolveHeroBackground,
  resolveHeroOpacity,
  resolveNewsletterPosts,
  resolveOrganizer,
  resolveYatraTimeline
} from "@/lib/overrides";
import { EVENT_DETAILS } from "@/lib/site-config";

const impactBlocks = [
  {
    title: "Route Lighting Seva",
    text: "Devotional pathway lights across the route for safe, peaceful darshan movement."
  },
  {
    title: "Jal Seva & First-Aid",
    text: "Drinking water points, medical aid, and volunteer support for yatris of all ages."
  },
  {
    title: "Bhajan & Sound Setup",
    text: "Kirtan sound arrangements and devotional announcements at key yatra stoppages."
  },
  {
    title: "Prasad Annaseva",
    text: "Hygienic prasad preparation and community-wide distribution with discipline and respect."
  },
  {
    title: "Clean Yatra Mission",
    text: "Post-yatra cleanup and route restoration so our seva leaves behind only blessings."
  }
];

const testimonialCards = [
  {
    no: "01",
    quote: "The entire neighborhood felt united in devotion. It truly became one Ram parivar.",
    name: "Local Devotee, Rupaspur"
  },
  {
    no: "02",
    quote: "Donation was quick, transparent, and respectful. Every contribution felt purposeful.",
    name: "Seva Contributor, Patna"
  },
  {
    no: "03",
    quote: "Volunteer management was disciplined and kind. The spiritual energy was unforgettable.",
    name: "Youth Volunteer"
  }
];

const features = [
  "24/7 yatra helpline for guidance and support.",
  "Clear route and timing updates for all families.",
  "Instant UPI donation flow with one tap.",
  "Visible counters and transparent fund usage.",
  "Volunteer onboarding for on-ground coordination.",
  "Safe, disciplined, and devotion-first atmosphere."
];

const galleryItems = [
  "/assets/gallery1.jpg",
  "/assets/gallery2.jpg",
  "/assets/gallery3.jpg",
  "/assets/gallery4.jpg",
  "/assets/gallery5.jpg",
  "/assets/gallery6.jpg"
];

const communityCards = [
  {
    title: "Yuva Seva Orientation",
    text: "Local youth receiving route, discipline and emergency seva briefing.",
    image: "/assets/moment1.jpg"
  },
  {
    title: "Bhajan Mandali Preparation",
    text: "Women-led devotional groups preparing bhajans for the yatra day.",
    image: "/assets/moment2.jpg"
  },
  {
    title: "Prasad Seva Planning",
    text: "Community coordination for clean preparation and smooth prasad distribution.",
    image: "/assets/moment3.jpg"
  }
];

export function HomePage() {
  useScrollAnimations();
  const { upiUrl, upiIntentUrl, donateLabel } = useDonateSettings();
  const overrides = useSiteOverrides();
  const heroBackground = resolveHeroBackground(overrides);
  const heroOpacity = resolveHeroOpacity(overrides);
  const organizer = resolveOrganizer(overrides);
  const newsletterPosts = resolveNewsletterPosts(overrides);
  const yatraTimeline = resolveYatraTimeline(overrides);
  const [organizerImage, setOrganizerImage] = useState(organizer.image);
  const heroSceneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOrganizerImage(organizer.image);
  }, [organizer.image]);

  useEffect(() => {
    const section = heroSceneRef.current;
    if (!section) {
      return;
    }

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer) {
      return;
    }

    const onMove = (event: globalThis.MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      section.style.setProperty("--hero-tilt-x", `${(-py * 4).toFixed(2)}deg`);
      section.style.setProperty("--hero-tilt-y", `${(px * 5).toFixed(2)}deg`);
      section.style.setProperty("--hero-shift-x", `${(px * 18).toFixed(0)}px`);
      section.style.setProperty("--hero-shift-y", `${(py * 14).toFixed(0)}px`);
    };

    const onLeave = () => {
      section.style.setProperty("--hero-tilt-x", "0deg");
      section.style.setProperty("--hero-tilt-y", "0deg");
      section.style.setProperty("--hero-shift-x", "0px");
      section.style.setProperty("--hero-shift-y", "0px");
    };

    section.addEventListener("mousemove", onMove as EventListener);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove as EventListener);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const openUpiCheckout = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const input = window.prompt(
      "Enter donation amount in INR (minimum ₹100).\n\nQuick options: 501, 1001, 2001, 5001, 10001",
      "501"
    );
    if (!input) return;
    const amount = Number(input.replace(/[^\d]/g, ""));
    if (!Number.isFinite(amount) || amount < 100) {
      window.alert("Minimum donation amount is ₹100.");
      return;
    }

    // #region agent log
    fetch("http://127.0.0.1:7277/ingest/151e46c7-9098-4746-8011-ac22d155f9eb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "2022aa"
      },
      body: JSON.stringify({
        sessionId: "2022aa",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "components/HomePage.tsx:openUpiCheckout",
        message: "Hero donate clicked",
        data: { amount, upiUrl, userAgent: window.navigator.userAgent },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion

    const base = new URL(upiUrl);
    base.searchParams.set("am", String(Math.round(amount)));
    const upiWithAmount = base.toString();
    const query = upiWithAmount.replace(/^upi:\/\/pay\?/, "");
    const intentWithAmount = `intent://pay?${query}#Intent;scheme=upi;S.browser_fallback_url=${encodeURIComponent(
      upiWithAmount
    )};end`;
    const isAndroid = /android/i.test(window.navigator.userAgent);

    if (isAndroid) {
      const before = Date.now();
      window.location.href = intentWithAmount;

      const fallbackTimer = window.setTimeout(() => {
        if (document.visibilityState === "hidden") return;
        if (Date.now() - before > 3000) return;
        window.location.href = upiWithAmount;
      }, 2000);

      document.addEventListener(
        "visibilitychange",
        () => {
          if (document.visibilityState === "hidden") {
            clearTimeout(fallbackTimer);
          }
        },
        { once: true }
      );
      return;
    }

    window.location.href = upiWithAmount;
  };

  return (
    <main className="bg-ink text-cream" id="top">
      <PageLoader durationMs={3000} />
      <SiteHeader />
      <MarqueeTicker />

      <section ref={heroSceneRef} className="hero-3d-scene relative h-[212svh] bg-hero-noise">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={heroBackground}
            alt=""
            fill
            priority
            className="hero-bg-depth object-cover object-[center_58%] sm:object-[center_52%] lg:object-[center_46%]"
            style={{ opacity: heroOpacity }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,10,8,0.86)_0%,rgba(15,10,8,0.68)_44%,rgba(15,10,8,0.9)_100%)]" />
        </div>

        <div className="sticky top-[116px] flex h-[calc(100svh-116px)] items-stretch overflow-hidden">
          <HeroParticles />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <HeroMouthChants />
          </div>

          <div className="hero-3d-panel relative z-10 mx-auto h-full w-full max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 lg:py-5 xl:px-10">
            <div data-hero-reveal className="max-w-3xl space-y-4 lg:absolute lg:left-8 lg:top-8 lg:max-w-[54%]">
              <p className="text-sm font-semibold tracking-[0.2em] text-gold/95 sm:text-base">
                <LangText en="|| SHRI RAM ||" hi="॥ श्री राम ॥" hing="|| SHRI RAM ||" textKey="hero_invocation" />
              </p>
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl lg:text-6xl">
                <span className="hero-underline">
                  <LangText
                    en="Shri Ram Navami Bhavya Shobha Yatra 2026"
                    hi="श्री राम नवमी भव्य शोभा यात्रा 2026"
                    hing="Shri Ram Navami Bhavya Shobha Yatra 2026"
                    textKey="hero_title"
                  />
                </span>
              </h1>

              <p className="max-w-2xl text-base text-cream/85 sm:text-xl">
                <LangText
                  en="Join Patna's grand Sanatan celebration and experience bhakti, unity and disciplined seva."
                  hi="पटना में आयोजित सनातन धर्म के भव्य उत्सव में शामिल हों। भक्ति, एकता और अनुशासित सेवा का अनुभव करें।"
                  hing="Patna ke is bhavya Sanatan utsav mein shamil ho aur bhakti, ekta aur seva ka anubhav karo."
                  textKey="hero_subtitle"
                />
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={upiUrl}
                  onClick={openUpiCheckout}
                  className="rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  {donateLabel || (
                    <LangText en="Yatra Hetu Daan Karein" hi="यात्रा हेतु दान करें" hing="Yatra hetu daan karein" textKey="hero_cta_donate" />
                  )}
                </a>
                <a
                  href="#timeline"
                  className="rounded-full border border-cream/65 px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <LangText en="Marg Vivaran Dekhein" hi="मार्ग विवरण देखें" hing="Marg vivaran dekhein" textKey="hero_cta_route" />
                </a>
              </div>
            </div>

            <div data-hero-reveal className="mt-3 max-w-[202px] lg:mt-0 lg:absolute lg:bottom-8 lg:left-6 lg:w-[202px]">
              <div className="glass flex items-center gap-2 rounded-xl p-2">
                <Image
                  src={organizerImage}
                  alt={organizer.name}
                  width={92}
                  height={92}
                  onError={() => setOrganizerImage("/assets/nagesh.jpg")}
                  className="h-9 w-9 rounded-full border border-gold/45 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[8px] uppercase tracking-[0.14em] text-gold/85">Organised by</p>
                  <p className="truncate text-xs font-semibold text-cream">{organizer.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 lg:absolute lg:bottom-8 lg:left-1/2 lg:w-full lg:max-w-[620px] lg:-translate-x-1/2">
              <div data-hero-reveal>
                <CountdownTimer />
              </div>
              <div data-hero-reveal className="mx-auto mt-2 w-fit max-w-[95vw] rounded-xl border border-gold/35 bg-[linear-gradient(120deg,rgba(255,253,247,0.18),rgba(255,253,247,0.1))] px-3 py-2 backdrop-blur md:px-4">
                <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[10px] text-cream/90 sm:text-[11px]">
                  <span className="font-semibold text-gold">Date & Time:</span>
                  <span>{EVENT_DETAILS.dateLabel}</span>
                  <a
                    href={EVENT_DETAILS.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-gold/45 px-2.5 py-1 text-gold transition hover:bg-gold/10"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M12 13.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M4.8 9.9C4.8 15.4 12 21 12 21s7.2-5.6 7.2-11.1A7.2 7.2 0 1 0 4.8 9.9Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Open Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="after-hero-canvas">
        <MantraTypewriterBar />

        <section id="about" className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              <LangText
                en="A Yatra Powered by Faith and Unity"
                hi="आस्था और एकता से संचालित भव्य यात्रा"
                hing="Aastha aur ekta se chalti bhavya yatra"
                textKey="about_heading"
              />
            </h2>
            <p data-reveal data-sequence={1} className="mt-5 max-w-3xl text-base text-maroon/85 sm:text-lg">
              Shri Ram Navami Bhavya Shobha Yatra is a collective expression of bhakti, discipline and unity.
              With your participation and support, this yatra becomes a sacred experience for every family in
              Rupaspur and nearby communities.
            </p>
          </div>
        </section>

        <section id="donation-impact" className="section-divider bg-ink py-16 sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-cream sm:text-4xl">
              <LangText
                en="Where Your Donation Creates Real Seva"
                hi="जहां आपका दान वास्तविक सेवा बनता है"
                hing="Jahan aapka daan real seva mein badalta hai"
                textKey="impact_heading"
              />
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-cream/75 sm:text-lg">
              Your contribution directly supports route arrangements, seva operations and spiritual programs.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {impactBlocks.map((item, idx) => (
                <article
                  key={item.title}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="glass rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-glass"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-gold">0{idx + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-cream/75">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
              <LangText
                en="Complete Transparency in Every Contribution"
                hi="हर योगदान में पूर्ण पारदर्शिता"
                hing="Har contribution mein complete transparency"
                textKey="transparency_heading"
              />
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-maroon/80 sm:text-lg">
              We present category-wise fund allocation so every devotee can contribute with full trust.
            </p>

            <div data-reveal data-sequence={2} className="mt-8">
              <FundUsagePie />
            </div>
          </div>
        </section>

        <section className="section-divider bg-ink py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 xl:px-10">
            <div>
              <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
                <LangText
                  en="Simple, Fast and Sacred Way to Donate"
                  hi="दान का सरल, तेज और पवित्र मार्ग"
                  hing="Donate karne ka simple, fast aur sacred tareeka"
                  textKey="donate_heading"
                />
              </h2>
              <p data-reveal data-sequence={1} className="mt-3 text-cream/75 sm:text-lg">
                Offer your support instantly through UPI links, QR scan, and direct seva-desk assistance.
              </p>

              <div data-reveal data-sequence={2} className="mt-6 max-w-2xl">
                <LiveCounters />
              </div>

              <div data-reveal data-sequence={3} className="mt-6 flex flex-wrap gap-3">
                <a
                  href={upiUrl}
                  onClick={openUpiCheckout}
                  className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold"
                >
                  {donateLabel ? (
                    donateLabel
                  ) : (
                    <LangText
                      en="Donate via UPI"
                      hi="UPI से दान करें"
                      hing="UPI se donate karein"
                      textKey="donate_button_primary"
                    />
                  )}
                </a>
                <a
                  href={`tel:${EVENT_DETAILS.contacts[0]}`}
                  className="rounded-full border border-gold/45 px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
                >
                  <LangText
                    en="Call Donation Desk"
                    hi="दान डेस्क पर कॉल करें"
                    hing="Donation desk ko call karein"
                    textKey="donation_desk_call"
                  />
                </a>
              </div>
            </div>

            <div data-reveal className="glass rounded-3xl p-4 sm:p-6">
              <Image
                src="/assets/qr_code.png"
                alt="Donation QR code"
                width={420}
                height={420}
                className="mx-auto h-auto w-full max-w-[260px] rounded-2xl border border-gold/30 bg-white object-cover"
              />
            </div>
          </div>
        </section>

        <section className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
              <LangText
                en="What Devotees Say About the Yatra"
                hi="यात्रा के बारे में श्रद्धालुओं की वाणी"
                hing="Yatra ke baare mein devotees kya kehte hain"
                textKey="testimonial_heading"
              />
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {testimonialCards.map((item, idx) => (
                <article
                  key={item.no}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="rounded-2xl border border-maroon/20 bg-white p-5 shadow-[0_12px_24px_rgba(111,28,20,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(111,28,20,0.12)]"
                >
                  <p className="text-xs font-semibold tracking-[0.15em] text-deep-saffron">{item.no}</p>
                  <p className="mt-3 text-base font-medium text-maroon">“{item.quote}”</p>
                  <p className="mt-4 text-sm text-maroon/70">{item.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider bg-ink py-16 sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
              <LangText
                en="Everything Needed for a Smooth Yatra"
                hi="सुगम यात्रा के लिए हर आवश्यक व्यवस्था"
                hing="Smooth yatra ke liye har zaroori vyavastha"
                textKey="feature_heading"
              />
            </h2>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={item}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="glass rounded-xl p-4 text-sm text-cream/85 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="timeline" className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
              Yatra Timeline Updates
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-maroon/80 sm:text-lg">
              Track all major stop points, timings and updates of the procession in one place.
            </p>

            <div className="mt-8 grid gap-3 sm:gap-4">
              {yatraTimeline.map((point, idx) => (
                <article
                  key={`${point.time}-${point.place}-${idx}`}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="rounded-2xl border border-maroon/22 bg-white/95 px-4 py-4 shadow-[0_12px_28px_rgba(111,28,20,0.08)] sm:px-5"
                >
                  <div className="grid gap-2 sm:grid-cols-[130px_1fr] sm:items-center">
                    <p className="text-base font-bold text-deep-saffron sm:text-lg">{point.time}</p>
                    <div>
                      <p className="text-base font-semibold text-maroon sm:text-lg">{point.place}</p>
                      {point.note ? <p className="mt-1 text-sm text-maroon/76">{point.note}</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="section-divider bg-ink py-16 sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-cream sm:text-4xl">
              Newsletter & Community Posts
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-cream/78 sm:text-lg">
              Regular updates from ground volunteers, route teams, and seva announcements.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {newsletterPosts.map((post, idx) => (
                <article key={`${post.title}-${idx}`} data-pop="true" data-sequence={idx + 1} className="glass rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gold sm:text-xl">{post.title}</h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-cream/60">
                      {Number.isNaN(new Date(post.date).getTime())
                        ? post.date
                        : new Date(post.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cream/85 sm:text-base">{post.content}</p>
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={880}
                      height={460}
                      className="mt-4 h-48 w-full rounded-xl object-cover"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
              <LangText
                en="Sacred Moments from Previous Yatras"
                hi="पिछली यात्राओं के पावन क्षण"
                hing="Previous yatra ke pavitra moments"
                textKey="gallery_heading"
              />
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((src, idx) => (
                <figure
                  key={src}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="overflow-hidden rounded-2xl border border-maroon/20 bg-white"
                >
                  <Image
                    src={src}
                    alt={`Yatra gallery ${idx + 1}`}
                    width={680}
                    height={440}
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider bg-ink py-16 sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
              <LangText
                en="Bhakti Across the Community"
                hi="समुदाय में गूंजती भक्ति"
                hing="Community bhar mein goonjti bhakti"
                textKey="community_heading"
              />
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {communityCards.map((card, idx) => (
                <article
                  key={card.title}
                  data-pop="true"
                  data-sequence={idx + 1}
                  className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-glass"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={420}
                    height={280}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gold">{card.title}</h3>
                  <p className="mt-2 text-sm text-cream/75">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-divider bg-cream py-16 text-ink sm:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <h2 data-reveal className="text-balance text-3xl font-semibold text-maroon sm:text-4xl lg:text-5xl">
              <LangText
                en="Ram Ka Kaaj Hai, Aapka Saath Anmol Hai"
                hi="राम का काज है, आपका साथ अनमोल है"
                hing="Ram ka kaaj hai, aapka saath anmol hai"
                textKey="final_cta_heading"
              />
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 text-lg font-medium text-deep-saffron sm:text-xl">
              <LangText
                en="Donate Now and Receive Blessings"
                hi="अभी दान करें और आशीर्वाद प्राप्त करें"
                hing="Donate now aur ashirwad paayen"
                textKey="final_cta_subtitle"
              />
            </p>

            <div className="mt-8">
              <DonationForms />
            </div>

            <div className="mt-6">
              <RecentDonations />
            </div>

            <div className="mt-10">
              <article className="mb-6 overflow-hidden rounded-2xl border border-maroon/20 bg-white">
                <div className="grid gap-4 p-4 sm:grid-cols-[120px_1fr] sm:items-center">
                  <Image
                    src={organizerImage}
                    alt={organizer.name}
                    width={220}
                    height={220}
                    onError={() => setOrganizerImage("/assets/nagesh.jpg")}
                    className="h-28 w-28 rounded-xl border border-maroon/15 object-cover"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-deep-saffron">Primary Organizer</p>
                    <h4 className="mt-1 text-xl font-semibold text-maroon">{organizer.name}</h4>
                    <p className="text-sm text-maroon/80">{organizer.designation}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
                      <a className="rounded-full border border-maroon/25 px-3 py-1.5 text-maroon" href={`tel:${organizer.phone}`}>
                        Call
                      </a>
                      {organizer.whatsapp ? (
                        <a
                          className="rounded-full border border-maroon/25 px-3 py-1.5 text-maroon"
                          href={`https://wa.me/91${organizer.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      ) : null}
                      {organizer.facebook ? (
                        <a
                          className="rounded-full border border-maroon/25 px-3 py-1.5 text-maroon"
                          href={organizer.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Facebook
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>

              <h3 data-reveal className="text-2xl font-semibold text-maroon">
                Contact & Organisers
              </h3>
              <p data-reveal data-sequence={1} className="mt-3 text-sm text-maroon/80 sm:text-base">
                {EVENT_DETAILS.organisers[0]}
                <br />
                {EVENT_DETAILS.organisers[1]}
                <br />
                <br />
                Date: {EVENT_DETAILS.dateLabel}
                <br />
                Location: {EVENT_DETAILS.location}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {EVENT_DETAILS.contacts.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="rounded-full border border-maroon/35 px-3 py-1.5 text-xs font-semibold text-maroon transition hover:bg-maroon/5 sm:text-sm"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="section-divider bg-ink/80 py-16 text-center text-xs text-cream/85 sm:text-sm">
          <p>© 2026 Shri Ram Navami Bhavya Shobha Yatra • Patna, Bihar</p>
        </footer>
      </div>

      <StickyDonateBar />
      <YouTubeMusicFab />
    </main>
  );
}
