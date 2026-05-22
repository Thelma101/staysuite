import Button from "@/components/ui/Button";
import type { BookingStatus } from "@/types";

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
  { id: "b2", guest: "Ngozi Okonkwo", room: "Room 112", checkIn: "May 21, 2026", checkOut: "May 25, 2026", amount: 120000, status: "approved" },
  { id: "b3", guest: "Emeka Eze", room: "Room 305", checkIn: "May 22, 2026", checkOut: "May 24, 2026", amount: 50000, status: "checked_in" },
  { id: "b4", guest: "Fatima Bello", room: "Room 101", checkIn: "May 18, 2026", checkOut: "May 21, 2026", amount: 90000, status: "checked_out" },
  { id: "b5", guest: "Chinedu Nwankwo", room: "Room 210", checkIn: "May 15, 2026", checkOut: "May 19, 2026", amount: 160000, status: "checked_out" },
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

export default function OwnerBookingsPage() {
  const rows = bookings.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Bookings</h2>
        <p className="mt-1 text-sm text-muted">
          View and manage guest bookings for your hotel.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Guest</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Room</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Check-in</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Check-out</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Amount</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((b) => (
                <tr key={b.id}>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{b.guest}</td>
                  <td className="py-3 text-muted">{b.room}</td>
                  <td className="whitespace-nowrap py-3 text-muted">{b.checkIn}</td>
                  <td className="whitespace-nowrap py-3 text-muted">{b.checkOut}</td>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{formatNaira(b.amount)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>
                      {statusLabels[b.status]}
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
