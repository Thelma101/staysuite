"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  /** Optional icon rendered inside the right edge of the field. */
  endAdornment?: ReactNode;
  hasError?: boolean;
};

/**
 * Brand-styled text input. Matches the 48px height, 6px radius and
 * Figma `#d9d9d9` border that every form field on the platform uses.
 */
const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, endAdornment, hasError, ...rest },
  ref
) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-full items-center rounded-[6px] border bg-white",
        hasError ? "border-red-500" : "border-border",
        className
      )}
    >
      <input
        ref={ref}
        {...rest}
        className={cn(
          "h-full w-full rounded-[6px] bg-transparent px-[14px] text-sm text-brand-ink outline-none placeholder:text-border",
          endAdornment && "pr-12"
        )}
      />
      {endAdornment && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {endAdornment}
        </span>
      )}
    </div>
  );
});

export default Input;
