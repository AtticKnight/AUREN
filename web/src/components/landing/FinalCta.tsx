import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-b border-line/40 bg-obsidian py-28 sm:py-40"
    >
      <div
        aria-hidden="true"
        className="auren-grid auren-grid-fade pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[130px]"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="auren-eyebrow">Begin</p>
        <div aria-hidden="true" className="auren-hairline mx-auto mt-7 w-16" />
        <h2
          id="final-cta-heading"
          className="auren-display mt-8 text-[clamp(3rem,6vw,5.5rem)] text-primary"
        >
          Clarity in complexity.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-[1.8] text-muted sm:text-lg">
          Experience mathematical transparency and quantitative risk analytics built for modern institutional portfolios.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/dashboard" className="group">
            Launch Workstation
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </ButtonLink>
          <ButtonLink href="/dashboard?tab=docs" variant="secondary">
            View API Docs &amp; Proof
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
