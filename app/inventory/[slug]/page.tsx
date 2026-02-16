import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inventoryCategories, propertyTypesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import InventoryCTA from "@/components/InventoryCTA";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { getInventoryBatchData } from "@/lib/batch-data";

type Params = Promise<{ slug: string }> | { slug: string };

export function generateStaticParams() {
  const categorySlugs = inventoryCategories.map((cat) => ({ slug: cat.slug }));
  const propertyTypeSlugs = propertyTypesData.map((pt) => ({ slug: pt.slug }));
  return [...categorySlugs, ...propertyTypeSlugs];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = inventoryCategories.find((cat) => cat.slug === resolvedParams.slug);
  const propertyType = propertyTypesData.find((pt) => pt.slug === resolvedParams.slug);

  const item = category || propertyType;
  if (!item) return {};

  return createPageMetadata({
    title: `${item.name} | 1031 Exchange Inventory`,
    description: category?.note || `Browse ${item.name.toLowerCase()} properties for 1031 exchange replacement property identification.`,
    path: item.route,
  });
}

export default async function InventorySlugPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const category = inventoryCategories.find((cat) => cat.slug === resolvedParams.slug);
  const propertyType = propertyTypesData.find((pt) => pt.slug === resolvedParams.slug);

  if (!category && !propertyType) notFound();

  const item = category || propertyType!;
  const isCategory = !!category;
  const inventorySpotlight = getInventoryBatchData();
  const spotlightItem = inventorySpotlight.find((spot) => spot.type === resolvedParams.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/inventory" },
    { label: item.name, href: item.route },
  ];

  const relatedPropertyTypes = isCategory
    ? propertyTypesData.filter((pt) => {
        const categoryMap: Record<string, string[]> = {
          nnn: ["pharmacy", "convenience-store-gas", "drive-thru-qsr"],
          retail: ["dollar-store", "coffee-drive-thru", "auto-parts-retail", "telecom-wireless-retail"],
          industrial: ["last-mile-logistics-flex"],
          medical: ["urgent-care-medical-clinic", "dialysis-center", "veterinary-clinic"],
          auto: ["auto-parts-retail", "auto-service-oil-change", "tire-store", "tractor-supply-farm-ranch"],
          "food-service": ["drive-thru-qsr", "coffee-drive-thru", "casual-dining-drive-thru-pickup"],
        };
        return categoryMap[resolvedParams.slug]?.includes(pt.slug) || false;
      })
    : [];

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-primary py-20 lg:py-28">
        {category?.heroImage && (
          <>
            <div className="absolute inset-0">
              <Image
                src={category.heroImage}
                alt={`${item.name} properties`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
          </>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {isCategory ? "Property Category" : "Property Type"}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            {item.name}
          </h1>
          {category?.note && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{category.note}</p>
          )}
          {spotlightItem?.copy && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{spotlightItem.copy}</p>
          )}
          {!category?.note && !spotlightItem?.copy && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              Browse {item.name.toLowerCase()} properties suitable for 1031 exchange replacement property identification in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and nationwide.
            </p>
          )}
          <div className="mt-8">
            <InventoryCTA variant="compact" propertyType={item.name} />
          </div>
        </div>
      </section>

      {/* Spotlight Note */}
      {spotlightItem?.note && (
        <div className="border-b border-outline/30 py-6">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <p className="text-xs text-ink/50">{spotlightItem.note}</p>
          </div>
        </div>
      )}

      {/* Property Types in Category */}
      {isCategory && relatedPropertyTypes.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              PROPERTY TYPES
            </h2>
            <p className="mt-2 text-sm text-ink/60">Specific property types within this category.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPropertyTypes.map((pt) => (
                <Link
                  key={pt.slug}
                  href={pt.route}
                  className="group border-b border-outline/20 pb-5"
                >
                  <h3 className="font-serif text-lg text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                    {pt.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">View {pt.name.toLowerCase()} inventory</p>
                  <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-accent">
                    BROWSE &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About This Property Type */}
      {!isCategory && (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              ABOUT {item.name.toUpperCase()}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-ink/70">
              <p>
                {item.name} properties offer strong fundamentals for 1031 exchange investors seeking replacement properties.
                These assets provide stable income streams and long-term lease commitments ideal for tax-deferred exchanges.
              </p>
              <p>
                Our nationwide property identification network helps investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}{" "}
                locate {item.name.toLowerCase()} replacement properties that meet IRS like-kind requirements and investment objectives.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Related Inventory */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl" style={{ fontWeight: 300 }}>
            RELATED INVENTORY
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories
              .filter((cat) => cat.slug !== resolvedParams.slug)
              .slice(0, 6)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.route}
                  className="group border-t border-white/20 pt-5"
                >
                  <h3 className="font-serif text-lg text-white group-hover:text-accent" style={{ fontWeight: 400 }}>
                    {cat.name}
                  </h3>
                  {cat.note && <p className="mt-1 text-sm text-white/60 line-clamp-2">{cat.note}</p>}
                  <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-accent">
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
          <InventoryCTA variant="hero" propertyType={item.name} urgency="deadline" />
        </div>
      </section>

      {/* Back to Inventory */}
      <section className="border-t border-outline/30 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10 lg:px-14">
          <Link
            href="/inventory"
            className="inline-block border border-primary px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white"
          >
            VIEW ALL INVENTORY
          </Link>
        </div>
      </section>

      <Script
        id="inventory-slug-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
