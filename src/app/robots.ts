import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/contact", "/privacy", "/terms"],
        disallow: ["/dashboard", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://nexter-view.vercel.app/sitemap.xml",
  };
}
