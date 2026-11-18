import { useState } from "react";
import { siteConfig } from "@/config/site";
import { trackPurchase } from "@/utils/analytics";

export interface PaystackCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: "ebook" | "doItWithUs" | "doItWithUsUpgrade" | "deposit";
  onOpenCalendlyWithCode?: (code: string) => void;
}

export default function PaystackCheckoutModal({
  isOpen,
  onClose,
  initialTier = "ebook",
  onOpenCalendlyWithCode,
}: PaystackCheckoutModalProps) {
  const [selectedTier, setSelectedTier] = useState<"ebook" | "doItWithUs" | "doItWithUsUpgrade" | "deposit">(initialTier);
  const [includeOrderBump, setIncludeOrderBump] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upgradeInputCode, setUpgradeInputCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<null | {
    txId: string;
    productName: string;
    totalAmount: number;
    upgradeCode: string;
    downloadUrl: string;
  }>(null);

  if (!isOpen) return null;

  // Base pricing logic
  const getBasePrice = () => {
    switch (selectedTier) {
      case "ebook":
        return siteConfig.pricing.ebook.amount;
      case "doItWithUs":
        return siteConfig.pricing.doItWithUs.amountFull;
      case "doItWithUsUpgrade":
        return siteConfig.pricing.doItWithUs.amountUpgrade;
      case "deposit":
        return siteConfig.pricing.doItWithUs.depositAmount;
      default:
        return 10000;
    }
  };

  const basePrice = getBasePrice();
  const bumpPrice = includeOrderBump ? siteConfig.pricing.orderBumpLetterheads.amount : 0;
  const totalAmount = basePrice + bumpPrice;

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsProcessing(true);

    // Simulate Paystack transaction resolution
    setTimeout(() => {
      const txId = `PAY-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const generatedUpgradeCode = `RIY-UPG-${Math.floor(1000 + Math.random() * 9000)}`;
      const productName =
        selectedTier === "ebook"
          ? "Register It Yourself Complete DIY Ebook"
          : selectedTier === "doItWithUs"
          ? "Do It With Us 1-on-1 Guided CAC Registration"
          : selectedTier === "doItWithUsUpgrade"
          ? "Do It With Us Upgrade (Ebook Owner)"
          : "Do It With Us Session Deposit";

      trackPurchase({
        transactionId: txId,
        productName: includeOrderBump ? `${productName} + 2 Custom Letterheads` : productName,
        amount: totalAmount,
        currency: "NGN",
        email,
      });

      setPurchaseSuccess({
        txId,
        productName,
        totalAmount,
        upgradeCode: generatedUpgradeCode,
        downloadUrl: "#download-ebook-pdf",
      });
      setIsProcessing(false);
    }, 1200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    alert(`Upgrade code ${code} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-amber-500/30 p-6 text-foreground shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!purchaseSuccess ? (
          <div>
            <div className="mb-6">
              <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
                🔒 Secure Paystack Checkout
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Complete Your Order
              </h2>
              <p className="text-sm text-zinc-400">
                Instant delivery of your guide and instant access to 1-on-1 booking.
              </p>
            </div>

            {/* Tier Selector */}
            <div className="mb-4 space-y-2">
              <label className="text-xs font-medium text-zinc-400">Select Package:</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setSelectedTier("ebook")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTier === "ebook"
                      ? "border-amber-500 bg-amber-500/10 text-white font-medium"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-semibold text-white">DIY Ebook</div>
                  <div className="text-xs text-amber-400">₦10,000</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTier("doItWithUs")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTier === "doItWithUs"
                      ? "border-amber-500 bg-amber-500/10 text-white font-medium"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-semibold text-white">Do It With Us</div>
                  <div className="text-xs text-amber-400">₦25,000 (Full)</div>
                </button>
              </div>

              {/* Special options */}
              <div className="flex gap-2 text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTier("doItWithUsUpgrade")}
                  className={`underline ${selectedTier === "doItWithUsUpgrade" ? "text-amber-400 font-semibold" : "text-zinc-400 hover:text-white"}`}
                >
                  Already own Ebook? Upgrade for ₦15,000
                </button>
                <span className="text-zinc-600">·</span>
                <button
                  type="button"
                  onClick={() => setSelectedTier("deposit")}
                  className={`underline ${selectedTier === "deposit" ? "text-amber-400 font-semibold" : "text-zinc-400 hover:text-white"}`}
                >
                  Pay ₦7,500 Deposit
                </button>
              </div>
            </div>

            {/* Order Bump Section */}
            <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOrderBump}
                  onChange={(e) => setIncludeOrderBump(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-amber-500 text-amber-500 focus:ring-amber-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider block">
                    ⚡ Exclusive Checkout Offer:
                  </span>
                  <span className="text-zinc-200">
                    Add 2 Custom Business Letterhead Designs (Print-ready PDF + Editable doc) for just{" "}
                    <strong className="text-amber-400">₦5,000</strong> (Regular ₦10,000).
                  </span>
                </div>
              </label>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handlePaystackPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Michelle Okafor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-zinc-800/80 border border-zinc-700 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800/80 border border-zinc-700 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800/80 border border-zinc-700 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {selectedTier === "doItWithUsUpgrade" && (
                <div>
                  <label className="block text-xs font-medium text-amber-400 mb-1">Upgrade Code (from Ebook Purchase)</label>
                  <input
                    type="text"
                    placeholder="e.g. RIY-UPG-8912"
                    value={upgradeInputCode}
                    onChange={(e) => setUpgradeInputCode(e.target.value)}
                    className="w-full rounded-xl bg-amber-950/30 border border-amber-500/40 px-3.5 py-2 text-sm text-amber-200 placeholder-amber-600/60 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Total & Submit Button */}
              <div className="pt-2">
                <div className="flex items-center justify-between py-2 border-t border-zinc-800 text-sm mb-3">
                  <span className="text-zinc-400">Total Due:</span>
                  <span className="text-xl font-bold text-amber-400">
                    ₦{totalAmount.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3 text-center text-sm font-bold text-zinc-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isProcessing ? "Processing via Paystack..." : `Pay ₦${totalAmount.toLocaleString()} via Paystack`}
                </button>
              </div>
            </form>

            <p className="mt-3 text-center text-[11px] text-zinc-500">
              💳 Secured by Paystack. Card, Bank Transfer, USSD & Apple Pay accepted.
            </p>
          </div>
        ) : (
          /* Instant Delivery Screen */
          <div className="py-2 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-2xl">
              ✓
            </div>

            <div>
              <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Payment Successful • Ref: {purchaseSuccess.txId}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Welcome to Register It Yourself!
              </h2>
              <p className="text-sm text-zinc-300">
                Your payment for <strong className="text-amber-400">{purchaseSuccess.productName}</strong> is confirmed. A receipt and digital access link have been sent to <strong>{email}</strong>.
              </p>
            </div>

            {/* Download Ebook CTA */}
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">📥 DIY Ebook & Bonus Pack</div>
                  <div className="text-xs text-zinc-400">PDF Guide, Name Worksheet, Checklists & Templates</div>
                </div>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Starting instant download of Register It Yourself Ebook PDF + Bonus Kit!");
                  }}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400"
                >
                  Download PDF
                </a>
              </div>
            </div>

            {/* One-Time Upgrade Code Box */}
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 text-left space-y-2">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                🎁 Your One-Time ₦15,000 Live Session Upgrade Code:
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-950 border border-amber-500/30 p-2.5">
                <code className="text-base font-mono font-bold text-amber-300">
                  {purchaseSuccess.upgradeCode}
                </code>
                <button
                  onClick={() => handleCopyCode(purchaseSuccess.upgradeCode)}
                  className="text-xs font-semibold text-amber-400 hover:text-white underline"
                >
                  Copy Code
                </button>
              </div>
              <p className="text-xs text-zinc-300">
                Stuck or want someone beside you? Upgrade to <strong>Do It With Us</strong> anytime for just ₦15,000 (your ₦10,000 is already deducted!).
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              {onOpenCalendlyWithCode && (
                <button
                  type="button"
                  onClick={() => {
                    const code = purchaseSuccess.upgradeCode;
                    onClose();
                    onOpenCalendlyWithCode(code);
                  }}
                  className="flex-1 rounded-xl bg-amber-500 py-2.5 text-center text-xs font-bold text-black hover:bg-amber-400"
                >
                  Book 1-on-1 Session Now →
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-center text-xs font-medium text-zinc-300 hover:bg-zinc-700"
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
