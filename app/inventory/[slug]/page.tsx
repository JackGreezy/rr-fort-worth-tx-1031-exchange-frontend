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

// Combine inventory categories and property types for static params
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

  // Get related property types if this is a category
  const relatedPropertyTypes = isCategory
    ? propertyTypesData.filter((pt) => {
        // Map category types to property types
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
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="relative overflow-hidden rounded-2xl border border-outline bg-secondary/40">
          {category?.heroImage && (
            <div className="relative h-64 w-full md:h-80">
              <Image
                src={category.heroImage}
                alt={`${item.name} properties`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-panel/50 to-transparent" />
            </div>
          )}
          <div className="space-y-4 p-6">
            <h1 className="text-4xl font-semibold text-heading">{item.name}</h1>
            {category?.note && (
              <p className="text-base text-ink/80">{category.note}</p>
            )}
            {spotlightItem?.copy && (
              <p className="text-base text-ink/80">{spotlightItem.copy}</p>
            )}
            {!category?.note && !spotlightItem?.copy && (
              <p className="text-base text-ink/80">
                Browse {item.name.toLowerCase()} properties suitable for 1031 exchange replacement property identification in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and nationwide.
              </p>
            )}
            <div className="pt-4">
              <InventoryCTA variant="compact" propertyType={item.name} />
            </div>
          </div>
        </header>

        {spotlightItem?.note && (
          <div className="rounded-lg border border-outline/60 bg-secondary/30 p-4">
            <p className="text-xs text-ink/70">{spotlightItem.note}</p>
          </div>
        )}

        {isCategory && relatedPropertyTypes.length > 0 && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">Property types in this category</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedPropertyTypes.map((pt) => (
                <Link
                  key={pt.slug}
                  href={pt.route}
                  className="rounded-xl border border-outline/60 bg-secondary/30 p-4 hover:border-primary transition"
                >
                  <h3 className="text-lg font-semibold text-heading">{pt.name}</h3>
                  <p className="mt-2 text-sm text-ink/80">View {pt.name.toLowerCase()} inventory</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!isCategory && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">About {item.name}</h2>
            <div className="prose prose-sm max-w-none text-ink/80">
              <p>
                {item.name} properties offer strong fundamentals for 1031 exchange investors seeking replacement properties. 
                These assets provide stable income streams and long-term lease commitments ideal for tax-deferred exchanges.
              </p>
              <p>
                Our nationwide property identification network helps investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} 
                locate {item.name.toLowerCase()} replacement properties that meet IRS like-kind requirements and investment objectives.
              </p>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading mb-4">Related inventory</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories
              .filter((cat) => cat.slug !== resolvedParams.slug)
              .slice(0, 6)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.route}
                  className="rounded-xl border border-outline/60 bg-panel p-4 hover:border-primary transition"
                >
                  <h3 className="text-lg font-semibold text-heading">{cat.name}</h3>
                  {cat.note && <p className="mt-2 text-sm text-ink/80">{cat.note}</p>}
                </Link>
              ))}
          </div>
        </section>

        <InventoryCTA variant="hero" propertyType={item.name} urgency="deadline" />

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/inventory"
            className="rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading hover:border-primary hover:bg-primary/10 transition"
          >
            View all inventory
          </Link>
        </div>
      </div>

      <Script
        id="inventory-slug-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

