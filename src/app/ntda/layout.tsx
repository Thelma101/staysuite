"use client";

import NtdaDashboardShell from "@/components/layout/NtdaDashboardShell";

export default function NtdaLayout({ children }: { children: React.ReactNode }) {
  return <NtdaDashboardShell>{children}</NtdaDashboardShell>;
}
