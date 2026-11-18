import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";

export default function StartNowCTA({ className }: { className?: string }) {
  return (
    <section id="start-now" aria-label="Start Now Call to Action" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="relative isolate rounded-3xl bg-gradient-to-br from-card via-card/90 to-secondary border border-border/80 p-8 lg:p-14 overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 size-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 size-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
            <BlurReveal as="div" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-mono font-semibold">
              <Zap className="size-3.5" /> Direct CAC Registration Path
            </BlurReveal>

            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] font-bold tracking-tight text-balance">
              Register your business with CAC. Yourself. This week.
            </BlurReveal>

            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-foreground/85 leading-relaxed font-normal">
              Skip the agent fees. Our step-by-step guide, and a real person on call if you want one, takes you from business idea to official CAC certificate, first time.
            </BlurReveal>

            <BlurReveal delay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
              <a href="#pricing" className="btn-primary w-full sm:w-auto justify-center text-base px-8 py-3.5 font-bold">
                <span>Get Your CAC Certificate — ₦10,000</span>
                <ArrowRight className="size-4" />
              </a>
              <a href="#pricing" className="btn-secondary w-full sm:w-auto justify-center text-base px-8 py-3.5 font-bold">
                <span>Do It With Us — ₦25,000</span>
              </a>
            </BlurReveal>

            <BlurReveal delay={0.2} className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/85 font-medium pt-4 border-t border-border/60 w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" /> 100% CAC Approval Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" /> Direct WhatsApp & Email Support
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" /> Instant Ebook Access
              </span>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
