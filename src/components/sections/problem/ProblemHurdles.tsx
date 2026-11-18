import { AlertTriangle, HelpCircle, XCircle, DollarSign, ArrowRight } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";

type PainPoint = {
  icon: string;
  title: string;
  description: string;
};

type ProblemHurdlesProps = {
  tag?: string;
  title?: string;
  description?: string;
  painPoints?: PainPoint[];
  className?: string;
};

const defaultPainPoints: PainPoint[] = [
  {
    icon: "confusing",
    title: "Confusing Government Portal",
    description: "Endless dropdowns, legal jargon, and obscure options make you wonder if you're filling out the wrong form entirely.",
  },
  {
    icon: "rejected",
    title: "Frustrating Name Rejections",
    description: "Waiting days only to receive a rejection query because of subtle naming conflicts or unwritten CAC rules.",
  },
  {
    icon: "agent",
    title: "Overpriced Registration Agents",
    description: "Agents charging ₦50,000 to ₦120,000+ for standard filings that take less than 30 minutes of portal work.",
  },
  {
    icon: "mistakes",
    title: "Fear of Costly Mistakes",
    description: "Worrying about wrong classification, tax errors, or submitting bad documents that cost extra fees to rectify later.",
  },
];

export default function ProblemHurdles({
  tag = "The Problem",
  title = "Opened the CAC portal and closed it again?",
  description = "Navigating official government portals alone shouldn't feel like a trap. Most entrepreneurs give up or overpay because the system feels like a black box.",
  painPoints = defaultPainPoints,
  className,
}: ProblemHurdlesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "confusing":
        return <HelpCircle className="size-6 text-amber-500" />;
      case "rejected":
        return <XCircle className="size-6 text-red-500" />;
      case "agent":
        return <DollarSign className="size-6 text-amber-500" />;
      case "mistakes":
        return <AlertTriangle className="size-6 text-orange-500" />;
      default:
        return <AlertTriangle className="size-6 text-primary" />;
    }
  };

  return (
    <section id="problem" aria-label="CAC Registration Hurdles" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 max-w-3xl">
          {tag && (
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground uppercase tracking-widest font-mono">
              {tag}
            </BlurReveal>
          )}
          <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance">
            {title}
          </BlurReveal>
          {description && (
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed">
              {description}
            </BlurReveal>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((item, index) => (
            <BlurReveal key={index} delay={0.1 + index * 0.05}>
              <div className="kit-card p-6 lg:p-8 flex flex-col gap-4 border border-border/80 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-secondary/80 border border-border">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-semibold">{item.title}</h3>
                </div>
                <p className="text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </BlurReveal>
          ))}
        </div>

        {/* Contrast Banner */}
        <BlurReveal delay={0.35} className="mt-10">
          <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-amber-500/10 to-transparent border border-primary/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[length:var(--text-label)] font-mono text-primary font-semibold uppercase tracking-wider">
                The RIY Solution
              </p>
              <h3 className="text-[length:var(--text-h2)] font-bold mt-1">
                The trusted middle path: Clear, fast, and 100% agent-free.
              </h3>
              <p className="text-[length:var(--text-body)] text-muted-foreground mt-2 max-w-2xl">
                We bridge the gap with a single step-by-step PDF guide, proven templates, and optional ₦15,000 live guide support so you never get stuck or queried.
              </p>
            </div>
            <a
              href="#pricing"
              className="btn-primary shrink-0 self-start md:self-auto flex items-center gap-2"
            >
              <span>See Our Plans</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
