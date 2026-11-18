import { useState, useEffect } from "react";
import { FileText, CheckCircle2, Download, Edit3, Sparkles, Building2, Check } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import {
  getSavedBusinessName,
  getSavedShortlist,
  saveBusinessName,
  getBusinessInitials,
  getBusinessSlug,
  BUSINESS_NAME_EVENT,
  type ShortlistedName,
} from "@/utils/businessName";

export default function Letterhead3DShowcase({ className }: { className?: string }) {
  const [activePreset, setActivePreset] = useState<"executive" | "modern">("executive");
  const [businessName, setBusinessName] = useState<string>(getSavedBusinessName);
  const [shortlist, setShortlist] = useState<ShortlistedName[]>(getSavedShortlist);
  const [isEditingInline, setIsEditingInline] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== undefined) {
        setBusinessName(customEvent.detail);
      } else {
        setBusinessName(getSavedBusinessName());
      }
      setShortlist(getSavedShortlist());
    };

    window.addEventListener(BUSINESS_NAME_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(BUSINESS_NAME_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleSelectName = (name: string) => {
    setBusinessName(name);
    saveBusinessName(name);
    setIsEditingInline(false);
  };

  const handleApplyCustomName = () => {
    if (customInput.trim()) {
      handleSelectName(customInput.trim());
      setCustomInput("");
    }
  };

  const initials = getBusinessInitials(businessName);
  const slug = getBusinessSlug(businessName);

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

            {/* Dynamic Business Name Status Bar */}
            <BlurReveal delay={0.12} className="kit-card p-4 border border-primary/40 bg-primary/5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-primary font-bold flex items-center gap-1.5">
                  <Building2 className="size-4" /> Customized For Your Brand
                </span>
                <button
                  onClick={() => setIsEditingInline(!isEditingInline)}
                  className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                >
                  <Edit3 className="size-3" /> {isEditingInline ? "Done" : "Change Name"}
                </button>
              </div>

              {isEditingInline ? (
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Enter business name..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCustomName()}
                    className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={handleApplyCustomName}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
                  >
                    <Check className="size-3.5" /> Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground font-sans truncate pr-2">
                    {businessName}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold shrink-0">
                    Live Preview
                  </span>
                </div>
              )}

              {/* Shortlist Pills if available */}
              {shortlist.length > 0 && !isEditingInline && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-[10px] text-muted-foreground font-mono mb-1.5">
                    Or select from your saved shortlist:
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {shortlist.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectName(item.name)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                          businessName.toLowerCase() === item.name.toLowerCase()
                            ? "bg-primary text-primary-foreground border-primary font-bold"
                            : "bg-secondary/70 text-muted-foreground hover:text-foreground border-border"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-xl font-bold tracking-tight uppercase break-words leading-tight">
                          {businessName}
                        </div>
                        <p
                          className={`text-xs mt-1 font-mono ${
                            activePreset === "executive" ? "text-amber-400" : "text-amber-700"
                          }`}
                        >
                          RC NUMBER: 7482910 · TIN: 28940192-0001
                        </p>
                      </div>
                      <div className="size-10 rounded-lg border flex items-center justify-center font-bold text-sm bg-primary/20 text-primary border-primary/40 shrink-0 uppercase font-mono">
                        {initials}
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
                      This official corporate letterhead verifies the registration of <strong className="font-bold underline decoration-primary/50 underline-offset-2">{businessName}</strong> with the Corporate Affairs Commission (CAC) under the Companies and Allied Matters Act.
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
                  <div className="pt-4 border-t border-current/20 flex flex-wrap justify-between text-[10px] opacity-70 font-mono gap-2">
                    <span>📍 14 Victoria Island Way, Lagos, Nigeria</span>
                    <span>✉️ contact@{slug}.ng</span>
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
