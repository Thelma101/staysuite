import Image from "next/image";
import Link from "next/link";

/**
 * SiteHeader
 *
 * Implements the green top bar from the Figma "Welcome page" frame.
 * Figma node: 20:22791 (Frame 6) — 1440 × 77, bg #188b5c.
 * Contents (left → right):
 *   - NTHB circular logo at left:40, 54×54
 *   - "Hotel Owner" white pill at left:1006, 169×48
 *   - "EN | FR | CHN" language switch anchored near the right edge
 */
export default function SiteHeader() {
  return (
    <header
      className="relative w-full h-[77px] bg-brand-green overflow-hidden"
      data-node-id="20:22791"
    >
      <div className="relative h-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          aria-label="National Hotel Booking Platform — Home"
          className="absolute top-1/2 -translate-y-1/2 left-[40px] block size-[54px]"
          data-node-id="549:9811"
        >
          <Image
            src="/figma/logo.png"
            alt="National Tourism & Hotel Board logo"
            width={108}
            height={108}
            priority
            className="size-full object-cover"
          />
        </Link>

        {/* Hotel Owner button */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 left-[1006px] flex h-[48px] w-[169px] items-center justify-center rounded-[6px] bg-white px-6 py-4 text-[16px] font-semibold text-brand-ink transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          data-node-id="56:57"
        >
          Hotel Owner
        </button>

        {/* Language switch — visually centred at x=1346.5 per Figma */}
        <p
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-[1346.5px] text-center text-[16px] font-medium tracking-[0.24px] text-white font-montserrat whitespace-nowrap"
          data-node-id="14:22668"
        >
          <span className="cursor-pointer hover:underline">EN</span>
          <span className="mx-1 opacity-90">|</span>
          <span className="cursor-pointer hover:underline">FR</span>
          <span className="mx-1 opacity-90">|</span>
          <span className="cursor-pointer hover:underline">CHN</span>
        </p>
      </div>
    </header>
  );
}
