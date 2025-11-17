import Link from "next/link";
import site from "@/content/site.json";

type InventoryCTAProps = {
  variant?: "default" | "compact" | "hero";
  propertyType?: string;
  urgency?: string;
};

export default function InventoryCTA({ variant = "default", propertyType, urgency }: InventoryCTAProps) {
  const ctaText = propertyType 
    ? `Claim ${propertyType} Properties Now`
    : urgency === "deadline"
    ? "Secure Your Replacement Property Today"
    : "Get Access to Vetted Inventory";

  const description = propertyType
    ? `Don't let someone else claim these ${propertyType.toLowerCase()} assets. Call now to lock in your 1031 replacement property before the 45-day deadline.`
    : urgency === "deadline"
    ? "Time-sensitive inventory moves fast. Our Fort Worth team can match you with IRS-compliant replacement properties within 24 hours."
    : "Our nationwide network has vetted single-tenant NNN properties ready for 1031 exchange. Call to see what's available in your target market.";

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-outline/60 bg-gold/10 p-4">
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-semibold text-heading">{ctaText}</p>
          <p className="mt-1 text-xs text-ink/70">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
          >
            Call Now
          </a>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <section className="rounded-3xl bg-gradient-to-br from-primary via-primary to-gold/80 py-12 px-6 text-primaryfg">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primaryfg/80">Limited Inventory Available</p>
          <h2 className="text-3xl font-semibold md:text-4xl">{ctaText}</h2>
          <p className="max-w-2xl text-sm text-primaryfg/90">{description}</p>
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
              Request Inventory Access
            </Link>
          </div>
          <p className="text-xs text-primaryfg/70">Available 24/7 • Same-day property matching • IRS-compliant</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border-2 border-gold/40 bg-gradient-to-br from-gold/5 via-secondary/30 to-gold/5 py-10 px-6 shadow-[0_20px_48px_rgba(183,147,73,0.15)]">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Act Fast — Inventory Moves Quickly</p>
        <h2 className="text-2xl font-semibold text-heading md:text-3xl">{ctaText}</h2>
        <p className="max-w-2xl text-sm text-ink/80">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
          >
            Call {site.phone} Now
          </a>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
          >
            Get In Touch
          </Link>
        </div>
        <p className="text-xs text-ink/60">Response within 2 hours • Free property matching • No obligation</p>
      </div>
    </section>
  );
}

