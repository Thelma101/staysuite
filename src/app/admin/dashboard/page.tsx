import Button from "@/components/ui/Button";

const stats = [
  { label: "Total Users", value: "12,847" },
  { label: "Total Hotels", value: "1,236" },
  { label: "Active Bookings", value: "3,491" },
  { label: "Revenue (₦)", value: "₦284.5M" },
];

const recentActivity = [
  {
    icon: "/figma/icons/hotel.svg",
    description: "Transcorp Hilton Abuja submitted registration for approval",
    time: "2 minutes ago",
  },
  {
    icon: "/figma/icons/user.svg",
    description: "New user Amina Bello registered from Kano",
    time: "15 minutes ago",
  },
  {
    icon: "/figma/icons/booking.svg",
    description: "Booking #BK-4821 at Eko Hotels checked in successfully",
    time: "1 hour ago",
  },
  {
    icon: "/figma/icons/alert.svg",
    description: "Hotel Prestige Calabar flagged for compliance review",
    time: "3 hours ago",
  },
  {
    icon: "/figma/icons/message.svg",
    description: "System broadcast sent to all hotels regarding new policy update",
    time: "5 hours ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">
          Admin Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted">
          Platform overview, key metrics, and NTDA analytics.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-white p-4 md:p-6"
          >
            <p className="text-xs text-muted uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">
          Recent Activity
        </h3>
        <ul className="mt-4 divide-y divide-border">
          {recentActivity.map((item, i) => (
            <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt="" className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-brand-ink">{item.description}</p>
                <p className="mt-0.5 text-xs text-muted">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Quick Actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button as="link" href="/admin/hotels" size="sm">
            Approve Hotels
          </Button>
          <Button as="link" href="/admin/analytics" variant="blue" size="sm">
            View Analytics
          </Button>
          <Button as="link" href="/admin/messages" variant="navy" size="sm">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
