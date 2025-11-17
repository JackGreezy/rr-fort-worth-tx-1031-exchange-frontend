import type { Metadata } from "next";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use | 1031 Exchange Fort Worth",
  description: "Terms of use for 1031 Exchange Fort Worth. Review acceptable use, disclaimers, and governing law.",
  path: "/terms",
});

const clauses = [
  {
    title: "Educational content",
    body: "Content on this site is provided for educational purposes only and should not be treated as legal, tax, or investment advice.",
  },
  {
    title: "No intermediary services",
    body: "We are not a Qualified Intermediary and do not provide escrow, brokerage, or legal services.",
  },
  {
    title: "Limitation of liability",
    body: "Your use of this site is at your own risk. We are not liable for decisions made based on its content.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the State of Texas.",
  },
];

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-semibold text-heading">Terms of use</h1>
        <div className="space-y-6 rounded-2xl border border-outline bg-secondary/40 p-6">
          {clauses.map((clause) => (
            <article key={clause.title}>
              <h2 className="text-2xl font-semibold text-heading">{clause.title}</h2>
              <p className="mt-2 text-sm text-ink/80">{clause.body}</p>
            </article>
          ))}
          <p className="text-sm text-ink/70">Contact us if you have questions about these terms.</p>
        </div>
      </div>

      <Script
        id="terms-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

