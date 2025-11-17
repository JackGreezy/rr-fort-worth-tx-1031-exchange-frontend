'use client';

import Script from "next/script";
import Image from "next/image";
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CalculatorIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import site from "@/content/site.json";
import {
  inventoryCategories,
  locationsData,
  propertyTypesData,
  resources,
  servicesData,
  toolsData,
} from "@/data";
import type { ServiceItem } from "@/data";
import BottomCTA from "@/components/BottomCTA";
import ContactForm from "@/app/contact/contact-form";
import HomeServiceCollections from "@/components/home/HomeServiceCollections";
import HomeServiceArea from "@/components/home/HomeServiceArea";
import ScrollToFormButton from "@/components/home/ScrollToFormButton";
import { getProfessionalServiceSchema } from "@/lib/seo";

const toolIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "boot-calculator": CalculatorIcon,
  "deadline-calculator": CalculatorIcon,
  "identification-rules-checker": ShieldCheckIcon,
  "identification-letter-helper": ShieldCheckIcon,
  "timeline-tracker": ShieldCheckIcon,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const trustSignals = [
  {
    title: "Qualified Intermediary Partners",
    description:
      "Escrow and proceeds management handled with vetted QI relationships in Fort Worth and nationwide.",
    icon: ShieldCheckIcon,
  },
  {
    title: "CPA Collaboration",
    description: "Tax deferral strategy aligned with CPA partners before you identify replacements.",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Attorney Review Available",
    description: "Contract packages reviewed with real estate counsel for compliant, timely closings.",
    icon: BuildingOffice2Icon,
  },
  {
    title: "IRS-Compliant Process",
    description: "Documentation, timelines, and escrow controls mirror IRS guidance for every exchange.",
    icon: ChartBarIcon,
  },
];

const whyCards = [
  {
    title: "Texas Market Expertise",
    description:
      "Fort Worth-based sourcing keeps convenience, QSR, pharmacy, auto, and medical assets in play before they hit the market.",
    icon: BuildingOffice2Icon,
  },
  {
    title: "Structured, Timely Coordination",
    description:
      "We map every move against the 45/180 deadlines so debt replacement, inspections, and reporting stay synchronized.",
    icon: ChartBarIcon,
  },
  {
    title: "Local Access, National Reach",
    description:
      "Fort Worth boots on the ground plus national broker, developer, and sale-leaseback partners.",
    icon: BanknotesIcon,
  },
];

const timelineSteps = [
  {
    title: "Sell your relinquished property",
    description:
      "Document net proceeds, debt payoff, and intermediary controls so the 45-day identification clock starts clean.",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Identify replacements within 45 days",
    description:
      "Layer credit, lease term, yield, and geography to shortlist compliant replacements with verified tenants.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Close within 180 days",
    description:
      "Coordinate due diligence, lender requirements, and reporting so closing packages file on time.",
    icon: CalendarDaysIcon,
  },
];

