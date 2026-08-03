import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { ContactFormWrapper } from "./contact/contact-form";
import { locationsData } from "@/data";
import type { LocationItem } from "@/data";
import { getProfessionalServiceSchema } from "@/lib/seo";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

const exchangeNeeds = [
  {
    title: "Planning a Property Sale",
    copy: "Build the exchange plan before proceeds are exposed and before the replacement search becomes urgent.",
    href: "/services/forward-exchange",
  },
  {
    title: "Already Under Contract",
    copy: "Bring the expected closing date, sale price, debt, and equity so the next actions can be organized quickly.",
    href: "/services/fort-worth-45-day-sprint",
  },
  {
    title: "Tired of Managing Property",
    copy: "Compare another direct property with net-lease and professionally managed DST replacement options.",
    href: "/services/dst-placement-readiness",
  },
  {
    title: "Selling Inherited Real Estate",
    copy: "Sort through ownership, use, basis questions, co-owner goals, and whether an exchange may fit the sale.",
    href: "/services/portfolio-exit-modeling",
  },
];

const solutions = [
  {
    title: "Start With the Sale",
    copy: "Clarify ownership, expected proceeds, existing debt, timing, and what the next investment needs to accomplish.",
    href: "/services/portfolio-exit-modeling",
  },
  {
    title: "Bring the Exchange Team Together",
    copy: "Connect the independent qualified intermediary, CPA, attorney, broker, lender, and closing professionals around one plan.",
    href: "/services/qi-and-legal-coordination",
  },
  {
    title: "Find Replacement Properties",
    copy: "Search direct real estate, net-lease assets, and DST interests around income, control, workload, financing, and closing feasibility.",
    href: "/services/nnn-retail-identification-fort-worth",
  },
  {
    title: "Build Primary and Backup Paths",
    copy: "Keep identification choices, diligence, financing, and realistic backup candidates visible while the calendar is moving.",
    href: "/services/fort-worth-45-day-sprint",
  },
  {
    title: "Consider Buying First",
    copy: "Review reverse-exchange structure and financing when the right replacement appears before the current property sells.",
    href: "/services/reverse-exchange-pursuit",
  },
  {
    title: "Stay Aligned Through Closing",
    copy: "Track open questions, documents, title, inspections, insurance, lender needs, and advisor decisions through the replacement closing.",
    href: "/contact",
  },
];

const ownershipPaths = [
  {
    title: "Direct Real Estate",
    copy: "Keep control over leasing, financing, improvements, and disposition while taking responsibility for operations and asset decisions.",
  },
  {
    title: "Net-Lease Property",
    copy: "Own the real estate while reviewing the tenant, guaranty, lease obligations, property condition, and future reletting risk.",
  },
  {
    title: "DST Interest",
    copy: "Access professionally managed real estate without day-to-day landlord work, subject to offering terms, fees, leverage, illiquidity, risk, eligibility, and suitability.",
  },
];

const exchangeFlow = [
  {
    title: "Before the Sale Closes",
    copy: "Define the sale facts, engage the independent qualified intermediary, and set the replacement criteria before funds can reach the seller.",
  },
  {
    title: "While the Property Search Is Active",
    copy: "Compare primary and backup candidates against the same income, debt, control, management, risk, and closing priorities.",
  },
  {
    title: "Through Replacement Closing",
    copy: "Keep the intermediary, advisors, lender, title team, brokers, and other professionals working from the same transaction plan.",
  },
];

