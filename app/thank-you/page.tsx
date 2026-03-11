import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-hero-noise px-4 py-12 text-cream">
      <section className="glass w-full max-w-xl rounded-3xl p-8 text-center sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Jai Shri Ram</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Thank you for your seva support.</h1>
        <p className="mt-3 text-sm text-cream/80 sm:text-base">
          Your submission has been received. May Shri Ram bless you and your family.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold"
          >
            Back to Homepage
          </Link>
          <a
            href="tel:8651352594"
            className="rounded-full border border-gold/45 px-5 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10"
          >
            Call Seva Desk
          </a>
        </div>
      </section>
    </main>
  );
}
