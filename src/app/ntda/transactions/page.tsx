"use client";

import { cn } from "@/lib/utils";

type TxStatus = "Completed" | "Pending" | "Failed";

type Transaction = {
  id: string;
  date: string;
  hotel: string;
  amount: string;
  type: string;
  status: TxStatus;
};

const TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2024-03-15", hotel: "Grand Palace Hotel", amount: "₦450,000", type: "Registration Fee", status: "Completed" },
  { id: "2", date: "2024-03-14", hotel: "Sunset Resort & Spa", amount: "₦320,000", type: "Annual Renewal", status: "Pending" },
  { id: "3", date: "2024-03-13", hotel: "Ocean View Suites", amount: "₦180,000", type: "Inspection Fee", status: "Completed" },
  { id: "4", date: "2024-03-12", hotel: "Safari Lodge", amount: "₦250,000", type: "License Fee", status: "Failed" },
];

const statusBadge: Record<TxStatus, string> = {
  Completed: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

const stats = [
  { label: "Total Revenue", value: "₦2.4B", color: "text-[#188b5c]" },
  { label: "This Month", value: "₦48.2M", color: "text-blue-700" },
  { label: "Pending", value: "₦5.8M", color: "text-amber-700" },
];

export default function NtdaTransactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-ink">Transactions</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[12px] border border-border bg-white p-5"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className={cn("mt-2 text-2xl font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f4f8f6]">
              <th className="px-5 py-3 font-semibold text-muted">Date</th>
              <th className="px-5 py-3 font-semibold text-muted">Hotel</th>
              <th className="px-5 py-3 font-semibold text-muted">Amount</th>
              <th className="px-5 py-3 font-semibold text-muted">Type</th>
              <th className="px-5 py-3 font-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 text-muted">{tx.date}</td>
                <td className="px-5 py-4 font-medium text-brand-ink">{tx.hotel}</td>
                <td className="px-5 py-4 font-medium text-brand-ink">{tx.amount}</td>
                <td className="px-5 py-4 text-muted">{tx.type}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusBadge[tx.status],
                    )}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
