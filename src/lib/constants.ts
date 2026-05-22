import type { HotelCategory, HotelFacility, HotelStaffRole, BookingStatus } from "@/types";

/** Base paths for each dashboard role */
export const DASHBOARD_ROLES = {
  user: "/user",
  hotel: "/hotel",
  admin: "/admin",
} as const;

export const HOTEL_CATEGORIES: { value: HotelCategory; label: string }[] = [
  { value: "budget", label: "Budget" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

export const HOTEL_FACILITIES: { value: HotelFacility; label: string }[] = [
  { value: "swimming_pool", label: "Swimming Pool" },
  { value: "gym", label: "Gym" },
  { value: "club", label: "Club" },
  { value: "games", label: "Games" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bar", label: "Bar" },
  { value: "laundry", label: "Laundry" },
  { value: "spa", label: "Spa" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "WiFi" },
  { value: "conference_room", label: "Conference Room" },
];

/** Staff roles with their default permission sets */
export const HOTEL_STAFF_ROLES: {
  value: HotelStaffRole;
  label: string;
  defaultPermissions: string[];
}[] = [
  {
    value: "management",
    label: "Management",
    defaultPermissions: [
      "VIEW_BOOKINGS",
      "MANAGE_BOOKINGS",
      "VIEW_FINANCE",
      "MANAGE_ROOMS",
      "MANAGE_STAFF",
      "MANAGE_ORDERS",
      "VIEW_VISITORS",
      "SIGN_IN_OUT_VISITORS",
      "RECEIVE_CALLS",
      "MAKE_CALLS",
      "VIEW_ANALYTICS",
    ],
  },
  {
    value: "receptionist",
    label: "Receptionist",
    defaultPermissions: [
      "VIEW_BOOKINGS",
      "MANAGE_BOOKINGS",
      "VIEW_VISITORS",
      "SIGN_IN_OUT_VISITORS",
      "RECEIVE_CALLS",
      "MAKE_CALLS",
    ],
  },
  {
    value: "accountant",
    label: "Accountant",
    defaultPermissions: [
      "VIEW_BOOKINGS",
      "VIEW_FINANCE",
      "VIEW_ANALYTICS",
    ],
  },
  {
    value: "bar_kitchen_laundry",
    label: "Bar / Kitchen / Laundry",
    defaultPermissions: [
      "MANAGE_ORDERS",
    ],
  },
  {
    value: "security",
    label: "Security",
    defaultPermissions: [
      "VIEW_VISITORS",
      "SIGN_IN_OUT_VISITORS",
    ],
  },
];

/** All 36 Nigerian states + FCT */
export const NIGERIAN_STATES: { value: string; label: string }[] = [
  { value: "abia", label: "Abia" },
  { value: "adamawa", label: "Adamawa" },
  { value: "akwa_ibom", label: "Akwa Ibom" },
  { value: "anambra", label: "Anambra" },
  { value: "bauchi", label: "Bauchi" },
  { value: "bayelsa", label: "Bayelsa" },
  { value: "benue", label: "Benue" },
  { value: "borno", label: "Borno" },
  { value: "cross_river", label: "Cross River" },
  { value: "delta", label: "Delta" },
  { value: "ebonyi", label: "Ebonyi" },
  { value: "edo", label: "Edo" },
  { value: "ekiti", label: "Ekiti" },
  { value: "enugu", label: "Enugu" },
  { value: "fct", label: "FCT - Abuja" },
  { value: "gombe", label: "Gombe" },
  { value: "imo", label: "Imo" },
  { value: "jigawa", label: "Jigawa" },
  { value: "kaduna", label: "Kaduna" },
  { value: "kano", label: "Kano" },
  { value: "katsina", label: "Katsina" },
  { value: "kebbi", label: "Kebbi" },
  { value: "kogi", label: "Kogi" },
  { value: "kwara", label: "Kwara" },
  { value: "lagos", label: "Lagos" },
  { value: "nasarawa", label: "Nasarawa" },
  { value: "niger", label: "Niger" },
  { value: "ogun", label: "Ogun" },
  { value: "ondo", label: "Ondo" },
  { value: "osun", label: "Osun" },
  { value: "oyo", label: "Oyo" },
  { value: "plateau", label: "Plateau" },
  { value: "rivers", label: "Rivers" },
  { value: "sokoto", label: "Sokoto" },
  { value: "taraba", label: "Taraba" },
  { value: "yobe", label: "Yobe" },
  { value: "zamfara", label: "Zamfara" },
];

export const BOOKING_STATUSES: { value: BookingStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "cancelled", label: "Cancelled" },
];
