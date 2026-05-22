import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";

interface MockTransaction {
  id: string;
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  status: "completed" | "pending";
}

const transactions: MockTransaction[] = [
  { id: "t1", date: "May 22, 2026", description: "Booking settlement — Room 204", type: "credit", amount: 67500, status: "completed" },
  { id: "t2", date: "May 21, 2026", description: "Platform commission", type: "debit", amount: 7500, status: "completed" },
  { id: "t3", date: "May 20, 2026", description: "Store order payout", type: "credit", amount: 7650, status: "pending" },
  { id: "t4", date: "May 19, 2026", description: "Withdrawal to bank", type: "debit", amount: 450000, status: "completed" },
  { id: "t5", date: "May 18, 2026", description: "Booking settlement — Room 305", type: "credit", amount: 45000, status: "completed" },
];

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function OwnerWalletPage() {
  const rows = transactions.slice(0, 4);
  const balance = 1248750;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Wallet</h2>
        <p className="mt-1 text-sm text-muted">
          View your hotel wallet balance and recent transactions.
        </p>
      </div>

      <Card className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <FigIcon src="/figma/icons/wallet.svg" size={20} />
          <span>Available Balance</span>
        </div>
        <p className="text-3xl font-bold text-brand-ink">{formatNaira(balance)}</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">
            Withdraw
          </Button>
          <Button variant="ghost" size="sm">
            View Statements
          </Button>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h3 className="mb-4 text-lg font-semibold text-brand-ink">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Date</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Description</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Type</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Amount</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((t) => (
                <tr key={t.id}>
                  <td className="whitespace-nowrap py-3 text-muted">{t.date}</td>
                  <td className="py-3 font-medium text-brand-ink">{t.description}</td>
                  <td className="py-3 capitalize text-muted">{t.type}</td>
                  <td
                    className={`whitespace-nowrap py-3 font-medium ${
                      t.type === "credit" ? "text-brand-green" : "text-red-600"
                    }`}
                  >
                    {t.type === "credit" ? "+" : "-"}
                    {formatNaira(t.amount)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        t.status === "completed"
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
