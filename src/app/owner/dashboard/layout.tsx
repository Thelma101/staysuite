"use client";

import OwnerDashboardShell from "@/components/layout/OwnerDashboardShell";

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OwnerDashboardShell>{children}</OwnerDashboardShell>;
}
