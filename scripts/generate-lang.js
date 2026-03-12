import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
const indexPath = path.join(outDir, "index.html");

const variants = [
  { file: "index-en.html", lang: "en" },
  { file: "index-hi.html", lang: "hi" },
  { file: "index-mix.html", lang: "hing" }
];

function injectLang(html, lang) {
  let next = html;
  if (!/data-force-lang=/.test(next)) {
    next = next.replace("<html", `<html data-force-lang=\"${lang}\"`);
  }

  const preboot = `<script>localStorage.setItem('site_lang','${lang}');document.documentElement.setAttribute('data-force-lang','${lang}');</script>`;
  if (next.includes("</head>")) {
    next = next.replace("</head>", `${preboot}</head>`);
  } else {
    next = `${preboot}${next}`;
  }

  return next;
}

if (!fs.existsSync(indexPath)) {
  console.warn("out/index.html not found (expected when not using static export). Skipping lang variants.");
  process.exit(0);
}

const base = fs.readFileSync(indexPath, "utf-8");
for (const variant of variants) {
  const output = injectLang(base, variant.lang);
  fs.writeFileSync(path.join(outDir, variant.file), output);
  console.log(`Generated ${variant.file}`);
}

const thankYouPath = path.join(outDir, "thank-you", "index.html");
if (fs.existsSync(thankYouPath)) {
  const thankYou = fs.readFileSync(thankYouPath, "utf-8");
  fs.writeFileSync(path.join(outDir, "thank-you.html"), thankYou);

  for (const variant of variants) {
    const output = injectLang(thankYou, variant.lang);
    fs.writeFileSync(path.join(outDir, `thank-you-${variant.lang}.html`), output);
    console.log(`Generated thank-you-${variant.lang}.html`);
  }
}
