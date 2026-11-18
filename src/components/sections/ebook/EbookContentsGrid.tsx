import { BookOpen, Check, FileCheck, ArrowUpRight } from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";

type ModuleItem = {
  number: string;
  title: string;
  description: string;
  highlights: string[];
};

const ebookModules: ModuleItem[] = [
  {
    number: "01",
    title: "CAC Portal Account Setup & Orientation",
    description: "Creating your official account on the CAC portal without login bugs or verification errors.",
    highlights: ["NIN & ID verification setup", "Account role selection (Public User)", "Portal dashboard orientation"],
  },
  {
    number: "02",
    title: "Winning Business Name Search & Reservation",
    description: "The exact 3-minute name search strategy founder Michelle used to get instant name approval.",
    highlights: ["Avoiding restricted CAC keywords", "Suffix placement guidelines", "Query-proofing your submission"],
  },
  {
    number: "03",
    title: "Screen-by-Screen Form Filing Walkthrough",
    description: "Detailed video & screenshot tutorials for Business Names (BN) and Limited Companies (LTD).",
    highlights: ["Objects of business templates", "Proprietor & Director allocation", "Share capital structure guidance"],
  },
  {
    number: "04",
    title: "Payment Gateway & Portal Submission",
    description: "Paying official government fees directly via Remita with zero hidden charges or agent markups.",
    highlights: ["Remita RRR generation & verification", "Document upload formatting", "Instant submission confirmation"],
  },
  {
    number: "05",
    title: "Fast Query Resolution & Approval Protocol",
    description: "What to do if CAC raises a query on your document, signature, or classification.",
    highlights: ["24-hour query response templates", "Correcting rejected uploads", "Direct portal support escalation"],
  },
  {
    number: "06",
    title: "Post-Registration Roadmap (TIN, Bank & Returns)",
    description: "Everything you must do after downloading your CAC certificate to stay 100% compliant.",
    highlights: ["Automatic FIRS Tax ID (TIN) activation", "Opening corporate bank accounts", "Annual returns filing calendar"],
  },
];

export default function EbookContentsGrid({ className }: { className?: string }) {
  return (
    <section id="ebook-contents" aria-label="Ebook Contents Grid" className={`relative py-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 max-w-3xl">
          <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
            Curriculum Breakdown
          </BlurReveal>
          <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance">
            Inside the Register It Yourself Ebook
          </BlurReveal>
          <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed">
            Everything you need from business idea to official CAC certificate, structured into 6 clear, action-oriented modules. Instant download immediately after purchase.
          </BlurReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebookModules.map((item, index) => (
            <BlurReveal key={item.number} delay={0.05 + index * 0.04}>
              <div className="kit-card p-6 flex flex-col gap-5 border border-border/80 hover:border-primary/50 transition-all h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono text-primary/80">
                      Module {item.number}
                    </span>
                    <div className="p-2 rounded-lg bg-secondary text-primary">
                      <BookOpen className="size-4" />
                    </div>
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-2 text-xs text-foreground/90">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>

        {/* Bonus Checklist Box */}
        <BlurReveal delay={0.35} className="mt-8">
          <div className="p-6 rounded-2xl bg-secondary/60 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/15 text-primary shrink-0">
                <FileCheck className="size-6" />
              </div>
              <div>
                <h4 className="font-semibold text-[length:var(--text-body-lg)]">
                  Bonus Pack Included: Templates & Checklists
                </h4>
                <p className="text-[length:var(--text-small)] text-muted-foreground">
                  Includes ready-to-use Resolutions, Form BN-1 templates, and Post-Registration Compliance Checklists.
                </p>
              </div>
            </div>
            <a href="#pricing" className="btn-primary shrink-0 text-xs">
              <span>Get Instant Download</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
