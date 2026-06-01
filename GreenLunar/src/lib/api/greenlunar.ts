import { apiRequest } from "./client";

export type WalletSummary = {
  balance: string;
  pendingSettlement: string;
  totalCharges?: string;
  transactionVolume?: string;
  totalWithdrawal?: string;
};

export type TransactionRecord = {
  id: string;
  name: string;
  bank: string;
  date: string;
  amount: string;
  reference?: string;
};

export async function fetchWalletSummary(): Promise<WalletSummary> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    return { balance: "₦0.00", pendingSettlement: "₦0.00" };
  }
  return apiRequest<WalletSummary>("/greenlunar/wallet");
}

export async function fetchTransactions(): Promise<TransactionRecord[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return [];
  return apiRequest<TransactionRecord[]>("/greenlunar/transactions");
}
