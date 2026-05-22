import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";
import type { WalletTransaction } from "@/types";

const MOCK_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "txn-001",
    userId: "user-1",
    type: "credit",
    amount: 50000,
    description: "Wallet top-up via card",
    reference: "REF-20240301-001",
    status: "completed",
    createdAt: "2024-03-01T10:30:00Z",
  },
  {
    id: "txn-002",
    userId: "user-1",
    type: "debit",
    amount: 35000,
    description: "Booking payment - Grand Luxe Hotel",
    reference: "REF-20240302-002",
    status: "completed",
    createdAt: "2024-03-02T14:15:00Z",
  },
  {
    id: "txn-003",
    userId: "user-1",
    type: "credit",
    amount: 100000,
    description: "Wallet top-up via bank transfer",
    reference: "REF-20240305-003",
    status: "completed",
    createdAt: "2024-03-05T09:00:00Z",
  },
  {
    id: "txn-004",
    userId: "user-1",
    type: "debit",
    amount: 12500,
    description: "Room service order - Seaside Inn",
    reference: "REF-20240307-004",
    status: "pending",
    createdAt: "2024-03-07T18:45:00Z",
  },
  {
    id: "txn-005",
    userId: "user-1",
    type: "debit",
    amount: 8000,
    description: "Withdrawal to bank account",
    reference: "REF-20240308-005",
    status: "failed",
    createdAt: "2024-03-08T11:20:00Z",
  },
];

const statusColors: Record<string, string> = {
  completed: "bg-brand-green/10 text-brand-green",
  pending: "bg-yellow-500/10 text-yellow-600",
  failed: "bg-red-500/10 text-red-500",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function WalletPage() {
  const balance = 94500;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Wallet</h2>
        <p className="mt-1 text-sm text-muted">
          Fund your wallet, view transactions, and manage your balance.
        </p>
      </div>

      <Card className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <FigIcon src="/figma/icons/wallet.svg" size={20} />
          <span>Available Balance</span>
        </div>
        <p className="text-3xl font-bold text-brand-ink">
          {formatCurrency(balance)}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">
            Fund Wallet
          </Button>
          <Button variant="ghost" size="sm">
            Withdraw
          </Button>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h3 className="mb-4 text-lg font-semibold text-brand-ink">
          Transaction History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Description
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_TRANSACTIONS.map((txn) => (
                <tr key={txn.id}>
                  <td className="py-3 text-brand-ink whitespace-nowrap">
                    {formatDate(txn.createdAt)}
                  </td>
                  <td className="py-3 text-brand-ink">{txn.description}</td>
                  <td
                    className={`py-3 font-medium whitespace-nowrap ${
                      txn.type === "credit"
                        ? "text-brand-green"
                        : "text-brand-ink"
                    }`}
                  >
                    {txn.type === "credit" ? "+" : "-"}
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[txn.status]}`}
                    >
                      {txn.status.charAt(0).toUpperCase() +
                        txn.status.slice(1)}
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
