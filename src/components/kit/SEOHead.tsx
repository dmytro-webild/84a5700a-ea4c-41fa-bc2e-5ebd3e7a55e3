import { useEffect } from "react";
import { siteConfig, type PageSEO } from "@/config/site";

interface SEOHeadProps {
  seo?: PageSEO;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  schema?: object | object[];
}

export default function SEOHead({
  seo,
  title,
  description,
  keywords,
  ogImage,
  canonical,
  schema,
}: SEOHeadProps) {
  const finalTitle =
    title || seo?.title || siteConfig.seo.defaultTitle;
  const finalDescription =
    description || seo?.description || siteConfig.seo.defaultDescription;
  const finalKeywords =
    keywords || seo?.keywords || siteConfig.seo.defaultKeywords;
  const finalOgImage =
    ogImage || seo?.ogImage || siteConfig.seo.ogDefaultImage;
  const finalCanonical =
    canonical || seo?.canonical || siteConfig.baseUrl;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Helper to set meta tags
    const setMeta = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    // Standard Meta
    setMeta('meta[name="description"]', "name", "description", finalDescription);
    setMeta('meta[name="keywords"]', "name", "keywords", finalKeywords.join(", "));

    // Open Graph
    setMeta('meta[property="og:title"]', "property", "og:title", finalTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", finalDescription);
    setMeta('meta[property="og:image"]', "property", "og:image", finalOgImage);
    setMeta('meta[property="og:url"]', "property", "og:url", finalCanonical);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", siteConfig.name);

    // Twitter
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", finalTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", finalDescription);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", finalOgImage);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", finalCanonical);

    // 3. Inject JSON-LD Schema
    const schemaData = [];
    // Always include Organization schema
    schemaData.push(siteConfig.schema.organization);

    if (schema) {
      if (Array.isArray(schema)) {
        schemaData.push(...schema);
      } else {
        schemaData.push(schema);
      }
    } else if (seo?.schema) {
      schemaData.push(...seo.schema);
    }

    const scriptId = "riy-json-ld-schema";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = scriptId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      // Cleanup dynamically added script on unmount if needed
    };
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, finalCanonical, schema, seo]);

  return null;
}
