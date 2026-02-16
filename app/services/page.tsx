import Script from "next/script";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

// Core 1031 Exchange Services
const exchangeServices = [
  {
    slug: "forward-exchange",
    name: "Forward Exchange",
    description: "Sell your property first, then acquire replacement property within 180 days. The most straightforward exchange structure.",
    category: "Exchange Types",
  },
  {
    slug: "reverse-exchange",
    name: "Reverse Exchange",
    description: "Acquire replacement property before selling your relinquished property. Ideal when timing is critical.",
    category: "Exchange Types",
  },
  {
    slug: "delayed-exchange",
    name: "Delayed Exchange",
    description: "The most common type - identify replacement property within 45 days of sale and close within 180 days.",
    category: "Exchange Types",
  },
  {
    slug: "improvement-exchange",
    name: "Improvement Exchange",
    description: "Use exchange funds to make improvements on the replacement property before taking title.",
    category: "Exchange Types",
  },
  {
    slug: "build-to-suit-exchange",
    name: "Build-to-Suit Exchange",
    description: "Construct new improvements on land using your exchange proceeds. Perfect for custom developments.",
    category: "Exchange Types",
  },
  {
    slug: "dst-placement-readiness",
    name: "DST Placement",
    description: "Invest in institutional-quality Delaware Statutory Trust properties for passive income.",
    category: "Investment Options",
  },
  {
    slug: "qualified-intermediary-services",
    name: "Qualified Intermediary Services",
    description: "Expert QI coordination to hold your funds and ensure IRS compliance throughout the exchange.",
    category: "Support Services",
  },
  {
    slug: "property-identification",
    name: "Property Identification",
    description: "Strategic guidance on identifying replacement properties within the 45-day window using IRS rules.",
    category: "Support Services",
  },
  {
    slug: "fort-worth-45-day-sprint",
    name: "Timeline Management",
    description: "Dedicated tracking and reminders to keep your 45-day and 180-day deadlines on schedule.",
    category: "Support Services",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Services | Fort Worth Replacement Property Support",
  description: "Search 1031 exchange services for replacement property identification, timelines, underwriting, and planning.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-primary">
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            1031 EXCHANGE SERVICES
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Comprehensive 1031 exchange solutions to help you defer capital gains and grow your real estate portfolio.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exchangeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <article className="overflow-hidden border border-outline/30 bg-panel transition hover:border-primary/30">
                  <div className="p-5">
                    <span className="inline-block bg-accent px-2 py-1 text-[9px] font-medium tracking-[0.15em] text-primary mb-3">
                      {service.category.toUpperCase()}
                    </span>
                    <h2 className="font-serif text-xl text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm text-ink/60 line-clamp-2">{service.description}</p>
                    <p className="mt-4 text-[10px] font-medium tracking-[0.15em] text-accent">
                      LEARN MORE &rarr;
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Ready to Start Your Exchange?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Our team is ready to help you navigate the 1031 exchange process with confidence.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border border-white px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
          >
            CONTACT US
          </Link>
        </div>
      </section>

      <Script
        id="services-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
