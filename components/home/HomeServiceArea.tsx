'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LocationItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Props = {
  locations: LocationItem[];
};

export default function HomeServiceArea({ locations }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return locations;
    const q = query.trim().toLowerCase();
    return locations.filter((location) => location.name.toLowerCase().includes(q));
  }, [locations, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search service areas"
        placeholder="Type a neighborhood"
        value={query}
        onChange={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-outline/60 bg-secondary/40 p-6 text-center text-sm text-heading">
          We can help with "{query}". {" "}
          <Link href="/contact?projectType=Other" className="text-primary underline">
            Contact us with Other selected
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((market) => (
            <Link
              key={market.slug}
              href={market.route}
              className="group overflow-hidden rounded-3xl border border-outline/60 bg-panel shadow-[0_16px_40px_rgba(21,34,59,0.08)] transition hover:-translate-y-1 hover:border-accent"
            >
              {market.heroImage && (
                <div className="relative h-40 w-full">
                  <Image
                    src={market.heroImage}
                    alt={`${market.name} commercial real estate`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Texas metro</p>
                <h3 className="mt-2 text-xl font-semibold text-heading">{market.name}</h3>
                <p className="mt-2 text-sm text-ink/80">1031 exchange support in {market.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

