import { Suspense } from "react";
import Script from "next/script";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "./contact-form";
import { COMPANY_NAME, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Contact ${COMPANY_NAME}`,
  description: "Contact our 1031 exchange desk for secure intake, property matching, and replacement property sourcing.",
  path: "/contact",
});

export default function ContactPage() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/locations/fort-worth/fort-worth-tx.webp"
            alt="Fort Worth"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            CONTACT US
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Fill out the form and we will respond with an introductory call plus a replacement property game plan.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Form */}
            <Suspense fallback={<div className="border border-outline/30 bg-panel p-6">Loading form...</div>}>
              <ContactForm />
            </Suspense>
            
            {/* Info */}
            <div className="space-y-8">
              <div className="border border-outline/30 bg-panel p-6">
                <h2 className="font-serif text-2xl text-primary" style={{ fontWeight: 400 }}>Office Info</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">&#9830;</span>
                    <span>{CONTACT_ADDRESS}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">&#9830;</span>
                    <span>
                      Phone:{" "}
                      <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="text-primary hover:text-accent">
                        {CONTACT_PHONE}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">&#9830;</span>
                    <span>
                      Email:{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-accent">
                        {CONTACT_EMAIL}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">&#9830;</span>
                    <span>Hours: Monday-Friday, 8am-6pm</span>
                  </li>
                </ul>
              </div>

              <div className="h-64 overflow-hidden border border-outline/30">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                  title={`Map of ${CONTACT_ADDRESS}`}
                />
              </div>

              <div className="border border-outline/30 bg-panel p-6">
                <p className="text-xs text-ink/50">
                  This site helps investors identify potential replacement properties for Section 1031 exchanges. 
                  We are not a Qualified Intermediary, law firm, broker, or CPA. 
                  Users should consult a Qualified Intermediary and tax advisor before acting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="contact-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
