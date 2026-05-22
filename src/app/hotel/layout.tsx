"use client";

import HotelDashboardShell from "@/components/layout/HotelDashboardShell";

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return <HotelDashboardShell>{children}</HotelDashboardShell>;
}
