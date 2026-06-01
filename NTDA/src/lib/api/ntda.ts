import { apiRequest } from "./client";

export type DashboardStats = {
  totalHotels: number;
  totalVisitors: number;
  pendingApprovals: number;
  totalTransactions: string;
};

export type ActivityItem = {
  id: string;
  text: string;
  time: string;
};

export type HotelRecord = {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "Approved" | "Pending" | "Blocked";
  email?: string;
  phone?: string;
  directors?: string;
};

export type VisitorRecord = {
  id: string;
  name: string;
  country: string;
  tourismId: string;
  checkIn: string;
  status: "Active" | "Checked Out" | "Pending";
  email?: string;
  passport?: string;
};

export type ApprovalRecord = {
  id: string;
  hotelName: string;
  owner: string;
  category: string;
  location: string;
  submittedDate: string;
};

export type BroadcastRecord = {
  id: string;
  subject: string;
  recipient: string;
  date: string;
  status: "Delivered" | "Pending";
  message?: string;
};

export type AdminRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  permissions?: string[];
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    return {
      totalHotels: 0,
      totalVisitors: 0,
      pendingApprovals: 0,
      totalTransactions: "₦0",
    };
  }
  return apiRequest<DashboardStats>("/ntda/dashboard/stats");
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<ActivityItem[]>("/ntda/dashboard/activity");
}

export async function fetchHotels(): Promise<HotelRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<HotelRecord[]>("/ntda/hotels");
}

export async function fetchVisitors(): Promise<VisitorRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<VisitorRecord[]>("/ntda/visitors");
}

export async function fetchApprovals(): Promise<ApprovalRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<ApprovalRecord[]>("/ntda/approvals");
}

export async function fetchBroadcasts(): Promise<BroadcastRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<BroadcastRecord[]>("/ntda/broadcasts");
}

export async function fetchAdmins(): Promise<AdminRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<AdminRecord[]>("/ntda/admins");
}

export type TransactionRecord = {
  id: string;
  date: string;
  hotel: string;
  amount: string;
  type: string;
  status: "Completed" | "Pending" | "Failed";
};

export type TransactionStats = {
  totalRevenue: string;
  thisMonth: string;
  pending: string;
};

export async function fetchTransactionStats(): Promise<TransactionStats> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    return { totalRevenue: "₦0", thisMonth: "₦0", pending: "₦0" };
  }
  return apiRequest<TransactionStats>("/ntda/transactions/stats");
}

export async function fetchTransactions(): Promise<TransactionRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<TransactionRecord[]>("/ntda/transactions");
}
