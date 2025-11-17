import { Suspense } from "react";
import Script from "next/script";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "./contact-form";
import IdentificationLetterHelper from "@/components/widgets/IdentificationLetterHelper";
import { COMPANY_NAME, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DIGITS, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Contact ${COMPANY_NAME}`,
  description: "Contact our 1031 exchange desk for secure intake, property matching, and replacement property sourcing.",
  path: "/contact",
});

export default function ContactPage() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`)}&output=embed`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">Contact</p>
          <h1 className="text-4xl font-semibold text-heading">Connect with our desk</h1>
          <p className="text-base text-ink/80">
            Fill out the form and we will respond with an introductory call plus a replacement property game plan.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm />
          </Suspense>
          <div className="space-y-6 rounded-2xl border border-outline bg-secondary/40 p-6">
            <section>
              <h2 className="text-2xl font-semibold text-heading">Office info</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink/80">
                <li>
                  Address: {CONTACT_ADDRESS}
                </li>
                <li>
                  Phone:{" "}
                  <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="text-primary hover:underline">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>Hours: 24 hours a day, 7 days a week.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-heading">Map</h3>
              <div className="h-60 overflow-hidden rounded-2xl border border-outline">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                  title={`${PRIMARY_CITY} map`}
                />
              </div>
            </section>

            <section className="space-y-2 text-sm text-ink/70">
              <p>This site helps investors identify potential replacement properties for Section 1031 exchanges.</p>
              <p>This site is not a Qualified Intermediary, law firm, broker, or CPA.</p>
              <p>Users should consult a Qualified Intermediary and tax advisor before acting.</p>
            </section>
          </div>
        </div>

        <IdentificationLetterHelper />
      </div>

      <Script
        id="contact-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

