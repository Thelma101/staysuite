import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "blue" | "navy" | "white" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-dark active:bg-brand-green-darker disabled:bg-brand-green/60",
  blue: "bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-brand-blue/60",
  navy: "bg-brand-navy text-white hover:bg-brand-navy-dark disabled:bg-brand-navy/60",
  white:
    "bg-white text-brand-ink hover:bg-white/95 border border-transparent disabled:opacity-60",
  ghost: "bg-transparent text-brand-ink hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 py-4 text-base",
  sm: "h-10 px-4 py-2 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  leftIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = CommonProps & {
  as: "link";
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
};

type Props = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center gap-[14px] rounded-[6px] font-inter font-semibold tracking-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green disabled:cursor-not-allowed";

/**
 * Brand primary button used across all pages. Renders either a
 * `<button>` (for forms / actions) or a Next.js `<Link>` (for
 * navigation), keeping the same visual contract.
 */
export default function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    leftIcon,
    children,
    fullWidth,
  } = props;

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        target={props.target}
        rel={props.rel}
        className={classes}
      >
        {leftIcon}
        <span className="whitespace-nowrap">{children}</span>
      </Link>
    );
  }

  // Strip "shared" props before forwarding HTML attributes.
  const {
    as: _as,
    variant: _v,
    size: _s,
    className: _c,
    leftIcon: _li,
    fullWidth: _fw,
    children: _ch,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button type="button" className={classes} {...rest}>
      {leftIcon}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}
