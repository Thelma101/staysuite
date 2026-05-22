import type { HotelStaffRole } from "@/types";

export enum Permission {
  VIEW_BOOKINGS = "VIEW_BOOKINGS",
  MANAGE_BOOKINGS = "MANAGE_BOOKINGS",
  VIEW_FINANCE = "VIEW_FINANCE",
  MANAGE_ROOMS = "MANAGE_ROOMS",
  MANAGE_STAFF = "MANAGE_STAFF",
  MANAGE_ORDERS = "MANAGE_ORDERS",
  VIEW_VISITORS = "VIEW_VISITORS",
  SIGN_IN_OUT_VISITORS = "SIGN_IN_OUT_VISITORS",
  RECEIVE_CALLS = "RECEIVE_CALLS",
  MAKE_CALLS = "MAKE_CALLS",
  APPROVE_HOTELS = "APPROVE_HOTELS",
  BLOCK_HOTELS = "BLOCK_HOTELS",
  BLACKLIST_USERS = "BLACKLIST_USERS",
  SEND_MESSAGES = "SEND_MESSAGES",
  VIEW_ANALYTICS = "VIEW_ANALYTICS",
}

/** Maps each hotel staff role to its default set of permissions */
export const ROLE_PERMISSIONS: Record<HotelStaffRole, Permission[]> = {
  management: [
    Permission.VIEW_BOOKINGS,
    Permission.MANAGE_BOOKINGS,
    Permission.VIEW_FINANCE,
    Permission.MANAGE_ROOMS,
    Permission.MANAGE_STAFF,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_VISITORS,
    Permission.SIGN_IN_OUT_VISITORS,
    Permission.RECEIVE_CALLS,
    Permission.MAKE_CALLS,
    Permission.VIEW_ANALYTICS,
  ],
  receptionist: [
    Permission.VIEW_BOOKINGS,
    Permission.MANAGE_BOOKINGS,
    Permission.VIEW_VISITORS,
    Permission.SIGN_IN_OUT_VISITORS,
    Permission.RECEIVE_CALLS,
    Permission.MAKE_CALLS,
  ],
  accountant: [
    Permission.VIEW_BOOKINGS,
    Permission.VIEW_FINANCE,
    Permission.VIEW_ANALYTICS,
  ],
  bar_kitchen_laundry: [
    Permission.MANAGE_ORDERS,
  ],
  security: [
    Permission.VIEW_VISITORS,
    Permission.SIGN_IN_OUT_VISITORS,
  ],
};

/** Check if a user has a specific permission */
export function hasPermission(
  userPermissions: string[],
  required: Permission
): boolean {
  return userPermissions.includes(required);
}

/** Check if a user has at least one of the required permissions */
export function hasAnyPermission(
  userPermissions: string[],
  required: Permission[]
): boolean {
  return required.some((permission) => userPermissions.includes(permission));
}
