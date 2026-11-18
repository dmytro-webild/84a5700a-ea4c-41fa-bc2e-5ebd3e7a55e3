import { useEffect, useState } from "react";
import { trackLead } from "@/utils/analytics";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user already dismissed/submitted
    if (localStorage.getItem("riy_exit_popup_dismissed") === "true") {
      return;
    }

    // 1. Desktop Exit-Intent trigger (mouse leaves top of browser window)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setIsOpen(true);
      }
    };

    // 2. Mobile Timed Slide-in trigger (after 12 seconds)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("riy_exit_popup_dismissed", "true");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    trackLead(contact, "Document Prep Checklist Exit Popup");
    setSubmitted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("riy_exit_popup_dismissed", "true");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 border border-amber-500/30 p-6 text-foreground shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close popup"
        >
          ✕
        </button>

        {!submitted ? (
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              🎁 FREE DOWNLOADABLE TOOLKIT
            </span>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Free CAC Document Prep Checklist
              </h3>
              <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
                Before you open the CAC portal, make sure you have the exact file dimensions, valid ID types, and name formatting rules to avoid instant rejection!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Enter your Email or WhatsApp Number:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. name@domain.com or +234..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3 text-center text-xs font-bold text-black hover:brightness-110 shadow-lg shadow-amber-500/20"
              >
                Send Me The Free Checklist →
              </button>
            </form>

            <p className="text-[10px] text-center text-zinc-500">
              Zero spam. 100% privacy guarantee. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="py-4 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 text-xl border border-emerald-500/30">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Checklist Unlocked!</h3>
            <p className="text-xs text-zinc-300">
              Your copy of the <strong>CAC Document Prep Checklist</strong> is ready for instant download.
            </p>

            <a
              href="#download-checklist"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading CAC Document Prep Checklist PDF...");
                handleClose();
              }}
              className="inline-block w-full rounded-xl bg-amber-500 py-2.5 text-center text-xs font-bold text-black hover:bg-amber-400"
            >
              📥 Download PDF Checklist Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
