import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "terminal";

const variants: Record<Variant, string> = {
  primary:
    "border border-gold/80 bg-gold text-[#0B0D0F] font-semibold hover:bg-gold-dark hover:border-gold-dark",
  secondary:
    "border border-line bg-secondary text-primary hover:border-gold/50 hover:bg-elevated",
  ghost:
    "border border-transparent text-muted hover:border-line hover:text-primary hover:bg-secondary/60",
  terminal:
    "border border-line bg-[#14171B] text-champagne hover:border-gold/60 hover:bg-elevated",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-150",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
