import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import site from "@/content/site.json";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { getLocationBatchData } from "@/lib/batch-data";

type Params = Promise<{ slug: string }> | { slug: string };

export function generateStaticParams() {
  return locationsData.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locationsData.find((item) => item.slug === resolvedParams.slug);
  if (!location) return {};

  return createPageMetadata({
    title: `${location.name} 1031 Exchange Support`,
    description: `1031 exchange replacement property support for ${location.name} near ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const location = locationsData.find((item) => item.slug === resolvedParams.slug);
  if (!location) notFound();

  const batchData = getLocationBatchData(location.slug);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: location.name, href: `/locations/${location.slug}` },
  ];

  // Use batch FAQs if available, otherwise fallback to generated FAQs
  const faq = batchData?.faqs
    ? batchData.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
    : buildFaq(location.name);

  // Use popularPaths from batch data if available, otherwise use featured services
  const popularPaths = batchData?.popularPaths || [];
  const featuredServices = servicesData.slice(0, 4);

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="relative overflow-hidden rounded-2xl border border-outline bg-secondary/40">
          {location.heroImage && (
            <div className="relative h-64 w-full md:h-80">
              <Image
                src={location.heroImage}
                alt={`${location.name} commercial real estate`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-panel/50 to-transparent" />
            </div>
          )}
          <div className="space-y-4 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{location.type}</p>
            <h1 className="text-4xl font-semibold text-heading">{location.name} 1031 exchange support</h1>
            {batchData?.mainDescription ? (
              <div
                className="prose prose-sm max-w-none text-ink/80 prose-headings:text-heading prose-p:text-ink/80 prose-strong:text-heading"
                dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
              />
            ) : (
              <p className="text-base text-ink/80">
                We keep investors in {location.name} plugged into replacement property inventory from {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} to all 50 states.
                Timeline management, underwriting, and sourcing updates deliver weekly so you stay ahead of the 45 day clock.
              </p>
            )}
          </div>
        </header>

        {batchData?.popularPaths && batchData.popularPaths.length > 0 ? (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading">Popular paths for {location.name} investors</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {batchData.popularPaths.map((path) => {
                const href =
                  path.type === "service"
                    ? `/services/${path.slug}`
                    : path.type === "propertyType"
                      ? `/property-types/${path.slug}`
                      : "#";
                return (
                  <article key={`${path.type}-${path.slug}`} className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink/60">
                      {path.type === "service" ? "Service" : path.type === "propertyType" ? "Property Type" : "Path"}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-heading">{path.name}</h3>
                    <p className="mt-1 text-sm text-ink/80">{path.whyPopular}</p>
                    {href !== "#" && (
                      <Link href={href} className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                        View details
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading">Focused services</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {featuredServices.map((service) => (
                <article key={service.slug} className="rounded-xl border border-outline/60 bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{service.category || "Service"}</p>
                  <h3 className="mt-2 text-lg font-semibold text-heading">{service.name}</h3>
                  <p className="mt-1 text-sm text-ink/80">{service.short}</p>
                  <Link href={service.route} className="mt-3 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                    View details
                  </Link>
                </article>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-6 inline-flex rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading"
            >
              View all services
            </Link>
          </section>
        )}

        {batchData?.exampleCapability && (
          <section className="rounded-2xl border border-outline bg-panel p-6">
            <h2 className="text-2xl font-semibold text-heading mb-4">Example engagement</h2>
            <div className="space-y-4 text-sm text-ink/80">
              <p className="text-xs text-ink/60 italic">{batchData.exampleCapability.disclaimer}</p>
              {batchData.exampleCapability.location && (
                <div>
                  <p className="font-semibold text-heading">Location:</p>
                  <p>{batchData.exampleCapability.location}</p>
                </div>
              )}
              {batchData.exampleCapability.situation && (
                <div>
                  <p className="font-semibold text-heading">Situation:</p>
                  <p>{batchData.exampleCapability.situation}</p>
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
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-outline bg-secondary/40 p-6">
          <h2 className="text-2xl font-semibold text-heading">Questions investors ask</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faq.map((item, index) => (
              <article key={item.q || index} className="rounded-xl border border-outline/60 bg-panel p-4">
                <h3 className="text-base font-semibold text-heading">{item.q}</h3>
                <p className="mt-2 text-sm text-ink/80">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
          >
            Call Now
          </a>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
          >
            Get In Touch
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-heading transition hover:border-primary hover:bg-primary/5"
          >
            View all locations
          </Link>
        </div>
      </div>

      <Script
        id="location-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

function buildFaq(name: string) {
  return [
    {
      q: `Do you have inventory ready for ${name}?`,
      a: `Yes. We track on and off market assets around ${name} plus out of state options so you can compare yields beyond ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      q: `Can you coordinate site tours in ${name}?`,
      a: `We schedule tours with local brokers and provide digital walk throughs when travel to ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} is not possible.`,
    },
    {
      q: `How are deadlines handled for ${name}?`,
      a: `All communication is timestamped and stored, so your 45 day and 180 day evidence trail references ${name} and ${PRIMARY_STATE_ABBR} time zones.`,
    },
    {
      q: `Can you help if I need assets outside ${name}?`,
      a: `Absolutely. We cover every state and coordinate replacement property searches that start in ${name} and expand nationwide.`,
    },
  ];
}

