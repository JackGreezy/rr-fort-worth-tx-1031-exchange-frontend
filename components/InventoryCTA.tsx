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
      <div className="border border-white/20 bg-white/10 px-6 py-5">
        <div className="flex flex-wrap items-center gap-6">
          <div className="min-w-[200px] flex-1">
            <p className="font-serif text-lg text-white" style={{ fontWeight: 400 }}>{ctaText}</p>
            <p className="mt-1 text-sm text-white/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phoneDigits}`}
              className="bg-accent px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-accent/90"
            >
              CALL NOW
            </a>
            <Link
              href="/contact#contact-form"
              className="border border-white/50 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            Limited Inventory Available
          </p>
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            {ctaText}
          </h2>
          <p className="max-w-2xl text-sm text-white/70">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phoneDigits}`}
              className="bg-accent px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-accent/90"
            >
              CALL {site.phone} NOW
            </a>
            <Link
              href="/contact#contact-form"
              className="border border-white/50 px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
            >
              REQUEST INVENTORY ACCESS
            </Link>
          </div>
          <p className="text-xs text-white/50">
            Monday&ndash;Friday: 8am&ndash;6pm &bull; Same-day property matching &bull; IRS-compliant
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border border-outline/30 bg-paper py-12 px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
          Act Fast &mdash; Inventory Moves Quickly
        </p>
        <h2 className="font-serif text-3xl text-primary md:text-4xl" style={{ fontWeight: 300 }}>
          {ctaText}
        </h2>
        <p className="max-w-2xl text-sm text-ink/70">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${site.phoneDigits}`}
            className="bg-accent px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-accent/90"
          >
            CALL {site.phone} NOW
          </a>
          <Link
            href="/contact#contact-form"
            className="border border-primary px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white"
          >
            GET IN TOUCH
          </Link>
        </div>
        <p className="text-xs text-ink/50">
          Response within 2 hours &bull; Free property matching &bull; No obligation
        </p>
      </div>
    </section>
  );
}
