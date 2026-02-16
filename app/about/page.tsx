import Script from "next/script";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { COMPANY_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: `About ${COMPANY_NAME}`,
  description: `Learn how ${COMPANY_NAME} guides 1031 exchange buyers with secure intake, property matching, and lender coordination.`,
  path: "/about",
});

const values = [
  {
    title: "Secure Intake",
    detail: "Encrypted forms capture your sale data, equity, debt, and lender preferences.",
  },
  {
    title: "Property Matching",
    detail: "We log every call, tour, and rent roll review so you have proof of effort when the 45 day clock ends.",
  },
  {
    title: "Third Party Coordination",
    detail: "We interface with Qualified Intermediaries, CPAs, and lenders while you approve each step.",
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
            We help 1031 buyers act with speed and precision.
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
              THE FORT WORTH EXCHANGE
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/70">
              {COMPANY_NAME} focuses on unrepresented investors who need a professional search partner in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}. We identify replacement properties, document every milestone, and deliver readiness packages to your lenders and advisors.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              We are not a Qualified Intermediary, law firm, broker, or CPA. We handle property research, documentation, and coordination so your advisors can focus on legal and tax opinions.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            HOW IT WORKS
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <article key={value.title} className="border border-outline/30 bg-panel p-6">
                <span className="text-4xl font-serif text-accent/30">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-xl text-primary" style={{ fontWeight: 400 }}>{value.title}</h3>
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
            WORKFLOW OVERVIEW
          </h2>
          <ol className="mt-8 space-y-4">
            {[
              "Intake: we collect closing statements, debt requirements, and preferred asset classes.",
              "Matching: our desk builds a replacement property list and logs every outreach attempt.",
              "Documentation: diligence, letters of intent, and inspection notes are stored in a secure workspace.",
              "Coordination: we schedule lender calls, QI checkpoints, and attorney reviews.",
            ].map((step, index) => (
              <li key={index} className="flex gap-4 border-l-2 border-accent/30 pl-4">
                <span className="font-serif text-lg text-accent">{index + 1}.</span>
                <span className="text-sm text-ink/70">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Ready to Work Together?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Share your exchange details and we will reply with current property availability and next steps.
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
        id="about-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
