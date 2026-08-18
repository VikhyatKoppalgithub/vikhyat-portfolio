import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Required by `output: "export"` — this route is generated once at build time. */
export const dynamic = "force-static";

/** Emitted as /sitemap.xml at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
