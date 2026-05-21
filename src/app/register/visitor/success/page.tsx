import Image from "next/image";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import SuccessHeader from "@/components/SuccessHeader";
import QrTourismId from "@/components/QrTourismId";

/**
 * Visitor registration success page — Figma nodes 40:179 (desktop)
 * and 31:245 (mobile). Renders the green check, QR card, wallet
 * card and download-ID card, plus a "Go to Dashboard" action.
 */
export default function VisitorSuccessPage() {
  const tourismId = "GLT-9883736266";

  return (
    <AppShell bg="success">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-10 md:py-[36px]">
        <div className="flex w-full max-w-[348px] flex-col items-center gap-9">
          <SuccessHeader />

          <div className="h-px w-full bg-border" />

          <div className="flex w-full flex-col items-center gap-6">
            <QrTourismId tourismId={tourismId} />

            <div className="grid w-full grid-cols-2 gap-[29px]">
              <FeatureCard
                imageSrc="/figma/img/wallet-illu.png"
                title="Wallet Created"
                line={
                  <>
                    Balance:{" "}
                    <span className="font-semibold">
                      <s>N</s>0.00
                    </span>
                  </>
                }
              />
              <FeatureCard
                imageSrc="/figma/img/id-card-illu.png"
                title="Download ID Card"
                line="Save to your device"
              />
            </div>
          </div>

          <Button as="link" href="/dashboard" variant="primary" fullWidth>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

type FeatureCardProps = {
  imageSrc: string;
  title: string;
  line: React.ReactNode;
};

function FeatureCard({ imageSrc, title, line }: FeatureCardProps) {
  return (
    <div className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-[6px] border border-border bg-white p-3 text-center">
      <span className="relative block size-[52px]">
        <Image src={imageSrc} alt="" fill sizes="52px" className="object-contain" />
      </span>
      <p className="text-sm font-semibold text-brand-ink">{title}</p>
      <p className="text-xs text-brand-ink">{line}</p>
    </div>
  );
}
