import type { MetadataRoute } from "next";

const baseUrl = "https://kestrellabshq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/advanced-systems",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
