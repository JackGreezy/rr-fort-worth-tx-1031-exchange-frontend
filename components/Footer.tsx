import Link from "next/link";
import site from "@/content/site.json";
import { resources, toolsData } from "@/data";
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

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`)}&output=embed`;

  return (
    <footer className="mt-24 bg-primary text-primaryfg">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
          <section className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-primaryfg/70">Fort Worth Exchange Desk</p>
            <h3 className="text-3xl font-semibold text-white">{COMPANY_NAME}</h3>
            <p className="text-sm text-primaryfg/80">
              {CONTACT_ADDRESS}
              <br />
              Serving Fort Worth, Dallas, and investors across Texas.
            </p>
            <div className="space-y-2 text-sm text-primaryfg/80">
              <p>Hours: 24 hours a day, 7 days a week.</p>
              <p>HQ: {site.address}</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
              >
                Call {CONTACT_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold transition hover:-translate-y-0.5 hover:bg-gold/10"
              >
                Contact
              </Link>
            </div>
          </section>

          <section className="space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
            <h4 className="text-lg font-semibold text-white">Quick links</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm">
              {sitemapLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-primaryfg/80 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4">
              <h5 className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Tools</h5>
              <div className="mt-3 grid gap-2 text-sm">
                {toolsData.slice(0, 4).map((tool) => (
                  <Link key={tool.slug} href={tool.route} className="text-primaryfg/80 transition hover:text-white">
                    {tool.name}
                  </Link>
                ))}
                <Link href="/tools" className="text-xs font-semibold uppercase tracking-[0.32em] text-gold transition hover:text-white">
                  View all tools
                </Link>
              </div>
            </div>
          </section>

          <section className="space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
            <h4 className="text-lg font-semibold text-white">Compliance & IRS guidance</h4>
            <p className="text-sm text-primaryfg/80">
              Educational content only. Coordinate with your Qualified Intermediary, CPA, and attorney for transaction-specific advice.
            </p>
            <div className="grid gap-2 text-sm">
              {complianceLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primaryfg/80 transition hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                  {link.label}
                </a>
              ))}
            </div>
            <div className="space-y-2 text-xs text-primaryfg/70">
              <p>“A 1031 exchange defers federal and Texas income tax on qualifying real property. Texas does not levy a state income tax, but transfer and recording fees may apply.”</p>
              <p>Secure uploads and attorney review available on request.</p>
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-2 text-sm text-primaryfg/75">
            <p>This platform connects investors with Fort Worth 1031 exchange specialists for property identification, timeline coordination, and reporting support.</p>
            <p>We are not a Qualified Intermediary, law firm, broker, or CPA. Verify strategy with your advisory team before executing an exchange.</p>
          </div>
          <div className="h-56 overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_24px_rgba(10,16,28,0.35)]">
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

