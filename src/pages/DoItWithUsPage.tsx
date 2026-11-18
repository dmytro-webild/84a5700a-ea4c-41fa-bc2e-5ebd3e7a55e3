import { useState } from "react";
import SEOHead from "@/components/kit/SEOHead";
import {
  Video,
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  Tag,
  ChevronDown,
} from "lucide-react";
import BlurReveal from "@/components/kit/BlurReveal";
import DepthTiltCard from "@/components/library/effects/DepthTiltCard";
import HeroFloatingCard from "@/components/sections/hero/HeroFloatingCard";
import StartNowCTA from "@/components/sections/cta/StartNowCTA";
import Letterhead3DShowcase from "@/components/sections/showcase/Letterhead3DShowcase";
import { siteConfig } from "@/config/site";

const TIME_SLOTS = [
  "09:00 AM (WAT)",
  "11:30 AM (WAT)",
  "02:00 PM (WAT)",
  "04:30 PM (WAT)",
];

const AVAILABLE_DAYS = [
  { day: "Thu", date: "Nov 19" },
  { day: "Fri", date: "Nov 20" },
  { day: "Sat", date: "Nov 21" },
  { day: "Mon", date: "Nov 23" },
  { day: "Tue", date: "Nov 24" },
  { day: "Wed", date: "Nov 25" },
];

const SESSION_FAQS = [
  {
    q: "How long does the live 1-on-1 session take?",
    a: "The session typically takes between 45 to 60 minutes. We guide you step-by-step through name search, portal registration, form filing, and document uploads until your application is submitted.",
  },
  {
    q: "How does the deposit payment work?",
    a: "You reserve your session date and time with a ₦7,500 deposit today. The remaining balance (₦17,500 for new clients, or ₦7,500 for ebook owners) is paid 24 hours prior to your call.",
  },
  {
    q: "How do I claim the ₦15,000 price if I already bought the ebook?",
    a: "Enter the code EBOOK10K (or check the 'I already own the ebook' option) on the booking form. We will deduct your ₦10,000 ebook payment from the total.",
  },
  {
    q: "When will I receive my 2 custom letterhead designs?",
    a: "Once your CAC registration is approved, our design team crafts 2 custom business letterhead designs (print-ready PDF + editable Canva/Word format) and delivers them within 2–3 working days.",
  },
];

