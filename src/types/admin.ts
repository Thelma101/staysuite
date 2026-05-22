export type AdminRole = "super_admin" | "admin" | "moderator";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}

/** Search/filter parameters for admin user queries */
export interface AdminSearchParams {
  date?: string;
  sex?: string;
  country?: string;
  query?: string;
}

export interface BlacklistEntry {
  id: string;
  userId: string;
  reason: string;
  createdAt: string;
  createdBy: string;
}
