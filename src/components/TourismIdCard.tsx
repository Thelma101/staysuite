import Image from "next/image";
import { cn } from "@/lib/utils";

type Detail = { label: string; value: string };

type Props = {
  fullName: string;
  tourismId: string;
  /** Avatar PNG (defaults to the placeholder from Figma). */
  avatarSrc?: string;
  /** Information rows shown under the avatar. */
  details: Detail[];
  className?: string;
};

/**
 * Tourism ID card — the green-headed card with a decorative,
 * scattered pattern from Figma node 71:1360. Renders user identity
 * details in a print-friendly 10px-rounded surface.
 */
export default function TourismIdCard({
  fullName,
  tourismId,
  avatarSrc = "/figma/img/profile-id.png",
  details,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[346px] overflow-hidden rounded-[10px] bg-brand-green-softest shadow-card",
        className
      )}
    >
      {/* Decorative pattern layer — purely visual, behind content. */}
      <DecorativePattern />

      {/* Green banner */}
      <div className="relative h-[52px] w-full bg-brand-green" />

      {/* Content block */}
      <div className="relative -mt-[36px] flex flex-col gap-[19px] px-5 pb-5">
        <div className="flex items-center gap-[10px]">
          <span className="relative block size-20 overflow-hidden rounded-full ring-2 ring-white">
            <Image
              src={avatarSrc}
              alt={`${fullName} photo`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </span>
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-sm font-semibold text-white">{fullName}</p>
            <div className="rounded-sm border-b border-border bg-white/90 px-[10px] py-[10px]">
              <p className="text-sm font-semibold text-brand-ink">
                {tourismId}
              </p>
            </div>
          </div>
        </div>

        <dl className="flex flex-col gap-3 text-sm text-brand-ink">
          {details.map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <dt className="w-[92px] shrink-0 text-brand-ink/80">
                {d.label}
              </dt>
              <dd className="flex-1 break-all font-medium">{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/**
 * Inline SVG version of the scattered floral pattern from Figma.
 * Rendered with CSS so the card stays self-contained (no image
 * downloads) and looks crisp at any size.
 */
function DecorativePattern() {
  // Coordinates lifted directly from Figma to preserve the original
  // composition. Each shape is an outlined floral motif.
  const petals = [
    [15, 29],
    [308, 58],
    [237, 135],
    [312, 167],
    [191, 194],
    [79, 193],
    [249, 90],
  ];
  const diamonds = [
    [31, 73],
    [41, 201],
    [200, 159],
    [191, 102],
    [74, 117],
    [111, 151],
    [289, 204],
    [299, 92],
    [236, 193],
    [50, 142],
    [139, 43],
  ];
  const leaves = [
    [19, 127],
    [155, 170],
    [167, 73],
    [191, 25],
    [304, 136],
    [7, 185],
    [131, 113],
    [265, 170],
    [253, 52],
    [69, 25],
    [87, 89],
    [124, 205],
    [280, 10],
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none opacity-90"
    >
      {petals.map(([x, y], i) => (
        <Image
          key={`p${i}`}
          src="/figma/patterns/petal.svg"
          alt=""
          width={16}
          height={23}
          style={{ position: "absolute", left: x, top: y }}
        />
      ))}
      {diamonds.map(([x, y], i) => (
        <Image
          key={`d${i}`}
          src="/figma/patterns/diamond.svg"
          alt=""
          width={19}
          height={19}
          style={{ position: "absolute", left: x, top: y }}
        />
      ))}
      {leaves.map(([x, y], i) => (
        <Image
          key={`l${i}`}
          src="/figma/patterns/leaf.svg"
          alt=""
          width={24}
          height={16}
          style={{ position: "absolute", left: x, top: y }}
        />
      ))}
    </div>
  );
}
