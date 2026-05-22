export type TransactionType = "credit" | "debit";

export type TransactionStatus = "pending" | "completed" | "failed";

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  reference: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}
