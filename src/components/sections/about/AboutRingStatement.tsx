import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine, { CardReveal, HaloRings } from "@/components/kit/CardShine";
import { scrollRange } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Fact = { title: string; description?: string; imageSrc?: string; imageAlt?: string };

type AboutRingStatementProps = {
  tag?: string;
  title?: string;
  items?: Fact[];
  ariaLabel?: string;
  className?: string;
};

const Word = ({ progress, from, to, children, last }: { progress: MotionValue<number>; from: number; to: number; children: string; last: boolean }) => {
  const opacity = useTransform(progress, scrollRange(from, to), [0.22, 1]);
  return (
    <motion.div style={{ opacity }} className={cn("inline-block", !last && "mr-[0.25em]")}>
      {children}
    </motion.div>
  );
};

const AboutRingStatement = ({
  tag = "About us",
  title = "We started with one question: why do the things we use every day still feel heavy? So we built something calm, clear and quick that gets out of your way.",
  items = [
    { title: "Founded 2021", description: "A small team of builders and designers in Lisbon and Berlin." },
    { title: "Trusted by thousands", description: "People and teams in over 40 countries use us every day." },
    { title: "No hidden costs", description: "Every price we charge is on one page, in plain words." },
  ],
  ariaLabel,
  className,
}: AboutRingStatementProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.78, 1.18]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const words = title.split(/\s+/).filter(Boolean);
  const step = 0.36 / Math.max(1, words.length);

  return (
    <section ref={ref} aria-label={ariaLabel ?? tag ?? "About"} className={cn("relative isolate overflow-hidden py-[var(--section-space)] text-foreground", className)}>
      <div aria-hidden="true" className="halo-fade pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={reduce ? undefined : { scale: ringScale, rotate: ringRotate }}
          className="absolute left-1/2 top-1/2 aspect-square w-[min(130vw,72rem)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <HaloRings
            rings={[
              { inset: "0" },
              { inset: "12%", className: "text-border opacity-70" },
              { inset: "24%", className: "text-border opacity-40" },
            ]}
            className="absolute inset-0"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/60"
          />
        </motion.div>
      </div>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4">
          {tag && (
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground">
              {tag}
            </BlurReveal>
          )}
          <h2 className="max-w-[26ch] text-balance text-[length:var(--text-h1)]">
            <div className="sr-only">{title}</div>
            <div aria-hidden="true" className="contents">
              {words.map((word, index) =>
              reduce ? (
                <div key={index} aria-hidden="true" className={cn("inline-block", index < words.length - 1 && "mr-[0.25em]")}>
                  {word}
                </div>
              ) : (
                <Word key={index} progress={scrollYProgress} from={0.18 + index * step} to={0.18 + (index + 1) * step + 0.04} last={index === words.length - 1}>
                  {word}
                </Word>
              ),
            )}
            </div>
          </h2>
        </div>
        {items.length > 0 && (
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:gap-6">
            {items.map((item, index) => (
              <CardReveal key={index} index={index % 4} className="h-full">
                <div className={cn("kit-card relative flex h-full flex-col gap-4 overflow-hidden p-6 lg:p-8", item.imageSrc && "pt-1.5 lg:pt-1.5")}>
                  <CardShine />
                  {item.imageSrc && (
                    <div className="relative -mx-[calc(1.5rem-0.375rem)] mb-4 aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)] bg-deep lg:-mx-[calc(2rem-0.375rem)]">
                      <Media src={item.imageSrc} alt={item.imageAlt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-75 saturate-[0.85]" />
                    </div>
                  )}
                  <h3 className="text-balance text-[length:var(--text-h3)] [overflow-wrap:anywhere]">{item.title}</h3>
                  {item.description && <p className="max-w-[22rem] text-balance text-[length:var(--text-body)] leading-[1.4] text-muted-foreground">{item.description}</p>}
                </div>
              </CardReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutRingStatement;
