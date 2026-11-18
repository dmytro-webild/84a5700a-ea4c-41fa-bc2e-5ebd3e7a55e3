import { useState } from "react";
import { siteConfig } from "@/config/site";
import { trackUpgradeCode } from "@/utils/analytics";

export interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUpgradeCode?: string;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  initialUpgradeCode = "",
}: CalendlyModalProps) {
  const [upgradeCode, setUpgradeCode] = useState(initialUpgradeCode);
  const [codeApplied, setCodeApplied] = useState(Boolean(initialUpgradeCode));
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [selectedTime, setSelectedTime] = useState("10:00 AM WAT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upgradeCode.trim()) return;

    // Validate upgrade code (accepts format RIY-UPG-XXXX or any code starting with RIY or UPG)
    const isValid = upgradeCode.trim().length >= 4;
    trackUpgradeCode(upgradeCode, isValid);

    if (isValid) {
      setCodeApplied(true);
    } else {
      alert("Invalid upgrade code format. Please check your purchase receipt email.");
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setBookingConfirmed(true);
  };

  const priceDue = codeApplied
    ? siteConfig.pricing.doItWithUs.priceUpgrade
    : siteConfig.pricing.doItWithUs.priceFull;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-zinc-900 border border-amber-500/30 p-6 text-foreground shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!bookingConfirmed ? (
          <div className="space-y-4">
            <div>
              <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
                📅 1-on-1 Guided CAC Session
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Schedule Your Live Session
              </h2>
              <p className="text-sm text-zinc-400">
                Hop on a screen-by-screen Zoom / Google Meet call with an expert.
              </p>
            </div>

            {/* Upgrade Code Verification Bar */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 space-y-2">
              <div className="text-xs font-medium text-amber-300">
                Have an Ebook Upgrade Code?
              </div>
              {!codeApplied ? (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. RIY-UPG-8912"
                    value={upgradeCode}
                    onChange={(e) => setUpgradeCode(e.target.value)}
                    className="flex-1 rounded-lg bg-zinc-950 border border-amber-500/40 px-3 py-1.5 text-xs text-amber-200 placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400"
                  >
                    Apply Code
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg">
                  <span>✓ Code Applied: ₦10,000 Ebook Discount Deducted!</span>
                  <button
                    type="button"
                    onClick={() => setCodeApplied(false)}
                    className="text-zinc-400 hover:text-white underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-sm">
              <span className="text-zinc-300">Session Investment:</span>
              <span className="text-lg font-bold text-amber-400">{priceDue}</span>
            </div>

            {/* Date & Time Picker */}
            <form onSubmit={handleConfirmBooking} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Preferred Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="2026-11-20">Friday, Nov 20, 2026</option>
                    <option value="2026-11-21">Saturday, Nov 21, 2026</option>
                    <option value="2026-11-23">Monday, Nov 23, 2026</option>
                    <option value="2026-11-24">Tuesday, Nov 24, 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Preferred Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="10:00 AM WAT">10:00 AM WAT</option>
                    <option value="1:00 PM WAT">1:00 PM WAT</option>
                    <option value="4:00 PM WAT">4:00 PM WAT</option>
                    <option value="7:00 PM WAT">7:00 PM WAT</option>
                  </select>
                </div>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3 text-center text-xs font-bold text-black hover:brightness-110"
              >
                Confirm Booking Slot & Proceed →
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-2xl">
              📅
            </div>
            <h2 className="text-2xl font-bold text-white">Session Reserved!</h2>
            <p className="text-sm text-zinc-300">
              Your 1-on-1 session is scheduled for <strong className="text-amber-400">{selectedDate} at {selectedTime}</strong>.
            </p>
            <div className="rounded-xl bg-zinc-800 p-4 text-xs text-zinc-300 text-left space-y-2">
              <div>📹 <strong>Meeting Link:</strong> Google Meet link sent to <em>{email}</em></div>
              <div>📲 <strong>WhatsApp Reminder:</strong> We will remind you 2 hours before the call.</div>
              <div>📄 <strong>Preparation:</strong> Have your proposed business names and NIN / ID ready!</div>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
