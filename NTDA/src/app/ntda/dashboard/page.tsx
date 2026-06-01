"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  fetchDashboardStats,
  fetchRecentActivity,
  type ActivityItem,
  type DashboardStats,
} from "@/lib/api/ntda";

const quickActions = [
  { label: "Review Approvals", href: "/ntda/approvals", color: "bg-[#188b5c]" },
  { label: "Broadcast Message", href: "/ntda/broadcast", color: "bg-blue-600" },
  { label: "View Transactions", href: "/ntda/transactions", color: "bg-purple-600" },
];

export default function NtdaDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s, a] = await Promise.all([fetchDashboardStats(), fetchRecentActivity()]);
        if (!cancelled) {
          setStats(s);
          setActivity(a);
        }
      } catch {
        if (!cancelled) setError("Unable to load dashboard data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = stats
    ? [
        { label: "Total Hotels", value: stats.totalHotels.toLocaleString(), color: "text-[#188b5c]" },
        { label: "Total Visitors", value: stats.totalVisitors.toLocaleString(), color: "text-blue-700" },
        { label: "Pending Approvals", value: stats.pendingApprovals.toLocaleString(), color: "text-amber-700" },
        { label: "Total Transactions", value: stats.totalTransactions, color: "text-purple-700" },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Welcome back, Admin</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of tourism activity across Nigeria.
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-[12px] border border-border bg-white" />
            ))
          : statCards.map((stat) => (
              <div key={stat.label} className="rounded-[12px] border border-border bg-white p-5">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className={cn("mt-2 text-2xl font-bold", stat.color)}>{stat.value}</p>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 rounded-[12px] border border-border bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-brand-ink">Recent Activity</h2>
          {loading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : activity.length === 0 ? (
            <p className="text-sm text-muted">No recent activity.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between rounded-lg border border-border/50 px-4 py-3"
                >
                  <p className="text-sm text-brand-ink">{item.text}</p>
                  <span className="ml-4 shrink-0 text-xs text-muted">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[12px] border border-border bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-brand-ink">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "flex items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90",
                  action.color,
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
