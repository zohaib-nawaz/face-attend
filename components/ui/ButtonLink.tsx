import Link from "next/link";
import type { PropsWithChildren } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";

export type ButtonLinkProps = PropsWithChildren<
  Readonly<{
    href: string;
    variant?: ButtonLinkVariant;
    size?: "sm" | "md";
    className?: string;
  }>
>;

const variantClassNameByVariant: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-400",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const sizeClassNameBySize: Record<NonNullable<ButtonLinkProps["size"]>, string> =
  {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  };

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
        variantClassNameByVariant[variant],
        sizeClassNameBySize[size],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

