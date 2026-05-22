"use client";

import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Hotels", value: "1,248", color: "bg-[#188b5c]/10 text-[#188b5c]" },
  { label: "Total Visitors", value: "34,891", color: "bg-blue-50 text-blue-700" },
  { label: "Pending Approvals", value: "45", color: "bg-amber-50 text-amber-700" },
  { label: "Total Transactions", value: "₦2.4B", color: "bg-purple-50 text-purple-700" },
];

const recentActivity = [
  { text: "Grand Palace Hotel submitted registration documents", time: "2 hours ago", type: "pending" },
  { text: "Visitor pass issued to John Doe (UK)", time: "4 hours ago", type: "visitor" },
  { text: "Sunset Resort approval completed", time: "6 hours ago", type: "approved" },
  { text: "Broadcast sent to all registered hotels", time: "1 day ago", type: "broadcast" },
];

const quickActions = [
  { label: "Review Approvals", href: "/ntda/approvals", color: "bg-[#188b5c]" },
  { label: "Broadcast Message", href: "/ntda/broadcast", color: "bg-blue-600" },
  { label: "View Transactions", href: "/ntda/transactions", color: "bg-purple-600" },
];

export default function NtdaDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Welcome back, Admin</h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s an overview of tourism activity across Nigeria.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[12px] border border-border bg-white p-5"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className={cn("mt-2 text-2xl font-bold", stat.color.split(" ")[1])}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="col-span-1 rounded-[12px] border border-border bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-brand-ink">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between rounded-lg border border-border/50 px-4 py-3"
              >
                <p className="text-sm text-brand-ink">{item.text}</p>
                <span className="ml-4 shrink-0 text-xs text-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-[12px] border border-border bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-brand-ink">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={cn(
                  "flex items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90",
                  action.color,
                )}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
