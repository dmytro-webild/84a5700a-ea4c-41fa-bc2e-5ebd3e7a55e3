import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { CardReveal, HaloRings } from "@/components/kit/CardShine";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type TrustPillar = {
  title: string;
  description: string;
  badge?: string;
  icon?: "shield" | "support" | "savings" | "speed";
};

export type TrustRingGuaranteeProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  description?: string;
  guaranteeTitle?: string;
  guaranteeBadge?: string;
  guaranteeDescription?: string;
  guaranteePoints?: string[];
  pillars?: TrustPillar[];
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  stats?: Array<{ value: string; label: string }>;
  ariaLabel?: string;
  className?: string;
};

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-accent">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconSupport = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-accent">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const IconSavings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-accent">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const IconSpeed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-accent">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const renderPillarIcon = (type?: TrustPillar["icon"]) => {
  switch (type) {
    case "support":
      return <IconSupport />;
    case "savings":
      return <IconSavings />;
    case "speed":
      return <IconSpeed />;
    case "shield":
    default:
      return <IconShield />;
  }
};

export default function TrustRingGuarantee({
  tag = "Satisfaction Guarantee",
  title = "Register with 100% confidence.",
  titleDim = "We back your DIY filing.",
  description = "Filing your CAC business registration yourself shouldn't feel risky. With our approval guarantee and direct support commitment, you get the speed of DIY with total peace of mind.",
  guaranteeTitle = "The RIY Risk-Free Guarantee & Support Commitment",
  guaranteeBadge = "100% Money-Back & Filing Guarantee",
  guaranteeDescription = "If your CAC business registration application is queried or rejected due to guidance error in our course, our team will personally assist you until approval — or provide a full 100% refund of your RIY purchase.",
  guaranteePoints = [
    "Pre-submission review to spot portal errors before you pay CAC fees",
    "Direct WhatsApp & email access to experienced Nigerian registration guides",
    "Full refund assurance if our instructions fail to guide your approval",
    "Continuous course updates matching official CAC portal requirements"
  ],
  pillars = [
    {
      icon: "shield",
      title: "100% CAC Approval Guarantee",
      description: "Follow our verified step-by-step PDF guide. If CAC raises a query based on our guide, we help fix it for free or give you a full refund."
    },
    {
      icon: "support",
      title: "Human Support Commitment",
      description: "You're never stranded. Our team of Nigerian business registration guides is ready on WhatsApp and email to review your details."
    },
    {
      icon: "savings",
      title: "Zero Hidden Agent Fees",
      description: "Save ₦80,000+ compared to traditional registration agents. Pay only for clear guidance and official portal fees directly."
    },
    {
      icon: "speed",
      title: "3-Minute Fast Approval",
      description: "Learn the exact method founder Michelle used to get business name approval within 3 minutes of payment on the official portal."
    }
  ],
  primaryButton = {
    text: "Get the Guide Risk-Free",
    href: "#pricing"
  },
  secondaryButton = {
    text: "Have Questions? Contact Us",
    href: "#start-now"
  },
  stats = [
    { value: "100%", label: "Approval Guarantee" },
    { value: "₦80k+", label: "Avg. Agent Fee Saved" },
    { value: "3 Mins", label: "Fastest Approval Time" },
    { value: "100%", label: "Dedicated Human Support" }
  ],
  ariaLabel,
  className
}: TrustRingGuaranteeProps) {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn("relative isolate overflow-hidden py-[var(--section-space)] text-foreground", className)}
    >
      {/* Background Ambient Halo Rings */}
      <div aria-hidden="true" className="halo-fade pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[min(120vw,68rem)] -translate-x-1/2 -translate-y-1/2">
          <HaloRings
            rings={[
              { inset: "0" },
              { inset: "15%", className: "text-border opacity-70" },
              { inset: "30%", className: "text-border opacity-40" }
            ]}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="mx-auto w-[var(--container)]">
        {/* Section Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
          <div className="flex flex-col gap-4">
            {tag && (
              <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground font-medium">
                {tag}
              </BlurReveal>
            )}
            <BlurReveal as="h2" delay={0.05} className="max-w-[22ch] text-balance text-[length:var(--text-h1)]">
              <div>{title}</div>
              {titleDim && <div className="text-foreground/50">{titleDim}</div>}
            </BlurReveal>
          </div>
          {description && (
            <BlurReveal as="p" delay={0.15} className="max-w-[32rem] text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">
              {description}
            </BlurReveal>
          )}
        </div>

        {/* Featured Guarantee Hero Box */}
        <CardReveal index={0} className="mt-[clamp(2.5rem,4vw,4rem)]">
          <div className="kit-card relative isolate overflow-hidden p-6 sm:p-8 lg:p-12 border border-border/80">
            <CardShine />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Main Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {guaranteeBadge && (
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-accent/15 px-3.5 py-1.5 text-[length:var(--text-small)] font-medium text-accent border border-accent/20">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M8 1v14M1 8h14" strokeLinecap="round" />
                    </svg>
                    <span>{guaranteeBadge}</span>
                  </div>
                )}

                <h3 className="text-[length:var(--text-h2)] leading-[1.1] text-balance">
                  {guaranteeTitle}
                </h3>

                {guaranteeDescription && (
                  <p className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed">
                    {guaranteeDescription}
                  </p>
                )}

                {guaranteePoints && guaranteePoints.length > 0 && (
                  <ul className="flex flex-col gap-3 mt-2" role="list">
                    {guaranteePoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-[length:var(--text-body)] text-foreground">
                        <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                            <path d="M2.5 6l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {primaryButton && (
                    <DotArrowButton
                      text={primaryButton.text}
                      href={primaryButton.href}
                      variant="primary"
                    />
                  )}
                  {secondaryButton && (
                    <DotArrowButton
                      text={secondaryButton.text}
                      href={secondaryButton.href}
                      variant="secondary"
                    />
                  )}
                </div>
              </div>

              {/* Visual Seal / Trust Card Panel */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <motion.div
                  initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: kit.slow, ease: kit.ease }}
                  className="relative flex flex-col items-center justify-center text-center p-8 rounded-[var(--radius-card)] bg-foreground/5 border border-foreground/10 w-full"
                >
                  <div className="relative mb-4 flex size-20 items-center justify-center rounded-full bg-accent/20 text-accent border border-accent/40 shadow-inner">
                    <IconShield />
                  </div>
                  <h4 className="text-[length:var(--text-h3)] font-semibold mb-2">
                    100% Satisfaction
                  </h4>
                  <p className="text-[length:var(--text-small)] text-muted-foreground max-w-[20rem]">
                    Register your CAC business name with complete security. Clear steps, zero surprise fees, and guaranteed guidance.
                  </p>

                  <div className="mt-6 pt-6 border-t border-border/60 w-full grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-[length:var(--text-h3)] font-bold text-foreground">₦0</p>
                      <p className="text-[length:var(--text-small)] text-muted-foreground">Hidden Fees</p>
                    </div>
                    <div>
                      <p className="text-[length:var(--text-h3)] font-bold text-foreground">100%</p>
                      <p className="text-[length:var(--text-small)] text-muted-foreground">DIY Protection</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </CardReveal>

        {/* 4 Trust Pillars Cards Grid */}
        {pillars && pillars.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {pillars.map((pillar, index) => (
              <DepthTiltCard key={index} maxTilt={5} className="h-full">
                <CardReveal index={index % 4} className="h-full">
                  <div className="kit-card relative flex h-full flex-col justify-between gap-6 p-6 lg:p-8">
                    <CardShine />
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex size-12 items-center justify-center rounded-full bg-accent/15 border border-accent/20">
                        {renderPillarIcon(pillar.icon)}
                      </div>

                      <h3 className="text-[length:var(--text-h3)] font-semibold leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 text-[length:var(--text-small)] text-accent font-medium">
                      <span>Verified Commitment</span>
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                        <path d="M2.5 6l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </CardReveal>
              </DepthTiltCard>
            ))}
          </div>
        )}

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-[var(--radius-card)] bg-card border border-border/60"
              >
                <p className="text-[length:var(--text-h1)] font-bold text-foreground leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[length:var(--text-small)] text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
