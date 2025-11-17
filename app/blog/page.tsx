import Script from "next/script";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogIndex from "@/components/blog/BlogIndex";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "1031 Exchange Insights",
  description: "Read 1031 exchange guides covering timelines, NNN assets, underwriting, and compliance.",
  path: "/blog",
});

export default function BlogPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold text-heading">1031 exchange insights</h1>
          <p className="text-base text-ink/80">Timely notes about deadlines, property types, underwriting, and compliance.</p>
        </header>
        <BlogIndex posts={blogPosts} />
      </div>

      <Script
        id="blog-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

