import { useState } from "react";
import {
  CheckCircle,
  FileCheck,
  Download,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  X,
  UserCheck,
  Briefcase,
  Store,
  Globe,
  Clock,
  Rocket,
  ChevronDown,
} from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import HeroFloatingCard from "@/components/sections/hero/HeroFloatingCard";
import EbookContentsGrid from "@/components/sections/ebook/EbookContentsGrid";
import StartNowCTA from "@/components/sections/cta/StartNowCTA";
import { siteConfig } from "@/config/site";

const BONUSES = [
  {
    title: "Name Generator Worksheet",
    description: "Step-by-step formula to craft query-proof business names that get approved on first try.",
    value: "₦3,500 Value",
  },
  {
    title: "Document Prep Checklist",
    description: "Exact passport, NIN, and ID scan specifications required by CAC upload servers.",
    value: "₦2,500 Value",
  },
  {
    title: "Rejection Rescue Sheet",
    description: "Copy-paste response letters to instantly resolve portal queries within 24 hours.",
    value: "₦5,000 Value",
  },
  {
    title: "Compliance Calendar",
    description: "Timeline guide for annual returns, SCUML, and tax registration deadlines.",
    value: "₦4,000 Value",
  },
  {
    title: "Business Starter Templates",
    description: "Fillable resolutions, consent letters, and formal invoice/receipt formats.",
    value: "₦6,000 Value",
  },
];

const WHO_ITS_FOR = [
  {
    icon: Store,
    title: "Vendors & Retailers",
    description: "Open official corporate bank accounts and get Instagram/Jumia store verified with ease.",
  },
  {
    icon: Rocket,
    title: "Side Hustlers",
    description: "Turn your evening project into an official registered brand this week without agent delays.",
  },
  {
    icon: UserCheck,
    title: "First-Time Founders",
    description: "Follow clear screen-by-screen steps with zero confusing legal jargon or expensive lawyer fees.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Consultants",
    description: "Invoice corporate clients under your official business name and win higher value contracts.",
  },
  {
    icon: Globe,
    title: "Diaspora Nigerians",
    description: "Register your Nigerian entity online from abroad using your NIN and passport seamlessly.",
  },
  {
    icon: Clock,
    title: "Busy Professionals",
    description: "Complete your CAC registration in your spare 30 minutes without taking time off work.",
  },
];

const EBOOK_FAQS = [
  {
    q: "How will I receive the ebook after payment?",
    a: "Immediately upon completing your payment, you will get access to instant PDF download links on screen and an automated copy delivered directly to your email address.",
  },
  {
    q: "Does this guide cover both Business Names (BN) and Limited Companies (LTD)?",
    a: "Yes! The guide contains dedicated chapters for both Business Name registration and Limited Liability Company filing, complete with share capital allocation steps.",
  },
  {
    q: "What if CAC queries my submission?",
    a: "The ebook includes our exact Rejection Rescue templates to answer any portal query in 24 hours. If you want live 1-on-1 assistance, you can also upgrade to our Do It With Us service for ₦15,000.",
  },
  {
    q: "Are official CAC government fees included in ₦10,000?",
    a: "The ₦10,000 covers the complete training guide, templates, and bonus pack. Official CAC government filing fees (₦10,000 for Business Name) are paid directly by you on the Remita portal.",
  },
];

