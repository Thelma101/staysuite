/** User role based on nationality */
export type UserRole = "nigerian" | "foreigner";

/**
 * Tourism ID format:
 * - Foreigners: "GLT-XXXXXXXXXX"
 * - Nigerians: "NG-XXXXXXXXXX"
 */
export interface User {
  id: string;
  tourismId: string;
  nin?: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  passportNumber?: string;
  avatarUrl: string;
  walletBalance: number;
  role: UserRole;
  createdAt: string;
}

/** Payload for Nigerian user registration via NIN + OTP verification */
export interface RegisterNigerianPayload {
  nin: string;
  email: string;
  otp: string;
}

/** Payload for foreign user registration with passport documents */
export interface RegisterForeignerPayload {
  country: string;
  state: string;
  passportNumber: string;
  phone: string;
  email: string;
  passportPhoto: File | null;
  passportDocument: File | null;
}
