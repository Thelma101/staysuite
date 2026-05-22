import clsx, { type ClassValue } from "clsx";

/**
 * `cn` — small className combiner used throughout the UI primitives.
 *
 * Kept as a thin wrapper over `clsx` so we have a single import path
 * everywhere and can swap in `tailwind-merge` later without touching
 * every component.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
