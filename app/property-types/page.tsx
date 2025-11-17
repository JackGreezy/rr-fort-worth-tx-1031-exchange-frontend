import Script from "next/script";
import type { Metadata } from "next";
import { propertyTypesData, inventoryCategories } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import PropertyTypesDirectory from "@/components/property-types/PropertyTypesDirectory";
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
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold text-heading">Replacement property types</h1>
          <p className="text-base text-ink/80">
            Use this library to zero in on the assets that match your timeline, target yield, and credit requirements.
          </p>
        </header>

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading">Inventory categories</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {inventoryCategories.map((category) => (
              <article key={category.slug} className="rounded-xl border border-outline/60 bg-panel p-4">
                <h3 className="text-lg font-semibold text-heading">{category.name}</h3>
                <p className="mt-2 text-sm text-ink/80">{category.note}</p>
              </article>
            ))}
          </div>
        </section>

        <PropertyTypesDirectory propertyTypes={propertyTypesData} />
      </div>

      <Script
        id="property-types-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

