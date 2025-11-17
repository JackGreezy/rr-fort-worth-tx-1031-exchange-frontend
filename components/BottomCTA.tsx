import Link from "next/link";
import site from "@/content/site.json";

export default function BottomCTA() {
  return (
    <section className="mt-24 rounded-3xl bg-gradient-to-r from-primary via-primary to-gold/90">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center text-primaryfg md:px-10">
        <p className="text-xs uppercase tracking-[0.32em] text-primaryfg/70">Don't Miss Your Deadline</p>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Ready To Lock In Your Replacement Property?
        </h2>
        <p className="max-w-2xl text-sm text-primaryfg/80">
          Every day counts when you're on the 45-day clock. Our Fort Worth team can match you with IRS-compliant replacement properties within 24 hours. Call now or get in touch to secure your inventory before someone else does.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center rounded-full border border-primaryfg/40 bg-primaryfg px-8 py-3.5 text-xs font-bold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
          >
            Call {site.phone} Now
          </a>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-full border border-primaryfg/60 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-primaryfg transition hover:-translate-y-0.5 hover:bg-primaryfg/10"
          >
            Get In Touch
          </Link>
        </div>
        <p className="text-xs text-primaryfg/70">Available 24/7 • Same-day property matching • Free consultation</p>
      </div>
    </section>
  );
}