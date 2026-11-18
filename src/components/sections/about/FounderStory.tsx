import { Sparkles, CheckCircle } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";

export default function FounderStory({ className }: { className?: string }) {
  return (
    <section id="founder-story" aria-label="Founder's Story" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Card / Image Box */}
          <BlurReveal delay={0.05} className="lg:col-span-5">
            <DepthTiltCard maxTilt={6}>
              <div className="kit-card p-6 lg:p-8 flex flex-col gap-6 border border-border/90 relative overflow-hidden">
                <div className="absolute -bottom-12 -right-12 size-48 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0">
                    M
                  </div>
                  <div>
                    <h3 className="text-[length:var(--text-h3)] font-semibold">Dr. Michelle</h3>
                    <p className="text-[length:var(--text-small)] text-muted-foreground">
                      Physician & Founder, Register It Yourself
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/80 border border-border/60">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="size-3.5" /> Founder Proof
                  </div>
                  <p className="text-[length:var(--text-body)] font-medium">
                    "My business name was approved on the CAC portal within 3 minutes of payment confirmation."
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground font-mono pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <span>Registration Path:</span>
                    <span className="text-foreground">Direct CAC Portal (No Agent)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approval Time:</span>
                    <span className="text-emerald-400 font-semibold">3 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Agent Fee Saved:</span>
                    <span className="text-amber-400 font-semibold">₦85,000</span>
                  </div>
                </div>
              </div>
            </DepthTiltCard>
          </BlurReveal>

          {/* Narrative Content */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              The Founder's Story
            </BlurReveal>

            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance">
              "I built RIY because no founder should pay ₦80,000 for a 30-minute portal form."
            </BlurReveal>

            <BlurReveal as="div" delay={0.1} className="space-y-4 text-[length:var(--text-body)] text-muted-foreground leading-relaxed">
              <p>
                When I decided to register my company, I reached out to several registration agents and lawyers. Every single quote came back between ₦50,000 and ₦120,000, paired with vague delays and confusing legal jargon.
              </p>
              <p>
                As a practicing physician, I am used to rigorous step-by-step procedures. I decided to log into the official Corporate Affairs Commission portal myself. I researched the exact naming rules, prepared my NIN and identity details, and hit submit.
              </p>
              <p className="text-foreground font-medium border-l-2 border-primary pl-4 py-1 italic">
                Exactly three minutes after payment confirmation, the portal status changed to APPROVED. I had my official CAC reservation letter right in front of me — without paying a single naira in middleman markups.
              </p>
              <p>
                That breakthrough gave birth to <strong className="text-foreground">Register It Yourself (RIY)</strong>. We exist to give Nigerian entrepreneurs a single, comprehensive step-by-step PDF guide, proven templates, and direct support required to register independently, fast and stress-free. (Note: there is only one PDF guide available and no video guide — if you require extra hands-on support beyond the PDF, you can pay ₦15,000 for a live 1-on-1 guide session).
              </p>
            </BlurReveal>

            <BlurReveal delay={0.15} className="flex flex-wrap gap-4 pt-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="size-4 text-primary" />
                <span>Zero Legal Jargon</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="size-4 text-primary" />
                <span>100% Real Portal Screenshots</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="size-4 text-primary" />
                <span>Direct WhatsApp Backup</span>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
