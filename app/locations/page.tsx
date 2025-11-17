import Script from "next/script";
import { locationsData } from "@/data/locations";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocationsDirectory from "@/components/locations/LocationsDirectory";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Service Areas | Fort Worth Focus",
  description: "Search Fort Worth neighborhoods and nearby districts where we help investors identify 1031 replacement properties.",
  path: "/locations",
});

export default function LocationsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold text-heading">Fort Worth service areas</h1>
          <p className="text-base text-ink/80">
            We cover urban districts, suburban corridors, and logistics hubs within about 30 miles of the CBD, plus remote buyers who need national sourcing. Search a neighborhood to get started.
          </p>
        </header>

        <LocationsDirectory locations={locationsData} />
      </div>

      <Script
        id="locations-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

