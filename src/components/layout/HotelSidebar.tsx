"use client";

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
  { href: "/hotel/dashboard", label: "Dashboard", iconSrc: "/figma/icons/dashboard.svg" },
  { href: "/hotel/bookings", label: "Bookings", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/hotel/rooms", label: "Rooms", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/hotel/visitors", label: "Visitors", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "/hotel/orders", label: "Orders", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/hotel/staff", label: "Staff", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "/hotel/finance", label: "Finance", iconSrc: "/figma/icons/wallet.svg" },
  { href: "/hotel/messages", label: "Messages", iconSrc: "/figma/icons/notification.svg" },
  { href: "/hotel/settings", label: "Settings", iconSrc: "/figma/icons/dashboard.svg" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HotelSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/hotel/dashboard"
      ? pathname === "/hotel/dashboard"
      : pathname.startsWith(href);

  const content = (
    <nav className="flex h-full flex-col gap-2 px-4 py-6">
      <div className="mb-3 rounded-[6px] bg-surface-subtle px-3 py-3">
        <p className="text-xs font-medium text-muted">Your Hotel</p>
      </div>

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
                ? "bg-brand-blue text-white"
                : "text-muted hover:bg-surface-subtle",
            )}
          >
            <FigIcon src={item.iconSrc} size={24} />
            <span className="font-medium tracking-brand-sm">{item.label}</span>
          </Link>
        );
      })}
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
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[260px] max-w-[80%] border-r border-border bg-white shadow-card transition-transform",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {content}
        </aside>
      </div>
    </>
  );
}
