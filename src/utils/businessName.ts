export const STORAGE_KEY_NAME = "riy_saved_business_name";
export const STORAGE_KEY_SHORTLIST = "riy_saved_shortlist";
export const BUSINESS_NAME_EVENT = "riy_business_name_changed";

export interface ShortlistedName {
  id: string;
  name: string;
  category?: string;
  score?: "high" | "medium";
  tag?: string;
  reason?: string;
}

export const DEFAULT_BUSINESS_NAME = "Velox Enterprises Ltd";

export function getSavedBusinessName(): string {
  if (typeof window === "undefined") return DEFAULT_BUSINESS_NAME;
  const stored = localStorage.getItem(STORAGE_KEY_NAME);
  if (stored && stored.trim().length > 0) {
    return stored.trim();
  }
  const shortlist = getSavedShortlist();
  if (shortlist.length > 0 && shortlist[0].name) {
    return shortlist[0].name.trim();
  }
  return DEFAULT_BUSINESS_NAME;
}

export function saveBusinessName(name: string): void {
  if (typeof window === "undefined") return;
  if (name === undefined || name === null) return;
  localStorage.setItem(STORAGE_KEY_NAME, name);
  window.dispatchEvent(new CustomEvent(BUSINESS_NAME_EVENT, { detail: name }));
}

export function getSavedShortlist(): ShortlistedName[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SHORTLIST);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveShortlist(list: ShortlistedName[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_SHORTLIST, JSON.stringify(list));
}

export function getBusinessInitials(name: string): string {
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "VE";
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function getBusinessSlug(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return slug.length > 0 ? slug.slice(0, 18) : "veloxenterprises";
}
