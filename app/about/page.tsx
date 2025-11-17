import Script from "next/script";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { COMPANY_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: `About ${COMPANY_NAME}`,
  description: `Learn how ${COMPANY_NAME} guides 1031 exchange buyers with secure intake, property matching, and lender coordination.`,
  path: "/about",
});

const values = [
  {
    title: "Secure intake",
    detail: "Encrypted forms capture your sale data, equity, debt, and lender preferences.",
  },
  {
    title: "Property matching",
    detail: "We log every call, tour, and rent roll review so you have proof of effort when the 45 day clock ends.",
  },
  {
    title: "Third party coordination",
    detail: "We interface with Qualified Intermediaries, CPAs, and lenders while you approve each step.",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4 rounded-2xl border border-outline bg-secondary/40 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">About</p>
          <h1 className="text-4xl font-semibold text-heading">We help 1031 buyers act with speed</h1>
          <p className="text-base text-ink/80">
            {COMPANY_NAME} focuses on unrepresented investors who need a professional search partner in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. We identify
            replacement properties, document every milestone, and deliver readiness packages to your lenders and advisors.
          </p>
        </header>

        <section className="rounded-2xl border border-outline bg-panel p-6">
          <h2 className="text-2xl font-semibold text-heading">How it works</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                <h3 className="text-lg font-semibold text-heading">{value.title}</h3>
                <p className="mt-2 text-sm text-ink/80">{value.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink/70">
            We are not a Qualified Intermediary, law firm, broker, or CPA. We handle property research, documentation, and coordination so your advisors can focus on legal and tax opinions.
          </p>
        </section>

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading">Workflow overview</h2>
          <ol className="mt-4 space-y-3 text-sm text-ink/80">
            <li>1. Intake: we collect closing statements, debt requirements, and preferred asset classes.</li>
            <li>2. Matching: our desk builds a replacement property list and logs every outreach attempt.</li>
            <li>3. Documentation: diligence, letters of intent, and inspection notes are stored in a secure workspace.</li>
            <li>4. Coordination: we schedule lender calls, QI checkpoints, and attorney reviews.</li>
          </ol>
        </section>

        <div className="rounded-2xl border border-outline bg-panel p-6">
          <h2 className="text-2xl font-semibold text-heading">Ready to work together?</h2>
          <p className="mt-2 text-sm text-ink/70">
            Share your exchange details and we will reply with current property availability and next steps.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us
          </Link>
        </div>
      </div>

      <Script
        id="about-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

