import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  tourismId: string;
  className?: string;
};

/**
 * QR-code panel from the Foreign Visitor success page (Figma node
 * 40:215). Shows the QR with the user's Tourism ID centred below.
 */
export default function QrTourismId({ tourismId, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative grid h-[270px] w-[256px] place-items-center rounded-[6px] border border-border bg-white">
        <span className="relative block size-[234px]">
          <Image
            src="/figma/img/qr-code.png"
            alt={`QR code for Tourism ID ${tourismId}`}
            fill
            sizes="234px"
            className="object-contain"
          />
        </span>
      </div>
      <p className="text-center text-sm font-semibold">
        <span className="text-brand-ink/60">Your Tourism ID:</span>{" "}
        <span className="text-brand-ink">{tourismId}</span>
      </p>
    </div>
  );
}
