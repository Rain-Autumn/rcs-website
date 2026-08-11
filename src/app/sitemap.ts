import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://raijucloudsystem.com";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fr`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/en`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nl`, changeFrequency: "weekly", priority: 1 },
    ...["fr", "en", "nl"].map((locale) => ({
      url: `${base}/${locale}/presentation`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...["fr", "en", "nl"].map((locale) => ({
      url: `${base}/${locale}/squadron`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["fr", "en", "nl"].map((locale) => ({
      url: `${base}/${locale}/research`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["fr", "en", "nl"].map((locale) => ({
      url: `${base}/${locale}/team`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
