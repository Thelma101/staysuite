import Button from "@/components/ui/Button";

const stats = [
  { label: "Total Bookings", value: "128" },
  { label: "Revenue This Month", value: "\u20A6 2,450,000" },
  { label: "Occupancy Rate", value: "74%" },
  { label: "Active Guests", value: "18" },
];

const recentBookings = [
  { guest: "Adebayo Ogunlesi", room: "Room 204", checkIn: "May 20, 2026", checkOut: "May 23, 2026", status: "checked_in" as const },
  { guest: "Ngozi Okonkwo", room: "Room 112", checkIn: "May 21, 2026", checkOut: "May 25, 2026", status: "approved" as const },
  { guest: "Emeka Eze", room: "Room 305", checkIn: "May 22, 2026", checkOut: "May 24, 2026", status: "pending" as const },
  { guest: "Fatima Bello", room: "Room 101", checkIn: "May 18, 2026", checkOut: "May 21, 2026", status: "checked_out" as const },
  { guest: "Chinedu Nwankwo", room: "Room 210", checkIn: "May 22, 2026", checkOut: "May 26, 2026", status: "pending" as const },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  approved: "bg-brand-blue/10 text-brand-blue",
  checked_in: "bg-brand-green/10 text-brand-green",
  checked_out: "bg-muted/10 text-muted",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  checked_in: "Checked In",
  checked_out: "Checked Out",
};

export default function HotelDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Hotel Dashboard</h2>
        <p className="mt-1 text-sm text-muted">
          Overview of your hotel operations, bookings, and revenue.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-white p-4 md:p-6"
          >
            <p className="text-xs text-muted uppercase">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-brand-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Recent Bookings</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Guest</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Room</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-in</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-out</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentBookings.map((b) => (
                <tr key={b.guest}>
                  <td className="py-3 font-medium text-brand-ink">{b.guest}</td>
                  <td className="py-3 text-muted">{b.room}</td>
                  <td className="py-3 text-muted">{b.checkIn}</td>
                  <td className="py-3 text-muted">{b.checkOut}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>
                      {statusLabels[b.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Quick Actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button as="link" href="/hotel/rooms" size="sm">
            Add Room
          </Button>
          <Button as="link" href="/hotel/bookings" size="sm" variant="blue">
            View All Bookings
          </Button>
          <Button as="link" href="/hotel/staff" size="sm" variant="navy">
            Manage Staff
          </Button>
        </div>
      </div>
    </div>
  );
}
