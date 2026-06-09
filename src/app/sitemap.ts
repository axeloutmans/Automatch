import { MetadataRoute } from "next";

const SEO_PAGES = [
  "audi-q5", "bmw-x3", "volkswagen-golf", "tesla-model-y", "cupra-formentor",
  "volvo-xc60", "bmw-x5", "mercedes-glc", "kia-sportage", "hyundai-tucson",
  "audi-a4", "volkswagen-tiguan", "ford-puma", "peugeot-3008", "renault-arkana",
  "skoda-octavia", "seat-ateca", "mazda-cx5", "toyota-rav4", "honda-hr-v",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://automatch.nl";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/zoeken`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/voor-dealers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/over-ons`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const seoPages: MetadataRoute.Sitemap = SEO_PAGES.map(slug => ({
    url: `${base}/${slug}-gezocht`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...seoPages];
}
