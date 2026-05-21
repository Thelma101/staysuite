import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

/**
 * Headline used on registration-success screens — green check mark
 * over a centred title with a muted sub-line. Figma nodes 40:210,
 * 31:282, 49:1101.
 */
export default function SuccessHeader({
  title = "Registration Successful!",
  subtitle = "Welcome to the National Hotel Management Platform",
  className,
}: Props) {
  return (
    <header
      className={cn("flex flex-col items-center gap-[18px]", className)}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="relative block size-14">
          <Image
            src="/figma/img/correct.png"
            alt=""
            fill
            sizes="56px"
            className="object-contain"
            priority
          />
        </span>
        <h2 className="text-center font-montserrat text-2xl font-semibold text-brand-green">
          {title}
        </h2>
      </div>
      <p className="text-center font-montserrat text-sm font-semibold text-muted">
        {subtitle}
      </p>
    </header>
  );
}
