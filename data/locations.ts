import type { LocationItem } from "./types";
import { getLocationsFromBatches } from "@/lib/merge-batch-data";

// Use ONLY batch locations - they have the actual data
// Filter out "remote" and locations without images
export const locationsData: LocationItem[] = getLocationsFromBatches().filter(
  (location) => location.slug !== "remote" && location.heroImage
);

