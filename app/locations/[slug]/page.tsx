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
import { getShortServiceName } from "@/lib/service-names";

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
    { label: "Neighborhoods", href: "/locations" },
    { label: location.name, href: `/locations/${location.slug}` },
  ];

  const faq = batchData?.faqs
    ? batchData.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
    : buildFaq(location.name);

  const popularPaths = batchData?.popularPaths || [];
  const featuredServices = servicesData.slice(0, 4);

  const otherLocations = locationsData
    .filter((l) => l.slug !== location.slug)
    .slice(0, 6);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative bg-primary py-20 lg:py-28">
        {location.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={location.heroImage}
              alt={`${location.name} commercial real estate`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {location.type || "Service Area"}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            {location.name.toUpperCase()}
          </h1>
          <p className="mt-1 font-serif text-xl text-accent md:text-2xl" style={{ fontWeight: 300 }}>
            1031 EXCHANGE
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${site.phoneDigits}`}
              className="bg-accent px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-primary transition hover:bg-accent/90"
            >
              CALL NOW
            </a>
            <Link
              href="/contact"
              className="border border-white/50 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          {batchData?.mainDescription ? (
            <div
              className="prose prose-lg max-w-none text-ink/80 prose-headings:font-serif prose-headings:font-light prose-headings:tracking-wide prose-headings:text-primary prose-p:leading-relaxed prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
            />
          ) : (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-ink/70">
              <p>
                We keep investors in {location.name} plugged into replacement property inventory from {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} to all 50 states.
                Timeline management, underwriting, and sourcing updates deliver weekly so you stay ahead of the 45 day clock.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Paths / Featured Services */}
      {popularPaths.length > 0 ? (
        <section className="bg-primary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl" style={{ fontWeight: 300 }}>
              POPULAR PATHS FOR {location.name.toUpperCase()} INVESTORS
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {popularPaths.map((path) => {
                const href =
                  path.type === "service"
                    ? `/services/${path.slug}`
                    : path.type === "propertyType"
                      ? `/inventory/${path.slug}`
                      : "#";
                return (
                  <Link
                    key={`${path.type}-${path.slug}`}
                    href={href}
                    className="group border-t border-white/20 pt-5"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                      {path.type === "service" ? "Service" : "Property Type"}
                    </p>
                    <h3 className="mt-2 font-serif text-lg text-white group-hover:text-accent" style={{ fontWeight: 400 }}>
                      {path.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{path.whyPopular}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-primary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-white md:text-4xl" style={{ fontWeight: 300 }}>
              FOCUSED SERVICES
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group border-t border-white/20 pt-5"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                    {service.category || "Service"}
                  </p>
                  <h3 className="mt-2 font-serif text-lg text-white group-hover:text-accent" style={{ fontWeight: 400 }}>
                    {getShortServiceName(service.slug)}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{service.short}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-8 inline-block border border-white/50 px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
            >
              VIEW ALL SERVICES
            </Link>
          </div>
        </section>
      )}

      {/* Example Engagement */}
      {batchData?.exampleCapability && (
        <section className="border-t border-outline/30 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              EXAMPLE ENGAGEMENT
            </h2>
            <p className="mt-2 text-xs italic text-ink/50">{batchData.exampleCapability.disclaimer}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {batchData.exampleCapability.location && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Location</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.location}</p>
                </div>
              )}
              {batchData.exampleCapability.situation && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Situation</p>
                  <p className="mt-1 text-sm text-ink/70">{batchData.exampleCapability.situation}</p>
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
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            QUESTIONS INVESTORS ASK
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {faq.map((item, index) => (
              <article key={item.q || index} className="border-l-2 border-accent pl-5">
                <h3 className="font-serif text-lg text-primary" style={{ fontWeight: 400 }}>{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="border-t border-outline/30 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            OTHER SERVICE AREAS
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-3">
            {otherLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={loc.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {loc.heroImage && (
                  <Image
                    src={loc.heroImage}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl" style={{ fontWeight: 300 }}>
                    {loc.name.toUpperCase()}
                  </h3>
                  <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-white px-4 py-2 text-[10px] tracking-[0.2em] text-white">
                      EXPLORE
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
