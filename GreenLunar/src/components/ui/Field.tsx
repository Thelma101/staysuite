import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Standard form-field wrapper: a small bold label sitting 8px above
 * the control, with an optional hint underneath. Used by every input
 * style in the design system.
 */
export default function Field({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: Props) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-brand-ink"
      >
        {label}
        {required && <span className="ml-1 text-brand-green">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
