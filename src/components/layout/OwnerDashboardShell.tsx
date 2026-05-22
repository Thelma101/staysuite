"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import OwnerSidebar from "./OwnerSidebar";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function OwnerDashboardShell({ children, className }: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle">
      {/* Green top header — 70px */}
      <header className="sticky top-0 z-30 w-full bg-brand-green text-white">
        <div className="mx-auto flex h-[70px] w-full max-w-[1440px] items-center gap-3 px-4 md:px-7">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="grid size-10 place-items-center rounded-md hover:bg-white/10 md:hidden"
            aria-label="Open navigation"
          >
            <span className="block h-[2px] w-5 bg-white shadow-[0_6px_0_0_#fff,0_-6px_0_0_#fff]" />
          </button>

          <Link
            href="/owner/dashboard"
            aria-label="Hotel Owner Dashboard"
            className="relative block size-10 shrink-0 md:size-12"
          >
            <Image
              src="/figma/logo.png"
              alt="National Tourism & Hotel Board"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
            <Button
              as="link"
              href="/owner/dashboard/guests"
              variant="white"
              size="sm"
              className="hidden h-10 sm:inline-flex md:h-11"
            >
              Book Visitor
            </Button>

            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full hover:bg-white/10"
            >
              <FigIcon
                src="/figma/icons/notification.svg"
                size={24}
                alt="Notifications"
              />
            </button>

            <span className="relative block size-10 overflow-hidden rounded-full bg-white/10">
              <Image
                src="/figma/img/profile-avatar.png"
                alt="Profile"
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <OwnerSidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <main className={cn("min-w-0 flex-1 px-4 py-6 md:px-7 md:py-8", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
