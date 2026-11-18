import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { CardReveal } from "@/components/kit/CardShine";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type Plan = {
  title: string;
  badge?: string;
  price?: string;
  period?: string;
  deposit?: string;
  description?: string;
  features?: string[];
  button?: { text: string; href: string };
  popular?: boolean;
};

type PricingRingPlansProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  description?: string;
  items?: Plan[];
  upgradeNote?: string;
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Plan[] = [
  {
    title: "Do it yourself",
    price: "₦10,000",
    period: "one-time payment",
    description: "The complete Register It Yourself ebook guide for self-starter founders.",
    features: [
      "Full Register It Yourself Ebook (Instant Download)",
      "Screen-by-screen CAC walkthrough (Business Names & Limited Companies)",
      "3-minute name search strategy & query-proofing tips",
      "Fast query resolution guide (24h turnaround)",
      "Post-registration roadmap (TIN, Bank Account, Annual Returns)",
      "Fillable document templates & checklists",
    ],
    button: { text: "Get the Guide — ₦10,000", href: "#start-now" },
  },
  {
    title: "Do it with us",
    badge: "Most Popular",
    popular: true,
    price: "₦25,000",
    period: "one-time payment",
    deposit: "Book today with a ₦7,500 deposit",
    description: "Full ebook plus live 1-on-1 walkthrough session & custom letterheads.",
    features: [
      "Everything included in the full DIY Ebook",
      "Live 1-on-1 Zoom / Google Meet session with a guide",
      "Screen-by-screen CAC submission review from start to finish",
      "2 Custom Business Letterheads (Print PDF + Editable Canva/Word)",
      "Delivered 2–3 working days after CAC approval",
      "100% CAC Approval Guarantee",
    ],
    button: { text: "Book Do It With Us — ₦25,000", href: "#start-now" },
  },
];

const PricingRingPlans = ({
  tag = "Pricing",
  title = "Choose your path",
  titleDim = "zero hidden agent fees",
  description = "Select the level of support you need to get your business officially registered with CAC this week.",
  items = defaultItems,
  upgradeNote = "Already bought the ebook? Upgrade to Do It With Us for just ₦15,000. We deduct what you already paid.",
  ariaLabel,
  className,
}: PricingRingPlansProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  return (
    <section id="pricing" aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
          <div className="flex flex-col gap-4">
            {tag && (
              <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
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

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const delay = (index % 4) * 0.1;
            return (
              <DepthTiltCard key={index} maxTilt={6} className="h-full">
                <CardReveal index={index % 4} className="h-full">
                  <motion.article
                    initial={reduce ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    className={cn(
                      "kit-card relative isolate flex h-full flex-col gap-6 overflow-hidden p-6 lg:p-8 border transition-all",
                      item.popular
                        ? "border-primary bg-card shadow-2xl ring-1 ring-primary/40"
                        : "border-border/80 bg-card/60"
                    )}
                  >
                    <CardShine />

                    {item.badge && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground font-mono text-xs font-semibold shadow-md">
                        <Sparkles className="size-3" /> {item.badge}
                      </div>
                    )}

                    <h3 className="text-[length:var(--text-h2)] font-bold [overflow-wrap:anywhere]">
                      {item.title}
                    </h3>

                    {item.price && (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-x-3">
                          <motion.p
                            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                            transition={{ duration: kit.slow, ease: kit.ease, delay: delay + 0.1 }}
                            className="whitespace-nowrap text-[length:var(--text-display)] font-extrabold leading-none tracking-[-0.03em] text-primary"
                          >
                            {item.price}
                          </motion.p>
                          {item.period && (
                            <span className="text-[length:var(--text-small)] text-muted-foreground font-mono">
                              {item.period}
                            </span>
                          )}
                        </div>
                        {item.deposit && (
                          <p className="text-[length:var(--text-small)] font-mono text-amber-400 font-semibold mt-1">
                            {item.deposit}
                          </p>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">
                        {item.description}
                      </p>
                    )}

                    {item.features && item.features.length > 0 && (
                      <ul className="flex flex-col border-t border-border/80 pt-4 gap-3 my-2">
                        {item.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                            transition={{ duration: kit.base, ease: kit.ease, delay: delay * 0.5 + 0.1 + featureIndex * 0.04 }}
                            className="flex items-start gap-3"
                          >
                            <div className="size-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="size-3.5" />
                            </div>
                            <p className="text-[length:var(--text-small)] leading-[1.45] text-foreground/90">
                              {feature}
                            </p>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {item.button && (
                      <div className="mt-auto pt-4">
                        <a
                          href={item.button.href}
                          className={cn(
                            "w-full justify-center flex items-center gap-2",
                            item.popular ? "btn-primary" : "btn-secondary"
                          )}
                        >
                          <span>{item.button.text}</span>
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                    )}
                  </motion.article>
                </CardReveal>
              </DepthTiltCard>
            );
          })}
        </div>

        {/* Upgrade Note Banner */}
        {upgradeNote && (
          <BlurReveal delay={0.3} className="mt-10 max-w-4xl mx-auto">
            <div className="p-5 lg:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4 text-amber-300">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Zap className="size-5" />
              </div>
              <p className="text-[length:var(--text-body)] font-medium leading-relaxed">
                {upgradeNote}
              </p>
            </div>
          </BlurReveal>
        )}
      </div>
    </section>
  );
};

export default PricingRingPlans;
