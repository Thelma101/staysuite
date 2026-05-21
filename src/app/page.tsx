import Image from "next/image";
import AppHeader from "@/components/layout/AppHeader";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";

/**
 * Welcome page — entry point of the National Hotel Booking Platform.
 * Figma node 25:7. Refactored for full responsiveness:
 *   • mobile (< md): stacked, full-bleed background under the header,
 *     title + CTAs centred over the image
 *   • desktop (≥ md): same composition at 1440 design width without
 *     locking to a fixed canvas
 */
export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#c4c4c4]">
      <AppHeader />

      <main className="relative isolate flex flex-1 items-start justify-center overflow-hidden">
        {/* Hero background image — bleeds slightly beyond the viewport */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src="/figma/background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15 sm:bg-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 pb-16 pt-10 md:pt-[60px]">
          <h1
            className="max-w-[640px] text-center font-montserrat text-[28px] font-extrabold leading-tight tracking-brand-xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-[32px] md:text-[36px]"
            data-node-id="25:33"
          >
            Welcome to The National Hotel Management Platform
          </h1>

          <div
            className="mt-[280px] flex w-full max-w-[398px] flex-col items-stretch gap-[19px] sm:mt-[320px] md:mt-[300px]"
            data-node-id="25:12"
          >
            <Button
              as="link"
              href="/register/nigerian"
              variant="primary"
              fullWidth
              leftIcon={<FigIcon src="/figma/identity-card.svg" size={24} />}
            >
              Register As Nigerian
            </Button>
            <Button
              as="link"
              href="/register/visitor"
              variant="blue"
              fullWidth
              leftIcon={<FigIcon src="/figma/globe.svg" size={24} />}
            >
              Visitor / Foreigner Registration
            </Button>
            <Button
              as="link"
              href="/login"
              variant="navy"
              fullWidth
              leftIcon={<FigIcon src="/figma/lock.svg" size={24} />}
            >
              Login
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
