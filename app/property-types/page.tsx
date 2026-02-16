import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { propertyTypesData, inventoryCategories } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Property Types",
  description: "Search NNN, retail, industrial, medical, auto, and mixed use property types for 1031 replacement deals.",
  path: "/property-types",
});

export default function PropertyTypesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Property Types", href: "/property-types" },
  ];

  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/locations/fort-worth/fort-worth-tx.webp"
            alt="Property Types"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            PROPERTY TYPES
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Use this library to zero in on the assets that match your timeline, target yield, and credit requirements.
          </p>
        </div>
      </section>

      {/* Inventory Categories */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            INVENTORY CATEGORIES
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories.map((category) => {
              return (
                <Link
                  key={category.slug}
                  href={category.route}
                  className="group"
                >
                  <article className="overflow-hidden border border-outline/30 bg-panel transition hover:border-primary/30">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={category.heroImage || "/locations/fort-worth/fort-worth-tx.webp"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-xl text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-ink/60">{category.note}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Property Types Grid */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            ALL PROPERTY TYPES
          </h2>
          
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {propertyTypesData.map((type) => (
              <Link
                key={type.slug}
                href={type.route}
                className="border-b border-outline/30 py-3 text-sm text-primary transition hover:border-primary hover:text-accent"
              >
                {type.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Need Help Finding Properties?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Our team can help you identify replacement properties that match your investment criteria.
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
        id="property-types-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
