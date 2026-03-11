"use client";

import Image from "next/image";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DonationForms } from "@/components/DonationForms";
import { EventMetaBar } from "@/components/EventMetaBar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FundUsagePie } from "@/components/FundUsagePie";
import { HeroParticles } from "@/components/HeroParticles";
import { LangText } from "@/components/LangText";
import { LiveCounters } from "@/components/LiveCounters";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyDonateBar } from "@/components/StickyDonateBar";
import { YouTubeMusicFab } from "@/components/YouTubeMusicFab";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { EVENT_DETAILS } from "@/lib/site-config";

const impactBlocks = [
  {
    title: "Prabhu Path Lighting",
    text: "Safe illuminated route setup for evening darshan and procession flow."
  },
  {
    title: "Seva Essentials",
    text: "Water, first-aid, sanitation and volunteer kits for all yatris."
  },
  {
    title: "Bhajan & Sound",
    text: "Devotional sound systems and kirtan support at key stoppages."
  },
  {
    title: "Prasad Distribution",
    text: "Community prasad preparation and respectful serving at scale."
  },
  {
    title: "Post-Yatra Cleanup",
    text: "Route restoration and eco-conscious cleanup after the yatra."
  }
];

const testimonialCards = [
  {
    no: "01",
    quote: "The yatra made our entire mohalla feel like one family in devotion.",
    name: "Local Devotee, Rupaspur"
  },
  {
    no: "02",
    quote: "Donation process was smooth and transparent. Every rupee felt meaningful.",
    name: "Seva Contributor, Patna"
  },
  {
    no: "03",
    quote: "Volunteer coordination was disciplined, warm and truly spiritual.",
    name: "Youth Volunteer"
  }
];

const features = [
  "24/7 support through Yatra helpline contacts.",
  "Clear route, timing and seva updates for families.",
  "Simple UPI donations with instant participation.",
  "Open counters and transparent fund usage blocks.",
  "Volunteer onboarding for on-ground coordination."
];

const galleryItems = [
  "/assets/yatra1.jpg",
  "/assets/yatra2.jpg",
  "/assets/yatra3.jpg",
  "/assets/yatra4.jpg",
  "/assets/yatra5.jpg",
  "/assets/yatra6.jpg"
];

const communityCards = [
  {
    title: "School youth joining seva briefing",
    text: "Training and route discipline session with local students."
  },
  {
    title: "Women-led bhajan mandali participation",
    text: "Neighborhood bhajan groups preparing for the grand day."
  },
  {
    title: "Samuhik prasad planning committee",
    text: "Joint planning for quality prasad and smooth distribution."
  }
];

