import Script from "next/script";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { COMPANY_NAME, CONTACT_PHONE, CONTACT_PHONE_DIGITS, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: `About ${COMPANY_NAME}`,
  description: `Learn how ${COMPANY_NAME} helps property owners plan a sale, compare replacement options, and move through a 1031 exchange with a clear team and timeline.`,
  path: "/about",
});

const values = [
  {
    title: "Begin With the Owner's Goal",
    detail: "The reason for selling, expected equity, debt, timing, income needs, and desired level of control shape the replacement plan.",
  },
  {
    title: "Compare the Full Range of Options",
    detail: "Direct property, net-lease real estate, and DST interests are considered against the same income, workload, risk, and closing priorities.",
  },
  {
    title: "Keep the Team Connected",
    detail: "The independent qualified intermediary, CPA, attorney, brokers, lenders, and closing professionals need the same facts and timeline.",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/locations/dallas/dallas-tx.webp"
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
            ABOUT US
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Free, practical help for property owners from the planned sale through replacement closing.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14">
          <div className="flex gap-4">
            <div className="relative mt-10 aspect-[3/4] w-1/2 overflow-hidden">
              <Image
                src="/locations/fort-worth/fort-worth-tx.webp"
                alt="Fort Worth skyline"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-[3/4] w-1/2 overflow-hidden">
              <Image
                src="/locations/arlington/arlington-tx.jpg"
                alt="Fort Worth real estate"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
              A TURNKEY PLACE TO START
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/70">
              {COMPANY_NAME} helps owners in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} turn a planned property sale into an organized 1031 exchange path. The work starts with the actual transaction: ownership, expected proceeds, debt, timing, management burden, and what the owner wants life after the sale to look like.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              From there, we help compare replacement paths, identify direct and passive property options, and bring the appropriate independent professionals into the conversation. The goal is simple: fewer disconnected decisions and a clearer route to closing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            HOW WE HELP
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="border border-outline/30 bg-panel p-6">
                <div className="h-1 w-12 bg-accent" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-xl text-primary" style={{ fontWeight: 400 }}>{value.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{value.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            FROM FIRST CALL TO REPLACEMENT CLOSING
          </h2>
          <div className="mt-8 space-y-4">
            {[
              ["Before the sale", "Clarify ownership, equity, debt, timing, and replacement priorities. Engage the independent qualified intermediary before proceeds can reach the seller."],
              ["During the search", "Compare direct property, net-lease opportunities, and DST interests while keeping primary and backup candidates realistic."],
              ["Through closing", "Keep diligence, financing, title, insurance, offering documents, and advisor questions visible until the replacement transaction closes."],
            ].map(([title, detail]) => (
              <article key={title} className="grid gap-2 border-l-2 border-accent/40 pl-5 md:grid-cols-[0.35fr_1fr] md:gap-8">
                <h3 className="font-serif text-xl text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Have a Property Sale in Mind?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Call for free exchange guidance or use the short form to request replacement property options.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="bg-accent px-8 py-3.5 text-sm font-semibold tracking-[0.06em] text-primary transition hover:bg-white">CALL {CONTACT_PHONE}</a>
            <Link href="/contact#contact-form" className="border border-white px-8 py-3.5 text-xs font-medium tracking-[0.16em] text-white transition hover:bg-white hover:text-primary">START MY EXCHANGE</Link>
          </div>
        </div>
      </section>

      <Script
        id="about-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
