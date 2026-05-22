export type DashboardRole = "user" | "hotel_staff" | "admin";

export type LoginMethod = "email" | "phone";

export interface AuthSession {
  userId: string;
  email: string;
  dashboardRole: DashboardRole;
  hotelId?: string;
  permissions: string[];
  token: string;
  expiresAt: string;
}

export interface OtpVerification {
  identifier: string;
  otp: string;
  method: LoginMethod;
}
