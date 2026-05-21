"use client";

import { useRef, useState, type ChangeEvent } from "react";
import FigIcon from "./FigIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  iconSrc: string;
  /** Comma-separated accept patterns, e.g. "image/*". */
  accept?: string;
  /** Called with the picked file. */
  onFile?: (file: File) => void;
  className?: string;
  id?: string;
};

/**
 * Pill-shaped, single-file picker used for "Upload Photo" and
 * "Upload Document" rows on the visitor registration form.
 * Renders a hidden input + visual button so we get native file
 * dialog accessibility for free.
 */
export default function UploadField({
  label,
  iconSrc,
  accept,
  onFile,
  className,
  id,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    onFile?.(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-[10px] rounded-[6px] border border-border-green bg-brand-green-soft/50 px-4 text-xs font-semibold text-brand-ink transition hover:bg-brand-green-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green",
        className
      )}
    >
      <FigIcon src={iconSrc} size={24} />
      <span className="truncate">{fileName ?? label}</span>
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
      />
    </button>
  );
}
