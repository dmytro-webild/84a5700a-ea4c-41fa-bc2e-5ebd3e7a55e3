import { useState } from "react";
import PaystackCheckoutModal from "@/components/kit/PaystackCheckoutModal";
import SEOHead from "@/components/kit/SEOHead";
import { siteConfig } from "@/config/site";

export default function AddonsPage() {
  const [paystackOpen, setPaystackOpen] = useState(false);
  const [trademarkModalOpen, setTrademarkModalOpen] = useState(false);
  const [trademarkSubmitted, setTrademarkSubmitted] = useState(false);
  const [tmName, setTmName] = useState("");
  const [tmContact, setTmContact] = useState("");

  const addonServices = siteConfig.pricing.addOns;

  const handleTrademarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrademarkSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <SEOHead seo={siteConfig.seo.pages.addOns} />
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Post-Registration Brand & Design Add-ons
          </span>
          <h1 className="text-[length:var(--text-display)] font-bold tracking-tight text-white">
            Elevate Your New Business Brand
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Get official letterheads, business cards, branded document templates, and trademark filing support delivered 2–3 working days after CAC approval.
          </p>
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addonServices.map((addon, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                addon.popular
                  ? "border-amber-500 bg-amber-950/10 shadow-xl shadow-amber-500/5"
                  : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
                    {addon.badge}
                  </span>
                  <span className="text-lg font-bold text-white">{addon.price}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{addon.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">{addon.description}</p>
              </div>

              {addon.quote ? (
                <button
                  type="button"
                  onClick={() => setTrademarkModalOpen(true)}
                  className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 py-2.5 text-center text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
                >
                  Request Trademark Quote →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPaystackOpen(true)}
                  className="w-full rounded-xl bg-amber-500 py-2.5 text-center text-xs font-bold text-black hover:bg-amber-400 transition-all"
                >
                  Order Design Service →
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Trademark Inquiry Modal */}
        {trademarkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-amber-500/30 p-6 text-foreground shadow-2xl">
              <button
                onClick={() => setTrademarkModalOpen(false)}
                className="absolute right-4 top-4 text-zinc-400 hover:text-white"
              >
                ✕
              </button>

              {!trademarkSubmitted ? (
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
                    🛡️ Trademark Filing Support
                  </span>
                  <h3 className="text-xl font-bold text-white">Protect Your Brand & Logo</h3>
                  <p className="text-xs text-zinc-400">
                    Get an official search, class determination, and trademark filing quote for the Ministry of Industry, Trade and Investment.
                  </p>

                  <form onSubmit={handleTrademarkSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Proposed Trademark Name / Logo Description *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Velorn Global Trade Mark"
                        value={tmName}
                        onChange={(e) => setTmName(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Your WhatsApp Number or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. hello@domain.com or +234..."
                        value={tmContact}
                        onChange={(e) => setTmContact(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
                    >
                      Submit Trademark Inquiry →
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-4 text-center space-y-3">
                  <div className="text-3xl">🛡️</div>
                  <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-xs text-zinc-300">
                    Our trademark specialist will contact <strong>{tmContact}</strong> via WhatsApp within 2 hours with filing class guidance and fee breakdown.
                  </p>
                  <button
                    onClick={() => {
                      setTrademarkSubmitted(false);
                      setTrademarkModalOpen(false);
                    }}
                    className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        <PaystackCheckoutModal
          isOpen={paystackOpen}
          onClose={() => setPaystackOpen(false)}
        />
      </div>
    </div>
  );
}
