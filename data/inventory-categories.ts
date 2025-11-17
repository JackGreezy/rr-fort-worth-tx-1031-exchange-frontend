import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "/inventory/nnn",
    note: "Triple net lease properties with tenant responsibility for taxes, insurance, and maintenance",
    heroImage: "/property-types/1031-exchange-nnn-tx.jpg",
  },
  {
    slug: "retail",
    name: "Retail Properties",
    route: "/inventory/retail",
    note: "Single tenant retail properties suitable for 1031 exchange",
    heroImage: "/property-types/1031-exchange-retail-tx.jpg",
  },
  {
    slug: "industrial",
    name: "Industrial Properties",
    route: "/inventory/industrial",
    note: "Industrial and logistics properties for exchange",
    heroImage: "/property-types/1031-exchange-industrial-tx.jpg",
  },
  {
    slug: "medical",
    name: "Medical Properties",
    route: "/inventory/medical",
    note: "Medical office buildings and clinics",
    heroImage: "/property-types/1031-exchange-medical-tx.jpg",
  },
  {
    slug: "auto",
    name: "Auto Related Properties",
    route: "/inventory/auto",
    note: "Auto parts, service, and tire stores",
    heroImage: "/property-types/1031-exchange-auto-tx.jpg",
  },
  {
    slug: "food-service",
    name: "Food Service Properties",
    route: "/inventory/food-service",
    note: "Quick service restaurants and drive thru properties",
    heroImage: "/property-types/1031-exchange-food-service-tx.jpg",
  },
];

