import Image from "next/image";
import Link from "next/link";
import DashboardShell from "@/components/layout/DashboardShell";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";

type ActionCard = {
  href: string;
  title: string;
  imageSrc: string;
  iconSrc: string;
  /** Tint of the bottom label band. */
  band: string;
};

const ACTIONS: ActionCard[] = [
  {
    href: "/dashboard/search",
    title: "Search & Book Hotel",
    imageSrc: "/figma/img/hotel-1.png",
    iconSrc: "/figma/icons/search.svg",
    band: "bg-[#88671c]",
  },
  {
    href: "/dashboard/nearby",
    title: "Nearby Hotels",
    imageSrc: "/figma/img/hotel-2.png",
    iconSrc: "/figma/icons/location.svg",
    band: "bg-[#0b5194]",
  },
];

/**
 * Authenticated dashboard landing — Figma node 53:46. Composed of:
 *   • Welcome line + Tourism ID / wallet panel + "Fund wallet" CTA
 *   • Two large action cards (Search & Book / Nearby Hotels)
 * Fully responsive: the sidebar collapses to a drawer on small
 * viewports, and the action cards reflow from a horizontal row to
 * a vertical stack.
 */
export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="flex flex-col gap-5">
        <p className="text-base text-brand-ink tracking-brand-md">
          Welcome,{" "}
          <span className="text-xl font-bold tracking-brand-md">John Doe</span>
        </p>

        <section className="flex flex-col gap-4 rounded-[6px] border border-surface-chip bg-surface-softer px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-7 md:max-w-[440px]">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <FigIcon src="/figma/icons/identity-card-sm.svg" size={24} />
              <p className="text-brand-ink">
                <span className="text-xs">Tourism ID: </span>
                <span className="text-sm font-medium">GT 467754456</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FigIcon src="/figma/icons/wallet.svg" size={24} />
              <p className="text-brand-ink">
                <span className="text-xs">Wallet Balance: </span>
                <span className="text-xs">$0:00</span>
              </p>
            </div>
          </div>
          <Button
            as="link"
            href="/dashboard/wallet"
            variant="primary"
            size="sm"
            className="self-stretch sm:self-auto"
          >
            Fund wallet
          </Button>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 md:max-w-[640px]">
          {ACTIONS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block h-[223px] overflow-hidden rounded-[10px] shadow-card transition hover:-translate-y-0.5"
            >
              <Image
                src={card.imageSrc}
                alt=""
                fill
                sizes="(min-width: 640px) 270px, 100vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
              <div
                className={`absolute inset-x-0 bottom-0 flex h-[67px] items-center justify-center ${card.band}`}
              >
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs font-medium text-white">{card.title}</p>
                  <span className="grid size-10 place-items-center rounded-full bg-white">
                    <FigIcon src={card.iconSrc} size={24} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
