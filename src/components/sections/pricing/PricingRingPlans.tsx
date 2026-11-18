import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { CardReveal } from "@/components/kit/CardShine";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Plan = { title: string; price?: string; period?: string; description?: string; features?: string[]; button?: { text: string; href: string } };

type PricingRingPlansProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  description?: string;
  items?: Plan[];
  ariaLabel?: string;
  className?: string;
};

const PricingRingPlans = ({
  tag = "Pricing",
  title = "Simple plans",
  titleDim = "cancel any time",
  description = "Every plan includes the app, free transfers and Apple Pay.",
  items = [
    { title: "Standard", price: "€0", period: "per month", description: "Everything you need to spend and save.", features: ["Virtual card", "Free transfers in euro", "€200 free cash abroad", "Two saving spaces"], button: { text: "Start free", href: "#" } },
    { title: "Plus", price: "€4.99", period: "per month", description: "A metal card and more room abroad.", features: ["Metal card", "€400 free cash abroad", "1.5% on savings", "Priority chat"], button: { text: "Choose Plus", href: "#" } },
    { title: "Onyx", price: "€12.99", period: "per month", description: "For people who travel often.", features: ["Black metal card", "Travel insurance", "Four lounge passes a year", "2.5% on savings"], button: { text: "Choose Onyx", href: "#" } },
  ],
  ariaLabel,
  className,
}: PricingRingPlansProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
          <div className="flex flex-col gap-4">
            {tag && (
              <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground">
                {tag}
              </BlurReveal>
            )}
            <BlurReveal as="h2" delay={0.05} className="max-w-[18ch] text-balance text-[length:var(--text-h1)]">
              <div>{title}</div>
              {titleDim && <div className="text-foreground/50">{titleDim}</div>}
            </BlurReveal>
          </div>
          {description && (
            <BlurReveal as="p" delay={0.15} className="max-w-[30rem] text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">
              {description}
            </BlurReveal>
          )}
        </div>
        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] lg:gap-6">
          {items.map((item, index) => {
            const delay = (index % 4) * 0.1;
            return (
              <DepthTiltCard key={index} maxTilt={6} className="h-full">
              <CardReveal index={index % 4} className="h-full">
              <motion.article
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                className="kit-card relative isolate flex h-full flex-col gap-6 overflow-hidden p-6 lg:p-8"
              >
                <CardShine />
                <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute -right-[22%] -top-[30%] -z-10 aspect-square w-[70%] -rotate-90">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="0.6"
                    vectorEffect="non-scaling-stroke"
                    variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                    transition={{ duration: kit.slow, ease: kit.ease, delay }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="var(--foreground)"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                    transition={{ duration: kit.slow * 2, ease: kit.ease, delay: delay + 0.2 }}
                  />
                </svg>
                <h3 className="text-[length:var(--text-h3)] [overflow-wrap:anywhere]">{item.title}</h3>
                {item.price && (
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <div className="-mb-[0.15em] overflow-hidden pb-[0.15em]">
                      <motion.p
                        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                        transition={{ duration: kit.slow, ease: kit.ease, delay: delay + 0.1 }}
                        className="whitespace-nowrap text-[length:var(--text-h2)] font-light leading-none tracking-[-0.02em] tabular-nums"
                      >
                        {item.price}
                      </motion.p>
                    </div>
                    {item.period && <p className="whitespace-nowrap text-[length:var(--text-small)] text-muted-foreground">{item.period}</p>}
                  </div>
                )}
                {item.description && <p className="max-w-[22rem] text-balance text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">{item.description}</p>}
                {item.features && item.features.length > 0 && (
                  <ul className="flex flex-col border-t border-border">
                    {item.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: kit.base, ease: kit.ease, delay: delay * 0.5 + 0.1 + featureIndex * 0.04 }}
                        className="flex items-center gap-3 border-b border-border py-3"
                      >
                        <motion.div
                          aria-hidden="true"
                          variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                          transition={{ duration: kit.base, ease: kit.ease, delay: delay * 0.5 + 0.25 + featureIndex * 0.06 }}
                          className="size-2 shrink-0 rounded-full border border-foreground/70"
                        />
                        <p className="min-w-0 text-[length:var(--text-small)] leading-[1.45]">{feature}</p>
                      </motion.li>
                    ))}
                  </ul>
                )}
                {item.button && <DotArrowButton text={item.button.text} href={item.button.href} className="mt-auto w-full justify-between" />}
              </motion.article>
              </CardReveal>
              </DepthTiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingRingPlans;
