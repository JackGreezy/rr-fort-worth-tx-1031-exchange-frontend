'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import SearchInput from "@/components/search/SearchInput";
import { getShortServiceName } from "@/lib/service-names";

type Props = {
  services: ServiceItem[];
  currentService: string;
};

export default function RelatedServices({ services, currentService }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return services;
    return services.filter((service) => service.name.toLowerCase().includes(normalized));
  }, [query, services]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
          RELATED SERVICES
        </h2>
        <p className="mt-2 text-sm text-ink/60">These paths often pair with {currentService}.</p>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Filter related services"
        label="Filter related services"
      />

      {filtered.length === 0 ? (
        <div className="border-l-2 border-accent py-3 pl-5 text-sm text-ink/70">
          We can help with &ldquo;{query}&rdquo;.{" "}
          <Link href={`/contact?projectType=${encodeURIComponent(query)}`} className="text-accent hover:underline">
            Contact our team
          </Link>{" "}
          and we will route the request.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((service) => (
            <Link key={service.slug} href={service.route} className="group block border-b border-outline/20 pb-5">
              <h3 className="font-serif text-lg text-primary group-hover:text-accent" style={{ fontWeight: 400 }}>
                {getShortServiceName(service.slug)}
              </h3>
              <p className="mt-1 text-sm text-ink/60 line-clamp-2">{service.short}</p>
              <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-accent">
                VIEW SERVICE &rarr;
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
