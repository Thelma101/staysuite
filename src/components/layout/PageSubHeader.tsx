"use client";

import { useRouter } from "next/navigation";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** Where the back arrow should navigate. Defaults to `router.back()`. */
  backHref?: string;
  showBack?: boolean;
  /** Float the back button as a standalone circle (used on NIN registration). */
  floatingBack?: boolean;
  className?: string;
};

/**
 * White, bottom-bordered bar that sits directly under the green app
 * header on auth-flow pages. Renders a back arrow on the left and a
 * centred page title; both are responsive.
 */
export default function PageSubHeader({
  title,
  backHref,
  showBack = true,
  floatingBack = false,
  className,
}: Props) {
  const router = useRouter();

  const onBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  if (floatingBack) {
    return (
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1440px] px-4 pt-6 md:px-10",
          className
        )}
      >
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-4 top-6 grid size-[50px] place-items-center rounded-full bg-white shadow-sm transition hover:bg-surface-subtle md:left-12"
          >
            <FigIcon src="/figma/icons/arrow-left.svg" size={24} />
          </button>
        )}
        <h1 className="text-center font-montserrat text-xl font-semibold tracking-brand-md text-brand-ink md:text-2xl">
          {title}
        </h1>
      </div>
    );
  }

  return (
    <div className={cn("w-full border-b border-border bg-white", className)}>
      <div className="relative mx-auto flex h-[62px] w-full max-w-[1440px] items-center justify-center px-4 md:px-10">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-2 grid size-10 place-items-center rounded-full transition hover:bg-surface-subtle md:left-8 md:size-[50px]"
          >
            <FigIcon src="/figma/icons/arrow-left.svg" size={24} />
          </button>
        )}
        <h1 className="font-montserrat text-lg font-semibold text-brand-ink md:text-2xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
