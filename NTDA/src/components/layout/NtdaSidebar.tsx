"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  iconSrc: string;
  badge?: number;
  section?: string;
  danger?: boolean;
};

const NAV: NavItem[] = [
  { href: "/ntda/dashboard", label: "Home", iconSrc: "/figma/icons/dashboard.svg" },
  { href: "/ntda/hotels", label: "Hotels", iconSrc: "/figma/icons/hotel.svg" },
  { href: "/ntda/visitors", label: "Visitors", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "__divider_1__", label: "", iconSrc: "", section: "Verification & Compliance" },
  { href: "/ntda/approvals", label: "Pending Hotel Approval", iconSrc: "/figma/icons/hotel.svg" },
  { href: "__divider_2__", label: "", iconSrc: "" },
  { href: "/ntda/broadcast", label: "Broadcast Message", iconSrc: "/figma/icons/notification.svg" },
  { href: "/ntda/transactions", label: "Transactions", iconSrc: "/figma/icons/dashboard.svg" },
  { href: "/ntda/admins", label: "Admins", iconSrc: "/figma/icons/identity-card-sm.svg" },
  { href: "__logout__", label: "Log Out", iconSrc: "/figma/icons/dashboard.svg", danger: true },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NtdaSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/ntda/dashboard"
      ? pathname === "/ntda/dashboard"
      : pathname.startsWith(href);

  const content = (
    <nav className="flex h-full flex-col px-4 py-6">
      {/* NTDA Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex size-[86px] items-center justify-center rounded-full border-2 border-[#188b5c] bg-[#f4f8f6]">
          <span className="text-xs font-bold text-[#188b5c]">NTDA</span>
        </div>
        <span className="mt-2 text-[11px] font-semibold tracking-wide text-[#188b5c]">
          Nigerian Tourism
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {NAV.map((item, idx) => {
          if (item.href.startsWith("__divider")) {
            return (
              <div key={idx} className="my-2">
                <hr className="border-border" />
                {item.section && (
                  <span className="mt-2 block px-3 text-[12px] font-medium text-gray-400">
                    {item.section}
                  </span>
                )}
              </div>
            );
          }

          if (item.danger) {
            return (
              <button
                key={item.href}
                type="button"
                className="mt-auto flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                onClick={() => {
                  onClose();
                  router.push("/ntda-auth/login");
                }}
              >
                <FigIcon src={item.iconSrc} size={24} />
                <span>{item.label}</span>
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
                "flex items-center gap-3 rounded-l-[8px] px-3 py-3 text-sm transition",
                active
                  ? "bg-[#188b5c] text-white"
                  : "text-muted hover:bg-surface-subtle",
              )}
            >
              <FigIcon src={item.iconSrc} size={24} />
              <span className="font-medium tracking-brand-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
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
