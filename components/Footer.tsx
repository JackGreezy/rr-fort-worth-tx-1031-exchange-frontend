import Link from "next/link";
import site from "@/content/site.json";
import { resources, toolsData, locationsData } from "@/data";
import type { LocationItem } from "@/data/types";
import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_URL,
} from "@/lib/constants";

const footerServices = [
  { name: "Forward Exchange", href: "/services/forward-exchange" },
  { name: "Reverse Exchange", href: "/services/reverse-exchange" },
  { name: "Delayed Exchange", href: "/services/delayed-exchange" },
  { name: "Improvement Exchange", href: "/services/improvement-exchange" },
  { name: "Build-to-Suit Exchange", href: "/services/build-to-suit-exchange" },
  { name: "DST Placement", href: "/services/dst-placement-readiness" },
  { name: "Qualified Intermediary", href: "/services/qualified-intermediary-services" },
  { name: "Property Identification", href: "/services/property-identification" },
  { name: "Timeline Management", href: "/services/fort-worth-45-day-sprint" },
];

const sitemapLinks = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Property Types", href: "/property-types" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const complianceLinks = resources.slice(0, 4);

// Sort locations: Fort Worth first, then other cities, then districts/suburbs
function sortLocations(locations: LocationItem[]): LocationItem[] {
  const primaryCitySlug = PRIMARY_CITY.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  return [...locations].sort((a, b) => {
    // Fort Worth first
    if (a.slug === primaryCitySlug) return -1;
    if (b.slug === primaryCitySlug) return 1;
    
    // Then cities
    const aIsCity = a.type === "city";
    const bIsCity = b.type === "city";
    if (aIsCity && !bIsCity) return -1;
    if (!aIsCity && bIsCity) return 1;
    
    // Then districts
    const aIsDistrict = a.type === "district";
    const bIsDistrict = b.type === "district";
    if (aIsDistrict && !bIsDistrict) return -1;
    if (!aIsDistrict && bIsDistrict) return 1;
    
    // Then suburbs
    const aIsSuburb = a.type === "suburb";
    const bIsSuburb = b.type === "suburb";
    if (aIsSuburb && !bIsSuburb) return -1;
    if (!aIsSuburb && bIsSuburb) return 1;
    
    // Alphabetical for same type
    return a.name.localeCompare(b.name);
  });
}

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`;
  const sortedLocations = sortLocations(locationsData);
  
  // Top locations: Fort Worth + first 7 cities/districts
  const topLocations = sortedLocations.slice(0, 8);
  const remainingLocations = sortedLocations.slice(8);

  return (
    <footer className="mt-24 bg-primary text-primaryfg">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 md:px-10">
        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Company info - takes 3 columns */}
          <section className="space-y-4 lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-primaryfg/70">Best 1031 Exchange in Fort Worth, TX</p>
            <h3 className="text-2xl font-semibold text-white">{COMPANY_NAME}</h3>
            <p className="text-sm text-primaryfg/80">
              {CONTACT_ADDRESS}
              <br />
              Serving Fort Worth, Dallas, and investors across Texas.
              <br />
              <span className="text-xs">We help Fort Worth investors find replacement properties across all 50 states.</span>
            </p>
            <div className="space-y-1 text-xs text-primaryfg/80">
              <p>Hours: Monday-Friday: 8am-6pm</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
              >
                Call {CONTACT_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold transition hover:-translate-y-0.5 hover:bg-gold/10"
              >
                Contact
              </Link>
            </div>
          </section>

          {/* Services - takes 5 columns */}
          <section className="space-y-4 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-semibold text-white">Services</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {footerServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-primaryfg/80 transition hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-gold transition hover:text-white"
            >
              View all services →
            </Link>
          </section>

          {/* Locations - takes 4 columns */}
          <section className="space-y-4 lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-semibold text-white">Locations</h4>
            
            {/* Top locations - always visible */}
            <div className="space-y-1.5">
              {topLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={location.route}
                  className="block text-xs text-primaryfg/80 transition hover:text-white"
                >
                  {location.name}
                </Link>
              ))}
            </div>

            {/* Scrollable remaining locations */}
            {remainingLocations.length > 0 && (
              <div className="relative">
                <div className="max-h-32 overflow-y-auto pr-2 space-y-1.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(183, 147, 73, 0.3) transparent' }}>
                  {remainingLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={location.route}
                      className="block text-xs text-primaryfg/70 transition hover:text-white"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <Link
              href="/locations"
              className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-gold transition hover:text-white"
            >
              View all locations →
            </Link>
          </section>
        </div>

        {/* Secondary links and tools */}
        <div className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-3">
          <section className="space-y-3">
            <h5 className="text-sm font-semibold text-white">Quick links</h5>
            <nav className="grid grid-cols-2 gap-1.5 text-xs">
              {sitemapLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-primaryfg/80 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h5 className="text-sm font-semibold text-white">Tools</h5>
            <div className="grid gap-1.5 text-xs">
              {toolsData.slice(0, 4).map((tool) => (
                <Link key={tool.slug} href={tool.route} className="text-primaryfg/80 transition hover:text-white">
                  {tool.name}
                </Link>
              ))}
              <Link href="/tools" className="text-xs font-semibold uppercase tracking-[0.32em] text-gold transition hover:text-white">
                View all tools →
              </Link>
            </div>
          </section>

          <section className="space-y-3">
            <h5 className="text-sm font-semibold text-white">Compliance & IRS guidance</h5>
            <div className="grid gap-1.5 text-xs">
              {complianceLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-primaryfg/80 transition hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Map and disclaimer */}
        <div className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-2 text-xs text-primaryfg/75">
            <p>This platform connects investors with Fort Worth 1031 exchange specialists for property identification, timeline coordination, and reporting support.</p>
            <p>We are not a Qualified Intermediary, law firm, broker, or CPA. Verify strategy with your advisory team before executing an exchange.</p>
            <p className="pt-2 text-primaryfg/70">“A 1031 exchange defers federal and Texas income tax on qualifying real property. Texas does not levy a state income tax, but transfer and recording fees may apply.”</p>
          </div>
          <div className="h-48 overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_24px_rgba(10,16,28,0.35)]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title={`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} map`}
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-primaryfg/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <p>
            <span className="text-primaryfg/50">Canonical:</span> {SITE_URL}
          </p>
        </div>
      </div>
    </footer>
  );
}

