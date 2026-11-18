import { useState } from "react";
import {
  Sparkles,
  Heart,
  Search,
  CheckCircle,
  Mail,
  Trash2,
  Copy,
  Check,
  Building,
  Send,
} from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import HeroFloatingCard from "@/components/sections/hero/HeroFloatingCard";
import StartNowCTA from "@/components/sections/cta/StartNowCTA";
import NameGeneratorTeaser from "@/components/sections/tools/NameGeneratorTeaser";

interface IndustryPreset {
  id: string;
  name: string;
  prefix: string[];
  suffix: string[];
}

const INDUSTRIES: IndustryPreset[] = [
  {
    id: "tech",
    name: "Tech & Software",
    prefix: ["Velox", "Zentiva", "Apex", "Byte", "Nexa", "Kola", "Optima", "Cloud", "Logic", "Syntra"],
    suffix: ["Technologies", "Labs", "Digital", "Systems", "Innovations", "Software", "Networks"],
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    prefix: ["Urban", "Aura", "Kola", "Brim", "Luxe", "Haven", "Market", "Merchants", "Staple"],
    suffix: ["Ventures", "Enterprises", "Global", "Trading", "Stores", "Mart", "Supply"],
  },
  {
    id: "consulting",
    name: "Consulting & Advisory",
    prefix: ["Crestview", "Vanguard", "Beacon", "Pinnacle", "Aegis", "Clarion", "Solon", "Atlas"],
    suffix: ["Consulting", "Advisors", "Partners", "Group", "Strategy", "Solutions"],
  },
  {
    id: "fashion",
    name: "Fashion & Lifestyle",
    prefix: ["Kulture", "Zaria", "Silk", "Threads", "Noir", "Velvet", "Heritage", "Sovereign"],
    suffix: ["Apparel", "Couture", "Studio", "Designs", "House", "Collectives"],
  },
  {
    id: "food",
    name: "Food & Hospitality",
    prefix: ["Savory", "Taste", "Plate", "Bistro", "Flavor", "Nourish", "Gourmet", "Kitchen"],
    suffix: ["Foods", "Hospitality", "Delights", "Catering", "Grill", "Eats"],
  },
  {
    id: "logistics",
    name: "Logistics & Transport",
    prefix: ["Swift", "Relay", "Metro", "Freight", "Cargo", "Route", "Carrier", "Transit"],
    suffix: ["Logistics", "Express", "Courier", "Haulage", "Supply Chain", "Services"],
  },
];

interface GeneratedName {
  id: string;
  name: string;
  category: string;
  score: "high" | "medium";
  tag: string;
  reason: string;
}

