"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  iconSrc: string;
  danger?: boolean;
};

const NAV: NavItem[] = [
  { href: "/owner/dashboard", label: "Dashboard", iconSrc: "/figma/icons/dashboard.svg" },
  { href: "/owner/dashboard/bookings", label: "Bookings", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/owner/dashboard/guests", label: "Guests", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "/owner/dashboard/rooms", label: "Rooms", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/owner/dashboard/payments", label: "Payments", iconSrc: "/figma/icons/wallet-card.svg" },
  { href: "/owner/dashboard/store", label: "Store", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/owner/dashboard/staff", label: "Staff Management", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "/owner/dashboard/hotel-info", label: "Hotel Information", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/owner/dashboard/wallet", label: "Wallet", iconSrc: "/figma/icons/wallet.svg" },
  { href: "__logout__", label: "Logout", iconSrc: "/figma/icons/dashboard.svg", danger: true },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OwnerSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/owner/dashboard"
      ? pathname === "/owner/dashboard"
      : pathname.startsWith(href);

  const content = (
    <nav className="flex h-full flex-col gap-1 px-3 py-6">
      <div className="mb-4 rounded-[6px] bg-white/60 px-3 py-3">
        <p className="text-xs font-medium text-muted">Hotel Owner Portal</p>
      </div>

      {NAV.map((item) => {
        if (item.danger) {
          return (
            <button
              key={item.href}
              type="button"
              className="mt-auto flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
              onClick={() => {
                onClose();
                router.push("/owner/login");
              }}
            >
              <FigIcon src={item.iconSrc} size={24} />
              <span className="tracking-brand-sm">{item.label}</span>
            </button>
          );
        }

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
                : "text-brand-ink hover:bg-white/50",
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
      <aside className="hidden h-full w-[220px] shrink-0 border-r border-border bg-[#e9e9e9] md:block">
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
            "absolute left-0 top-0 h-full w-[260px] max-w-[80%] border-r border-border bg-[#e9e9e9] shadow-card transition-transform",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {content}
        </aside>
      </div>
    </>
  );
}
