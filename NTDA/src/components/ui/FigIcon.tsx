import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

/**
 * Renders a Figma-exported icon (SVG or PNG) at a fixed square size.
 * Treats the icon as decorative by default (empty alt).
 */
export default function FigIcon({
  src,
  alt = "",
  size = 24,
  className,
}: Props) {
  return (
    <span
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}
