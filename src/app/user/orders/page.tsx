"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";

type OrderTab = "active" | "completed";

const TAB_OPTIONS = [
  { value: "active" as const, label: "Active" },
  { value: "completed" as const, label: "Completed" },
] as const;

interface MockOrder {
  id: string;
  hotelName: string;
  items: string[];
  totalAmount: number;
  status: "active" | "completed";
  date: string;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-001",
    hotelName: "Grand Luxe Hotel & Suites",
    items: ["Room Service - Continental Breakfast", "Laundry (3 items)"],
    totalAmount: 15500,
    status: "active",
    date: "2024-03-10T08:30:00Z",
  },
  {
    id: "ord-002",
    hotelName: "Seaside Inn Lagos",
    items: ["Mini Bar Package", "Airport Shuttle"],
    totalAmount: 22000,
    status: "active",
    date: "2024-03-09T14:00:00Z",
  },
  {
    id: "ord-003",
    hotelName: "Abuja Continental",
    items: ["Spa Treatment - Full Body Massage", "Room Service - Dinner"],
    totalAmount: 45000,
    status: "completed",
    date: "2024-02-28T10:15:00Z",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-brand-blue/10 text-brand-blue",
  completed: "bg-brand-green/10 text-brand-green",
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

export default function OrdersPage() {
  const [tab, setTab] = useState<OrderTab>("active");

  const filtered = MOCK_ORDERS.filter((o) => o.status === tab);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Orders</h2>
        <p className="mt-1 text-sm text-muted">
          Track your hotel service orders and purchases.
        </p>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        options={TAB_OPTIONS}
        className="max-w-xs"
      />

      {filtered.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-white">
          <p className="text-sm text-muted">No {tab} orders found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <Card key={order.id} className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-brand-ink">
                    {order.hotelName}
                  </h3>
                  <ul className="flex flex-col gap-0.5">
                    {order.items.map((item) => (
                      <li key={item} className="text-sm text-muted">
                        &bull; {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="text-lg font-bold text-brand-ink">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
