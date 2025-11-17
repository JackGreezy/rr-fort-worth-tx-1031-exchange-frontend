import Script from "next/script";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import TimelineTracker from "@/components/widgets/TimelineTracker";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Timeline Tracker",
  description: "Review milestone checkpoints from sale to replacement closing to keep your exchange accountable.",
  path: "/tools/timeline-tracker",
});

export default function TimelineTrackerPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Timeline Tracker", href: "/tools/timeline-tracker" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-heading">1031 timeline tracker</h1>
          <p className="text-base text-ink/80">Use this reference to keep lenders, intermediaries, and advisors aligned.</p>
        </header>
        <TimelineTracker />
      </div>
      <Script
        id="timeline-tool-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

