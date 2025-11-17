'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PropertyTypeItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";

type Props = {
  propertyTypes: PropertyTypeItem[];
};

export default function PropertyTypesDirectory({ propertyTypes }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return propertyTypes;
    return propertyTypes.filter((type) => type.name.toLowerCase().includes(normalized));
  }, [propertyTypes, query]);

  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search a property type"
        label="Search property types"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-outline bg-secondary/40 p-6 text-center">
          <p className="text-lg font-semibold text-heading">Tell us what you need</p>
          <p className="mt-2 text-sm text-ink/70">
            We can pull inventory for "{query}". Contact us and we will send current comps.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(query)}`}
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primaryfg"
          >
            Contact us
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((property) => (
            <article key={property.slug} className="rounded-2xl border border-outline/60 bg-panel p-4">
              <h3 className="text-lg font-semibold text-heading">{property.name}</h3>
              <Link href={property.route} className="mt-2 inline-flex text-xs uppercase tracking-[0.35em] text-primary">
                View details
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

