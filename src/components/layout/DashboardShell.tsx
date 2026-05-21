"use client";

import { useState, type ReactNode } from "react";
import AppHeader from "./AppHeader";
import DashboardSidebar from "./DashboardSidebar";
import { cn } from "@/lib/utils";

type Props = {
  /** Title rendered in the white topbar above the page content. */
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Three-region layout for authenticated pages (Figma node 53:46):
 * green AppHeader → left sidebar + white topbar → main content. The
 * sidebar collapses to an off-canvas drawer below the `md` breakpoint.
 */
export default function DashboardShell({ title, children, className }: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      <AppHeader withNotifications hideOwnerCta />

      <div className="flex flex-1">
        <DashboardSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-14 items-center gap-3 border-b border-border bg-white px-4 md:h-14 md:px-7">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              className="grid size-10 place-items-center rounded-md hover:bg-surface-subtle md:hidden"
              aria-label="Open navigation"
            >
              <span className="block h-[2px] w-5 bg-brand-ink shadow-[0_6px_0_0_#00190f,0_-6px_0_0_#00190f]" />
            </button>
            <h1 className="text-xl font-medium tracking-brand-lg text-brand-ink md:text-2xl">
              {title}
            </h1>
          </div>

          <main className={cn("flex-1 px-4 py-6 md:px-7 md:py-8", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
