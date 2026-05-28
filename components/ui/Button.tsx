import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = PropsWithChildren<
  Readonly<
    {
      variant?: ButtonVariant;
      size?: "sm" | "md";
      leftIcon?: React.ReactNode;
    } & ButtonHTMLAttributes<HTMLButtonElement>
  >
>;

const variantClassNameByVariant: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-900/60",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 disabled:bg-white/70",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 disabled:text-slate-400",
};

const sizeClassNameBySize: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  leftIcon,
  className,
  children,
  type,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
        "disabled:cursor-not-allowed",
        variantClassNameByVariant[variant],
        sizeClassNameBySize[size],
        className ?? "",
      ].join(" ")}
      {...buttonProps}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

