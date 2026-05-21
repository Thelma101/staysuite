import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type Props = {
  /** Show the bell + avatar cluster (dashboard layout). */
  withNotifications?: boolean;
  /** Hide the Hotel Owner pill (used inside dashboard chrome). */
  hideOwnerCta?: boolean;
  /** Optional className for the outer header element. */
  className?: string;
};

/**
 * Top brand bar — green strip with logo, optional CTAs and language
 * switch. Responsive:
 *   • mobile (< md): compact 56px tall, smaller pill + dropdown
 *   • desktop (≥ md): 77px tall, inline "EN | FR | CHN"
 *
 * Single source of truth for every authenticated and unauthenticated
 * page on the platform.
 */
export default function AppHeader({
  withNotifications,
  hideOwnerCta,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-brand-green text-white",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-3 px-4 md:h-[77px] md:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="National Hotel Booking Platform"
          className="relative block size-10 shrink-0 md:size-[54px]"
        >
          <Image
            src="/figma/logo.png"
            alt="National Tourism & Hotel Board"
            fill
            sizes="(min-width: 768px) 54px, 40px"
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-8">
          {!hideOwnerCta && (
            <Button
              as="link"
              href="/owner"
              variant="white"
              size="sm"
              className="h-10 md:h-12 md:w-[169px]"
            >
              Hotel Owner
            </Button>
          )}

          {withNotifications && (
            <>
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
            </>
          )}

          {/* Mobile uses dropdown, desktop uses inline tri-letter */}
          <LanguageSwitch variant="dropdown" className="md:hidden" />
          <LanguageSwitch variant="inline" className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
}
