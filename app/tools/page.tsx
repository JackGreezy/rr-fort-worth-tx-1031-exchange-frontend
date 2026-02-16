import Image from "next/image";
import Link from "next/link";
import { CalculatorIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import site from "@/content/site.json";
import type { Metadata } from "next";
import { PRIMARY_CITY } from "@/lib/constants";
import { toolsData } from "@/data";

const canonicalBase = `https://www.${site.website}`;
const pageUrl = `${canonicalBase}/tools`;
const description =
  "Explore interactive 1031 exchange calculators built for Fort Worth owners including boot and identification tools.";

export const metadata: Metadata = {
  title: `Tools | 1031 Exchange ${PRIMARY_CITY}`,
  description,
  keywords: "1031 tools, Fort Worth boot calculator, identification checker, tax deferred exchange tools",
  openGraph: {
    title: `Tools | 1031 Exchange ${PRIMARY_CITY}`,
    description,
    type: "website",
    url: pageUrl,
  },
  alternates: {
    canonical: pageUrl,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools" },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    description,
    url: pageUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalBase },
      { "@type": "ListItem", position: 2, name: "Tools", item: pageUrl },
    ],
  },
];

const toolIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "boot-calculator": CalculatorIcon,
  "identification-rules-checker": ShieldCheckIcon,
  "deadline-calculator": CalculatorIcon,
  "identification-letter-helper": ShieldCheckIcon,
  "timeline-tracker": ShieldCheckIcon,
};

export default function ToolsIndexPage() {
  return (
    <div className="bg-paper">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/locations/dallas/dallas-tx.webp"
            alt="Tools"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <Breadcrumbs items={breadcrumbItems} className="text-white/70" />
          <h1 className="mt-6 font-serif text-4xl text-white md:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
            TOOLS
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            These calculators and checkers keep Fort Worth exchanges compliant with reporting timelines and identification rules.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="grid gap-6 md:grid-cols-2">
            {toolsData.map((tool) => {
              const Icon = toolIcons[tool.slug] ?? CalculatorIcon;
              return (
                <Link key={tool.slug} href={tool.route} className="group">
                  <article className="h-full border border-outline/30 bg-panel p-6 transition hover:border-primary/30">
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="h-8 w-8 text-primary" aria-hidden />
                      <span className="bg-accent px-2 py-1 text-[9px] font-medium tracking-[0.15em] text-primary">
                        TOOL
                      </span>
                    </div>
                    <h2 className="mt-4 font-serif text-2xl text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                      {tool.name}
                    </h2>
                    <p className="mt-2 text-sm text-ink/60">{tool.description}</p>
                    <p className="mt-6 text-[10px] font-medium tracking-[0.15em] text-accent">
                      OPEN TOOL &rarr;
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
          <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
            NEED HELP BEYOND CALCULATORS?
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="border-b border-primary/30 pb-1 text-sm text-primary transition hover:border-primary hover:text-accent"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-white md:text-4xl" style={{ fontWeight: 300 }}>
            Questions About Your Exchange?
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Our team is here to help you navigate the 1031 exchange process.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border border-white px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
          >
            CONTACT US
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
