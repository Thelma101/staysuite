export type HotelCategory = "budget" | "standard" | "premium" | "luxury";

export type HotelFacility =
  | "swimming_pool"
  | "gym"
  | "club"
  | "games"
  | "restaurant"
  | "bar"
  | "laundry"
  | "spa"
  | "parking"
  | "wifi"
  | "conference_room";

export type HotelStaffRole =
  | "management"
  | "receptionist"
  | "accountant"
  | "bar_kitchen_laundry"
  | "security";

export interface HotelDirector {
  name: string;
  nin: string;
}

export interface HotelBankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  directors: HotelDirector[];
  bankDetails: HotelBankDetails;
  category: HotelCategory;
  images: string[];
  facilities: HotelFacility[];
  isApproved: boolean;
  isBlocked: boolean;
  createdAt: string;
}

export interface HotelStaff {
  id: string;
  hotelId: string;
  userId: string;
  fullName: string;
  role: HotelStaffRole;
  permissions: string[];
}

export type BookingStatus =
  | "pending"
  | "approved"
  | "declined"
  | "checked_in"
  | "checked_out"
  | "cancelled";

export interface Booking {
  id: string;
  hotelId: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  totalAmount: number;
  paidAmount: number;
  createdAt: string;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  type: string;
  price: number;
  isAvailable: boolean;
  images: string[];
}
