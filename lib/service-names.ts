// Convert slug to 2-3 word display name for breadcrumbs, footer, etc.
export function getShortServiceName(slug: string): string {
  // Remove city suffix if present
  let cleanSlug = slug.replace(/-fort-worth-tx$/, "");
  
  // Split into words
  const words = cleanSlug.split("-");
  
  // Map common words to shorter versions
  const wordMap: Record<string, string> = {
    "identification": "",
    "replacement": "",
    "property": "",
    "discovery": "",
    "targeting": "",
    "matching": "",
    "sourcing": "",
    "acquisition": "",
    "pipeline": "",
    "support": "",
    "readiness": "",
    "guardrails": "",
    "mapping": "",
    "coverage": "",
    "preparation": "",
    "services": "",
    "service": "",
    "pursuit": "",
    "desk": "",
    "audit": "",
    "planning": "",
    "review": "",
    "pulls": "",
    "coordination": "",
    "modeling": "",
    "and": "",
    "the": "",
    "of": "",
    "for": "",
  };
  
  // Special cases for specific slugs
  const specialCases: Record<string, string> = {
    // Exchange structures
    "forward-exchange": "Forward Exchange",
    "reverse-exchange": "Reverse Exchange",
    "simultaneous-exchange": "Simultaneous Exchange",
    "delayed-exchange": "Delayed Exchange",
    "build-to-suit-exchange": "Build To Suit",
    "improvement-exchange": "Improvement Exchange",
    "partial-exchange": "Partial Exchange",
    "multi-property-exchange": "Multi Property Exchange",
    
    // Property identification (with city suffix)
    "nnn-retail-identification-fort-worth-tx": "NNN Retail",
    "drive-thru-qsr-identification-fort-worth-tx": "Drive Thru QSR",
    "pharmacy-healthcare-identification-fort-worth-tx": "Pharmacy Healthcare",
    "grocery-anchored-identification-fort-worth-tx": "Grocery Anchored",
    "industrial-last-mile-identification-fort-worth-tx": "Last Mile Industrial",
    "medical-office-identification-fort-worth-tx": "Medical Office",
    "self-storage-identification-fort-worth-tx": "Self Storage",
    "auto-service-identification-fort-worth-tx": "Auto Service",
    "zero-cash-flow-identification-fort-worth-tx": "Zero Cash Flow",
    "ground-lease-identification-fort-worth-tx": "Ground Lease",
    "multifamily-identification-fort-worth-tx": "Multifamily",
    "hospitality-identification-fort-worth-tx": "Hospitality",
    
    // Property identification (without city suffix)
    "nnn-property-identification": "NNN Property",
    "retail-property-identification": "Retail Property",
    "industrial-property-identification": "Industrial Property",
    "medical-property-identification": "Medical Property",
    
    // Timeline services
    "fort-worth-45-day-sprint": "45 Day Sprint",
    "fort-worth-180-day-close-control": "180 Day Close",
    "reverse-exchange-pursuit": "Reverse Exchange",
    "improvement-exchange-support": "Improvement Exchange",
    "build-to-suit-readiness": "Build To Suit",
    
    // Rules
    "three-property-rule-guardrails": "Three Property Rule",
    "two-hundred-percent-rule-mapping": "200% Rule",
    "ninety-five-percent-rule-coverage": "95% Rule",
    
    // Planning services
    "rent-roll-audit": "Rent Roll",
    "twelve-month-trailing-review": "T12 Review",
    "capex-reserve-planning": "Capex Reserve",
    "market-comp-pulls": "Market Comps",
    "lender-preflight-readiness": "Lender Preflight",
    "dst-placement-readiness": "DST Placement",
    "qi-and-legal-coordination": "QI Coordination",
    "portfolio-exit-modeling": "Portfolio Exit",
    
    // Services
    "qualified-intermediary-services": "QI Services",
    "qualified-escrow-services": "Escrow Services",
    "exchange-documentation": "Exchange Docs",
    "property-identification": "Property ID",
    "tax-basis-calculation": "Tax Basis",
    "boot-analysis": "Boot Analysis",
    "depreciation-recapture-planning": "Depreciation",
    "form-8824-preparation": "Form 8824",
    "exchange-reporting": "Exchange Reporting",
    "exchange-education": "Exchange Education",
    "exchange-consultation": "Consultation",
    "investor-resources": "Investor Resources",

    // Core procedural guides
    "the-45-day-identification-period": "45 Day Period",
    "the-180-day-exchange-deadline": "180 Day Deadline",
    "what-is-boot-in-a-1031-exchange": "Understanding Boot",
    "the-qualified-intermediary-role": "QI Role",
    "like-kind-property-explained": "Like Kind Property",
    "reverse-1031-exchange-explained": "Reverse Exchange Rules",
    "improvement-build-to-suit-exchange": "Improvement Build-To-Suit",
    "related-party-1031-exchange-rules": "Related Party Rules",

    // Upstream funnel: capital gains tax deferral topics
    "capital-gains-on-rental-property": "Capital Gains Rental",
    "capital-gains-on-investment-property": "Capital Gains Investment",
    "home-sale-capital-gains": "Home Sale Gains",
    "second-home-capital-gains-tax": "Second Home Gains",
    "inherited-property-capital-gains": "Inherited Property Gains",
    "depreciation-recapture-explained": "Depreciation Recapture",
    "section-121-exclusion-explained": "Section 121 Exclusion",
    "how-to-reduce-capital-gains-tax": "Reduce Capital Gains",

    // Upstream funnel: real estate investing topics
    "how-to-invest-in-real-estate": "Real Estate Investing",
    "passive-real-estate-income": "Passive Income",
    "real-estate-syndication-explained": "Syndication Explained",
    "fractional-real-estate-investing": "Fractional Investing",
    "real-estate-crowdfunding-explained": "Crowdfunding Explained",
    "commercial-real-estate-investing": "Commercial Investing",
    "building-real-estate-cash-flow": "Real Estate Cash Flow",
    "is-a-rental-a-good-investment": "Rental Investment",

    // Upstream funnel: asset class topics
    "triple-net-lease-nnn": "Triple Net Lease",
    "what-is-an-nnn-lease": "NNN Lease Basics",
    "self-storage-investing": "Self Storage",
    "multifamily-investing": "Multifamily Investing",
    "apartment-building-investing": "Apartment Buildings",
    "mobile-home-park-investing": "Mobile Home Parks",
    "industrial-real-estate-investing": "Industrial Investing",
    "medical-office-investing": "Medical Office",
  };
  
  // Check for special case first (try original slug, then cleaned slug, then base)
  if (specialCases[slug]) {
    return specialCases[slug];
  }
  if (specialCases[cleanSlug]) {
    return specialCases[cleanSlug];
  }
  const baseSlug = cleanSlug.split("-").slice(0, 3).join("-");
  if (specialCases[baseSlug]) {
    return specialCases[baseSlug];
  }
  
  // Filter out mapped words and build name
  const filtered = words
    .map((w) => wordMap[w] || w)
    .filter((w) => w !== "")
    .slice(0, 3); // Take max 3 words
  
  // Capitalize first letter of each word
  const capitalized = filtered.map(
    (w) => w.charAt(0).toUpperCase() + w.slice(1)
  );
  
  return capitalized.join(" ") || slug;
}

