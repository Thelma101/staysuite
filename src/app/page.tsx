import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import PrimaryActionButton from "@/components/PrimaryActionButton";

/**
 * Welcome page
 *
 * 1:1 implementation of Figma node 25:7 — "Welcome page" (1440 × 1024).
 * Layout summary (top-to-bottom, in a 1440 × 1024 frame):
 *   - SiteHeader (green strip, 1440 × 77, anchored at top)
 *   - image 4 background (1499 × 1066, x=-30, y=-42)
 *   - Title text "Welcome to The National Hotel Management Platform"
 *       (centred horizontally, top=117, width=609, 36px Montserrat ExtraBold)
 *   - Frame 16 (398 × 206, x=521, y=501) — three stacked CTA buttons
 *       with a 19px vertical gap.
 */
export default function WelcomePage() {
  return (
    <main
      className="relative w-full min-h-screen bg-[#c4c4c4] overflow-hidden"
      data-node-id="25:7"
      data-name="Welcome page"
    >
      {/* Hero canvas — fixed Figma frame size (1440 × 1024) so absolute
          coordinates from the design translate 1:1. The frame is centred
          horizontally and the background image bleeds slightly beyond it
          (1499 × 1066 at -30,-42) just like in Figma. */}
      <div className="relative mx-auto h-[1024px] w-[1440px]">
        {/* Background — Abuja skyline + hotel + travellers */}
        <div
          className="absolute"
          style={{ top: -42, left: -30, width: 1499, height: 1066 }}
          data-node-id="42:428"
          data-name="image 4"
        >
          <Image
            src="/figma/background.png"
            alt=""
            fill
            priority
            sizes="1499px"
            className="object-cover select-none pointer-events-none"
          />
        </div>

        {/* Top header strip */}
        <div className="absolute top-0 left-0 w-[1440px]">
          <SiteHeader />
        </div>

        {/* Welcome title */}
        <h1
          className="absolute left-1/2 top-[117px] w-[609px] -translate-x-1/2 text-center font-montserrat text-[36px] font-extrabold leading-normal tracking-[0.54px] text-white"
          data-node-id="25:33"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
        >
          Welcome to The National Hotel Management Platform
        </h1>

        {/* CTA stack — Frame 16 */}
        <div
          className="absolute left-1/2 top-[501px] flex w-[398px] -translate-x-1/2 flex-col items-center gap-[19px]"
          data-node-id="25:12"
        >
          <PrimaryActionButton
            href="/register/nigerian"
            label="Register As Nigerian"
            iconSrc="/figma/identity-card.svg"
            iconAlt=""
            variant="green"
            nodeId="25:13"
          />
          <PrimaryActionButton
            href="/register/visitor"
            label="Visitor / Foreigner Registration"
            iconSrc="/figma/globe.svg"
            iconAlt=""
            variant="blue"
            nodeId="25:20"
          />
          <PrimaryActionButton
            href="/login"
            label="Login"
            iconSrc="/figma/lock.svg"
            iconAlt=""
            variant="navy"
            nodeId="25:27"
          />
        </div>
      </div>
    </main>
  );
}
