import type { Metadata } from "next";
import "./globals.css";

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
  var lang = force || stored || "en";
  if (valid.indexOf(lang) === -1) lang = "en";

  function applyLanguage(current) {
    document.documentElement.setAttribute("data-site-lang", current);
    localStorage.setItem("site_lang", current);
    var nodes = document.querySelectorAll("[data-en][data-hi][data-hing]");
    nodes.forEach(function (node) {
      var key = "data-" + current;
      var value = node.getAttribute(key);
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
    return document.documentElement.getAttribute("data-site-lang") || "en";
  };

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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
