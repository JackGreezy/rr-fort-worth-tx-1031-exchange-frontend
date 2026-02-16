import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { locationsData } from "@/data/locations";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Service Areas | Fort Worth Metro",
  description: "Search Fort Worth neighborhoods and nearby cities where we help investors identify 1031 replacement properties.",
  path: "/locations",
});

export default function LocationsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Neighborhoods", href: "/locations" },
  ];

  const featured = locationsData.slice(0, 6);
  const remaining = locationsData.slice(6);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbs} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            SERVICE AREAS
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            We cover urban districts, suburban corridors, and logistics hubs within the Fort Worth metro area.
          </p>
        </div>
      </section>

      {/* Featured Cities - Image Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            FEATURED CITIES
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-3">
            {featured.map((location) => (
              <Link
                key={location.slug}
                href={location.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {location.heroImage && (
                  <Image
                    src={location.heroImage}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl" style={{ fontWeight: 300 }}>
                    {location.name.toUpperCase()}
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

      {/* Remaining Cities */}
      <section className="border-t border-outline/30 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            ALL SERVICE AREAS
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-3">
            {remaining.map((location) => (
              <Link
                key={location.slug}
                href={location.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {location.heroImage && (
                  <Image
                    src={location.heroImage}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl" style={{ fontWeight: 300 }}>
                    {location.name.toUpperCase()}
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
            Don&apos;t See Your Area?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            We also help remote buyers who need national sourcing for their 1031 exchange.
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
        id="locations-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
