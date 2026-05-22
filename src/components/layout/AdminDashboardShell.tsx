"use client";

import { useState, type ReactNode } from "react";
import AppHeader from "./AppHeader";
import AdminSidebar from "./AdminSidebar";
import DashboardTopbar from "./DashboardTopbar";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AdminDashboardShell({ children, className }: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <AppHeader withNotifications hideOwnerCta />

      <div className="flex flex-1">
        <AdminSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar onMenuClick={() => setNavOpen(true)} />

          <main className={cn("flex-1 px-4 py-6 md:px-7 md:py-8", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
