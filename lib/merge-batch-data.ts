import * as locationBatches01 from "@/data/batches/locations/batch-01";
import * as locationBatches02 from "@/data/batches/locations/batch-02";
import * as locationBatches03 from "@/data/batches/locations/batch-03";
import * as locationBatches04 from "@/data/batches/locations/batch-04";
import * as locationBatches05 from "@/data/batches/locations/batch-05";
import * as serviceBatches01 from "@/data/batches/services/batch-01";
import * as serviceBatches02 from "@/data/batches/services/batch-02";
import * as serviceBatches03 from "@/data/batches/services/batch-03";
import type { LocationItem, ServiceItem } from "@/data/types";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

// Mapping of location slugs to their image file extensions
const locationImageExtensions: Record<string, string> = {
  'allen': 'jpg',
  'arlington': 'jpg',
  'bedford': 'webp',
  'carrollton': 'jpeg',
  'colleyville': 'jpeg',
  'coppell': 'jpg',
  'dallas': 'jpg',
  'denton': 'png',
  'euless': 'jpg',
  'flower-mound': 'jpg',
  'fort-worth': 'jpg',
  'frisco': 'jpeg',
  'garland': 'jpg',
  'grand-prairie': 'jpg',
  'grapevine': 'jpg',
  'haltom-city': 'jpg',
  'halton-city': 'jpg', // Handle typo in batch-04
  'hurst': 'jpg',
  'irving': 'webp',
  'keller': 'jpg',
  'lake-worth': 'jpg',
  'lewisville': 'png',
  'mckinney': 'jpeg',
  'mesquite': 'jpg',
  'north-richland-hills': 'jpg',
  'plano': 'jpg',
  'richardson': 'jpeg',
  'river-oaks': 'jpg',
  'saginaw': 'jpg',
  'sansom-park': 'jpg',
  'southlake': 'jpg',
  'watauga': 'jpg',
  'westworth-village': 'jpg',
  'white-settlement': 'jpg',
};

// Helper to get image path for a location
function getLocationImagePath(slug: string): string | undefined {
  // Handle typo in batch-04 (halton-city should be haltom-city)
  const normalizedSlug = slug === 'halton-city' ? 'haltom-city' : slug;
  const ext = locationImageExtensions[normalizedSlug];
  if (!ext) return undefined;
  return `/locations/1031-exchange-${normalizedSlug}-tx.${ext}`;
}

