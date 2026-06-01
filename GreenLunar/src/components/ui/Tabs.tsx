"use client";

import { cn } from "@/lib/utils";

type Tab<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  value: T;
  onChange: (next: T) => void;
  options: ReadonlyArray<Tab<T>>;
  className?: string;
};

/**
 * Pill-style segmented control. Matches the "Email / Phone number"
 * tabs in the login card (Figma node 84:505).
 */
export default function Tabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: Props<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex w-full items-center gap-1 rounded-[4px] bg-surface-chip p-1",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-[4px] px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-white text-brand-ink shadow-sm"
                : "text-brand-ink/70 hover:text-brand-ink"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
