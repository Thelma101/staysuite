"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

type Props = {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  /** Visual gap between slots (Figma uses 34px on desktop, 14px on mobile). */
  gapClassName?: string;
  /** When the design needs an inline timer slot beside the boxes. */
  trailing?: React.ReactNode;
  autoFocus?: boolean;
  className?: string;
};

/**
 * Six-up-friendly OTP input. Each slot is a 48×48 box matching the
 * Figma "OTP" component; supports paste, backspace navigation, and
 * arrow-key movement.
 */
export default function OtpInput({
  length = 4,
  value,
  onChange,
  gapClassName = "gap-3 sm:gap-[34px]",
  trailing,
  autoFocus,
  className,
}: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = useMemo(() => {
    const v = value.padEnd(length, " ").split("").slice(0, length);
    return v.map((c) => (c === " " ? "" : c));
  }, [value, length]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const setChar = useCallback(
    (index: number, ch: string) => {
      const next = chars.slice();
      next[index] = ch.slice(-1);
      onChange(next.join(""));
    },
    [chars, onChange]
  );

  const handleKeyDown = (index: number) =>
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        if (chars[index]) {
          setChar(index, "");
        } else if (index > 0) {
          refs.current[index - 1]?.focus();
          setChar(index - 1, "");
        }
        return;
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        refs.current[index - 1]?.focus();
      }
      if (event.key === "ArrowRight" && index < length - 1) {
        event.preventDefault();
        refs.current[index + 1]?.focus();
      }
    };

  const handleInput = (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const ch = event.target.value.replace(/\D/g, "").slice(-1);
      if (!ch) return;
      setChar(index, ch);
      if (index < length - 1) refs.current[index + 1]?.focus();
    };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    event.preventDefault();
    onChange(digits.slice(0, length).padEnd(length, " ").trim());
    const focusIdx = Math.min(digits.length, length - 1);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className={cn("flex w-full items-center", gapClassName, className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1}`}
          value={chars[i] ?? ""}
          onChange={handleInput(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          className="h-12 w-12 shrink-0 rounded-[6px] border border-border bg-white text-center text-base font-semibold text-brand-ink outline-none focus:border-brand-green"
        />
      ))}
      {trailing}
    </div>
  );
}
