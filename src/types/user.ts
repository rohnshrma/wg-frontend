export type UserRole = "student" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
  isEmailVerified?: boolean;
  lastLogin?: string;
}
