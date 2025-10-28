import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/$", // Only allow exact root page
        disallow: "/", // Disallow everything else
      },
    ],
    sitemap: "https://verbalize.mrinank-ai.tech/sitemap.xml",
  };
}
