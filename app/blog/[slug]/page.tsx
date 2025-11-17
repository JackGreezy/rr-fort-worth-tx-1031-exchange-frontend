import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }> | { slug: string };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((article) => article.slug === resolvedParams.slug);
  if (!post) return {};

  return createPageMetadata({
    title: `${post.title} | 1031 Exchange Insights`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogArticle({ params }: { params: Params }) {
  const resolvedParams = await params;
  const post = blogPosts.find((article) => article.slug === resolvedParams.slug);
  if (!post) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <div className="bg-panel py-16">
      <div className="container mx-auto space-y-10">
        <Breadcrumbs items={breadcrumbs} />
        <article className="space-y-4 rounded-2xl border border-outline bg-secondary/40 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/60">{post.category}</p>
          <h1 className="text-4xl font-semibold text-heading">{post.title}</h1>
          <p className="text-sm text-ink/70">
            {new Date(post.publishedAt).toLocaleDateString("en-US")} · {post.readingTime} min read
          </p>
          <p className="text-base text-ink/85">{post.excerpt}</p>
          <div className="space-y-4 text-base text-ink/90">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="rounded-2xl border border-outline bg-panel p-6">
          <h2 className="text-2xl font-semibold text-heading">Need help with your 1031 exchange?</h2>
          <p className="mt-2 text-sm text-ink/70">Share your timeline and we will reply with a replacement property plan.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
            >
              Contact us
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-heading"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </div>

      <Script
        id="blog-article-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}

