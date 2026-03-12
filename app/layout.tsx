import type { Metadata } from "next";
import { Caveat, Hind, Inter, Kalam, Noto_Serif_Devanagari, Yatra_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hind = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind"
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const kalam = Kalam({ subsets: ["latin", "devanagari"], weight: ["400", "700"], variable: "--font-kalam" });
const notoSerifDev = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-devanagari"
});
const yatraOne = Yatra_One({ subsets: ["latin"], weight: "400", variable: "--font-yatra-one" });

export const metadata: Metadata = {
  title: "Shri Ram Navami Bhavya Shobha Yatra 2026",
  description: "Join the Grand Shri Ram Navami Shobha Yatra 2026 in Rupaspur, Patna, Bihar.",
  icons: {
    icon: "/assets/logo.png"
  }
};

const bootstrapLanguageScript = `
(function () {
  var valid = ["en", "hi", "hing"];
  var force = document.documentElement.getAttribute("data-force-lang");
  var stored = localStorage.getItem("site_lang");
  var lang = force || stored || "hing";
  if (valid.indexOf(lang) === -1) lang = "hing";

  function applyLanguage(current) {
    document.documentElement.setAttribute("data-site-lang", current);
    localStorage.setItem("site_lang", current);
    var overridePayload = {};
    try {
      overridePayload = JSON.parse(localStorage.getItem("shri_ram_overrides") || "{}");
    } catch (error) {
      overridePayload = {};
    }

    var textOverrides = overridePayload && overridePayload.textOverrides ? overridePayload.textOverrides : {};
    var nodes = document.querySelectorAll("[data-en][data-hi][data-hing]");
    nodes.forEach(function (node) {
      var key = "data-" + current;
      var value = node.getAttribute(key);
      var textKey = node.getAttribute("data-text-key");
      if (textKey && textOverrides[textKey] && textOverrides[textKey][current]) {
        value = textOverrides[textKey][current];
      }
      if (value == null) return;
      if (node.getAttribute("data-allow-html") === "true") {
        node.innerHTML = value;
      } else {
        node.textContent = value;
      }
    });
  }

  window.__setSiteLang = function (nextLang) {
    if (valid.indexOf(nextLang) === -1) return;
    applyLanguage(nextLang);
  };

  window.__getSiteLang = function () {
    return document.documentElement.getAttribute("data-site-lang") || "hing";
  };

  window.addEventListener("shri-ram-overrides-change", function () {
    applyLanguage(window.__getSiteLang());
  });

  window.addEventListener("storage", function (event) {
    if (event && event.key && event.key !== "shri_ram_overrides") return;
    applyLanguage(window.__getSiteLang());
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyLanguage(lang);
    });
  } else {
    applyLanguage(lang);
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapLanguageScript }} />
      </head>
      <body
        className={`${inter.variable} ${hind.variable} ${caveat.variable} ${kalam.variable} ${notoSerifDev.variable} ${yatraOne.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
