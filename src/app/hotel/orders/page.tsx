"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";

type OrderStatus = "pending" | "in_progress" | "delivered";
type OrderCategory = "Bar" | "Kitchen" | "Laundry";

const TAB_OPTIONS: ReadonlyArray<{ value: OrderStatus; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "delivered", label: "Delivered" },
];

interface MockOrder {
  id: string;
  room: string;
  items: string[];
  category: OrderCategory;
  total: number;
  status: OrderStatus;
  time: string;
}

const orders: MockOrder[] = [
  { id: "o1", room: "204", items: ["Heineken x2", "Chapman x1"], category: "Bar", total: 5500, status: "pending", time: "10:45 AM" },
  { id: "o2", room: "101", items: ["Jollof Rice", "Grilled Chicken", "Bottled Water"], category: "Kitchen", total: 8500, status: "pending", time: "11:20 AM" },
  { id: "o3", room: "305", items: ["3 Shirts (Ironing)", "2 Trousers (Wash & Iron)"], category: "Laundry", total: 4000, status: "in_progress", time: "9:00 AM" },
  { id: "o4", room: "210", items: ["Red Wine x1", "Small Chops"], category: "Bar", total: 12000, status: "in_progress", time: "12:00 PM" },
  { id: "o5", room: "402", items: ["Fried Rice", "Peppered Snail", "Fresh Juice x2"], category: "Kitchen", total: 15500, status: "delivered", time: "8:30 AM" },
];

const categoryColors: Record<OrderCategory, string> = {
  Bar: "bg-amber-500/10 text-amber-600",
  Kitchen: "bg-brand-green/10 text-brand-green",
  Laundry: "bg-brand-blue/10 text-brand-blue",
};

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function HotelOrdersPage() {
  const [tab, setTab] = useState<OrderStatus>("pending");

  const filtered = orders.filter((o) => o.status === tab);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Orders</h2>
        <p className="mt-1 text-sm text-muted">
          View and manage bar, kitchen, and laundry orders.
        </p>
      </div>

      <Tabs value={tab} onChange={setTab} options={TAB_OPTIONS} className="max-w-md" />

      {filtered.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-white">
          <p className="text-sm text-muted">No orders in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="flex flex-col rounded-lg border border-border bg-white p-4 md:p-5"
            >
              <div className="flex items-start justify-between">
                <p className="text-lg font-semibold text-brand-ink">Room {order.room}</p>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[order.category]}`}>
                  {order.category}
                </span>
              </div>

              <p className="mt-1 text-xs text-muted">{order.time}</p>

              <ul className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <li key={item} className="text-sm text-brand-ink">
                    &bull; {item}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-lg font-bold text-brand-ink">{formatNaira(order.total)}</p>

              <div className="mt-4 flex gap-2">
                {order.status === "pending" && (
                  <Button size="sm" className="h-8 px-3 text-xs">Confirm</Button>
                )}
                {order.status === "in_progress" && (
                  <Button size="sm" variant="blue" className="h-8 px-3 text-xs">Mark Delivered</Button>
                )}
                {order.status === "delivered" && (
                  <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">Close</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
