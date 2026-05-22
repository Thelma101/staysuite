"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onMenuClick: () => void;
  children?: ReactNode;
  className?: string;
};

export default function DashboardTopbar({
  onMenuClick,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 border-b border-border bg-white px-4 md:px-7",
        className,
      )}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="grid size-10 place-items-center rounded-md hover:bg-surface-subtle md:hidden"
        aria-label="Open navigation"
      >
        <span className="block h-[2px] w-5 bg-brand-ink shadow-[0_6px_0_0_#00190f,0_-6px_0_0_#00190f]" />
      </button>
      {children}
    </div>
  );
}
