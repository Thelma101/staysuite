"use client";

import { useState } from "react";
import FigIcon from "@/components/ui/FigIcon";
import { cn } from "@/lib/utils";

type Lang = "EN" | "FR" | "CHN";

const LANGS: Lang[] = ["EN", "FR", "CHN"];

type Props = {
  /** "inline" (desktop: EN | FR | CHN) or "dropdown" (mobile: EN ▾). */
  variant?: "inline" | "dropdown";
  className?: string;
};

/**
 * Header language switch. Defaults to inline tri-letters on desktop;
 * collapses to a dropdown for mobile headers (per Figma mobile spec).
 */
export default function LanguageSwitch({
  variant = "inline",
  className,
}: Props) {
  const [lang, setLang] = useState<Lang>("EN");
  const [open, setOpen] = useState(false);

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 font-montserrat text-base font-medium tracking-brand text-white",
          className
        )}
      >
        {LANGS.map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                "transition-colors hover:underline",
                lang === l ? "text-white" : "text-white/85"
              )}
              aria-pressed={lang === l}
            >
              {l}
            </button>
            {i < LANGS.length - 1 && (
              <span className="opacity-80">|</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 font-montserrat text-sm font-medium tracking-brand-sm text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {lang}
        <FigIcon src="/figma/icons/arrow-down.svg" size={20} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-24 overflow-hidden rounded-md border border-border bg-white text-sm shadow-card"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-3 py-2 text-left hover:bg-surface-subtle",
                  lang === l && "bg-brand-green-soft font-semibold"
                )}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
