import { useState } from "react";
import { siteConfig } from "@/config/site";
import { trackLead } from "@/utils/analytics";

type ContactSectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ContactSection({
  title = "Talk to our CAC Registration Team",
  subtitle = "Have questions before getting started? Reach out via WhatsApp, Email, or send us a direct message below.",
  className = "",
}: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact.trim()) return;
    trackLead(`${formData.name} - ${formData.contact}: ${formData.message}`, "Contact Section Form");
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`py-[var(--section-space)] text-foreground bg-background ${className}`}>
      <div className="mx-auto w-[var(--container)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Info & Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider">
              📍 Direct Support
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg flex-none">
                📍
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">Lagos Office</h4>
                <p className="text-xs sm:text-sm text-foreground/80">Lagos, Nigeria (9am–5pm WAT, Mon–Fri)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg flex-none">
                📱
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">WhatsApp Direct Line</h4>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {siteConfig.whatsapp}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-lg flex-none">
                ✉️
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">Email Support</h4>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Contrast Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-md">
          <h3 className="text-xl font-bold text-foreground mb-2">Send us a message</h3>
          <p className="text-xs sm:text-sm text-foreground/75 mb-6">
            Enter your details below and our team will get back to you within 2 to 4 hours.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adewale Okafor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full min-h-[46px] rounded-xl bg-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Email or WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. adewale@gmail.com or 08123456789"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full min-h-[46px] rounded-xl bg-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  How can we help?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your business name or CAC query..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-xs flex items-center justify-center cursor-pointer"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-center space-y-2">
              <span className="text-2xl">✅</span>
              <h4 className="font-bold text-lg">Message Received!</h4>
              <p className="text-sm">
                Thank you, {formData.name || "friend"}. Our team will reach out to you via WhatsApp or Email shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
