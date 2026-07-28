export type UserRole = "student" | "admin" | "counsellor";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  lastLogin?: string;
}
