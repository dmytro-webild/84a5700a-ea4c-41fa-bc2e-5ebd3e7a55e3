import { useState } from "react";
import SEOHead from "@/components/kit/SEOHead";
import { siteConfig } from "@/config/site";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "refund">("privacy");

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <SEOHead seo={siteConfig.seo.pages.legal} />
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Official Legal Information
          </span>
          <h1 className="text-[length:var(--text-display)] font-bold tracking-tight text-white">
            Terms, Privacy & Policy
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Transparent, NDPA-aware privacy rules and clear service guidelines for Register It Yourself customers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "privacy"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            NDPA Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "terms"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "refund"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            Refund & Booking Policy
          </button>
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 space-y-6 leading-relaxed text-sm text-zinc-300">
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">NDPA Data Protection & Privacy Policy</h2>
              <p className="text-xs text-amber-400">Last updated: November 2026 • Compliant with the Nigeria Data Protection Act (NDPA 2023)</p>
              
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">1. Data Minimization Mandate</h3>
                <p>
                  Register It Yourself collects only the data strictly necessary for processing business name verification, guided CAC registration, and order delivery. This includes your name, contact email, WhatsApp phone number, and proposed business names.
                </p>

                <h3 className="text-base font-semibold text-white">2. Temporary ID Document Storage & Deletion</h3>
                <p className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs">
                  <strong>🔒 Strict Security Commitment:</strong> Any Identification documents (NIN, Voter's Card, International Passport) or passport photos shared during a 1-on-1 guided session are used strictly for real-time filing support. All shared ID files are permanently deleted from our temporary storage within 48 hours of session completion.
                </p>

                <h3 className="text-base font-semibold text-white">3. Third-Party Integrations</h3>
                <p>
                  Payments are processed securely via Paystack. We do not store or process payment card digits on our servers. Session scheduling data is stored via Calendly and communications occur via WhatsApp / email.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Terms of Service & CAC Disclaimer</h2>
              <p className="text-xs text-amber-400">Effective Date: November 2026</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">1. Independent Educational Platform</h3>
                <p className="p-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-200">
                  ⚠️ <strong>Disclaimer:</strong> {siteConfig.name} provides general guidance and step-by-step educational instructions on navigating the Corporate Affairs Commission (CAC) portal. We are not a law firm, do not provide legal or financial advice, and are not affiliated with or endorsed by the Corporate Affairs Commission.
                </p>

                <h3 className="text-base font-semibold text-white">2. User Responsibility</h3>
                <p>
                  You maintain full control of your CAC account credentials, submission choices, and statutory filings. Our materials and guided sessions are designed to help you avoid portal errors and complete your registration smoothly.
                </p>

                <h3 className="text-base font-semibold text-white">3. Intellectual Property</h3>
                <p>
                  The {siteConfig.name} DIY Ebook, name generator algorithm, checklists, and templates are protected proprietary content. Re-selling or distributing paid materials without written permission is strictly prohibited.
                </p>
              </div>
            </div>
          )}

          {activeTab === "refund" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">100% Satisfaction & Guarantee Policy</h2>
              <p className="text-xs text-amber-400">Guarantee Coverage & Session Rescheduling</p>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">1. CAC Approval Guarantee</h3>
                <p>
                  If you follow our step-by-step process and your business name submission is queried or rejected by CAC due to layout or formatting issues, our team will review your filing for free and guide you through the query fix at zero extra charge.
                </p>

                <h3 className="text-base font-semibold text-white">2. 1-on-1 Guided Session Rescheduling</h3>
                <p>
                  Sessions booked under <em>Do It With Us</em> can be rescheduled free of charge up to 12 hours before the appointment. Session deposits (₦7,500) are fully transferable to any future available slot.
                </p>

                <h3 className="text-base font-semibold text-white">3. Refund Request Procedure</h3>
                <p>
                  To request assistance or inquire about refunds under our guarantee, email <a href={`mailto:${siteConfig.email}`} className="text-amber-400 underline">{siteConfig.email}</a> or contact WhatsApp support at {siteConfig.whatsapp}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
