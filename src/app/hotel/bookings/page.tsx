"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import type { BookingStatus } from "@/types";

type FilterTab = "pending" | "approved" | "checked_in" | "checked_out";

const TAB_OPTIONS: ReadonlyArray<{ value: FilterTab; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Completed" },
];

interface MockBooking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: BookingStatus;
}

const bookings: MockBooking[] = [
  { id: "b1", guest: "Adebayo Ogunlesi", room: "Room 204", checkIn: "May 20, 2026", checkOut: "May 23, 2026", amount: 75000, status: "pending" },
  { id: "b2", guest: "Ngozi Okonkwo", room: "Room 112", checkIn: "May 21, 2026", checkOut: "May 25, 2026", amount: 120000, status: "pending" },
  { id: "b3", guest: "Emeka Eze", room: "Room 305", checkIn: "May 22, 2026", checkOut: "May 24, 2026", amount: 50000, status: "approved" },
  { id: "b4", guest: "Fatima Bello", room: "Room 101", checkIn: "May 18, 2026", checkOut: "May 21, 2026", amount: 90000, status: "checked_in" },
  { id: "b5", guest: "Chinedu Nwankwo", room: "Room 210", checkIn: "May 15, 2026", checkOut: "May 19, 2026", amount: 160000, status: "checked_out" },
  { id: "b6", guest: "Aisha Mohammed", room: "Room 402", checkIn: "May 10, 2026", checkOut: "May 14, 2026", amount: 200000, status: "checked_out" },
];

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  approved: "bg-brand-blue/10 text-brand-blue",
  declined: "bg-red-500/10 text-red-600",
  checked_in: "bg-brand-green/10 text-brand-green",
  checked_out: "bg-muted/10 text-muted",
  cancelled: "bg-red-500/10 text-red-600",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
  checked_in: "Checked In",
  checked_out: "Completed",
  cancelled: "Cancelled",
};

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function HotelBookingsPage() {
  const [tab, setTab] = useState<FilterTab>("pending");

  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Bookings</h2>
        <p className="mt-1 text-sm text-muted">
          Approve or decline bookings, view booking details, and manage check-ins.
        </p>
      </div>

      <Tabs value={tab} onChange={setTab} options={TAB_OPTIONS} className="max-w-lg" />

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">No bookings in this category.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Guest</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Room</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-in</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-out</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 font-medium text-brand-ink whitespace-nowrap">{b.guest}</td>
                    <td className="py-3 text-muted">{b.room}</td>
                    <td className="py-3 text-muted whitespace-nowrap">{b.checkIn}</td>
                    <td className="py-3 text-muted whitespace-nowrap">{b.checkOut}</td>
                    <td className="py-3 text-brand-ink font-medium whitespace-nowrap">{formatNaira(b.amount)}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>
                        {statusLabels[b.status]}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        {b.status === "pending" && (
                          <>
                            <Button size="sm" variant="primary" className="h-8 px-3 text-xs">Approve</Button>
                            <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-red-600">Decline</Button>
                          </>
                        )}
                        {b.status === "approved" && (
                          <Button size="sm" variant="primary" className="h-8 px-3 text-xs">Check In</Button>
                        )}
                        {(b.status === "checked_in" || b.status === "checked_out") && (
                          <span className="text-xs text-muted">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
