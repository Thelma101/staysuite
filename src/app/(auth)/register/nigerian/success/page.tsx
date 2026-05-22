import Image from "next/image";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";
import SuccessHeader from "@/components/SuccessHeader";
import TourismIdCard from "@/components/TourismIdCard";

/**
 * Nigerian registration success page — Figma node 49:1024. Renders
 * the confetti backdrop, the embedded wallet row, the Tourism ID
 * card (71:1360) and the download / dashboard CTAs.
 */
export default function NigerianSuccessPage() {
  const tourismId = "GLT-9883736266";

  return (
    <AppShell bg="success">
      {/* Confetti — purely decorative, hidden on small screens to avoid clutter */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 hidden w-full max-w-[1440px] -translate-x-1/2 md:block"
      >
        <Image
          src="/figma/img/confetti.png"
          alt=""
          width={243}
          height={189}
          className="absolute left-[4%] top-[64px] rotate-[-111.75deg]"
        />
        <Image
          src="/figma/img/confetti.png"
          alt=""
          width={243}
          height={189}
          className="absolute right-[6%] top-[80px] rotate-[58.01deg]"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-10 md:py-16">
        <div className="relative flex w-full max-w-[392px] flex-col items-center gap-6">
          <SuccessHeader />

          <div className="h-px w-full bg-border" />

          <p className="text-center font-montserrat text-base font-semibold sm:text-lg">
            <span className="text-brand-ink/60">Your Tourism ID:</span>{" "}
            <span className="text-brand-ink">{tourismId}</span>
          </p>

          <div className="flex w-full flex-col items-stretch gap-[18px] rounded-[18px] bg-white p-5 shadow-card-soft">
            {/* Wallet pill */}
            <div className="flex items-center justify-between rounded-[10px] bg-brand-green-softer px-5 py-5">
              <div className="flex items-center gap-3">
                <FigIcon src="/figma/icons/wallet-card.svg" size={24} />
                <span className="text-base font-medium text-brand-ink">
                  Wallet
                </span>
              </div>
              <span className="text-base font-bold text-brand-ink">N0:00</span>
            </div>

            <div className="h-px w-full bg-border" />

            <TourismIdCard
              fullName="Adeyemi Muhammed"
              tourismId="NG- 1234567890"
              details={[
                { label: "Full Name:", value: "Adeyemi Muhammed" },
                { label: "NIN:", value: "12345678901" },
              ]}
              className="mx-auto"
            />

            <button
              type="button"
              className="flex w-full items-center gap-6 rounded-[10px] border border-border bg-white px-9 py-5 text-base font-semibold text-brand-ink shadow-card transition hover:bg-surface-subtle"
            >
              <FigIcon src="/figma/icons/passport-download.svg" size={24} />
              Download ID Card
            </button>

            <Button as="link" href="/user/dashboard" variant="primary" fullWidth>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
