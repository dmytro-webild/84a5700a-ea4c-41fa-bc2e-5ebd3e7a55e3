import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { HaloRings } from "@/components/kit/CardShine";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const pad = (n: number) => String(n).padStart(2, "0");

type Step = { title: string; description?: string; imageSrc?: string; imageAlt?: string };

type ProcessRingStepsProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  description?: string;
  items?: Step[];
  ariaLabel?: string;
  className?: string;
};

const SHRINK = 0.05;
const TILT = 8;
const PEEK = 14;

const StepCard = ({ item, index, total, progress }: { item: Step; index: number; total: number; progress: MotionValue<number> }) => {
  const reduce = useReducedMotion();
  const lastIndex = total - 1;
  const segment = 1 / Math.max(lastIndex, 1);
  const start = Math.min(index * segment, 0.999);
  const behind = lastIndex - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - behind * SHRINK]);
  const rotateX = useTransform(progress, [start, Math.min(start + segment, 1)], [0, behind ? TILT : 0]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(behind * 0.16, 0.5)]);
  const still = reduce || !behind;

  return (
    <li className="sticky [--card-h:min(74svh,36rem)] lg:[--card-h:min(64svh,30rem)]" style={{ top: `calc(50svh - var(--card-h) / 2 + ${index * PEEK}px)` }}>
      <motion.article
        style={still ? undefined : { scale, rotateX, transformPerspective: 1600 }}
        className={cn("kit-card relative isolate flex h-[var(--card-h)] origin-top flex-col overflow-hidden will-change-transform lg:grid", item.imageSrc ? "p-1.5 lg:grid-cols-2" : "lg:grid-cols-1")}
      >
        <CardShine />
        <div aria-hidden="true" className="halo-fade pointer-events-none absolute inset-0 -z-10">
          <HaloRings
            rings={[
              { inset: "0" },
              { inset: "16%" },
              { inset: "32%", className: "text-border opacity-60" },
            ]}
            className={cn("absolute -top-[45%] aspect-square w-[min(34rem,80%)] lg:-top-[60%] lg:w-[min(36rem,48%)]", index % 2 ? "-left-[18%] lg:-left-[8%]" : "-right-[18%] lg:-right-[8%]")}
          />
        </div>
        {item.imageSrc && (
          <div className={cn("relative min-h-0 flex-1 overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)] bg-deep lg:h-full", index % 2 && "lg:order-2")}>
            <Media src={item.imageSrc} alt={item.imageAlt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-75 saturate-[0.85]" />
          </div>
        )}
        <div className={cn("flex min-w-0 flex-col justify-between gap-6 lg:gap-8", item.imageSrc ? "p-[1.125rem] lg:p-[2.125rem]" : "flex-1 p-6 lg:p-10")}>
          <div className="flex items-baseline gap-3">
            <p aria-hidden="true" className="whitespace-nowrap text-[length:var(--text-display)] leading-none tracking-[-0.035em] tabular-nums">{pad(index + 1)}</p>
            <p aria-hidden="true" className="whitespace-nowrap text-[length:var(--text-body)] tabular-nums text-foreground/50">/ {pad(total)}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="max-w-[16ch] text-balance text-[length:var(--text-h2)] leading-[1.05] [overflow-wrap:anywhere]">{item.title}</h3>
            {item.description && <p className="line-clamp-3 max-w-[28rem] text-balance text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">{item.description}</p>}
          </div>
        </div>
        {!still && <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-[2] bg-black" />}
      </motion.article>
    </li>
  );
};

const ProcessRingSteps = ({
  tag = "How it works",
  title = "Ready in three minutes",
  titleDim = "from your sofa",
  description,
  items = [
    { title: "Download the app", description: "Get it from the App Store or Google Play and enter your phone number." },
    { title: "Verify your ID", description: "Scan your passport or ID card and take a quick selfie. It takes a minute." },
    { title: "Top up", description: "Add money by bank transfer, Apple Pay or a card you already have." },
    { title: "Start spending", description: "Your virtual card is live at once. The metal card arrives in a few days." },
  ],
  ariaLabel,
  className,
}: ProcessRingStepsProps) => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.2", "end 0.8"] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
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
            <BlurReveal as="p" delay={0.15} className="max-w-[30rem] text-balance text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">
              {description}
            </BlurReveal>
          )}
        </div>
        <ol ref={listRef} className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-col gap-[12svh]">
          {items.map((item, index) => (
            <StepCard key={index} item={item} index={index} total={items.length} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessRingSteps;