export default function NameGeneratorPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryPreset>(INDUSTRIES[0]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [generatedList, setGeneratedList] = useState<GeneratedName[]>([]);
  const [shortlist, setShortlist] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lead capture state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleGenerate = () => {
    const baseWord = customKeyword.trim()
      ? customKeyword.trim().charAt(0).toUpperCase() + customKeyword.trim().slice(1)
      : selectedIndustry.prefix[Math.floor(Math.random() * selectedIndustry.prefix.length)];

    const results: GeneratedName[] = [];
    const prefixes = [baseWord, ...selectedIndustry.prefix.slice(0, 5)];

    prefixes.forEach((pref, idx) => {
      const suf = selectedIndustry.suffix[idx % selectedIndustry.suffix.length];
      const fullName = `${pref} ${suf}`;
      const isHigh = idx % 2 === 0;

      results.push({
        id: `${pref}-${suf}-${idx}`,
        name: fullName,
        category: selectedIndustry.name,
        score: isHigh ? "high" : "medium",
        tag: isHigh ? "High CAC Approval Potential" : "Unique & Query-Proof",
        reason: isHigh
          ? "Combines unique prefix with clear statutory classification."
          : "Distinct phonetics reduces portal collision risk.",
      });
    });

    setGeneratedList(results);
  };

  const toggleShortlist = (item: GeneratedName) => {
    if (shortlist.some((s) => s.id === item.id)) {
      setShortlist(shortlist.filter((s) => s.id !== item.id));
    } else {
      setShortlist([...shortlist, item]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;
    setLeadSubmitted(true);
  };

  return (
    <>
      {/* 1. Hero */}
      <div id="generator-hero" data-webild-section="HeroFloatingCard" data-section="hero">
        <HeroFloatingCard
          shape="twist"
          title="Free CAC Business Name Generator"
          titleMuted="& Readiness Checker"
          description="Find unique, query-proof business name ideas tailored for your Nigerian venture. Save your shortlist and get our step-by-step CAC filing checklist sent to your email."
          primaryButton={{
            text: "Generate Names Now",
            href: "#generator-tool",
          }}
          secondaryButton={{
            text: "Get DIY Ebook — ₦10k",
            href: "/ebook",
          }}
        />
      </div>

      {/* 2. Interactive Generator Tool */}
      <section id="generator-tool" className="py-[var(--section-space)] relative">
        <div className="mx-auto w-[var(--container)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Interactive Name Finder
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              Generate & Shortlist Business Names
            </BlurReveal>
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mt-2">
              Select your industry, enter a keyword, and explore CAC-ready brand names.
            </BlurReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Form */}
            <div className="lg:col-span-5 kit-card p-6 lg:p-8 border border-border space-y-6">
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                  1. Select Your Industry Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        selectedIndustry.id === ind.id
                          ? "border-primary bg-primary/20 text-primary font-bold"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                  2. Optional Keyword or Brand Seed
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Apex, Kola, Zenith..."
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="btn-primary w-full justify-center py-3 text-sm font-bold flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                <span>Generate Business Names</span>
              </button>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-7 space-y-4">
              {generatedList.length === 0 ? (
                <div className="kit-card p-12 border border-border text-center space-y-4">
                  <Building className="size-12 text-primary mx-auto opacity-80" />
                  <h3 className="text-[length:var(--text-h3)] font-semibold">Ready to Generate</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground max-w-md mx-auto">
                    Select an industry on the left and click "Generate Business Names" to discover CAC-ready ideas.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                    <span>Generated Suggestions ({generatedList.length})</span>
                    <span>Click heart to shortlist</span>
                  </div>

                  {generatedList.map((item) => {
                    const isShortlisted = shortlist.some((s) => s.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="kit-card p-4 border border-border flex items-center justify-between gap-4 hover:border-primary/50 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[length:var(--text-body-lg)] text-foreground">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.reason}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => copyToClipboard(item.name, item.id)}
                            className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground"
                            title="Copy name"
                          >
                            {copiedId === item.id ? (
                              <Check className="size-4 text-emerald-400" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleShortlist(item)}
                            className={`p-2 rounded-lg border transition-all ${
                              isShortlisted
                                ? "bg-red-500/20 border-red-500/50 text-red-400"
                                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                            }`}
                            title="Add to Shortlist"
                          >
                            <Heart className={`size-4 ${isShortlisted ? "fill-red-400" : ""}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shortlist Drawer & Lead Capture Section */}
      <section className="py-[var(--section-space)] bg-secondary/30 border-y border-border/80">
        <div className="mx-auto w-[var(--container)] max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Shortlist Box */}
            <div className="lg:col-span-6 kit-card p-6 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[length:var(--text-h3)] font-bold flex items-center gap-2">
                  <Heart className="size-5 text-red-400 fill-red-400" /> Your Saved Shortlist ({shortlist.length})
                </h3>
                {shortlist.length > 0 && (
                  <button
                    onClick={() => setShortlist([])}
                    className="text-xs text-muted-foreground hover:text-red-400 flex items-center gap-1"
                  >
                    <Trash2 className="size-3.5" /> Clear All
                  </button>
                )}
              </div>

              {shortlist.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-6 text-center">
                  No business names saved yet. Click the heart icon on any generated name above to save it to your shortlist.
                </p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {shortlist.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 rounded-lg bg-background border border-border flex justify-between items-center text-xs font-semibold"
                    >
                      <span>{item.name}</span>
                      <button
                        onClick={() => toggleShortlist(item)}
                        className="text-muted-foreground hover:text-red-400"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Lead Capture Form */}
            <div className="lg:col-span-6 kit-card p-6 border-2 border-primary/40 bg-background space-y-4">
              <div>
                <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Mail className="size-3.5" /> Email Delivery
                </div>
                <h3 className="text-[length:var(--text-h3)] font-bold">
                  Send Shortlist + CAC Name Filing Checklist
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Get your saved shortlist emailed directly to you along with our free PDF checklist for filing business names with zero query rejections.
                </p>
              </div>

              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michelle"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-2.5 text-xs font-bold flex items-center gap-2"
                  >
                    <Send className="size-4" />
                    <span>Email Me My Shortlist & Free Checklist</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2 text-xs text-center">
                  <CheckCircle className="size-8 mx-auto" />
                  <p className="font-bold text-sm">Shortlist & Checklist Sent!</p>
                  <p className="text-muted-foreground">
                    We've emailed your shortlist ({shortlist.length} names) and the CAC filing checklist to <strong className="text-foreground">{leadEmail}</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Embedded Teaser Rule Engine */}
      <NameGeneratorTeaser />

      {/* 5. CTA */}
      <StartNowCTA />
    </>
  );
}
