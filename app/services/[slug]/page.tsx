import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/content/site.json";
import { servicesData } from "@/data/services";
import type { ServiceItem } from "@/data/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/app/contact/contact-form";
import IdentificationRules from "@/components/widgets/IdentificationRules";
import ScrollToIdButton from "@/components/home/ScrollToIdButton";
import { createPageMetadata, getBreadcrumbJsonLd, getServiceSchema } from "@/lib/seo";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import RelatedServices from "@/components/services/RelatedServices";
import { getServiceBatchData } from "@/lib/batch-data";

type Params = Promise<{ slug: string }> | { slug: string };

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((item) => item.slug === resolvedParams.slug);
  if (!service) return {};

  return createPageMetadata({
    title: `${service.name} | 1031 Exchange Fort Worth`,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const service = servicesData.find((item) => item.slug === resolvedParams.slug);
  if (!service) notFound();

  const batchData = getServiceBatchData(service.slug);
  const related = getRelatedServices(service);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  // Use batch FAQs if available, otherwise fallback to generated FAQs
  const faqs = batchData?.faqs
    ? batchData.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
    : buildFaqs(service.name);
  const isTripleNetService = /nnn/i.test(service.slug);

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4 rounded-2xl border border-outline bg-secondary/40 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{service.category || "Service"}</p>
          <h1 className="text-4xl font-semibold text-heading">{service.name}</h1>
          <p className="text-base text-ink/85">{service.short}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${site.phoneDigits}`}
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
            >
              Call Now
            </a>
            <ScrollToIdButton
              targetId="service-contact-form"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
            >
              Get In Touch
            </ScrollToIdButton>
            <Link
              href={`/contact?projectType=${encodeURIComponent(service.name)}#contact-form`}
              className="inline-flex items-center justify-center rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-heading transition hover:border-primary hover:bg-primary/5"
            >
              Contact Form
            </Link>
          </div>
        </header>

        {batchData?.mainDescription && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <div
              className="prose prose-sm max-w-none text-ink/90 prose-headings:text-heading prose-p:text-ink/80 prose-strong:text-heading"
              dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
            />
          </section>
        )}

        {batchData?.inclusions && batchData.inclusions.length > 0 && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">What's included</h2>
            <ul className="space-y-2 text-sm text-ink/80">
              {batchData.inclusions.map((inclusion, index) => (
                <li key={index}>• {inclusion}</li>
              ))}
            </ul>
          </section>
        )}

        {batchData?.commonSituations && batchData.commonSituations.length > 0 && (
          <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">Common situations</h2>
            <ul className="space-y-3 text-sm text-ink/80">
              {batchData.commonSituations.map((situation, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{situation}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <RelatedServices services={related} currentService={service.name} />

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading">Questions we answer often</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-outline/60 bg-panel p-4">
                <h3 className="text-base font-semibold text-heading">{faq.q}</h3>
                <p className="mt-2 text-sm text-ink/80">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        {batchData?.exampleCapability && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">Example engagement</h2>
            <div className="space-y-4 text-sm text-ink/80">
              <p className="text-xs text-ink/60 italic">{batchData.exampleCapability.disclaimer}</p>
              <div>
                <p className="font-semibold text-heading">Service Type:</p>
                <p>{batchData.exampleCapability.serviceType}</p>
              </div>
              {batchData.exampleCapability.location && (
                <div>
                  <p className="font-semibold text-heading">Location:</p>
                  <p>{batchData.exampleCapability.location}</p>
                </div>
              )}
              {batchData.exampleCapability.scope && (
                <div>
                  <p className="font-semibold text-heading">Scope:</p>
                  <p>{batchData.exampleCapability.scope}</p>
                </div>
              )}
              {batchData.exampleCapability.clientSituation && (
                <div>
                  <p className="font-semibold text-heading">Client Situation:</p>
                  <p>{batchData.exampleCapability.clientSituation}</p>
                </div>
              )}
              {batchData.exampleCapability.ourApproach && (
                <div>
                  <p className="font-semibold text-heading">Our Approach:</p>
                  <p>{batchData.exampleCapability.ourApproach}</p>
                </div>
              )}
              {batchData.exampleCapability.expectedOutcome && (
                <div>
                  <p className="font-semibold text-heading">Expected Outcome:</p>
                  <p>{batchData.exampleCapability.expectedOutcome}</p>
                </div>
              )}
              {batchData.exampleCapability.contactCTA && (
                <p className="mt-4 text-base text-ink/90">{batchData.exampleCapability.contactCTA}</p>
              )}
            </div>
          </section>
        )}

        <IdentificationRules />

        {isTripleNetService && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading">Triple net lease clarity</h2>
            <p className="text-sm text-ink/80">
              Triple net (NNN) leases let a creditworthy tenant take on taxes, insurance, and maintenance so you can focus on collecting rent.
              We prioritize operators across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}, and nationwide who need stability without daily property management.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Absolute NNN</p>
                <p className="text-sm text-ink/80">
                  Corporate-guaranteed, 10–20+ year leases that cede every expense to the tenant. Own the property, collect escalation-protected rent, and sleep easy.
                </p>
              </article>
              <article className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Regular NNN</p>
                <p className="text-sm text-ink/80">
                  Tenants pay net taxes, insurance, and CAM while you cover limited items like roof or parking when required. The lease still keeps landlord involvement minimal.
                </p>
              </article>
              <article className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-ink/70">Ground & sale-leasebacks</p>
                <p className="text-sm text-ink/80">
                  Fee-simple ground leases lock in 20–99 year land income while corrections build improvements, and sale-leasebacks turn occupier equity into passive cash flow.
                </p>
              </article>
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-ink/80">
              <li>Tenants are chosen for creditworthiness, location strength, and lease duration to stay profitable even during downturns.</li>
              <li>Steady monthly income with annual escalations, CPI bumps, and documented rent locks cuts owner risk.</li>
              <li>Passive holdings pair well with 1031 exchange planning, cost segregation, and other tax-deferral plays.</li>
              <li>Diversify by geography, tenant type, asset class, and cap rate while you remain hands-off.</li>
            </ul>
            <p className="mt-4 text-xs text-ink/70">
              Because the tenant covers the heavy lifting, the only material landlord responsibilities tend to be structural, roof, or parking in select leases.
              That makes NNN investments one of the most stable, recession-resilient paths we source for exchange investors.
            </p>
          </section>
        )}

        <ContactForm
          formId="service-contact-form"
          heading="Share your timeline"
          description="Tell us about your relinquished asset, target project type, and lender expectations."
          prefillProjectType={service.name}
        />

        {batchData?.complianceNote && (
          <div className="rounded-lg border border-outline/60 bg-secondary/30 p-4">
            <p className="text-xs text-ink/70">{batchData.complianceNote}</p>
          </div>
        )}
      </div>

      <Script
        type="application/ld+json"
        id="service-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([getBreadcrumbJsonLd(breadcrumbs), getServiceSchema(service.name, service.short)]) }}
      />
    </div>
  );
}

function getRelatedServices(current: ServiceItem) {
  return servicesData
    .filter((item) => item.slug !== current.slug)
    .slice(0, 4);
}

function buildFaqs(serviceName: string) {
  return [
    {
      q: `How fast can you show options for ${serviceName}?`,
      a: `Most requests receive an initial property batch inside five business days in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      q: `Do you coordinate with Qualified Intermediaries for ${serviceName}?`,
      a: `Yes. We sync every milestone with your Qualified Intermediary and advisors located in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      q: `What if the 45 day window is already running for ${serviceName}?`,
      a: `We triage your list, label each call, and log delivery proofs so you can defend the identification letter in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      q: `Do you provide legal or tax advice for ${serviceName}?`,
      a: `No. We coordinate with your attorney and CPA and keep communication secure throughout the exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
  ];
}

