"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  fetchTransactionStats,
  fetchTransactions,
  type TransactionRecord,
  type TransactionStats,
} from "@/lib/api/ntda";

const statusBadge: Record<TransactionRecord["status"], string> = {
  Completed: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

export default function NtdaTransactionsPage() {
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTransactionStats(), fetchTransactions()])
      .then(([s, t]) => {
        setStats(s);
        setTransactions(t);
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Revenue", value: stats.totalRevenue, color: "text-[#188b5c]" },
        { label: "This Month", value: stats.thisMonth, color: "text-blue-700" },
        { label: "Pending", value: stats.pending, color: "text-amber-700" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-ink">Transactions</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-[12px] border border-border bg-white" />
            ))
          : statCards.map((stat) => (
              <div key={stat.label} className="rounded-[12px] border border-border bg-white p-5">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className={cn("mt-2 text-2xl font-bold", stat.color)}>{stat.value}</p>
              </div>
            ))}
      </div>

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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Loading transactions…
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No transactions recorded.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
