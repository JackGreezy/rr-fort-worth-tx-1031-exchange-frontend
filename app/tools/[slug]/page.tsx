import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { toolsData } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import DeadlineCalculator from "@/components/widgets/DeadlineCalculator";
import IdentificationLetterHelper from "@/components/widgets/IdentificationLetterHelper";
import TimelineTracker from "@/components/widgets/TimelineTracker";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { PRIMARY_CITY } from "@/lib/constants";

type Params = Promise<{ slug: string }> | { slug: string };

// Map tool slugs to their components
const toolComponents: Record<string, () => ReactElement> = {
  "boot-calculator": () => <BootCalculator />,
  "identification-rules-checker": () => <IdentificationRulesChecker />,
  "deadline-calculator": () => <DeadlineCalculator />,
  "identification-letter-helper": () => <IdentificationLetterHelper />,
  "timeline-tracker": () => <TimelineTracker />,
};

export function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = toolsData.find((item) => item.slug === resolvedParams.slug);
  if (!tool) return {};

  return createPageMetadata({
    title: `${tool.name} | 1031 Exchange ${PRIMARY_CITY}`,
    description: tool.description,
    path: tool.route,
  });
}

export default async function ToolPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const tool = toolsData.find((item) => item.slug === resolvedParams.slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[tool.slug];
  if (!ToolComponent) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: tool.name, href: tool.route },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-heading">{tool.name}</h1>
          <p className="text-base text-ink/80">{tool.description}</p>
        </header>

        <div className="rounded-2xl border border-outline bg-panel p-6">
          <ToolComponent />
        </div>

        <div className="mt-8 rounded-lg border border-outline/60 bg-secondary/30 p-6">
          <p className="text-sm text-ink/80">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates
            only. Consult a qualified intermediary and tax advisor before making decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/tools"
            className="rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading"
          >
            View all tools
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us
          </Link>
        </div>
      </div>

      <Script
        id="tool-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

