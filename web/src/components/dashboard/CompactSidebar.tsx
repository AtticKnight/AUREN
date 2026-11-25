"use client";

import {
  Activity,
  ArrowUpRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Grid3X3,
  LayoutDashboard,
  type LucideIcon,
  PieChart,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DataStatus, DashboardTab } from "@/components/dashboard/Workstation";

interface CompactSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  portfolioLabel: string;
  dataStatus: DataStatus;
}

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: LucideIcon;
}

// Section codes (01, 02, ...) are derived from order, so adding or
// reordering items never requires renumbering by hand.
const NAV_ITEMS: readonly NavItem[] = [
  { id: "overview", label: "Risk Overview", icon: LayoutDashboard },
  { id: "exposure", label: "Exposure & Factor", icon: PieChart },
  { id: "correlation", label: "Correlation Matrix", icon: Grid3X3 },
  { id: "stress", label: "Stress & Sandbox", icon: Activity },
  { id: "report", label: "AI Verification", icon: FileText },
  { id: "slides", label: "Slides", icon: Presentation },
  { id: "docs", label: "Proof & API Docs", icon: ShieldCheck },
];

const STATUS_COPY: Record<DataStatus, string> = {
  reference: "Reference data",
  live: "Live analysis",
  stale: "Previous data",
};

const STATUS_DOT: Record<DataStatus, string> = {
  live: "bg-positive shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  reference: "bg-muted",
  stale: "bg-negative",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60";

export function CompactSidebar({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  portfolioLabel,
  dataStatus,
}: CompactSidebarProps) {
  // Below xl the sidebar is always icon-only. At xl it follows `collapsed`.
  // One class drives every "expanded-only" element so the logic lives in one place.
  const expandedOnly = collapsed ? "hidden" : "hidden xl:block";
  const compactOnly = collapsed ? "block" : "block xl:hidden";

  return (
    <aside
      aria-label="Workstation sidebar"
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-secondary/95 backdrop-blur-sm lg:flex",
        collapsed ? "w-[72px]" : "w-[72px] xl:w-[244px]"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center justify-center border-b border-line px-3",
          !collapsed && "xl:justify-between xl:px-5"
        )}
      >
        <span className={cn("inline-flex min-w-0 items-center gap-2.5", collapsed && "xl:hidden")}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold" fill="none">
            <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M12 6.4 17.6 12 12 17.6 6.4 12 12 6.4Z" fill="currentColor" />
            <path d="M12 9.2 14.8 12 12 14.8 9.2 12 12 9.2Z" className="fill-obsidian" />
          </svg>
          <span
            className={cn(
              "min-w-0 font-display text-lg uppercase leading-none tracking-[0.3em] text-primary",
              expandedOnly
            )}
          >
            Auren
          </span>
        </span>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className={cn(
            "hidden border border-line p-1.5 text-muted transition-colors hover:border-gold/50 hover:text-highlight xl:inline-flex",
            focusRing
          )}
        >
          {collapsed ? (
            <ChevronsRight className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ChevronsLeft className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Workstation sections"
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-2 xl:p-3"
      >
        <p className={cn("auren-eyebrow mb-3 truncate px-2", expandedOnly)}>Sections</p>
        <div aria-hidden="true" className={cn("mx-auto mb-3 h-px w-6 bg-line", compactOnly)} />

        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const code = String(index + 1).padStart(2, "0");

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className={cn(
                    "group relative flex w-full items-center justify-center gap-3 border border-transparent px-2 py-3 text-left transition-colors",
                    !collapsed && "xl:justify-start xl:px-3",
                    focusRing,
                    active
                      ? "border-gold/25 bg-gold/[0.08] text-highlight"
                      : "text-muted hover:border-line hover:bg-elevated/60 hover:text-primary"
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-gold" : "text-faint group-hover:text-champagne"
                    )}
                  />
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-[0.7rem] uppercase tracking-[0.12em]",
                      expandedOnly
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-[0.58rem] tracking-[0.12em]",
                      expandedOnly,
                      active ? "text-gold" : "text-faint"
                    )}
                  >
                    {code}
                  </span>
                  {active && (
                    <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[2px] bg-gold" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-line p-2 xl:p-4">
        {/* Full context box (expanded, xl+) */}
        <div className={cn("mb-3 border border-line bg-obsidian/70 px-3 py-3", expandedOnly)}>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
            Portfolio context
          </p>
          <p className="mt-1.5 truncate text-xs text-primary" title={portfolioLabel}>
            {portfolioLabel}
          </p>
          <p
            role="status"
            className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-champagne"
          >
            {STATUS_COPY[dataStatus]}
          </p>
        </div>

        {/* Compact status dot (collapsed, or below xl) */}
        <div
          className={cn("mb-3 justify-center py-1", collapsed ? "flex" : "flex xl:hidden")}
          title={`Status: ${STATUS_COPY[dataStatus]}`}
        >
          <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", STATUS_DOT[dataStatus])} />
          <span className="sr-only">{STATUS_COPY[dataStatus]}</span>
        </div>

        <Link
          href="/"
          title="Return to site"
          aria-label="Return to site"
          className={cn(
            "flex items-center justify-center gap-2 border border-line px-2 py-2.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted transition-colors hover:border-gold/50 hover:text-highlight",
            !collapsed && "xl:justify-start xl:px-3",
            focusRing
          )}
        >
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-gold" />
          <span className={expandedOnly}>Return to site</span>
        </Link>
      </div>
    </aside>
  );
}
