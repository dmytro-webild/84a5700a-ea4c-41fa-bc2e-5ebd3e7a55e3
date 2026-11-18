import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Clock, ShieldCheck, Users } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";

type ProofStripProps = {
  approvedTime?: string;
  lawyerText?: string;
  initialCount?: number;
  targetCount?: number;
  className?: string;
};

export default function ProofStrip({
  approvedTime = "Name approved in 3 minutes",
  lawyerText = "Registered without a lawyer",
  initialCount = 1420,
  targetCount = 1850,
  className,
}: ProofStripProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? targetCount : initialCount);

  useEffect(() => {
    if (reduce) return;
    const duration = 2000;
    const steps = 40;
    const increment = (targetCount - initialCount) / steps;
    const stepTime = duration / steps;
    let current = initialCount;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [initialCount, targetCount, reduce]);

  return (
    <section aria-label="Social Proof & Metrics" className={`relative z-10 py-8 border-y border-border bg-card/40 backdrop-blur-md ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-foreground">
          {/* Approved in 3 mins */}
          <BlurReveal delay={0.05} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/60">
            <div className="flex items-center justify-center size-11 rounded-lg bg-primary/15 text-primary shrink-0">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-[length:var(--text-body-lg)] font-semibold leading-tight">{approvedTime}</p>
              <p className="text-[length:var(--text-small)] text-muted-foreground">Verified CAC Portal Speed</p>
            </div>
          </BlurReveal>

          {/* Registered without a lawyer */}
          <BlurReveal delay={0.1} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/60">
            <div className="flex items-center justify-center size-11 rounded-lg bg-primary/15 text-primary shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-[length:var(--text-body-lg)] font-semibold leading-tight">{lawyerText}</p>
              <p className="text-[length:var(--text-small)] text-muted-foreground">100% DIY & Self-Service</p>
            </div>
          </BlurReveal>

          {/* Animated counter */}
          <BlurReveal delay={0.15} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/60">
            <div className="flex items-center justify-center size-11 rounded-lg bg-primary/15 text-primary shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[length:var(--text-h3)] font-bold text-primary tracking-tight">
                  {count.toLocaleString()}+
                </span>
                <span className="text-[length:var(--text-body-lg)] font-semibold">businesses registered</span>
              </div>
              <p className="text-[length:var(--text-small)] text-muted-foreground">Empowered Founders Across Nigeria</p>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
