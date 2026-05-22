import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Lunar | Financial Dashboard",
  description:
    "Green Lunar Nigeria Limited — hotel financial management portal.",
};

export default function GreenLunarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