export default function EbookPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [includeOrderBump, setIncludeOrderBump] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [isPurchased, setIsPurchased] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const basePrice = siteConfig.pricing.ebook.amount;
  const bumpPrice = siteConfig.pricing.orderBumpLetterheads.amount;
  const totalPrice = basePrice + (includeOrderBump ? bumpPrice : 0);

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;
    setIsPurchased(true);
  };

  return (
    <>
      {/* 1. Hero Section */}
      <div id="ebook-hero" data-webild-section="HeroFloatingCard" data-section="hero">
        <HeroFloatingCard
          shape="twist"
          title="The Complete Register It Yourself"
          titleMuted="Ebook & Action Guide"
          description="The step-by-step screen walkthrough that takes you from business idea to official CAC certificate, without paying agent markups. Instant PDF download + full bonus kit."
          primaryButton={{
            text: `Get Instant Access — ${siteConfig.pricing.ebook.price}`,
            href: "#pricing-card",
          }}
          secondaryButton={{
            text: "Upgrade to Do It With Us — ₦25k",
            href: "/do-it-with-us",
          }}
        />
      </div>

      {/* 2. Highlights Strip */}
      <section className="py-8 border-y border-border/80 bg-secondary/30">
        <div className="mx-auto w-[var(--container)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-[length:var(--text-h2)] font-mono font-bold text-primary">Instant</div>
            <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">PDF & Template Download</p>
          </div>
          <div>
            <div className="text-[length:var(--text-h2)] font-mono font-bold text-primary">BN & LTD</div>
            <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">Screen-by-Screen Walkthrough</p>
          </div>
          <div>
            <div className="text-[length:var(--text-h2)] font-mono font-bold text-primary">5 Bonuses</div>
            <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">Checklists & Rescue Sheets</p>
          </div>
          <div>
            <div className="text-[length:var(--text-h2)] font-mono font-bold text-primary">100%</div>
            <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">CAC Approval Guarantee</p>
          </div>
        </div>
      </section>

      {/* 3. The Problem & Solution */}
      <section className="py-[var(--section-space)] relative text-foreground">
        <div className="mx-auto w-[var(--container)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <BlurReveal delay={0.05} className="lg:col-span-6">
              <span className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
                Why This Ebook Was Written
              </span>
              <h2 className="text-[length:var(--text-h1)] text-balance mt-3">
                Stop paying agents ₦80,000 for a 30-minute online registration.
              </h2>
              <div className="space-y-4 text-[length:var(--text-body)] text-muted-foreground leading-relaxed mt-6">
                <p>
                  Most registration agents double or triple official CAC fees, charge high maintenance markups, and hold onto your portal credentials so you stay dependent on them for annual returns.
                </p>
                <p>
                  Doing it alone can feel daunting when you encounter portal errors or query messages. That's why we created a clear, zero-jargon visual roadmap with real portal screenshots for every step.
                </p>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.1} className="lg:col-span-6">
              <div className="kit-card p-6 lg:p-8 border border-border space-y-4">
                <h3 className="text-[length:var(--text-h3)] font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" /> What You Gain With Self-Filing
                </h3>
                <ul className="space-y-3 text-[length:var(--text-body)] text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Save up to <strong>₦85,000</strong> in agent markup fees.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Retain 100% control of your official CAC portal login & documents.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Get direct step-by-step guidance to avoid name rejection & query loops.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Master your post-registration TIN, bank account, and annual returns compliance.</span>
                  </li>
                </ul>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* 4. Inside the Ebook (Modules Grid) */}
      <EbookContentsGrid />

      {/* 5. Bonus Pack Showcase */}
      <section className="py-[var(--section-space)] bg-secondary/30 border-y border-border/80">
        <div className="mx-auto w-[var(--container)]">
          <div className="max-w-3xl">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Included Free With Your Order
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              The 5-Piece Business Founder Bonus Pack
            </BlurReveal>
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mt-3">
              We included these essential tools and templates so you never get stuck on formatting or compliance.
            </BlurReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BONUSES.map((bonus, i) => (
              <BlurReveal key={bonus.title} delay={0.05 + i * 0.04}>
                <div className="kit-card p-6 border border-border flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-primary/20 text-primary">
                        {bonus.value}
                      </span>
                      <FileCheck className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-[length:var(--text-h3)] font-semibold">{bonus.title}</h3>
                    <p className="text-[length:var(--text-small)] text-muted-foreground mt-2 leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="size-3.5" /> Included Free in Ebook Download
                  </div>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Who It's For */}
      <section className="py-[var(--section-space)]">
        <div className="mx-auto w-[var(--container)]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Designed For You
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              Who Should Read This Guide?
            </BlurReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_ITS_FOR.map((item, i) => {
              const Icon = item.icon;
              return (
                <BlurReveal key={item.title} delay={0.05 + i * 0.04}>
                  <div className="kit-card p-6 border border-border flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-secondary text-primary shrink-0">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-[length:var(--text-h3)] font-semibold">{item.title}</h3>
                      <p className="text-[length:var(--text-small)] text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Price & Guarantee Card Section */}
      <section id="pricing-card" className="py-[var(--section-space)] bg-secondary/40 border-t border-border/80">
        <div className="mx-auto w-[var(--container)] max-w-4xl">
          <BlurReveal delay={0.05}>
            <DepthTiltCard maxTilt={5}>
              <div className="kit-card p-8 lg:p-12 border-2 border-primary/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-semibold">
                    <Sparkles className="size-3.5" /> Instant Digital Access
                  </div>
                  <h2 className="text-[length:var(--text-h1)]">
                    Get the Ebook & Complete Bonus Pack
                  </h2>
                  <p className="text-[length:var(--text-body-lg)] text-muted-foreground">
                    Everything you need to register your Business Name or Limited Liability Company on CAC with 100% confidence.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-400" /> Complete 6-Module Screen Walkthrough Ebook
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-400" /> Full 5-Tool Founder Bonus Pack
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-400" /> 100% Satisfaction & Approval Guarantee
                    </li>
                  </ul>
                </div>

                <div className="kit-card p-6 border border-border bg-background/90 shrink-0 w-full md:w-72 text-center flex flex-col items-center gap-4">
                  <div className="text-xs font-mono text-muted-foreground uppercase">One-Time Fee</div>
                  <div className="text-4xl font-bold font-mono text-primary">{siteConfig.pricing.ebook.price}</div>
                  <p className="text-xs text-muted-foreground">Instant download after checkout</p>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="btn-primary w-full justify-center flex items-center gap-2 py-3"
                  >
                    <Download className="size-4" />
                    <span>Get Instant Access</span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-emerald-400" /> Secure Checkout
                  </div>
                </div>
              </div>
            </DepthTiltCard>
          </BlurReveal>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Looking for 1-on-1 guided live assistance instead?{" "}
            <a href="/do-it-with-us" className="text-primary font-semibold underline underline-offset-4">
              Explore Do It With Us (₦25,000)
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-[var(--section-space)]">
        <div className="mx-auto w-[var(--container)] max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-[length:var(--text-h1)]">Frequently Asked Questions</h2>
            <p className="text-[length:var(--text-body)] text-muted-foreground mt-2">
              Everything you need to know about the Register It Yourself Ebook.
            </p>
          </div>

          <div className="space-y-4">
            {EBOOK_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="kit-card border border-border overflow-hidden rounded-xl">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between font-semibold text-[length:var(--text-body-lg)] hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`size-5 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[length:var(--text-body)] text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Banner */}
      <StartNowCTA />

      {/* INTERACTIVE CHECKOUT & ORDER BUMP MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="kit-card border border-border bg-background w-full max-w-lg p-6 lg:p-8 rounded-2xl relative shadow-2xl my-8">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="size-5" />
            </button>

            {!isPurchased ? (
              <form onSubmit={handleCompletePurchase} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    <Sparkles className="size-3.5" /> Instant Digital Delivery
                  </div>
                  <h3 className="text-[length:var(--text-h2)] font-bold">Complete Your Order</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground">
                    Enter your details to receive your instant PDF download & bonus package.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Michelle Okafor"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* ORDER BUMP CHECKBOX */}
                <div className="p-4 rounded-xl border border-primary/40 bg-primary/10 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeOrderBump}
                      onChange={(e) => setIncludeOrderBump(e.target.checked)}
                      className="mt-1 size-4 rounded accent-primary cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground flex items-center gap-1">
                          <PlusCircle className="size-4 text-primary" /> Special Order Bump: Add 2 Custom Letterheads
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary text-black font-bold">
                          +{siteConfig.pricing.orderBumpLetterheads.price}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Get 2 print-ready + editable business letterhead templates delivered after your CAC approval. (Normally ₦15,000).
                      </p>
                    </div>
                  </label>
                </div>

                {/* Order Summary & Total */}
                <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Register It Yourself Ebook + Bonuses</span>
                    <span className="font-mono text-foreground font-semibold">{siteConfig.pricing.ebook.price}</span>
                  </div>
                  {includeOrderBump && (
                    <div className="flex justify-between text-primary font-medium">
                      <span>Order Bump: 2 Custom Letterheads</span>
                      <span className="font-mono font-semibold">+{siteConfig.pricing.orderBumpLetterheads.price}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-border/60 flex justify-between text-sm font-bold text-foreground">
                    <span>Total Amount Due</span>
                    <span className="font-mono text-primary text-base">₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3 text-sm font-bold flex items-center gap-2">
                  <span>Pay & Download Instant PDF — ₦{totalPrice.toLocaleString()}</span>
                  <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              /* PURCHASE COMPLETE & UPSELL MODAL VIEW */
              <div className="space-y-6 text-center">
                <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="size-10" />
                </div>
                <div>
                  <h3 className="text-[length:var(--text-h2)] font-bold text-foreground">
                    Thank You, {buyerName || "Founder"}!
                  </h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">
                    Your order confirmation and download link have been sent to <strong className="text-foreground">{buyerEmail}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/80 border border-border text-left space-y-2">
                  <p className="text-xs font-mono text-primary font-semibold uppercase">Instant Download Ready</p>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Simulating Ebook PDF download! Your download has started.");
                    }}
                    className="btn-secondary w-full justify-center flex items-center gap-2 text-xs py-2.5"
                  >
                    <Download className="size-4" />
                    <span>Download RIY Ebook & Bonus Pack (.PDF)</span>
                  </a>
                </div>

                {/* UPSELL OFFER SECTION */}
                <div className="p-6 rounded-2xl border-2 border-primary/60 bg-gradient-to-b from-primary/10 to-transparent text-left space-y-4 relative">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-black font-mono font-bold text-[11px] uppercase">
                    <Sparkles className="size-3" /> Exclusive Ebook Buyer Upgrade
                  </div>
                  <h4 className="font-bold text-[length:var(--text-h3)]">
                    Stuck or want someone beside you? Upgrade to Do It With Us for just ₦15,000.
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your ₦10,000 ebook payment is already deducted! Get a live 1-on-1 Zoom session where we guide you through every portal click, plus 2 custom letterhead designs.
                  </p>
                  <div className="p-3 rounded-xl bg-background border border-border text-xs font-mono text-muted-foreground flex justify-between items-center">
                    <span>Your Upgrade Unlock Code:</span>
                    <span className="font-bold text-primary text-sm tracking-wider">EBOOK10K</span>
                  </div>
                  <a
                    href="/do-it-with-us"
                    className="btn-primary w-full justify-center flex items-center gap-2 text-xs py-3 font-bold"
                  >
                    <span>Claim Your ₦15,000 Live Upgrade</span>
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
