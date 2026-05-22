import Button from "@/components/ui/Button";

type OrderStatus = "pending" | "in_progress" | "delivered";
type OrderCategory = "Bar" | "Kitchen" | "Laundry";

interface MockOrder {
  id: string;
  room: string;
  items: string;
  category: OrderCategory;
  total: number;
  status: OrderStatus;
  time: string;
}

const orders: MockOrder[] = [
  { id: "o1", room: "204", items: "Heineken x2, Chapman x1", category: "Bar", total: 5500, status: "pending", time: "10:45 AM" },
  { id: "o2", room: "101", items: "Jollof Rice, Grilled Chicken", category: "Kitchen", total: 8500, status: "pending", time: "11:20 AM" },
  { id: "o3", room: "305", items: "3 Shirts (Ironing)", category: "Laundry", total: 4000, status: "in_progress", time: "9:00 AM" },
  { id: "o4", room: "210", items: "Red Wine x1, Small Chops", category: "Bar", total: 12000, status: "delivered", time: "12:00 PM" },
  { id: "o5", room: "402", items: "Fried Rice, Peppered Snail", category: "Kitchen", total: 15500, status: "delivered", time: "8:30 AM" },
];

const categoryColors: Record<OrderCategory, string> = {
  Bar: "bg-amber-500/10 text-amber-600",
  Kitchen: "bg-brand-green/10 text-brand-green",
  Laundry: "bg-brand-blue/10 text-brand-blue",
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  in_progress: "bg-brand-blue/10 text-brand-blue",
  delivered: "bg-brand-green/10 text-brand-green",
};

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function OwnerStorePage() {
  const rows = orders.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Store Orders</h2>
        <p className="mt-1 text-sm text-muted">
          Manage bar, kitchen, and laundry orders from guests.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Room</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Items</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Category</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Time</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Total</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 font-medium text-brand-ink">Room {order.room}</td>
                  <td className="py-3 text-muted">{order.items}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[order.category]}`}>
                      {order.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 text-muted">{order.time}</td>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{formatNaira(order.total)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3">
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                      View
                    </Button>
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
