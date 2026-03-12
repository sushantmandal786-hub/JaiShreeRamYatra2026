"use client";

import { useState } from "react";
import { LangText } from "@/components/LangText";

type FaqItem = {
  q: {
    en: string;
    hi: string;
    hing: string;
  };
  a: {
    en: string;
    hi: string;
    hing: string;
  };
};

const FAQS: FaqItem[] = [
  {
    q: {
      en: "How can I donate instantly?",
      hi: "मैं तुरंत दान कैसे कर सकता/सकती हूं?",
      hing: "Main turant daan kaise kar sakta/sakti hoon?"
    },
    a: {
      en: "Use the UPI button or scan the QR code. Your amount directly supports yatra logistics, seva and bhog.",
      hi: "UPI बटन या QR कोड का उपयोग करें। आपका दान सीधे यात्रा व्यवस्था, सेवा और भोग में जाता है।",
      hing: "UPI button ya QR code use karein. Aapka daan seedha yatra vyavastha, seva aur bhog mein lagta hai."
    }
  },
  {
    q: {
      en: "Is the fund usage transparent?",
      hi: "क्या फंड उपयोग पूरी तरह पारदर्शी है?",
      hing: "Kya fund usage poori tarah transparent hai?"
    },
    a: {
      en: "Yes. We publish category-wise usage and keep counters visible on the homepage for community trust.",
      hi: "हाँ। हम श्रेणीवार उपयोग दिखाते हैं और समुदाय के भरोसे के लिए काउंटर होमपेज पर दिखते हैं।",
      hing: "Haan. Hum category-wise usage dikhate hain aur trust ke liye counters homepage par live rehte hain."
    }
  },
  {
    q: {
      en: "Can I volunteer for seva on event day?",
      hi: "क्या मैं आयोजन के दिन सेवा के लिए स्वयंसेवक बन सकता/सकती हूं?",
      hing: "Kya main event day par seva volunteer ban sakta/sakti hoon?"
    },
    a: {
      en: "Absolutely. Fill the volunteer form and our team will contact you on the listed numbers.",
      hi: "बिलकुल। वॉलंटियर फॉर्म भरें, हमारी टीम आपसे दिए गए नंबर पर संपर्क करेगी।",
      hing: "Bilkul. Volunteer form bhariye, team aapse diye gaye number par contact karegi."
    }
  }
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <article
            key={item.q.en}
            className="rounded-2xl border border-maroon/20 bg-white p-4 shadow-[0_12px_24px_rgba(111,28,20,0.08)] sm:p-5"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpen((current) => (current === idx ? null : idx))}
            >
              <h3 className="text-base font-medium text-maroon sm:text-lg">
                <LangText en={item.q.en} hi={item.q.hi} hing={item.q.hing} />
              </h3>
              <span className="text-xl text-deep-saffron">{isOpen ? "−" : "+"}</span>
            </button>

            <div className={`faq-content ${isOpen ? "open" : ""}`}>
              <div>
                <p className="pt-3 text-sm text-maroon/80 sm:text-base">
                  <LangText en={item.a.en} hi={item.a.hi} hing={item.a.hing} />
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
