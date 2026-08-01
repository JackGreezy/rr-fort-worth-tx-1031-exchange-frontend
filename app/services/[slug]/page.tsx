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
import { getShortServiceName } from "@/lib/service-names";

type Params = Promise<{ slug: string }>;

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
    { label: getShortServiceName(service.slug), href: `/services/${service.slug}` },
  ];

  const faqs = batchData?.faqs
    ? batchData.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
    : buildFaqs(service.name);
  const isTripleNetService = /nnn/i.test(service.slug);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {service.category || "1031 Service"}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            {getShortServiceName(service.slug)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {service.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${site.phoneDigits}`}
              className="bg-accent px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-accent/90"
            >
              CALL NOW
            </a>
            <ScrollToIdButton
              targetId="service-contact-form"
              className="border border-white/50 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
            >
              GET IN TOUCH
            </ScrollToIdButton>
          </div>
        </div>
      </section>

      {/* Main Description */}
      {batchData?.mainDescription && (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <div
              className="prose prose-lg max-w-none text-ink/80 prose-headings:font-serif prose-headings:font-light prose-headings:tracking-wide prose-headings:text-primary prose-p:leading-relaxed prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
            />
          </div>
        </section>
      )}

      {/* Inclusions */}
      {batchData?.inclusions && batchData.inclusions.length > 0 && (
        <section className="border-t border-outline/30 bg-paper py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              WHAT&apos;S INCLUDED
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {batchData.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-start gap-3 border-b border-outline/20 pb-4">
                  <span className="mt-1 text-accent">&#9656;</span>
                  <p className="text-sm leading-relaxed text-ink/70">{inclusion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Common Situations */}
      {batchData?.commonSituations && batchData.commonSituations.length > 0 && (
        <section className="bg-primary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl" style={{ fontWeight: 300 }}>
              COMMON SITUATIONS
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {batchData.commonSituations.map((situation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-white/80">{situation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            QUESTIONS WE ANSWER OFTEN
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.q} className="border-l-2 border-accent pl-5">
                <h3 className="font-serif text-lg text-primary" style={{ fontWeight: 400 }}>{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Example Engagement */}
      {batchData?.exampleCapability && (
        <section className="border-t border-outline/30 bg-paper py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              EXAMPLE ENGAGEMENT
            </h2>
            <p className="mt-2 text-xs italic text-ink/50">{batchData.exampleCapability.disclaimer}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {batchData.exampleCapability.serviceType && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Service Type</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.serviceType}</p>
                </div>
              )}
              {batchData.exampleCapability.location && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Location</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.location}</p>
                </div>
              )}
              {batchData.exampleCapability.scope && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Scope</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.scope}</p>
                </div>
              )}
              {batchData.exampleCapability.clientSituation && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Client Situation</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.clientSituation}</p>
                </div>
              )}
              {batchData.exampleCapability.ourApproach && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Our Approach</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.ourApproach}</p>
                </div>
              )}
              {batchData.exampleCapability.expectedOutcome && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Expected Outcome</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.expectedOutcome}</p>
                </div>
              )}
            </div>
            {batchData.exampleCapability.contactCTA && (
              <p className="mt-8 text-sm text-ink/80">{batchData.exampleCapability.contactCTA}</p>
            )}
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="border-t border-outline/30 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <RelatedServices services={related} currentService={service.name} />
        </div>
      </section>

      <IdentificationRules />

      {/* Triple Net Section */}
      {isTripleNetService && (
        <section className="bg-primary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl" style={{ fontWeight: 300 }}>
              TRIPLE NET LEASE CLARITY
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80">
              Triple net (NNN) leases let a creditworthy tenant take on taxes, insurance, and maintenance so you can focus on collecting rent.
              We prioritize operators across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}, and nationwide who need stability without daily property management.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="border-t border-white/20 pt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Absolute NNN</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Corporate-guaranteed, 10–20+ year leases that cede every expense to the tenant. Own the property, collect escalation-protected rent, and sleep easy.
                </p>
              </div>
              <div className="border-t border-white/20 pt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Regular NNN</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Tenants pay net taxes, insurance, and CAM while you cover limited items like roof or parking when required. The lease still keeps landlord involvement minimal.
                </p>
              </div>
              <div className="border-t border-white/20 pt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Ground & Sale-Leasebacks</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Fee-simple ground leases lock in 20–99 year land income while corrections build improvements, and sale-leasebacks turn occupier equity into passive cash flow.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <ContactForm
            formId="service-contact-form"
            heading="Share your timeline"
            description="Tell us about your relinquished asset, target project type, and lender expectations."
            prefillProjectType={service.name}
          />
        </div>
      </section>

      {/* Compliance Note */}
      {batchData?.complianceNote && (
        <div className="border-t border-outline/30 py-8">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <p className="text-xs text-ink/50">{batchData.complianceNote}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Ready to Start Your Exchange?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Our team is ready to help you navigate the 1031 exchange process with confidence.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border border-white px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
          >
            CONTACT US
          </Link>
        </div>
      </section>

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
