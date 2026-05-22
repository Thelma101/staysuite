type PaymentStatus = "completed" | "pending" | "failed";

interface MockPayment {
  id: string;
  date: string;
  guest: string;
  description: string;
  amount: number;
  status: PaymentStatus;
}

const payments: MockPayment[] = [
  { id: "p1", date: "May 22, 2026", guest: "Adebayo Ogunlesi", description: "Booking — Room 204", amount: 75000, status: "completed" },
  { id: "p2", date: "May 21, 2026", guest: "Ngozi Okonkwo", description: "Booking — Room 112", amount: 120000, status: "pending" },
  { id: "p3", date: "May 20, 2026", guest: "Emeka Eze", description: "Booking — Room 305", amount: 50000, status: "completed" },
  { id: "p4", date: "May 19, 2026", guest: "Fatima Bello", description: "Store order — Room 101", amount: 8500, status: "completed" },
  { id: "p5", date: "May 18, 2026", guest: "Chinedu Nwankwo", description: "Booking — Room 210", amount: 160000, status: "failed" },
];

const statusColors: Record<PaymentStatus, string> = {
  completed: "bg-brand-green/10 text-brand-green",
  pending: "bg-amber-500/10 text-amber-600",
  failed: "bg-red-500/10 text-red-600",
};

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function OwnerPaymentsPage() {
  const rows = payments.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Payments</h2>
        <p className="mt-1 text-sm text-muted">
          Track guest payments and settlement status.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Date</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Guest</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Description</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Amount</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap py-3 text-muted">{p.date}</td>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{p.guest}</td>
                  <td className="py-3 text-muted">{p.description}</td>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{formatNaira(p.amount)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
