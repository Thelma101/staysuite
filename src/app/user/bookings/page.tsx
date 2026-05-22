"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";

type BookingTab = "upcoming" | "completed" | "cancelled";

const TAB_OPTIONS = [
  { value: "upcoming" as const, label: "Upcoming" },
  { value: "completed" as const, label: "Completed" },
  { value: "cancelled" as const, label: "Cancelled" },
] as const;

interface MockBooking {
  id: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: "upcoming" | "completed" | "cancelled";
  amount: number;
}

const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: "bk-001",
    hotelName: "Grand Luxe Hotel & Suites",
    checkIn: "2024-04-15",
    checkOut: "2024-04-18",
    roomType: "Deluxe Suite",
    status: "upcoming",
    amount: 105000,
  },
  {
    id: "bk-002",
    hotelName: "Seaside Inn Lagos",
    checkIn: "2024-04-20",
    checkOut: "2024-04-22",
    roomType: "Standard Room",
    status: "upcoming",
    amount: 45000,
  },
  {
    id: "bk-003",
    hotelName: "Abuja Continental",
    checkIn: "2024-02-10",
    checkOut: "2024-02-14",
    roomType: "Executive Room",
    status: "completed",
    amount: 180000,
  },
  {
    id: "bk-004",
    hotelName: "Palm Springs Resort",
    checkIn: "2024-01-05",
    checkOut: "2024-01-07",
    roomType: "Premium Suite",
    status: "completed",
    amount: 92000,
  },
];

const statusColors: Record<string, string> = {
  upcoming: "bg-brand-blue/10 text-brand-blue",
  completed: "bg-brand-green/10 text-brand-green",
  cancelled: "bg-red-500/10 text-red-500",
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

export default function BookingsPage() {
  const [tab, setTab] = useState<BookingTab>("upcoming");

  const filtered = MOCK_BOOKINGS.filter((b) => b.status === tab);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Bookings</h2>
        <p className="mt-1 text-sm text-muted">
          Manage your hotel reservations and view booking history.
        </p>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        options={TAB_OPTIONS}
        className="max-w-sm"
      />

      {filtered.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-white">
          <p className="text-sm text-muted">
            No {tab} bookings found.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((booking) => (
            <Card key={booking.id} className="p-4 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-brand-ink">
                    {booking.hotelName}
                  </h3>
                  <p className="text-sm text-muted">
                    {formatDate(booking.checkIn)} &mdash;{" "}
                    {formatDate(booking.checkOut)}
                  </p>
                  <p className="text-sm text-muted">{booking.roomType}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                  <p className="text-lg font-bold text-brand-ink">
                    {formatCurrency(booking.amount)}
                  </p>
                  {booking.status === "upcoming" && (
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
