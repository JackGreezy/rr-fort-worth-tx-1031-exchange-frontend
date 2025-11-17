import { serviceBatches01, serviceBatches02, serviceBatches03 } from "@/data";
import { locationBatches01, locationBatches02, locationBatches03, locationBatches04, locationBatches05 } from "@/data";
import { inventoryBatches01 } from "@/data";

// Merge all service batches into a single object
export function getServiceBatchData(slug: string) {
  const allBatches = {
    ...serviceBatches01.servicesBatch01,
    ...serviceBatches02.servicesBatch02,
    ...serviceBatches03.servicesBatch03,
  };
  return allBatches[slug as keyof typeof allBatches] || null;
}

// Merge all location batches into a single object
export function getLocationBatchData(slug: string) {
  const allBatches = {
    ...locationBatches01.locationsBatch01,
    ...locationBatches02.locationsBatch02,
    ...locationBatches03.locationsBatch03,
    ...locationBatches04.locationsBatch04,
    ...locationBatches05.locationsBatch05,
  };
  return allBatches[slug as keyof typeof allBatches] || null;
}

// Get inventory batch data
export function getInventoryBatchData() {
  return inventoryBatches01.inventorySpotlight01 || [];
}

