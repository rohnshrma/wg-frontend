import { API_BASE_URL } from "./apiBaseUrl";

export interface TenantColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface TenantBranding {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
  colors: TenantColors;
  contactPhone: string;
  contactEmail: string;
  address: string;
}

/**
 * Server-side fetch of the tenant that resolves from the current request's
 * Host header (see wg-backend resolveTenant middleware) — for use in
 * layouts/server components. Returns null on any failure (unreachable
 * backend, no tenant configured for this host, etc.) so callers can fall
 * back to the static siteConfig defaults rather than breaking the page;
 * this endpoint is expected to fail closed during local dev whenever the
 * backend isn't running.
 */
export async function getCurrentTenant(): Promise<TenantBranding | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/tenant/current`, {
      // Branding rarely changes; avoid re-fetching on every request while
      // still picking up updates within a reasonable window.
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as TenantBranding;
  } catch {
    return null;
  }
}
