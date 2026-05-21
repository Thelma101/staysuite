import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
  variant: "green" | "blue" | "navy";
  nodeId?: string;
};

const variantClasses: Record<Props["variant"], string> = {
  green: "bg-brand-green hover:bg-[#147a51]",
  blue: "bg-brand-blue hover:bg-[#2558ad]",
  navy: "bg-brand-navy hover:bg-[#19305f]",
};

/**
 * PrimaryActionButton
 *
 * Matches the three CTA buttons on the Welcome page (Figma node 25:12).
 * Each button is 398 × 56, has a 24×24 leading icon, 14px gap, and rounded-[8px].
 * Label uses Inter Semi Bold 16, white, letter-spacing 0.24px.
 */
export default function PrimaryActionButton({
  href,
  label,
  iconSrc,
  iconAlt,
  variant,
  nodeId,
}: Props) {
  return (
    <Link
      href={href}
      data-node-id={nodeId}
      className={`flex w-full h-[56px] items-center justify-center gap-[14px] rounded-[8px] px-4 py-4 text-center text-[16px] font-semibold tracking-[0.24px] text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${variantClasses[variant]}`}
    >
      <span className="relative inline-block size-[24px] shrink-0">
        <Image
          src={iconSrc}
          alt={iconAlt}
          fill
          sizes="24px"
          className="object-contain"
        />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}
