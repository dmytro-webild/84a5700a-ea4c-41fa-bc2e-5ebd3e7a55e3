import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Sparkles, Search, HelpCircle, ArrowRight } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import {
  getSavedBusinessName,
  saveBusinessName,
  BUSINESS_NAME_EVENT,
} from "@/utils/businessName";

const RESERVED_WORDS = [
  "national",
  "state",
  "federal",
  "government",
  "govt",
  "regional",
  "community",
  "authority",
  "commission",
  "cooperative",
  "council",
];

const SUFFIX_SUGGESTIONS = [
  "Ventures",
  "Enterprises",
  "Logistics",
  "Solutions",
  "Global",
  "Services",
  "Technologies",
  "Studio",
  "Consulting",
  "Trading",
];

export default function NameGeneratorTeaser({ className }: { className?: string }) {
  const [inputName, setInputName] = useState<string>(getSavedBusinessName);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== undefined) {
        setInputName(customEvent.detail);
      }
    };

    window.addEventListener(BUSINESS_NAME_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(BUSINESS_NAME_EVENT, handleUpdate);
    };
  }, []);

  const handleInputChange = (val: string) => {
    setInputName(val);
    saveBusinessName(val);
  };

  const words = inputName.trim().split(/\s+/).filter(Boolean);
  const lowercaseWords = words.map((w) => w.toLowerCase());
  
  const foundReserved = lowercaseWords.filter((w) => RESERVED_WORDS.includes(w));
  const hasSuffix = SUFFIX_SUGGESTIONS.some((suf) =>
    lowercaseWords.includes(suf.toLowerCase())
  );
  const wordCount = words.length;

  let scoreStatus: "ready" | "warning" | "needs-work" = "ready";
  let statusMessage = "Great choice! High approval potential on the CAC portal.";

  if (foundReserved.length > 0) {
    scoreStatus = "needs-work";
    statusMessage = `Contains restricted CAC word(s): "${foundReserved.join(
      ", "
    )}". Restricted words require special ministerial consent.`;
  } else if (wordCount < 2) {
    scoreStatus = "warning";
    statusMessage = "Single-word names carry high rejection risk. Add a second descriptive word or business suffix.";
  } else if (!hasSuffix) {
    scoreStatus = "ready";
    statusMessage = "Name is compliant! Consider adding a clear business classification suffix for instant approval.";
  }

  return (
    <section id="name-checker" aria-label="CAC Name Checker" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 max-w-3xl">
          <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground uppercase tracking-widest font-mono">
            Interactive Tool Teaser
          </BlurReveal>
          <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance">
            Test Your Business Name Compatibility
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed">
            Avoid wasting the ₦500 CAC name reservation fee on rejected proposals. Test your proposed brand name against CAC portal availability rules.
          </BlurReveal>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Input Card */}
          <BlurReveal delay={0.15} className="lg:col-span-7">
            <div className="kit-card p-6 lg:p-8 flex flex-col gap-6 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-[length:var(--text-small)] font-mono text-muted-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" /> CAC Name Readiness Checker
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                  Live Rule Engine
                </span>
              </div>

              <div>
                <label className="block text-[length:var(--text-body)] font-medium mb-2">
                  Enter Proposed Business Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="e.g. Crestview Logistics"
                    className="w-full bg-background/80 border border-border rounded-xl px-4 py-3.5 pl-11 text-[length:var(--text-body-lg)] focus:outline-none focus:border-primary transition-colors"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                </div>
              </div>

              {/* Suggestions Chips */}
              <div>
                <p className="text-[length:var(--text-small)] text-muted-foreground mb-2">
                  Quick Suffix Ideas for CAC Approval:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUFFIX_SUGGESTIONS.slice(0, 6).map((suf) => (
                    <button
                      key={suf}
                      onClick={() => {
                        const base = inputName.trim().split(/\s+/)[0] || "Velox";
                        handleInputChange(`${base} ${suf}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-xs hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      + {suf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  scoreStatus === "ready"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : scoreStatus === "warning"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {scoreStatus === "ready" && <CheckCircle className="size-5 shrink-0 mt-0.5" />}
                {scoreStatus === "warning" && <HelpCircle className="size-5 shrink-0 mt-0.5" />}
                {scoreStatus === "needs-work" && <AlertCircle className="size-5 shrink-0 mt-0.5" />}
                <div>
                  <p className="font-semibold text-[length:var(--text-body)]">
                    {scoreStatus === "ready"
                      ? "High Approval Potential"
                      : scoreStatus === "warning"
                      ? "Name Needs Refinement"
                      : "Restricted Keyword Detected"}
                  </p>
                  <p className="text-[length:var(--text-small)] opacity-90 mt-1 leading-relaxed">
                    {statusMessage}
                  </p>
                </div>
              </div>
            </div>
          </BlurReveal>

          {/* Guide Tips Box */}
          <BlurReveal delay={0.2} className="lg:col-span-5">
            <div className="kit-card p-6 lg:p-8 flex flex-col gap-6 border border-border h-full justify-between">
              <div>
                <h3 className="text-[length:var(--text-h3)] font-semibold mb-3">
                  Why 40% of CAC Names Get Rejected
                </h3>
                <ul className="space-y-3 text-[length:var(--text-small)] text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span><strong>Generic Names:</strong> Names like "John Smith Enterprises" conflict with thousands of existing registrations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span><strong>Restricted Words:</strong> Words requiring extra statutory approvals (e.g., "Group", "Holding", "State").</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span><strong>Phonetic Similarity:</strong> Names that sound identical to an already active brand on the CAC portal.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-[length:var(--text-small)] text-muted-foreground mb-4">
                  Master the secret 3-minute name search strategy in our ebook.
                </p>
                <a href="#pricing" className="btn-secondary w-full justify-center flex items-center gap-2">
                  <span>Get Complete Name Strategy</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