export default function DoItWithUsPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [isEbookOwner, setIsEbookOwner] = useState(false);
  const [upgradeCode, setUpgradeCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [proposedName, setProposedName] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isUpgraded = isEbookOwner || codeApplied;
  const totalPrice = isUpgraded
    ? siteConfig.pricing.doItWithUs.amountUpgrade
    : siteConfig.pricing.doItWithUs.amountFull;
  const deposit = siteConfig.pricing.doItWithUs.depositAmount;
  const balance = totalPrice - deposit;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (upgradeCode.trim().toUpperCase() === "EBOOK10K") {
      setCodeApplied(true);
      setIsEbookOwner(true);
    } else {
      alert("Invalid code. Use EBOOK10K for ebook buyer discount.");
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsBooked(true);
  };

  return (
    <>
      <SEOHead
        seo={siteConfig.seo.pages.doItWithUs}
        schema={siteConfig.schema.doItWithUsService}
      />
      {/* 1. Hero Section */}
      <div id="diwu-hero" data-webild-section="HeroFloatingCard" data-section="hero">
        <HeroFloatingCard
          shape="twist"
          title="Do it yourself,"
          titleMuted="with an expert right beside you."
          description="Get the full ebook, then hop on a Zoom or Google Meet call with us. We'll go through the CAC registration process together, every click, in real time. You keep control, learn the process, and avoid costly mistakes."
          primaryButton={{
            text: "Book Your Guided Session — ₦7.5k Deposit",
            href: "#booking-plans",
          }}
          secondaryButton={{
            text: "Explore DIY Ebook — ₦10k",
            href: "/ebook",
          }}
        />
      </div>

      {/* 2. What You Get Grid */}
      <section className="py-[var(--section-space)] border-y border-border/80 bg-secondary/30">
        <div className="mx-auto w-[var(--container)]">
          <div className="max-w-3xl">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Complete Package Breakdown
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              Everything Included in Do It With Us
            </BlurReveal>
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mt-3">
              We combine self-paced learning with direct live support and professional branding assets.
            </BlurReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlurReveal delay={0.05}>
              <div className="kit-card p-6 border border-border flex flex-col justify-between h-full">
                <div>
                  <div className="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                    <FileText className="size-6" />
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-semibold">Full RIY Ebook & Bonus Pack</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-2 leading-relaxed">
                    Instant download of our 6-module screen walkthrough, templates, rejection rescue sheets, and compliance calendar.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="size-3.5" /> Instant Access Provided
                </div>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.1}>
              <div className="kit-card p-6 border-2 border-primary/50 flex flex-col justify-between h-full relative">
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-primary text-black font-mono font-bold text-xs uppercase">
                  Live 1-on-1
                </span>
                <div>
                  <div className="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                    <Video className="size-6" />
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-semibold">Live Guided Screen Session</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-2 leading-relaxed">
                    A dedicated 1-on-1 Zoom or Google Meet call where we go through name search, portal filling, and document submission together.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="size-3.5" /> Real-time Click Assistance
                </div>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.15}>
              <div className="kit-card p-6 border border-border flex flex-col justify-between h-full">
                <div>
                  <div className="size-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                    <Sparkles className="size-6" />
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-semibold">2 Custom Business Letterheads</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-2 leading-relaxed">
                    Custom-designed print-ready PDF and editable Canva/Word templates delivered 2–3 working days after CAC approval.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="size-3.5" /> Post-Approval Delivery
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* 3. Letterhead 3D Showcase */}
      <Letterhead3DShowcase />

      {/* 4. Side-by-Side Pricing & Upgrade Cards */}
      <section id="booking-plans" className="py-[var(--section-space)] relative">
        <div className="mx-auto w-[var(--container)]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <BlurReveal as="p" className="text-[length:var(--text-small)] text-primary uppercase tracking-widest font-mono font-semibold">
              Transparent Pricing
            </BlurReveal>
            <BlurReveal as="h2" delay={0.05} className="text-[length:var(--text-h1)] text-balance mt-2">
              Select Your Booking Tier
            </BlurReveal>
            <BlurReveal as="p" delay={0.1} className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed mt-2">
              Whether you're starting fresh or upgrading from the ebook, book with a simple ₦7,500 deposit today.
            </BlurReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: New Customers */}
            <BlurReveal delay={0.05}>
              <DepthTiltCard maxTilt={5}>
                <div className="kit-card p-8 border border-border flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">For New Customers</div>
                    <h3 className="text-[length:var(--text-h2)] font-bold">New Booking</h3>
                    <p className="text-[length:var(--text-small)] text-muted-foreground">
                      Full package: Ebook + Live Zoom Session + 2 Custom Letterheads.
                    </p>
                    <div className="pt-2">
                      <div className="text-4xl font-bold font-mono text-primary">₦25,000</div>
                      <p className="text-xs text-muted-foreground mt-1">Book now with ₦7,500 deposit today</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-foreground/90 pt-4 border-t border-border">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> Full RIY Ebook & Bonus Package
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> Live 1-on-1 Screen Walkthrough Session
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> 2 Custom Letterheads (Print PDF + Editable)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> ₦17,500 balance due 24h before session
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setIsEbookOwner(false);
                      setCodeApplied(false);
                      setShowBooking(true);
                    }}
                    className="btn-primary w-full justify-center mt-8 py-3 flex items-center gap-2"
                  >
                    <span>Book New Session — ₦7.5k Deposit</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </DepthTiltCard>
            </BlurReveal>

            {/* Card 2: Ebook Owners Upgrade */}
            <BlurReveal delay={0.1}>
              <DepthTiltCard maxTilt={5}>
                <div className="kit-card p-8 border-2 border-primary bg-primary/5 flex flex-col justify-between h-full relative">
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-black font-mono font-bold text-xs uppercase">
                    Ebook Buyer Discount
                  </span>

                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Already Own the Ebook?</div>
                    <h3 className="text-[length:var(--text-h2)] font-bold">Ebook Upgrade</h3>
                    <p className="text-[length:var(--text-small)] text-muted-foreground">
                      We automatically deduct the ₦10,000 you paid for the ebook.
                    </p>
                    <div className="pt-2">
                      <div className="text-4xl font-bold font-mono text-primary">₦15,000</div>
                      <p className="text-xs text-muted-foreground mt-1">Book now with ₦7,500 deposit today</p>
                    </div>

                    <ul className="space-y-2.5 text-xs text-foreground/90 pt-4 border-t border-border">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> ₦10,000 Ebook Payment Fully Deducted
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> Live 1-on-1 Screen Walkthrough Session
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> 2 Custom Letterheads (Print PDF + Editable)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" /> ₦7,500 balance due 24h before session
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setIsEbookOwner(true);
                      setCodeApplied(true);
                      setShowBooking(true);
                    }}
                    className="btn-primary w-full justify-center mt-8 py-3 flex items-center gap-2 font-bold"
                  >
                    <span>Claim ₦15k Upgrade — ₦7.5k Deposit</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </DepthTiltCard>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* 5. How It Works (2 Steps Deposit & Balance) */}
      <section className="py-[var(--section-space)] bg-secondary/30 border-y border-border/80">
        <div className="mx-auto w-[var(--container)] max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-[length:var(--text-h1)]">How Booking Works</h2>
            <p className="text-[length:var(--text-body)] text-muted-foreground mt-2">
              Simple 2-step booking process with complete clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="kit-card p-6 border border-border flex flex-col gap-4">
              <div className="size-10 rounded-full bg-primary text-black font-mono font-bold flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="text-[length:var(--text-h3)] font-semibold">Book Slot & Pay ₦7,500 Deposit</h3>
              <p className="text-[length:var(--text-small)] text-muted-foreground leading-relaxed">
                Choose your preferred date and time slot. Pay your ₦7,500 deposit online to secure your session on our calendar instantly.
              </p>
            </div>

            <div className="kit-card p-6 border border-border flex flex-col gap-4">
              <div className="size-10 rounded-full bg-primary text-black font-mono font-bold flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="text-[length:var(--text-h3)] font-semibold">Pay Balance 24h Before Session</h3>
              <p className="text-[length:var(--text-small)] text-muted-foreground leading-relaxed">
                Pay the remaining balance 24 hours before your session (₦17,500 for new customers, or ₦7,500 for ebook owners) and join your live Zoom call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-[var(--section-space)]">
        <div className="mx-auto w-[var(--container)] max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-[length:var(--text-h1)]">Guided Session FAQs</h2>
            <p className="text-[length:var(--text-body)] text-muted-foreground mt-2">
              Have questions about booking or live support?
            </p>
          </div>

          <div className="space-y-4">
            {SESSION_FAQS.map((faq, index) => {
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

      {/* 7. CTA */}
      <StartNowCTA />

      {/* INTERACTIVE BOOKING & SCHEDULING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="kit-card border border-border bg-background w-full max-w-xl p-6 lg:p-8 rounded-2xl relative shadow-2xl my-8">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="size-5" />
            </button>

            {!isBooked ? (
              <form onSubmit={handleConfirmBooking} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    <Video className="size-3.5" /> Live 1-on-1 Zoom Session
                  </div>
                  <h3 className="text-[length:var(--text-h2)] font-bold">Book Your Live Session</h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground">
                    Reserve your date & slot with a ₦7,500 deposit.
                  </p>
                </div>

                {/* Date & Time Picker */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                    <Calendar className="size-4 text-primary" /> Select Preferred Date
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {AVAILABLE_DAYS.map((d) => {
                      const isSelected = selectedDay.date === d.date;
                      return (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => setSelectedDay(d)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "border-primary bg-primary/20 text-primary font-bold"
                              : "border-border bg-secondary/40 hover:bg-secondary text-muted-foreground"
                          }`}
                        >
                          <div className="text-[10px] uppercase font-mono">{d.day}</div>
                          <div className="text-xs font-semibold">{d.date}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" /> Select Time Slot (WAT Timezone)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                            isSelected
                              ? "border-primary bg-primary/20 text-primary font-bold"
                              : "border-border bg-secondary/40 hover:bg-secondary text-muted-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upgrade Code Toggle */}
                <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Tag className="size-4 text-primary" /> Have an Ebook Buyer Upgrade Code?
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      {isUpgraded ? "₦15,000 Tier Applied" : "₦25,000 Standard"}
                    </span>
                  </div>

                  {!codeApplied && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code e.g. EBOOK10K"
                        value={upgradeCode}
                        onChange={(e) => setUpgradeCode(e.target.value)}
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary uppercase font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCode}
                        className="btn-secondary text-xs px-3 py-2"
                      >
                        Apply Code
                      </button>
                    </div>
                  )}

                  {isUpgraded && (
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle className="size-4" /> ₦10,000 Ebook Discount Applied! (Total: ₦15,000)
                    </div>
                  )}
                </div>

                {/* Contact Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michelle Okafor"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">Proposed Business Name(s)</label>
                    <input
                      type="text"
                      placeholder="e.g. Velox Express Ventures"
                      value={proposedName}
                      onChange={(e) => setProposedName(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Booking Deposit Summary */}
                <div className="p-4 rounded-xl bg-secondary/80 border border-border space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Selected Slot:</span>
                    <span className="font-semibold text-foreground">{selectedDay.day}, {selectedDay.date} @ {selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total Package Value:</span>
                    <span className="font-mono text-foreground font-semibold">₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Balance Due 24h Before Session:</span>
                    <span className="font-mono text-foreground font-semibold">₦{balance.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-border/60 flex justify-between text-sm font-bold text-foreground">
                    <span>Deposit Payable Now</span>
                    <span className="font-mono text-primary text-base">₦{deposit.toLocaleString()}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3 text-sm font-bold flex items-center gap-2">
                  <span>Pay ₦7,500 Deposit & Confirm Slot</span>
                  <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              /* CONFIRMATION STATE */
              <div className="space-y-6 text-center">
                <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="size-10" />
                </div>
                <div>
                  <h3 className="text-[length:var(--text-h2)] font-bold text-foreground">
                    Booking Confirmed, {clientName}!
                  </h3>
                  <p className="text-[length:var(--text-small)] text-muted-foreground mt-1">
                    Your live session has been reserved for <strong className="text-foreground">{selectedDay.day}, {selectedDay.date} at {selectedTime}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/80 border border-border text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Deposit Paid:</span>
                    <span className="font-mono text-emerald-400 font-bold">₦7,500 (Paid)</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Remaining Balance:</span>
                    <span className="font-mono text-primary font-bold">₦{balance.toLocaleString()} (Due 24h before)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmation Email:</span>
                    <span className="text-foreground font-medium">{clientEmail}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-primary/40 bg-primary/10 text-left space-y-2">
                  <p className="text-xs font-mono text-primary font-bold uppercase">Next Steps</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Check your email for the Zoom / Google Meet invitation link and your instant download copy of the RIY Ebook. Our team will also reach out to you on WhatsApp at <strong className="text-foreground">{clientPhone}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setShowBooking(false)}
                  className="btn-secondary w-full justify-center text-xs py-2.5"
                >
                  Close Confirmation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
