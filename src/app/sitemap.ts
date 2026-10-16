import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://raijucloudsystem.com";
  return ["fr", "en", "nl"].flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${base}/${locale}/research/rp-003`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);
}
