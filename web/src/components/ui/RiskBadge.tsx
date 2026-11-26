import { cn } from "@/lib/cn";
import type { RiskLevel } from "@/lib/types";

const styles: Record<RiskLevel, string> = {
  Low: "border-positive/30 bg-positive/10 text-positive",
  Medium: "border-gold/30 bg-gold/10 text-champagne",
  High: "border-negative/30 bg-negative/10 text-negative",
};

export function RiskBadge({
  level,
  score,
  className,
}: {
  level: RiskLevel;
  score?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider",
        styles[level],
        className
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {level} Risk
      {typeof score === "number" && (
        <span className="tabular font-semibold text-primary ml-0.5">{score}</span>
      )}
    </span>
  );
}
