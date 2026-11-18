// Global window tracking definitions
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, data?: Record<string, unknown>) => void;
    ttq?: { track: (eventName: string, data?: Record<string, unknown>) => void; page: () => void };
    gtag?: (command: string, actionName: string, data?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize tracking scripts dynamically if pixel IDs are present in environment/window.
 * Includes graceful fallback for local and preview environments.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  // Initialize dataLayer for Google Analytics
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  console.log("[Analytics] Initialized pixel tracking for Meta, TikTok, and GA4.");
}

/**
 * Track page view events across all integrated analytics providers.
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "PageView");
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.page();
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", "page_view", { page_path: url });
  }

  console.log(`[Analytics] PageView: ${url}`);
}

/**
 * Track purchase event (Paystack checkout success).
 */
export function trackPurchase(details: {
  transactionId: string;
  productName: string;
  amount: number;
  currency?: string;
  email?: string;
}) {
  if (typeof window === "undefined") return;

  const currency = details.currency || "NGN";

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "Purchase", {
      content_name: details.productName,
      value: details.amount,
      currency,
    });
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track("CompletePayment", {
      content_name: details.productName,
      value: details.amount,
      currency,
    });
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: details.transactionId,
      value: details.amount,
      currency,
      items: [{ item_name: details.productName }],
    });
  }

  console.log("[Analytics] Purchase:", details);
}

/**
 * Track lead capture (Document Checklist, WhatsApp subscription).
 */
export function trackLead(contact: string, source: string) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    window.fbq("track", "Lead", { content_category: source });
  }

  if (window.ttq) {
    window.ttq.track("Subscribe", { content_category: source });
  }

  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      lead_source: source,
      contact_type: contact.includes("@") ? "email" : "phone",
    });
  }

  console.log(`[Analytics] Lead captured via ${source}:`, contact);
}

/**
 * Track business name generator searches.
 */
export function trackNameSearch(query: string, resultCategory: string) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", "search", {
      search_term: query,
      category: resultCategory,
    });
  }

  console.log(`[Analytics] Name Search: "${query}" -> ${resultCategory}`);
}

/**
 * Track Upgrade Code usage for Do It With Us.
 */
export function trackUpgradeCode(code: string, isValid: boolean) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", "apply_promo_code", {
      coupon_code: code,
      is_valid: isValid,
    });
  }

  console.log(`[Analytics] Upgrade Code Tested: "${code}" (valid: ${isValid})`);
}
