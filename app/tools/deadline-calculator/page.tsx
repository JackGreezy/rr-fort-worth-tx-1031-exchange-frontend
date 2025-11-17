import Script from "next/script";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import DeadlineCalculator from "@/components/widgets/DeadlineCalculator";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "45/180 Day Deadline Calculator",
  description: "Calculate 45 day identification and 180 day closing deadlines for your 1031 exchange.",
  path: "/tools/deadline-calculator",
});

export default function DeadlineCalculatorPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "45/180 Day Deadline Calculator", href: "/tools/deadline-calculator" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-heading">45/180 day deadline calculator</h1>
          <p className="text-base text-ink/80">
            Track your identification and closing milestones with timezone-aware reminders.
          </p>
        </header>
        <DeadlineCalculator />
      </div>
      <Script
        id="deadline-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