export default function Home() {
  const featuredMarkets = locationsData.filter((location: LocationItem) => location.type === "city").slice(0, 6);

  return (
    <div className="bg-paper text-ink">
      <main>
        <section className="relative min-h-[760px] overflow-hidden lg:min-h-[820px]">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/fortworth!.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
          <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-28 md:px-10 lg:min-h-[820px] lg:px-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Selling investment property in Fort Worth?</p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-white md:text-6xl lg:text-[4.5rem]" style={{ fontWeight: 300 }}>
                Turnkey 1031 Exchange Solutions in Fort Worth, Texas
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Get free guidance from the planned sale through replacement closing. We help owners understand the next move, assemble the right exchange professionals, and compare direct property, net-lease real estate, and DST replacement options.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="inline-flex items-center justify-center bg-accent px-7 py-4 text-sm font-semibold tracking-[0.06em] text-primary transition hover:bg-white">
                  CALL {CONTACT_PHONE}
                </a>
                <Link href="/contact#contact-form" className="inline-flex items-center justify-center border border-white/70 px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white transition hover:bg-white hover:text-primary">
                  START MY EXCHANGE
                </Link>
                <Link href="/contact?request=properties#contact-form" className="inline-flex items-center justify-center border border-white/70 px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white transition hover:bg-white hover:text-primary">
                  GET A FREE PROPERTY LIST
                </Link>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/80 sm:grid-cols-3">
                <p className="border-l-2 border-accent pl-3">Free exchange guidance</p>
                <p className="border-l-2 border-accent pl-3">Direct and passive options</p>
                <p className="border-l-2 border-accent pl-3">Fort Worth and nationwide search</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-8 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
            <p className="font-serif text-2xl md:text-3xl" style={{ fontWeight: 300 }}>Your exchange starts with the reason you are selling.</p>
            <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="shrink-0 text-sm font-semibold tracking-[0.08em] text-accent transition hover:text-white">TALK IT THROUGH: {CONTACT_PHONE} →</a>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-14">
            <div className="relative min-h-[520px] overflow-hidden">
              <Image src="/locations/fort-worth/fort-worth-tx.webp" alt="Fort Worth skyline and investment real estate" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              <div className="absolute inset-x-0 bottom-0 bg-primary/95 p-6 text-white md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">The question after the sale</p>
                <p className="mt-2 font-serif text-2xl leading-tight md:text-3xl" style={{ fontWeight: 300 }}>What should this equity do next?</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">One call. A clearer path.</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-primary md:text-5xl" style={{ fontWeight: 300 }}>
                Sell the property without walking into the exchange alone.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                A Fort Worth owner may be selling to retire, leave difficult tenants, simplify an inherited portfolio, improve income, diversify, or move into a property that fits the next stage of life. Those goals should shape the replacement search before listings and deadlines take control of the decision.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/70">
                Bring the sale, equity, debt, timing, ownership, and management concerns. We help turn those facts into a practical exchange plan and connect the independent professionals needed to carry it out.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="bg-primary px-6 py-3.5 text-center text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-accent hover:text-primary">CALL FOR FREE GUIDANCE</a>
                <Link href="/contact#contact-form" className="border border-primary px-6 py-3.5 text-center text-xs font-semibold tracking-[0.14em] text-primary transition hover:bg-primary hover:text-white">TELL US ABOUT THE SALE</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Help for the situation you are in now</p>
              <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl" style={{ fontWeight: 300 }}>There is more than one way into a 1031 exchange.</h2>
            </div>
            <div className="mt-10 grid gap-px bg-outline/30 sm:grid-cols-2 lg:grid-cols-4">
              {exchangeNeeds.map((need) => (
                <Link key={need.title} href={need.href} className="group bg-paper p-6 transition hover:bg-primary">
                  <h3 className="font-serif text-2xl text-primary transition group-hover:text-white" style={{ fontWeight: 400 }}>{need.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65 transition group-hover:text-white/75">{need.copy}</p>
                  <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-accent">EXPLORE THIS PATH →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Turnkey exchange solutions</p>
                <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl" style={{ fontWeight: 300 }}>One place to start. Every major decision kept in view.</h2>
              </div>
              <p className="text-base leading-relaxed text-ink/70">
                The exchange may involve several independent professionals, but the owner should not have to piece together the entire journey alone. We help organize the questions, property search, introductions, and handoffs from the first call through replacement closing.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution) => (
                <article key={solution.title} className="border-t-2 border-accent pt-5">
                  <h3 className="font-serif text-2xl text-primary" style={{ fontWeight: 400 }}>{solution.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{solution.copy}</p>
                  <Link href={solution.href} className="mt-5 inline-block text-xs font-semibold tracking-[0.14em] text-accent transition hover:text-primary">LEARN MORE →</Link>
                </article>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-3 border border-primary/20 bg-panel p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div>
                <p className="font-serif text-2xl text-primary md:text-3xl" style={{ fontWeight: 300 }}>First exchange? Start with a conversation.</p>
                <p className="mt-1 text-sm text-ink/65">We can walk through the sale, the timing, and the replacement choices in plain language.</p>
              </div>
              <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="shrink-0 bg-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-accent hover:text-primary">CALL {CONTACT_PHONE}</a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 lg:py-28">
          <Image src="/locations/arlington/arlington-tx.jpg" alt="Professionally managed commercial real estate" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 text-white md:px-10 lg:grid-cols-2 lg:items-center lg:px-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Move beyond tenants, toilets, and trash</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl" style={{ fontWeight: 300 }}>Find income-focused replacement property without another management job.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                A Delaware Statutory Trust may give qualified investors access to professionally managed, institutional-quality real estate without personally handling leasing, maintenance, renovations, or late-night tenant calls.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                <li className="border-l-2 border-accent pl-4">No day-to-day property management</li>
                <li className="border-l-2 border-accent pl-4">Potential access to larger institutional-quality assets</li>
                <li className="border-l-2 border-accent pl-4">Some current offerings may accept investments beginning around $100,000</li>
              </ul>
            </div>
            <div className="border border-white/20 bg-black/20 p-7 backdrop-blur-sm md:p-9">
              <h3 className="font-serif text-3xl text-white" style={{ fontWeight: 300 }}>See current replacement options.</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Request a free property list or call to compare DST interests with direct and net-lease real estate. Availability, projected income, sponsor and asset risk, fees, leverage, liquidity limits, eligibility, and suitability vary by offering.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Link href="/contact?request=properties#contact-form" className="bg-accent px-6 py-4 text-center text-xs font-semibold tracking-[0.14em] text-primary transition hover:bg-white">GET A FREE PROPERTY LIST</Link>
                <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="border border-white/60 px-6 py-4 text-center text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-white hover:text-primary">CALL FOR A FREE CONSULTATION</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Compare before you commit</p>
              <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl" style={{ fontWeight: 300 }}>Choose the ownership path that fits life after the sale.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {ownershipPaths.map((path) => (
                <article key={path.title} className="border border-outline/30 bg-panel p-7">
                  <h3 className="font-serif text-2xl text-primary" style={{ fontWeight: 400 }}>{path.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">{path.copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/contact#contact-form" className="malibu-btn-outline text-[10px]">HELP ME COMPARE MY OPTIONS</Link>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">How the exchange moves</p>
              <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl" style={{ fontWeight: 300 }}>A clear path from planned sale to replacement closing.</h2>
              <p className="mt-5 text-sm leading-relaxed text-ink/65">The calendar matters, but the owner’s decisions matter just as much. Start before the sale closes whenever possible.</p>
            </div>
            <div className="space-y-4">
              {exchangeFlow.map((phase) => (
                <article key={phase.title} className="grid gap-2 border-b border-outline/30 pb-5 md:grid-cols-[0.45fr_1fr] md:gap-6">
                  <h3 className="font-serif text-xl text-primary">{phase.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/65">{phase.copy}</p>
                </article>
              ))}
              <div className="pt-3">
                <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="inline-flex bg-primary px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-accent hover:text-primary">LET US WALK YOU THROUGH IT: {CONTACT_PHONE}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Fort Worth roots. Nationwide possibilities.</p>
                <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl" style={{ fontWeight: 300 }}>Explore the markets we serve.</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/locations" className="border border-primary px-5 py-3 text-center text-xs font-semibold tracking-[0.12em] text-primary transition hover:bg-primary hover:text-white">VIEW ALL LOCATIONS</Link>
                <Link href="/contact?request=properties#contact-form" className="bg-primary px-5 py-3 text-center text-xs font-semibold tracking-[0.12em] text-white transition hover:bg-accent hover:text-primary">GET A FREE PROPERTY LIST</Link>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featuredMarkets.map((market: LocationItem) => (
                <Link key={market.slug} href={market.route} className="group relative aspect-[4/3] overflow-hidden">
                  {market.heroImage && <Image src={market.heroImage} alt={`${market.name} 1031 exchange services`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-serif text-2xl text-white" style={{ fontWeight: 300 }}>{market.name}</p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-accent">EXPLORE THIS MARKET →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-14">
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Free Fort Worth exchange guidance</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl" style={{ fontWeight: 300 }}>Tell us what you are selling and what you want next.</h2>
              <p className="mt-5 text-base leading-relaxed text-white/75">Use the short form for exchange guidance, a current property list, or help thinking through a planned sale. Prefer to talk now?</p>
              <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="mt-7 inline-flex bg-accent px-6 py-4 text-sm font-semibold tracking-[0.06em] text-primary transition hover:bg-white">CALL {CONTACT_PHONE}</a>
            </div>
            <ContactFormWrapper />
          </div>
        </section>
      </main>

      <Script id="professional-service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfessionalServiceSchema()) }} />
    </div>
  );
}
