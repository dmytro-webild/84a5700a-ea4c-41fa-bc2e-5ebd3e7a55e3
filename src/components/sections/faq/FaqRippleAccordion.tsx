import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { CardReveal, HaloRings } from "@/components/kit/CardShine";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Question = { title: string; description: string };

type FaqRippleAccordionProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  description?: string;
  primaryButton?: { text: string; href: string };
  items?: Question[];
  ariaLabel?: string;
  className?: string;
};

const FaqRippleAccordion = ({
  tag = "FAQ",
  title = "Questions",
  titleDim = "answered plainly",
  description = "Still stuck? Our team answers in the app, day and night.",
  primaryButton = { text: "Chat with us", href: "#" },
  items = [
    { title: "Is my money safe?", description: "Your money is held at licensed partner banks and protected up to 100,000 euros by the deposit guarantee scheme." },
    { title: "How long does the metal card take?", description: "Most cards arrive within three to five working days. Your virtual card works the moment you sign up." },
    { title: "Are there fees abroad?", description: "You pay the real exchange rate with no markup. Cash withdrawals are free up to your plan's monthly limit." },
    { title: "Can I use it with Apple Pay and Google Pay?", description: "Yes. Add the card to your wallet from the app in two taps, before the physical card arrives." },
    { title: "How do I close my account?", description: "Move your balance out and tap Close account in settings. There is no fee and no phone call." },
  ],
  ariaLabel,
  className,
}: FaqRippleAccordionProps) => {
  const [open, setOpen] = useState<number | null>(0);
  const [pulse, setPulse] = useState(0);
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  const toggle = (index: number) => {
    setOpen((current) => (current === index ? null : index));
    setPulse((count) => count + 1);
  };

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        <div className="flex flex-col items-start gap-4">
          {tag && (
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground">
              {tag}
            </BlurReveal>
          )}
          <BlurReveal as="h2" delay={0.05} className="max-w-[18ch] text-balance text-[length:var(--text-h1)]">
            <div>{title}</div>
            {titleDim && <div className="text-foreground/50">{titleDim}</div>}
          </BlurReveal>
          {description && (
            <BlurReveal as="p" delay={0.15} className="max-w-[30rem] text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">
              {description}
            </BlurReveal>
          )}
          {primaryButton && (
            <BlurReveal delay={0.2} className="pt-2">
              <DotArrowButton text={primaryButton.text} href={primaryButton.href} />
            </BlurReveal>
          )}
        </div>
        <ul className="flex w-full flex-col gap-4">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index}>
              <CardReveal index={Math.min(index, 5) * 0.6} className="kit-card relative overflow-hidden">
                <CardShine />
                <h3 className="text-[length:var(--text-body-lg)] leading-[1.3]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-5 p-6 text-left lg:px-8"
                >
                  <div className="min-w-0 text-balance [overflow-wrap:anywhere]">{item.title}</div>
                  <div className="relative grid size-9 shrink-0 place-items-center">
                    <HaloRings breathe={false} delay={(index % 5) * 0.08} rings={[{ inset: "0" }]} className="absolute inset-0" />
                    {!reduce && isOpen && (
                      <motion.div
                        key={pulse}
                        aria-hidden="true"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{ duration: kit.slow, ease: kit.ease }}
                        className="absolute inset-0 rounded-full border border-foreground"
                      />
                    )}
                    <motion.svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: kit.base, ease: kit.ease }}
                      className="size-3"
                    >
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                    </motion.svg>
                  </div>
                </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: kit.base, ease: kit.ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40rem] px-6 pb-6 text-[length:var(--text-body)] leading-[1.4] text-muted-foreground lg:px-8 lg:pb-8">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqRippleAccordion;