export function HomePage() {
  useScrollAnimations();

  return (
    <main className="bg-ink text-cream" id="top">
      <SiteHeader />
      <MarqueeTicker />

      <section className="relative h-[185svh] bg-hero-noise">
        <div className="sticky top-[104px] flex h-[calc(100svh-104px)] items-stretch overflow-hidden">
          <HeroParticles />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-6">
            <div className="flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div data-hero-reveal className="overflow-hidden rounded-2xl border border-gold/30 bg-black/25 p-1 shadow-glow">
                  <Image
                    src="/assets/hanuman_chanting.GIF"
                    alt="Hanuman chanting"
                    width={1200}
                    height={420}
                    className="h-40 w-full animate-pulse-glow rounded-xl object-cover sm:h-52"
                    priority
                  />
                </div>

                <h1
                  data-hero-reveal
                  className="text-balance text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl"
                >
                  <span className="hero-underline">
                    <LangText
                      en="Join the Grand Shri Ram Navami Shobha Yatra 2026"
                      hi="भव्य श्री राम नवमी शोभा यात्रा 2026 में शामिल हों"
                      hing="Grand Shri Ram Navami Shobha Yatra 2026 mein shamil ho"
                    />
                  </span>
                </h1>

                <p data-hero-reveal className="max-w-2xl text-sm text-cream/80 sm:text-lg">
                  <LangText
                    en="Be part of a divine celebration of faith, unity and devotion."
                    hi="आस्था, एकता और भक्ति के दिव्य उत्सव का हिस्सा बनें।"
                    hing="Aastha, ekta aur bhakti ke divya utsav ka hissa banein."
                  />
                </p>
              </div>

              <div data-hero-reveal>
                <CountdownTimer />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div data-hero-reveal>
                <EventMetaBar />
              </div>

              <div data-hero-reveal>
                <LiveCounters />
              </div>

              <div data-hero-reveal className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-gold/85">Organised by</p>
                <p className="mt-2 text-sm text-cream/80 sm:text-base">
                  {EVENT_DETAILS.organisers[0]}
                  <br />
                  {EVENT_DETAILS.organisers[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-divider bg-cream py-16 text-ink sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            <LangText
              en="Faith talks. The Yatra talks back."
              hi="आस्था बोलती है। यात्रा उत्तर देती है।"
              hing="Faith bolti hai. Yatra jawab deti hai."
            />
          </h2>
          <p data-reveal data-sequence={1} className="mt-5 max-w-3xl text-base text-maroon/85 sm:text-lg">
            This homepage follows Cleo’s stacked storytelling rhythm: bold hero, section-by-section persuasion,
            transparent proof, and immediate conversion to donation and volunteer action.
          </p>
        </div>
      </section>

      <section id="donation-impact" className="section-divider bg-ink py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold text-cream sm:text-4xl">
            <LangText
              en="Talk therapy for your soul"
              hi="आत्मा के लिए संवाद-सेवा"
              hing="Soul ke liye devotional talk therapy"
            />
          </h2>
          <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-cream/75 sm:text-lg">
            Why your donation matters. Five direct impact channels that turn faith into on-ground support.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {impactBlocks.map((item, idx) => (
              <article
                key={item.title}
                data-pop="true"
                data-sequence={idx + 1}
                className="glass rounded-2xl p-4"
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
            <LangText
              en="Get your devotion off your mind"
              hi="भक्ति की चिंता मन से उतारिए"
              hing="Devotion ko tension-free banaiye"
            />
          </h2>
          <p data-reveal data-sequence={1} className="mt-3 max-w-3xl text-maroon/80 sm:text-lg">
            Transparent fund usage with clear category-wise reporting.
          </p>

          <div data-reveal data-sequence={2} className="mt-8">
            <FundUsagePie />
          </div>
        </div>
      </section>

      <section className="section-divider bg-ink py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
              <LangText
                en="Let devotion conquer every obstacle"
                hi="भक्ति हर बाधा को पार करे"
                hing="Devotion har obstacle ko jeet le"
              />
            </h2>
            <p data-reveal data-sequence={1} className="mt-3 text-cream/75 sm:text-lg">
              Easy donation with UPI deep links, QR scan and direct seva desk contact.
            </p>
            <div data-reveal data-sequence={2} className="mt-6 flex flex-wrap gap-3">
              <a
                href={`upi://pay?pa=${encodeURIComponent(EVENT_DETAILS.primaryUpi)}&pn=${encodeURIComponent(
                  "Shri Ram Navami Yatra"
                )}&am=501&tn=${encodeURIComponent("Jai Shri Ram Donation")}`}
                className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold"
              >
                Donate via UPI
              </a>
              <a
                href={`tel:${EVENT_DETAILS.contacts[0]}`}
                className="rounded-full border border-gold/45 px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
              >
                Call Donation Desk
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
            <LangText
              en="The community has spoken (and it loves the Yatra)"
              hi="समुदाय बोल चुका है (और यात्रा से प्रेम करता है)"
              hing="Community bol chuka hai (aur yatra se pyaar karta hai)"
            />
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonialCards.map((item, idx) => (
              <article
                key={item.no}
                data-pop="true"
                data-sequence={idx + 1}
                className="rounded-2xl border border-maroon/20 bg-white p-5 shadow-[0_12px_24px_rgba(111,28,20,0.08)]"
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
            <LangText
              en="Finally, a Yatra without boundaries"
              hi="अंततः, बिना सीमाओं की यात्रा"
              hing="Finally, ek boundary-free yatra"
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

      <section id="gallery" className="section-divider bg-cream py-16 text-ink sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold text-maroon sm:text-4xl">
            <LangText
              en="New moments from previous Yatras"
              hi="पिछली यात्राओं की नई झलकियाँ"
              hing="Previous yatra ke naye moments"
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
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider bg-ink py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-3xl font-semibold sm:text-4xl">
            <LangText
              en="In the community"
              hi="समुदाय में"
              hing="In the community"
            />
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {communityCards.map((card, idx) => (
              <article
                key={card.title}
                data-pop="true"
                data-sequence={idx + 1}
                className="glass rounded-2xl p-5"
              >
                <h3 className="text-lg font-semibold text-gold">{card.title}</h3>
                <p className="mt-2 text-sm text-cream/75">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider bg-cream py-16 text-ink sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 data-reveal className="text-balance text-3xl font-semibold text-maroon sm:text-4xl lg:text-5xl">
            <LangText
              en="Ram Ka Kaaj Hai, Aapka Saath Anmol Hai"
              hi="राम का काज है, आपका साथ अनमोल है"
              hing="Ram ka kaaj hai, aapka saath anmol hai"
            />
          </h2>
          <p data-reveal data-sequence={1} className="mt-3 text-lg font-medium text-deep-saffron sm:text-xl">
            <LangText
              en="Donate Now & Be Blessed"
              hi="अभी दान करें और आशीर्वाद पाएं"
              hing="Donate now aur blessed baniye"
            />
          </p>

          <div className="mt-8">
            <DonationForms />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <h3 data-reveal className="text-2xl font-semibold text-maroon">
                Contact & Organisers
              </h3>
              <p data-reveal data-sequence={1} className="mt-3 text-sm text-maroon/80 sm:text-base">
                {EVENT_DETAILS.organisers[0]}
                <br />
                {EVENT_DETAILS.organisers[1]}
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

            <div>
              <h3 data-reveal className="text-2xl font-semibold text-maroon">
                FAQs
              </h3>
              <div className="mt-4">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-divider bg-ink py-10 text-center text-xs text-cream/60 sm:text-sm">
        <p>© 2026 Shri Ram Navami Bhavya Shobha Yatra • Patna, Bihar</p>
      </footer>

      <StickyDonateBar />
      <YouTubeMusicFab />
    </main>
  );
}
