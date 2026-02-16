import type { LocationItem } from "./types";
import { getLocationsFromBatches } from "@/lib/merge-batch-data";

// Priority 20 cities for the Fort Worth metro area
const priorityCities = [
  "fort-worth",
  "dallas",
  "arlington",
  "irving",
  "plano",
  "frisco",
  "mckinney",
  "richardson",
  "garland",
  "carrollton",
  "lewisville",
  "grand-prairie",
  "denton",
  "flower-mound",
  "southlake",
  "keller",
  "euless",
  "coppell",
  "grapevine",
  "hurst",
];

// Use ONLY batch locations - filter to priority 20 cities with images
export const locationsData: LocationItem[] = getLocationsFromBatches()
  .filter(
    (location) =>
      priorityCities.includes(location.slug) && location.heroImage
  )
  .sort(
    (a, b) =>
      priorityCities.indexOf(a.slug) - priorityCities.indexOf(b.slug)
  );
