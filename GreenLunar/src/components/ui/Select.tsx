"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import FigIcon from "./FigIcon";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: Option[];
  placeholder?: string;
};

/**
 * Native `<select>` styled to match the Figma dropdown (48px tall,
 * border `#d9d9d9`, Figma chevron icon on the right). Using a native
 * element keeps it accessible and cheap to ship; we can swap in a
 * headless combobox later if filterable dropdowns become a need.
 */
const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { options, placeholder, className, ...rest },
  ref
) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-full items-center rounded-[6px] border border-border bg-white",
        className
      )}
    >
      <select
        ref={ref}
        {...rest}
        className="h-full w-full appearance-none rounded-[6px] bg-transparent pl-[14px] pr-12 text-sm text-brand-ink outline-none"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <FigIcon src="/figma/icons/arrow-down.svg" size={24} />
      </span>
    </div>
  );
});

export default Select;
