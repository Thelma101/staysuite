"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Initial countdown duration in seconds. */
  seconds?: number;
  onResend?: () => void;
};

/**
 * "Resend OTP   00:30" widget. Counts down on mount and re-enables
 * the resend link when it hits zero.
 */
export default function OtpResend({ seconds = 30, onResend }: Props) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [left]);

  const formatted = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;

  return (
    <p className="text-center text-xs text-brand-ink">
      <button
        type="button"
        disabled={left > 0}
        onClick={() => {
          setLeft(seconds);
          onResend?.();
        }}
        className="font-medium text-brand-green transition disabled:opacity-50"
      >
        Resend OTP
      </button>
      <span className="ml-5 tabular-nums text-brand-ink">{formatted}</span>
    </p>
  );
}
