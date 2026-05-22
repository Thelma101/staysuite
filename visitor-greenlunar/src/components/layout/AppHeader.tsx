import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  greenLunarCta?: boolean;
  className?: string;
};

export default function AppHeader({ greenLunarCta, className }: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-brand-green text-white",
        className,
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-3 px-4 md:h-[77px] md:px-10">
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
          {greenLunarCta && (
            <Button
              as="link"
              href="/greenlunar/login"
              variant="white"
              size="sm"
              className="h-10 md:h-12 md:w-[169px]"
            >
              Green Lunar
            </Button>
          )}

          <LanguageSwitch variant="dropdown" className="md:hidden" />
          <LanguageSwitch variant="inline" className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
}