export default function Home() {
  const heroHighlightSlugs = ["forward-exchange", "reverse-exchange", "nnn-property-identification"];
  const heroHighlights = heroHighlightSlugs.reduce<ServiceItem[]>((acc, slug) => {
    const match = servicesData.find((service) => service.slug === slug);
    if (match) {
      acc.push(match);
    }
    return acc;
  }, []);

  const coverageCities = locationsData.filter((location) => location.type === "city");
  const featuredMarkets = coverageCities.slice(0, 8);
  const coverageHighlights = coverageCities.slice(0, 5).map((city) => city.name);
  const propertyShowcase = propertyTypesData.slice(0, 8);

  const categoryOrder = ["Timelines", "Structures", "Execution", "Property Paths", "Tax", "Reporting", "Education"];
  const serviceCollections = categoryOrder
    .map((category) => ({
      category,
      items: servicesData.filter((service) => service.category === category).slice(0, 4),
    }))
    .filter((group) => group.items.length > 0);

  const servicesGrid = servicesData.slice(0, 6);

  return (
    <div className="bg-paper text-ink">
      <main className="space-y-24 pb-24">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E7E3DD] via-white to-[#F9F9F8] py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-1/2 hidden w-1/2 bg-gradient-to-br from-primary/5 via-transparent to-transparent md:block" />
            <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:px-10">
            <div className="space-y-10">
              <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondaryfg">
                Fort Worth Financial Precision
              </span>
              <h1 className="max-w-2xl font-serif text-4xl font-bold text-heading md:text-5xl lg:text-6xl">
                Fast, compliant 1031 exchanges rooted in Fort Worth and deployed nationwide.
              </h1>
              <div className="space-y-4 text-lg leading-relaxed text-ink/80 max-w-2xl">
                <p>
                  We source single tenant NNN retail, shopping centers, ground leases, and zero cash flow options so you can
                  defer gains without inheriting daily management responsibilities.
                </p>
                <p>
                  Our team synchronizes your 45/180 calendar with creditworthy inventory in convenience, QSR, pharmacy, medical,
                  and essential retail to keep deadlines and diligence on track.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ScrollToFormButton
                  targetId="home-contact-form"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
                >
                  Start My Exchange
                </ScrollToFormButton>
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="inline-flex items-center justify-center rounded-full border border-primary px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
                >
                  Call {site.phone}
                </a>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/70">
                45 Day identification. 180 Day closing. Every deadline met.
              </p>

              <div className="grid gap-6 rounded-3xl border border-outline/60 bg-panel/90 p-6 shadow-[0_18px_44px_rgba(21,34,59,0.12)] md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-heading/60">Local HQ</p>
                  <p className="mt-2 text-xl font-semibold text-heading">{site.address}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-heading/60">Metro Coverage</p>
                  <p className="mt-2 text-xl font-semibold text-heading">{coverageCities.length}+ Texas markets</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-heading/60">Property Scope</p>
                  <p className="mt-2 text-xl font-semibold text-heading">Single tenant retail & NNN nationwide</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Exchange moves we run daily</p>
                <div className="flex flex-wrap gap-3">
                  {heroHighlights.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.route}
                      className="inline-flex items-center gap-2 rounded-full border border-outline/60 bg-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-heading transition hover:border-accent hover:text-primary"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent" aria-hidden />
              <div className="relative">
                <ContactForm
                  formId="home-contact-form"
                  variant="compact"
                  heading="Request 1031 intake"
                  description="Tell us about your relinquished asset and replacement timeline. We respond the same business day."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">Authority from the first scroll</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Trusted Fort Worth professionals guiding compliant, deadline-driven exchanges.
              </h2>
              <p className="text-base text-ink/80">
                Investors expect structure, timeline accountability, and documented compliance on day one. These pillars anchor
                every engagement we lead.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.title}
                    className="rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_18px_44px_rgba(21,34,59,0.08)]"
                  >
                    <Icon className="h-8 w-8 text-accent" aria-hidden />
                    <h3 className="mt-4 text-lg font-semibold text-heading">{signal.title}</h3>
                    <p className="mt-2 text-sm text-ink/70">{signal.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Why Fort Worth investors choose us</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Structured services tuned for 45/180 discipline, build-to-suit, and turnkey NNN holds.
              </h2>
              <p className="text-base text-secondaryfg/80">
                Every service listed below lives in our playbook so investors can move from sale proceeds to stable single
                tenant income without missing IRS deadlines. Tap into timelines, construction, execution, tax, and education
                support.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_22px_48px_rgba(21,34,59,0.08)]"
                  >
                    <Icon className="h-8 w-8 text-accent" aria-hidden />
                    <h3 className="mt-4 text-xl font-semibold text-heading">{card.title}</h3>
                    <p className="mt-2 text-sm text-ink/75">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <HomeServiceCollections collections={serviceCollections} />
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">How a 1031 works</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                A transparent 1031 timeline that protects the 45/180 windows and keeps your P&amp;Qs buttoned up.
              </h2>
              <p className="text-base text-ink/80">
                This process braids together exchange consultation, intermediary controls, nationwide sourcing, and reporting
                so every move is documented for the IRS and lender partners.
              </p>
            </header>

            <div className="relative">
              <div className="hidden h-1 w-full bg-outline/40 md:block" aria-hidden />
              <div className="grid gap-8 md:grid-cols-3">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative flex flex-col gap-4 rounded-3xl border border-outline/60 bg-panel p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primaryfg">
                          {index + 1}
                        </span>
                        <Icon className="h-6 w-6 text-accent" aria-hidden />
                      </div>
                      <h3 className="text-lg font-semibold text-heading">{step.title}</h3>
                      <p className="text-sm text-ink/75">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-24 text-primaryfg">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primaryfg/70">Core services</p>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                Advisory, sourcing, and reporting executed with Fort Worth accountability.
              </h2>
              <p className="text-base text-primaryfg/80">
                From forward and reverse exchanges to NNN verification and reporting, these engagements channel the same
                process discipline we bring to every investor relationship.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesGrid.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/20 bg-primary/60 p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_rgba(10,16,28,0.4)]"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-primaryfg/70">{service.category}</p>
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-primaryfg/80">{service.short}</p>
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">View details →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">NNN inventory coverage</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Target the essential retail formats exchange buyers search for most.
              </h2>
              <p className="text-base text-ink/80">
                We work across food service, medical, auto, logistics, and everyday retail to keep a live list of single tenant
                assets that meet NOI, credit, and term requirements.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
              {inventoryCategories.map((category) => (
                <article
                  key={category.slug}
                  className="rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_18px_44px_rgba(21,34,59,0.08)] transition hover:-translate-y-1 hover:border-accent"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-heading">{category.name}</h3>
                    <Link href={category.route} className="text-xs font-semibold uppercase tracking-[0.32em] text-primary hover:text-accent">
                      Listings
                    </Link>
                  </div>
                  {category.note && <p className="mt-3 text-sm text-ink/75">{category.note}</p>}
                </article>
              ))}
            </div>

            <div className="rounded-3xl border border-outline/60 bg-secondary/50 p-8 shadow-[0_18px_44px_rgba(21,34,59,0.08)]">
              <p className="text-xs uppercase tracking-[0.32em] text-primary/70">Featured tenant profiles</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {propertyShowcase.map((type) => {
                  const getCategoryImage = (slug: string) => {
                    if (slug.includes("auto") || slug.includes("tire") || slug.includes("oil-change")) {
                      return inventoryCategories.find((c) => c.slug === "auto")?.heroImage;
                    }
                    if (slug.includes("medical") || slug.includes("clinic") || slug.includes("dialysis") || slug.includes("veterinary")) {
                      return inventoryCategories.find((c) => c.slug === "medical")?.heroImage;
                    }
                    if (slug.includes("food") || slug.includes("qsr") || slug.includes("coffee") || slug.includes("dining")) {
                      return inventoryCategories.find((c) => c.slug === "food-service")?.heroImage;
                    }
                    if (slug.includes("logistics") || slug.includes("flex") || slug.includes("industrial")) {
                      return inventoryCategories.find((c) => c.slug === "industrial")?.heroImage;
                    }
                    if (slug.includes("nnn") || slug.includes("ground-lease") || slug.includes("outparcel")) {
                      return inventoryCategories.find((c) => c.slug === "nnn")?.heroImage;
                    }
                    return inventoryCategories.find((c) => c.slug === "retail")?.heroImage;
                  };
                  const categoryImage = getCategoryImage(type.slug);

                  return (
                    <Link
                      key={type.slug}
                      href={type.route}
                      className="group overflow-hidden rounded-3xl border border-outline/50 bg-panel shadow-[0_16px_36px_rgba(21,34,59,0.08)] transition hover:-translate-y-1 hover:border-accent"
                    >
                      {categoryImage && (
                        <div className="relative h-40 w-full">
                          <Image
                            src={categoryImage}
                            alt={`${type.name} properties`}
                            fill
                            className="object-cover transition group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Net Lease</p>
                        <h3 className="mt-2 text-xl font-semibold text-heading">{type.name}</h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                          View details →
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Fort Worth coverage</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                {coverageCities.length}+ DFW metros plus boots-on-the-ground partners in every state.
              </h2>
              <p className="text-base text-secondaryfg/80">
                Local intel keeps Fort Worth buyers ahead of listings while our broker, developer, and sale-leaseback partners
                unlock credit tenants coast to coast.
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              {coverageHighlights.map((market) => (
                <span key={market} className="rounded-full border border-outline/60 bg-panel px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-heading">
                  {market}
                </span>
              ))}
            </div>

            <HomeServiceArea locations={featuredMarkets} />

            <div className="rounded-3xl border border-outline/60 bg-panel p-6 text-sm text-ink/80 shadow-[0_18px_44px_rgba(21,34,59,0.08)]">
              A 1031 exchange defers federal and Texas income tax on qualifying real property. Texas does not levy a state income
              tax, but transfer and recording fees may apply.
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">Interactive tools</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Real-time calculators to keep your 1031 plan compliant.
              </h2>
              <p className="text-base text-ink/80">
                Use our Fort Worth tools to test boot exposure and confirm your replacement identification strategy before
                reaching out to advisors.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {toolsData.map((tool, index) => {
                const Icon = toolIcons[tool.slug] ?? CalculatorIcon;
                return (
                  <motion.div
                    key={tool.slug}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="group rounded-3xl border border-outline/60 bg-panel p-8 shadow-[0_18px_44px_rgba(21,34,59,0.08)] transition hover:-translate-y-1 hover:border-accent"
                  >
                    <Link href={tool.route} className="block">
                      <Icon className="mb-4 h-12 w-12 text-accent" aria-hidden />
                      <h3 className="mb-2 text-2xl font-semibold text-heading">{tool.name}</h3>
                      <p className="text-sm text-ink/75">{tool.description}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        Open tool →
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl space-y-12 px-6 md:px-10">
            <header className="max-w-3xl space-y-4 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Compliance resources</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Reference-ready IRS links and Texas-specific transfer intel.
              </h2>
              <p className="text-base text-secondaryfg/80">
                Staying ahead of helpful content signals means giving investors and tax partners the exact source material they
                expect. These are the references we keep at arm's reach for every transaction.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource) => (
                <a
                  key={resource.key}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-outline/60 bg-panel p-6 transition hover:-translate-y-1 hover:border-accent"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Official source</p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{resource.label}</h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary">Open resource ↗</p>
                </a>
              ))}
            </div>

            <div className="rounded-3xl border border-outline/60 bg-panel/80 p-6 text-sm text-ink/75">
              <strong className="text-heading">Reminder:</strong> Educational content only. Coordinate with your CPA and attorney for personalised guidance.
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-6xl grid gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-10">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">Direct access</p>
              <h2 className="font-serif text-3xl font-semibold text-heading md:text-4xl">
                Ready to identify your replacement property?
              </h2>
              <p className="text-base text-ink/80">
                Call, email, or use the secure intake form. We help unrepresented exchange buyers move from sale to closing with
                clarity, national inventory, and coordinated reporting.
              </p>
              <div className="space-y-2 text-sm text-ink/75">
                <p>
                  Call {" "}
                  <a href={`tel:${site.phoneDigits}`} className="text-primary hover:underline">
                    {site.phone}
                  </a>
                </p>
                <p>
                  Email {" "}
                  <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                    {site.email}
                  </a>
                </p>
                <p>Visit {site.address}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ScrollToFormButton
                  targetId="home-contact-form"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
                >
                  Open the form
                </ScrollToFormButton>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary hover:-translate-y-0.5 hover:bg-primary/10"
                >
                  View services
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-outline/60 bg-panel p-6 text-sm text-ink/75 shadow-[0_18px_44px_rgba(21,34,59,0.08)]">
              <strong className="text-heading">Disclosure:</strong> This site routes inquiries to our chosen fulfillment partner for
              1031 exchange advisory and property identification support. Educational content only. Not tax, legal, or investment
              advice.
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfessionalServiceSchema()) }}
      />
    </div>
  );
}
