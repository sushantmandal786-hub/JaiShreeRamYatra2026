# Shri Ram Navami Bhavya Shobha Yatra 2026 (Homepage Rebuild)

## Stack
- Next.js 15 App Router
- React 19 + TypeScript
- Tailwind CSS
- GSAP

## Scripts
- `npm run dev` - run local dev server
- `npm run build` - production static export build (`out/`)
- `npm run build:lang` - build + generate `index-en.html`, `index-hi.html`, `index-mix.html`
- `npm run lint` - lint project

## Included Features
- Cleo-style single-page section flow with sticky hero + reveal animations
- Multi-language attributes (`data-en`, `data-hi`, `data-hing`) + language switcher
- `scripts/generate-lang.js` for language static files after export
- Countdown timer with fallback to 15 April 2027 after 2026 event date
- Live counters with localStorage override support
- Donation + volunteer forms to Google Apps Script endpoint
- UPI deep links and QR donation section
- Floating YouTube music FAB (lazy iframe)
- Admin panel at `/mgmt-panel.html` (SHA-256 password + localStorage overrides)
- Thank-you route (`/thank-you`) and fallback `public/thank-you.html`

## Asset Paths
Replace these placeholders with real assets:
- `public/assets/logo.png`
- `public/assets/hanuman_chanting.GIF`
- `public/assets/qr_code.png`
- `public/assets/yatra1.jpg` ... `public/assets/yatra6.jpg`

## Override Key
Admin panel writes to localStorage key: `shri_ram_overrides`
