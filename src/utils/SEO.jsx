import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_SITE_URL || "https://unimacc.com";

/**
 * Updates document head for SEO - title, meta description, Open Graph, Twitter cards.
 * Use on every page for dynamic internal SEO.
 */
const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noIndex = false,
}) => {
  useEffect(() => {
    const fullUrl = url ? `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}` : BASE_URL;
    const fullImage = image?.startsWith("http") ? image : image ? `${BASE_URL}${image}` : `${BASE_URL}/logo.svg`;

    // Title
    document.title = title ? `${title} | Unimacc` : "Unimacc | Premium Home, Kitchen & Bathroom Essentials";

    // Meta tags helper
    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content || "");
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Open Graph
    setMeta("og:title", title || "Unimacc | Premium Home, Kitchen & Bathroom Essentials", "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", fullImage, "property");
    setMeta("og:url", fullUrl, "property");
    setMeta("og:type", type, "property");

    // Twitter
    setMeta("twitter:title", title || "Unimacc | Premium Home, Kitchen & Bathroom Essentials");
    setMeta("twitter:description", description);
    setMeta("twitter:image", fullImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [title, description, keywords, image, url, type, noIndex]);
};

export default useSEO;
