"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, MonitorPlay } from "lucide-react";
import type { RiskAnalysis } from "@/lib/types";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";

interface SlidesViewProps {
  data: RiskAnalysis;
}

export function SlidesView({ data }: SlidesViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Executive Summary",
      subtitle: "Institutional Portfolio Risk Overview",
      content: (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-line/60 bg-elevated/40 p-5">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
              Composite Risk Score
            </span>
            <div className="mt-3 font-display text-5xl text-champagne">
              {Math.round(data.score)}
              <span className="text-xl text-faint">/100</span>
            </div>
            <p className="mt-2 text-xs text-muted">Tier: {data.tier}</p>
          </div>
          <div className="border border-line/60 bg-elevated/40 p-5">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
              Annualized Volatility
            </span>
            <div className="mt-3 font-display text-5xl text-primary">
              {(data.volatility * 100).toFixed(1)}%
            </div>
            <p className="mt-2 text-xs text-muted">Rolling historical standard deviation</p>
          </div>
          <div className="border border-line/60 bg-elevated/40 p-5">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
              Max Drawdown
            </span>
            <div className="mt-3 font-display text-5xl text-negative">
              {(data.max_drawdown * 100).toFixed(1)}%
            </div>
            <p className="mt-2 text-xs text-muted">Peak-to-trough decline</p>
          </div>
        </div>
      ),
    },
    {
      title: "Asset Allocation & Exposure",
      subtitle: "Portfolio Distribution by Normalized Weight",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(data.normalized_weights || {}).map(([symbol, weight]) => (
              <div key={symbol} className="border border-line/60 bg-elevated/30 p-4">
                <span className="font-mono text-sm font-semibold text-champagne">{symbol}</span>
                <p className="mt-2 font-display text-2xl text-primary">
                  {(weight * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
          <div className="border border-line/50 bg-secondary/50 p-4 text-xs text-muted">
            Effective Asset Count (Neff):{" "}
            <span className="font-mono text-champagne">
              {data.effective_assets ? data.effective_assets.toFixed(1) : "N/A"}
            </span>{" "}
            · HHI Concentration:{" "}
            <span className="font-mono text-champagne">
              {data.hhi ? (data.hhi * 10000).toFixed(0) : "N/A"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Stress Testing Scenarios",
      subtitle: "Hypothetical Shocks & Capital Preservation",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(data.stress_tests || {}).map(([scenario, impact]) => (
            <div key={scenario} className="flex items-center justify-between border border-line/60 bg-elevated/30 p-4">
              <span className="text-sm text-primary">{scenario}</span>
              <span
                className={`font-mono text-base font-medium ${
                  impact <= 0 ? "text-negative" : "text-positive"
                }`}
              >
                {impact > 0 ? "+" : ""}
                {(impact * 100).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const prev = () => setCurrentSlide((i) => (i > 0 ? i - 1 : slides.length - 1));
  const next = () => setCurrentSlide((i) => (i < slides.length - 1 ? i + 1 : 0));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="auren-eyebrow">Executive Presentation</span>
          <h2 className="mt-2 font-display text-3xl text-primary">Portfolio Deck</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => window.print()} className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Export / Print
          </Button>
        </div>
      </div>

      <Panel className="relative min-h-[460px] overflow-hidden p-6 sm:p-10">
        <div className="flex items-center justify-between border-b border-line/60 pb-6">
          <div>
            <span className="font-mono text-[0.62rem] uppercase tracking-widest text-gold">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <h3 className="mt-2 font-display text-2xl text-primary sm:text-3xl">
              {slides[currentSlide].title}
            </h3>
            <p className="mt-1 text-xs text-muted">{slides[currentSlide].subtitle}</p>
          </div>
          <MonitorPlay className="hidden h-6 w-6 text-gold/40 sm:block" />
        </div>

        <div className="py-8">{slides[currentSlide].content}</div>

        <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-6">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all ${
                  idx === currentSlide ? "w-8 bg-gold" : "w-3 bg-line hover:bg-gold/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="border border-line p-2 text-muted transition-colors hover:border-gold/50 hover:text-highlight"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="border border-line p-2 text-muted transition-colors hover:border-gold/50 hover:text-highlight"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
