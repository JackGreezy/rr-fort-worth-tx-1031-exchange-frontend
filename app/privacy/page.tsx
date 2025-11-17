import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import Script from "next/script";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | 1031 Exchange Fort Worth",
  description: "Privacy policy for 1031 Exchange Fort Worth. Learn how we handle contact information and intake data.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information we collect",
    body: "We collect your name, company, phone, email, and 1031 project inputs when you request service. Intake data is encrypted in transit and at rest.",
  },
  {
    title: "How we use data",
    body: "We use your contact information to reply to requests, coordinate property searches, and route files to Qualified Intermediaries and advisors you approve.",
  },
  {
    title: "Third parties",
    body: "We only share data with fulfillment partners you authorize, including lenders, Qualified Intermediaries, and tax professionals.",
  },
];

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy", href: "/privacy" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-semibold text-heading">Privacy policy</h1>
        <div className="space-y-6 rounded-2xl border border-outline bg-secondary/40 p-6">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-2xl font-semibold text-heading">{section.title}</h2>
              <p className="mt-2 text-sm text-ink/80">{section.body}</p>
            </article>
          ))}
          <p className="text-sm text-ink/70">Contact us at privacy@1031exchangefortworth.com for questions.</p>
        </div>
      </div>
      <Script
        id="privacy-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

