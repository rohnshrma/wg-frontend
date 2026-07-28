import type { UserRole } from "@/types/user";

/** Where each role lands after login, and where it gets bounced to if it opens someone else's area. */
export const roleHomeRoute = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "counsellor":
      return "/counsellor";
    default:
      return "/dashboard";
  }
};

/** Guards a `?redirect=` value so a role can only be sent back into its own area. */
export const isRedirectAllowedForRole = (redirect: string, role: UserRole): boolean =>
  redirect.startsWith(roleHomeRoute(role));