// Extract all location slugs from batch files and create LocationItem objects
export function getLocationsFromBatches(): LocationItem[] {
  const allBatches = {
    ...locationBatches01.locationsBatch01,
    ...locationBatches02.locationsBatch02,
    ...locationBatches03.locationsBatch03,
    ...locationBatches04.locationsBatch04,
    ...locationBatches05.locationsBatch05,
  };

  return Object.keys(allBatches).map((slug) => {
    const batchData = allBatches[slug as keyof typeof allBatches];
    // Determine type based on slug patterns
    let type: LocationItem["type"] = "city";
    if (slug.includes("downtown") || slug.includes("district") || slug.includes("southside") || slug.includes("7th") || slug.includes("stockyards") || slug.includes("clearfork")) {
      type = "district";
    } else if (slug === "remote") {
      type = "remote";
    } else if (slug.includes("benbrook") || slug.includes("ridglea")) {
      type = "suburb";
    }
    // All other locations default to "city" which is already set above

    // Extract name from batch data or generate from slug
    const name = batchData?.mainDescription
      ? extractLocationName(batchData.mainDescription, slug)
      : slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

    // Get image path for this location
    const heroImage = getLocationImagePath(slug);

    return {
      slug,
      name,
      route: `/locations/${slug}`,
      type,
      description: batchData?.mainDescription
        ? extractFirstParagraph(batchData.mainDescription)
        : `${name} 1031 exchange support. Serving investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
      ...(heroImage && { heroImage }),
    };
  });
}

// Extract all service slugs from batch files and create ServiceItem objects
function getServicesFromBatches(): ServiceItem[] {
  const allBatches = {
    ...serviceBatches01.servicesBatch01,
    ...serviceBatches02.servicesBatch02,
    ...serviceBatches03.servicesBatch03,
  };

  return Object.keys(allBatches).map((slug) => {
    const batchData = allBatches[slug as keyof typeof allBatches];
    
    // Extract name and description from batch data
    const name = batchData?.mainDescription
      ? extractServiceName(batchData.mainDescription, slug)
      : slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

    const short = batchData?.mainDescription
      ? extractFirstParagraph(batchData.mainDescription)
      : `1031 exchange service for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`;

    // Determine category based on slug patterns
    let category: ServiceItem["category"] = "Property Paths";
    if (slug.includes("exchange") && !slug.includes("property")) {
      category = "Structures";
    } else if (slug.includes("identification") || slug.includes("property")) {
      category = "Property Paths";
    } else if (slug.includes("reporting") || slug.includes("documentation")) {
      category = "Reporting";
    } else if (slug.includes("tax") || slug.includes("boot") || slug.includes("depreciation")) {
      category = "Tax";
    } else if (slug.includes("education") || slug.includes("consultation")) {
      category = "Education";
    } else if (slug.includes("timeline") || slug.includes("deadline")) {
      category = "Timelines";
    }

    return {
      slug,
      name,
      short: short.length > 200 ? short.substring(0, 197) + "..." : short,
      route: `/services/${slug}`,
      category,
    };
  });
}

// Helper to extract location name from HTML description
function extractLocationName(html: string, slug: string): string {
  // Try to extract from first sentence - look for "City, TX" pattern
  const match = html.match(/<p>([A-Z][a-zA-Z\s-]+), TX/);
  if (match) {
    return match[1].trim();
  }
  // Try alternative pattern like "City represents" or "City serves"
  const match2 = html.match(/<p>([A-Z][a-zA-Z\s-]+) (?:represents|serves|offers)/);
  if (match2) {
    return match2[1].trim();
  }
  // Fallback: capitalize slug (handle special cases)
  const nameMap: Record<string, string> = {
    "fort-worth": "Fort Worth",
    "north-richland-hills": "North Richland Hills",
    "haltom-city": "Haltom City",
    "halton-city": "Haltom City", // Handle typo in batch-04
    "lake-worth": "Lake Worth",
    "white-settlement": "White Settlement",
    "river-oaks": "River Oaks",
    "sansom-park": "Sansom Park",
    "westworth-village": "Westworth Village",
    "flower-mound": "Flower Mound",
    "grand-prairie": "Grand Prairie",
  };
  if (nameMap[slug]) {
    return nameMap[slug];
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper to extract service name from HTML description  
function extractServiceName(html: string, slug: string): string {
  // Look for patterns like "Qualified Intermediary Services provide" or "A forward exchange"
  const match = html.match(/<p>([A-Z][^<]+(?:Services|Exchange|Identification|Reporting|Documentation|Consultation|Education|Analysis|Planning|Calculation)[^<]*) (?:provide|is|allows|represents|enables|includes)/i);
  if (match) {
    return match[1].trim();
  }
  // Try simpler pattern - first capitalized words before common verbs
  const match2 = html.match(/<p>([A-Z][^<]{5,80}?) (?:provide|is|allows|represents|enables|includes|are|offer)/i);
  if (match2) {
    let name = match2[1].trim();
    // Clean up common prefixes
    name = name.replace(/^A /, "").replace(/^An /, "");
    return name;
  }
  // Fallback: capitalize slug with known mappings
  const nameMap: Record<string, string> = {
    "forward-exchange": "Forward Exchange",
    "reverse-exchange": "Reverse Exchange",
    "simultaneous-exchange": "Simultaneous Exchange",
    "delayed-exchange": "Delayed Exchange",
    "build-to-suit-exchange": "Build To Suit Exchange",
    "improvement-exchange": "Improvement Exchange",
    "partial-exchange": "Partial Exchange",
    "multi-property-exchange": "Multi Property Exchange",
    "qualified-intermediary-services": "Qualified Intermediary Services",
    "qualified-escrow-services": "Qualified Escrow Services",
    "exchange-documentation": "Exchange Documentation",
    "property-identification": "Property Identification",
    "tax-basis-calculation": "Tax Basis Calculation",
    "boot-analysis": "Boot Analysis",
    "depreciation-recapture-planning": "Depreciation Recapture Planning",
    "exchange-reporting": "Exchange Reporting",
    "nnn-property-identification": "NNN Property Identification",
    "retail-property-identification": "Retail Property Identification",
    "industrial-property-identification": "Industrial Property Identification",
    "medical-property-identification": "Medical Property Identification",
    "exchange-education": "Exchange Education",
    "exchange-consultation": "Exchange Consultation",
    "investor-resources": "Investor Resources",
  };
  if (nameMap[slug]) {
    return nameMap[slug];
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper to extract first paragraph from HTML
function extractFirstParagraph(html: string): string {
  const match = html.match(/<p>([^<]+)</);
  if (match) {
    return match[1].trim();
  }
  return "";
}

// Merge batch locations with base locations (batch takes precedence for duplicates)
export function getMergedLocations(baseLocations: LocationItem[]): LocationItem[] {
  const batchLocations = getLocationsFromBatches();
  const batchSlugs = new Set(batchLocations.map((loc) => loc.slug));
  
  // Keep base locations that aren't in batches, then add batch locations
  const uniqueBaseLocations = baseLocations.filter((loc) => !batchSlugs.has(loc.slug));
  return [...uniqueBaseLocations, ...batchLocations];
}

// Merge batch services with base services (batch takes precedence for duplicates)
export function getMergedServices(baseServices: ServiceItem[]): ServiceItem[] {
  const batchServices = getServicesFromBatches();
  const batchSlugs = new Set(batchServices.map((srv) => srv.slug));
  
  // Keep base services that aren't in batches, then add batch services
  const uniqueBaseServices = baseServices.filter((srv) => !batchSlugs.has(srv.slug));
  return [...uniqueBaseServices, ...batchServices];
}


