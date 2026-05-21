"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  iconSrc: string;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", iconSrc: "/figma/icons/dashboard.svg" },
  { href: "/dashboard/hotels", label: "Your Hotel List", iconSrc: "/figma/icons/hotel.svg" },
];

type Props = {
  /** Mobile sheet open/close — desktop ignores this. */
  open: boolean;
  onClose: () => void;
};

/**
 * Left-rail navigation for the dashboard chrome (Figma node 53:47).
 * On `md:` and up it's a permanent 235px column; below, it slides in
 * as a drawer triggered from the topbar.
 */
export default function DashboardSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const content = (
    <nav className="flex h-full flex-col gap-6 px-4 py-6">
      {NAV.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm transition",
              active
                ? "bg-brand-green text-white"
                : "text-muted hover:bg-surface-subtle"
            )}
          >
            <FigIcon src={item.iconSrc} size={24} />
            <span className="font-medium tracking-brand-sm">{item.label}</span>
          </Link>
        );
      })}

      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-3 rounded-[6px] bg-surface-subtle px-6 py-12 text-center">
        <Image
          src="/figma/img/folder.png"
          alt=""
          width={36}
          height={36}
          className="size-9 object-contain"
        />
        <p className="text-xs text-muted">You are yet to book a hotel</p>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop column */}
      <aside className="hidden h-full w-[235px] shrink-0 border-r border-border bg-white md:block">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[260px] max-w-[80%] border-r border-border bg-white shadow-card transition-transform",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {content}
        </aside>
      </div>
    </>
  );
}
