import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import PageSubHeader from "./PageSubHeader";
import { cn } from "@/lib/utils";

type Props = {
  /** Optional title that renders the white sub-header bar. */
  subHeader?: {
    title: string;
    backHref?: string;
    showBack?: boolean;
    floatingBack?: boolean;
  };
  hideOwnerCta?: boolean;
  /** Background tint variant. Defaults to `subtle` (#f9f9fc). */
  bg?: "subtle" | "success";
  children: ReactNode;
  className?: string;
};

/**
 * Standard chrome for non-dashboard pages: green AppHeader on top,
 * optional white PageSubHeader, then a flexible main area. Use this
 * for every page in the auth, registration and confirmation flows.
 */
export default function AppShell({
  subHeader,
  hideOwnerCta,
  bg = "subtle",
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col",
        bg === "subtle" && "bg-surface-subtle",
        bg === "success" && "bg-brand-green-softer"
      )}
    >
      <AppHeader hideOwnerCta={hideOwnerCta} />
      {subHeader && (
        <PageSubHeader
          title={subHeader.title}
          backHref={subHeader.backHref}
          showBack={subHeader.showBack}
          floatingBack={subHeader.floatingBack}
        />
      )}
      <main className={cn("flex-1", className)}>{children}</main>
    </div>
  );
}
