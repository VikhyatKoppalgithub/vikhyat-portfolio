import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Required by `output: "export"` — this route is generated once at build time. */
export const dynamic = "force-static";

/** Emitted as /robots.txt at build time. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
