import type { MetadataRoute } from "next";
import {
  blogPosts,
  locationsData,
  propertyTypesData,
  servicesData,
  toolsData,
} from "@/data";
import { SITE_URL } from "@/lib/constants";

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/inventory",
  "/locations",
  "/privacy",
  "/property-types",
  "/services",
  "/tax-deferral-strategies",
  "/terms",
  "/tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  staticRoutes.forEach((path) => {
    pages.push({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
    });
  });

  servicesData.forEach((service) => {
    pages.push({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  locationsData.forEach((location) => {
    pages.push({
      url: `${SITE_URL}/locations/${location.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  propertyTypesData.forEach((type) => {
    pages.push({
      url: `${SITE_URL}${type.route}`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  blogPosts.forEach((post) => {
    pages.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  toolsData.forEach((tool) => {
    pages.push({
      url: `${SITE_URL}${tool.route}`,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  });

  return pages;
}
