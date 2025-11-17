'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Collection = {
  category: string;
  items: ServiceItem[];
};

type Props = {
  collections: Collection[];
};

export default function HomeServiceCollections({ collections }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return collections;
    const q = query.trim().toLowerCase();
    return collections
      .map((collection) => ({
        ...collection,
        items: collection.items.filter((service) => service.name.toLowerCase().includes(q)),
      }))
      .filter((collection) => collection.items.length > 0);
  }, [collections, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search services on this page"
        placeholder="Filter services"
        value={query}
        onChange={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-outline/60 bg-secondary/40 p-6 text-center text-sm text-heading">
          We can help with "{query}". {" "}
          <Link href={`/contact?projectType=${encodeURIComponent(query)}`} className="text-primary underline">
            Contact us
          </Link>{" "}
          and we will route the request.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {filtered.map((group) => (
            <article
              key={group.category}
              className="flex flex-col gap-5 rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_22px_48px_rgba(21,34,59,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-heading/60">{group.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{group.category} Support</h3>
                </div>
                <span className="rounded-full border border-outline/60 px-3 py-1 text-xs text-heading/60">
                  {group.items.length} core
                </span>
              </div>
              <ul className="space-y-3">
                {group.items.map((service) => (
                  <li
                    key={service.slug}
                    className="rounded-2xl border border-outline/50 bg-secondary/40 p-4 transition hover:border-accent hover:bg-secondary/70"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-heading">{service.name}</p>
                        <p className="text-sm text-ink/80">{service.short}</p>
                      </div>
                      <Link
                        href={service.route}
                        className="text-xs font-semibold uppercase tracking-[0.32em] text-primary hover:text-accent"
                      >
                        Details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

