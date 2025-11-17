import Script from "next/script";
import { servicesData } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServicesDirectory from "@/components/services/ServicesDirectory";
import DeadlineCalculator from "@/components/widgets/DeadlineCalculator";
import TimelineTracker from "@/components/widgets/TimelineTracker";
import IdentificationRules from "@/components/widgets/IdentificationRules";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

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
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold text-heading">1031 exchange services</h1>
          <p className="text-base text-ink/80">
            Pick the support path that keeps your 45 day and 180 day deadlines safe. Search by service name or property focus, then tap into our calculators and rules guides.
          </p>
        </header>

        <ServicesDirectory services={servicesData} />
        <DeadlineCalculator />
        <TimelineTracker />
        <IdentificationRules />
      </div>

      <Script
        id="services-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

