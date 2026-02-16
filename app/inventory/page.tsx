import Script from "next/script";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { propertyTypesData } from "@/data/property-types";
import { inventoryCategories } from "@/data/inventory-categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import InventoryCTA from "@/components/InventoryCTA";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { getInventoryBatchData } from "@/lib/batch-data";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Property Inventory | Fort Worth",
  description:
    "Browse replacement property categories and types for 1031 exchanges in Fort Worth and nationwide.",
  path: "/inventory",
});

export default function InventoryPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/inventory" },
  ];

  const inventorySpotlight = getInventoryBatchData();

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1
            className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl"
            style={{ fontWeight: 300 }}
          >
            PROPERTY INVENTORY
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Browse replacement property categories and types suitable for 1031
            exchanges. Nationwide property identification for single tenant
            retail, NNN properties, and more.
          </p>
          <div className="mt-8">
            <InventoryCTA variant="compact" urgency="deadline" />
          </div>
        </div>
      </section>

      {/* Property Spotlights */}
      {inventorySpotlight && inventorySpotlight.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2
              className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl"
              style={{ fontWeight: 300 }}
            >
              PROPERTY SPOTLIGHTS
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inventorySpotlight.map((spotlight, index) => (
                <Link
                  key={spotlight.type || index}
                  href={spotlight.href || "#"}
                  className="group border-t border-outline/30 pt-5"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                    Spotlight
                  </p>
                  <h3
                    className="mt-2 font-serif text-lg text-primary group-hover:text-accent"
                    style={{ fontWeight: 400 }}
                  >
                    {spotlight.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60 line-clamp-2">
                    {spotlight.copy}
                  </p>
                  {spotlight.ctaLabel && (
                    <p className="mt-3 text-[10px] font-medium tracking-[0.15em] text-accent">
                      {spotlight.ctaLabel} &rarr;
                    </p>
                  )}
                  {spotlight.note && (
                    <p className="mt-2 text-xs italic text-ink/50">
                      {spotlight.note}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Categories - Image Grid */}
      <section className="border-t border-outline/30 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2
            className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl"
            style={{ fontWeight: 300 }}
          >
            PROPERTY CATEGORIES
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Major asset classes available for 1031 exchange replacement property
            identification.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-3">
            {inventoryCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {category.heroImage && (
                  <Image
                    src={category.heroImage}
                    alt={`${category.name} properties`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <h3
                    className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl"
                    style={{ fontWeight: 300 }}
                  >
                    {category.name.toUpperCase()}
                  </h3>
                  {category.note && (
                    <p className="mt-2 max-w-xs text-xs text-white/70 line-clamp-2">
                      {category.note}
                    </p>
                  )}
                  <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-white px-4 py-2 text-[10px] tracking-[0.2em] text-white">
                      EXPLORE
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Property Types */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2
            className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl"
            style={{ fontWeight: 300 }}
          >
            ALL PROPERTY TYPES
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Specific property types available for replacement property sourcing.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {propertyTypesData.map((propertyType) => (
              <Link
                key={propertyType.slug}
                href={propertyType.route}
                className="group border-t border-white/20 pt-4"
              >
                <h3
                  className="font-serif text-base text-white group-hover:text-accent"
                  style={{ fontWeight: 400 }}
                >
                  {propertyType.name}
                </h3>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                  BROWSE &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <InventoryCTA variant="hero" urgency="deadline" />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-outline/30 py-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <p className="text-xs text-ink/50">
            <strong className="text-ink/70">Note:</strong> DST or TIC may be
            securities. We do not sell securities. We provide introductions to
            licensed providers only. This site routes inquiries to our chosen
            fulfillment partner for 1031 exchange advisory and property
            identification support.
          </p>
        </div>
      </section>

      <Script
        id="inventory-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
    </div>
  );
}
