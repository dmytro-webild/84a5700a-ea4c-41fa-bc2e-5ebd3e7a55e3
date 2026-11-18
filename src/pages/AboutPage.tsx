import BlurReveal from "@/components/kit/BlurReveal";
import HeroFloatingCard from "@/components/sections/hero/HeroFloatingCard";
import FounderStory from "@/components/sections/about/FounderStory";
import ProofStrip from "@/components/sections/proof/ProofStrip";
import TestimonialRingQuotes from "@/components/sections/testimonial/TestimonialRingQuotes";
import StartNowCTA from "@/components/sections/cta/StartNowCTA";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Target, Zap, Heart } from "lucide-react";

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Portal Transparency",
    description: "You maintain full ownership of your CAC portal account, login credentials, and official government receipts. No middleman holdouts.",
  },
  {
    icon: Target,
    title: "Empowerment Over Dependency",
    description: "We give you the exact knowledge and video walkthroughs to register independently now and handle post-registration compliance for life.",
  },
  {
    icon: Zap,
    title: "Speed & Query Prevention",
    description: "Our structured templates eliminate common name rejection reasons and portal upload mistakes so your registration clears without delay.",
  },
  {
    icon: Heart,
    title: "Human Support When Needed",
    description: "The trusted middle path: cheaper than an agent, clearer than YouTube, with a real human expert on call whenever you need assistance.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <div id="about-hero" data-webild-section="HeroFloatingCard" data-section="hero">
        <HeroFloatingCard
          shape="twist"
          title="The Trusted Middle Path"
          titleMuted="for Nigerian Founders"
          description="Register It Yourself (RIY) was founded by Dr. Michelle after registering her own company on CAC in 3 minutes without paying expensive agent fees. We exist to make official business registration clear, affordable, and 100% transparent."
          primaryButton={{
            text: "Read Founder's Story",
            href: "#founder-story",
          }}
          secondaryButton={{
            text: "Explore Our Plans",
            href: "/#pricing",
          }}
        />
      </div>

      {/* 2. Proof Strip */}
      <ProofStrip
        approvedTime="Name approved in 3 minutes"
        lawyerText="Registered without a lawyer"
        initialCount={1420}
        targetCount={1850}
      />

      {/* 3. Founder Story Section */}
      <FounderStory />

      {/* 4. Brand Positioning & Core Values */}
      <section className="py-[var(--section-space)] bg-secondary/30 border-y border-border/80">
        <div className="mx-auto w-[var(--container)]">
          <div className="max-w-3xl">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Our Mission & Philosophy
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              Built on Transparency, Value & Direct Empowerment
            </BlurReveal>
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mt-3">
              {siteConfig.positioning}
            </BlurReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <BlurReveal key={val.title} delay={0.05 + i * 0.04}>
                  <div className="kit-card p-6 border border-border flex flex-col gap-4 h-full">
                    <div className="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-[length:var(--text-h3)] font-semibold">{val.title}</h3>
                    <p className="text-[length:var(--text-small)] text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <TestimonialRingQuotes />

      {/* 6. CTA */}
      <StartNowCTA />
    </>
  );
}
