type TransactionType = "credit" | "debit";

interface MockTransaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  amount: number;
  reference: string;
}

const summaryCards = [
  { label: "Total Revenue", value: "\u20A6 8,750,000" },
  { label: "Pending Settlements", value: "\u20A6 320,000" },
  { label: "This Month", value: "\u20A6 2,450,000" },
  { label: "Last Month", value: "\u20A6 2,180,000" },
];

const transactions: MockTransaction[] = [
  { id: "t1", date: "May 22, 2026", description: "Booking payment — Room 204", type: "credit", amount: 75000, reference: "TXN-20260522-001" },
  { id: "t2", date: "May 21, 2026", description: "Platform commission", type: "debit", amount: 7500, reference: "TXN-20260521-002" },
  { id: "t3", date: "May 21, 2026", description: "Booking payment — Room 112", type: "credit", amount: 120000, reference: "TXN-20260521-003" },
  { id: "t4", date: "May 20, 2026", description: "Settlement payout", type: "debit", amount: 450000, reference: "TXN-20260520-004" },
  { id: "t5", date: "May 19, 2026", description: "Booking payment — Room 305", type: "credit", amount: 50000, reference: "TXN-20260519-005" },
  { id: "t6", date: "May 18, 2026", description: "Bar order — Room 402", type: "credit", amount: 15500, reference: "TXN-20260518-006" },
  { id: "t7", date: "May 17, 2026", description: "Platform commission", type: "debit", amount: 12000, reference: "TXN-20260517-007" },
  { id: "t8", date: "May 16, 2026", description: "Booking payment — Room 210", type: "credit", amount: 160000, reference: "TXN-20260516-008" },
];

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Finance</h2>
        <p className="mt-1 text-sm text-muted">
          View financial transactions, revenue reports, and settlements.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-border bg-white p-4 md:p-6"
          >
            <p className="text-xs text-muted uppercase">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-brand-ink">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Transactions</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Date</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Description</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Type</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Amount</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-3 text-muted whitespace-nowrap">{t.date}</td>
                  <td className="py-3 font-medium text-brand-ink">{t.description}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.type === "credit"
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {t.type === "credit" ? "Credit" : "Debit"}
                    </span>
                  </td>
                  <td className={`py-3 font-medium whitespace-nowrap ${t.type === "credit" ? "text-brand-green" : "text-red-600"}`}>
                    {t.type === "credit" ? "+" : "-"}{formatNaira(t.amount)}
                  </td>
                  <td className="py-3 text-muted text-xs whitespace-nowrap">{t.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
