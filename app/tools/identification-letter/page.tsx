import Script from "next/script";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import IdentificationLetterHelper from "@/components/widgets/IdentificationLetterHelper";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Identification Letter Helper",
  description: "Draft a 1031 identification letter with placeholders for properties, rules, and delivery language.",
  path: "/tools/identification-letter",
});

export default function IdentificationLetterPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Identification Letter Helper", href: "/tools/identification-letter" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-heading">Identification letter helper</h1>
          <p className="text-base text-ink/80">Customize the template and copy it into your secure intermediary portal.</p>
        </header>
        <IdentificationLetterHelper />
      </div>
      <Script
        id="ident-letter-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

