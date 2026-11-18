import { useState } from "react";
import { FileText, CheckCircle2, Download, Edit3, Sparkles } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";

export default function Letterhead3DShowcase({ className }: { className?: string }) {
  const [activePreset, setActivePreset] = useState<"executive" | "modern">("executive");

  return (
    <section id="letterhead" aria-label="3D Letterhead Showcase" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Included in "Do It With Us" (₦25,000)
            </BlurReveal>

            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance">
              2 Custom Business Letterhead Designs
            </BlurReveal>

            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed">
              When you complete your CAC registration with us, our design team builds 2 bespoke corporate letterheads tailored to your new business identity — delivered 2–3 working days after CAC approval.
            </BlurReveal>

            <BlurReveal delay={0.15} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[length:var(--text-body)]">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span>Print-Ready High-Resolution PDF format</span>
              </div>
              <div className="flex items-center gap-3 text-[length:var(--text-body)]">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span>Editable Word & Canva document templates</span>
              </div>
              <div className="flex items-center gap-3 text-[length:var(--text-body)]">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span>Pre-formatted with your new BN / RC registration number</span>
              </div>
            </BlurReveal>

            {/* Design Selector Toggle */}
            <BlurReveal delay={0.2} className="flex gap-3 pt-2">
              <button
                onClick={() => setActivePreset("executive")}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  activePreset === "executive"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-foreground border-border hover:border-primary/50"
                }`}
              >
                Preset 1: Executive Dark Minimal
              </button>
              <button
                onClick={() => setActivePreset("modern")}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  activePreset === "modern"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-foreground border-border hover:border-primary/50"
                }`}
              >
                Preset 2: Modern Editorial
              </button>
            </BlurReveal>
          </div>

          {/* 3D Floating Mockup Card */}
          <BlurReveal delay={0.15} className="lg:col-span-7">
            <DepthTiltCard maxTilt={12} className="w-full">
              <div className="relative isolate rounded-2xl bg-card border border-border/80 p-6 lg:p-8 shadow-2xl overflow-hidden group">
                {/* Glow Backdrop */}
                <div className="absolute -top-24 -right-24 size-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    <span className="text-[length:var(--text-small)] font-mono font-medium">
                      Official CAC Letterhead Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                      <Sparkles className="size-3" /> Ready in 2–3 Days
                    </span>
                  </div>
                </div>

                {/* 3D Paper Sheet Simulation */}
                <div
                  className={`w-full aspect-[1/1.3] rounded-xl p-8 transition-all duration-500 flex flex-col justify-between border shadow-inner ${
                    activePreset === "executive"
                      ? "bg-neutral-900 text-neutral-100 border-neutral-700/80"
                      : "bg-stone-100 text-stone-900 border-stone-300"
                  }`}
                >
                  {/* Paper Header */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xl font-bold tracking-tight uppercase">
                          VELOX ENTERPRISES LTD
                        </div>
                        <p
                          className={`text-xs mt-0.5 font-mono ${
                            activePreset === "executive" ? "text-amber-400" : "text-amber-700"
                          }`}
                        >
                          RC NUMBER: 7482910 · TIN: 28940192-0001
                        </p>
                      </div>
                      <div className="size-10 rounded-lg border flex items-center justify-center font-bold text-sm bg-primary/20 text-primary border-primary/40">
                        VE
                      </div>
                    </div>
                    <div
                      className={`h-0.5 w-full my-4 ${
                        activePreset === "executive"
                          ? "bg-gradient-to-r from-amber-500 via-primary to-transparent"
                          : "bg-gradient-to-r from-amber-700 via-stone-400 to-transparent"
                      }`}
                    />
                  </div>

                  {/* Body Lines */}
                  <div className="space-y-3 py-4 opacity-80 font-mono text-xs">
                    <p className="font-semibold">To: Whom It May Concern,</p>
                    <p className="leading-relaxed">
                      This official corporate letterhead verifies the registration of Velox Enterprises Ltd with the Corporate Affairs Commission (CAC) under the Companies and Allied Matters Act.
                    </p>
                    <p className="leading-relaxed">
                      All operations, banking transactions, and official correspondence adhere to regulatory guidelines set by the Federal Republic of Nigeria.
                    </p>
                    <div className="pt-4 flex items-center gap-8">
                      <div>
                        <div className="h-6 w-24 border-b border-dashed border-current opacity-60" />
                        <p className="text-[10px] mt-1 opacity-70">Managing Director</p>
                      </div>
                      <div>
                        <div className="h-6 w-24 border-b border-dashed border-current opacity-60" />
                        <p className="text-[10px] mt-1 opacity-70">Company Secretary</p>
                      </div>
                    </div>
                  </div>

                  {/* Paper Footer */}
                  <div className="pt-4 border-t border-current/20 flex flex-wrap justify-between text-[10px] opacity-70 font-mono">
                    <span>📍 14 Victoria Island Way, Lagos, Nigeria</span>
                    <span>✉️ contact@veloxenterprises.ng</span>
                  </div>
                </div>

                {/* Delivery Badges */}
                <div className="mt-6 flex flex-wrap gap-4 items-center justify-between text-[length:var(--text-small)] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Download className="size-4 text-primary" /> Print-Ready PDF Included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Edit3 className="size-4 text-primary" /> Editable Canva & Word Template
                  </span>
                </div>
              </div>
            </DepthTiltCard>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
