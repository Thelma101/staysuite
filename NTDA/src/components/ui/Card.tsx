import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** When true, applies the bordered Figma card styling. */
  bordered?: boolean;
};

/**
 * White rounded surface used to host forms and content blocks.
 * Matches the Figma `bg-white border border-[#d9d9d9] rounded-[9px]`
 * frame found on every auth-flow page.
 */
export default function Card({
  children,
  className,
  bordered = true,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[9px] bg-white",
        bordered && "border border-border",
        className
      )}
    >
      {children}
    </div>
  );
}
