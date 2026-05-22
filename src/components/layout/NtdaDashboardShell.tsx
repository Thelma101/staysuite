"use client";

import { useState, type ReactNode } from "react";
import NtdaSidebar from "./NtdaSidebar";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function NtdaDashboardShell({ children, className }: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8f6]">
      <div className="flex flex-1">
        <NtdaSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex h-14 items-center justify-between border-b border-border bg-white px-4 md:px-7">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              className="grid size-10 place-items-center rounded-md hover:bg-surface-subtle md:hidden"
              aria-label="Open navigation"
            >
              <span className="block h-[2px] w-5 bg-brand-ink shadow-[0_6px_0_0_#00190f,0_-6px_0_0_#00190f]" />
            </button>

            <div className="ml-auto flex items-center gap-3">
              <div className="size-8 rounded-full bg-[#188b5c]/20" />
              <span className="text-sm font-medium text-brand-ink">NTDA Admin</span>
            </div>
          </div>

          <main className={cn("flex-1 px-4 py-6 md:px-7 md:py-8", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
