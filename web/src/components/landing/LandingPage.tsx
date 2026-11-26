"use client";

import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { FinalCta } from "@/components/landing/FinalCta";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian text-primary">
      <LandingNav />
      <main id="main">
        <Hero />
        <CapabilitiesSection />
        <TechnologySection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

export default LandingPage;
