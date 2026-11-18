import { useState } from "react";
import BlurReveal from "@/components/kit/BlurReveal";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { HaloRings } from "@/components/kit/CardShine";
import { siteConfig } from "@/config/site";
import { trackLead } from "@/utils/analytics";

type FooterRingHorizonProps = {
  brand?: string;
  title?: string;
  titleMuted?: string;
  note?: string;
  primaryButton?: { text: string; href: string };
  columns?: { title: string; links: { text: string; href: string }[] }[];
  copyright?: string;
  legal?: { text: string; href: string }[];
  className?: string;
};

export default function FooterRingHorizon({
  brand = siteConfig.name,
  title = "Yourself. This week.",
  titleMuted = "Register your business with CAC.",
  note = "Clear step-by-step guidance, live 1-on-1 support, and zero hidden agent fees. An independent training platform for Nigerian entrepreneurs.",
  primaryButton = { text: "Get DIY Ebook — ₦10,000", href: "/ebook" },
  columns = [
    {
      title: "Products & Tools",
      links: [
        { text: "DIY Ebook Guide (₦10,000)", href: "/ebook" },
        { text: "Do It With Us (₦25,000)", href: "/do-it-with-us" },
        { text: "Free Business Name Checker", href: "/name-generator" },
        { text: "Add-ons & Design Services", href: "/add-ons" },
      ],
    },
    {
      title: "About & Proof",
      links: [
        { text: "About & Founder Story", href: "/about" },
        { text: "Dr. Michelle's CAC Journey", href: "/about#founder-story" },
        { text: "100% Satisfaction Guarantee", href: "/#trust" },
        { text: "Frequently Asked Questions", href: "/#faq" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { text: "Privacy Policy (NDPA-aware)", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Refund & Booking Policy", href: "/refund-policy" },
        { text: siteConfig.email, href: `mailto:${siteConfig.email}` },
      ],
    },
  ],
  copyright = `© 2026 ${siteConfig.name} (${siteConfig.domain}). All rights reserved. Registered in Nigeria: ${siteConfig.cacNumber}`,
  legal = [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
    { text: "Refund Policy", href: "/refund-policy" },
  ],
  className,
}: FooterRingHorizonProps) {
  const [signupInput, setSignupInput] = useState("");
  const [signupDone, setSignupDone] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupInput.trim()) return;
    trackLead(signupInput, "Footer WhatsApp Newsletter Signup");
    setSignupDone(true);
  };

  return (
    <footer aria-label="Footer" className={`relative overflow-clip bg-background pb-8 pt-[var(--section-space)] text-foreground ${className ?? ""}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,#000_92%,transparent),linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]">
        <HaloRings
          rings={[
            { inset: "0", className: "text-border opacity-60" },
            { inset: "12%", className: "text-border opacity-30" },
          ]}
          className="absolute left-1/2 top-[68%] aspect-square w-[min(150vw,75rem)] -translate-x-1/2"
        />
      </div>
      <div className="relative mx-auto grid w-[var(--container)] gap-[clamp(2.5rem,5vw,4rem)]">
        
        {/* Banner Section */}
        <div className="flex flex-col gap-6 border-b border-border pb-[clamp(2.5rem,5vw,4rem)] lg:flex-row lg:items-end lg:justify-between">
          <BlurReveal as="h2" y={26} className="max-w-[18ch] text-balance text-[length:var(--text-h1)] font-bold">
            {titleMuted && <div className="text-foreground/50">{titleMuted}</div>}
            <div className="text-amber-400">{title}</div>
          </BlurReveal>
          {primaryButton && (
            <DotArrowButton text={primaryButton.text} href={primaryButton.href} className="w-full sm:w-auto sm:self-start lg:self-auto" />
          )}
        </div>

        {/* Newsletter & WhatsApp List Signup */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              📲 Join 3,500+ Nigerian Founders
            </span>
            <h3 className="text-lg font-bold text-white">
              Get CAC Updates & Free Business Tools
            </h3>
            <p className="text-xs text-zinc-400 max-w-lg">
              Receive instant updates on CAC portal policy changes, name approval tips, and free document templates direct to your email or WhatsApp.
            </p>
          </div>

          {!signupDone ? (
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-2">
              <input
                type="text"
                required
                placeholder="Email or WhatsApp number..."
                value={signupInput}
                onChange={(e) => setSignupInput(e.target.value)}
                className="w-full lg:w-72 rounded-xl bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400 whitespace-nowrap"
              >
                Join Free List
              </button>
            </form>
          ) : (
            <div className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-4 py-3 rounded-xl">
              ✓ You are subscribed! Check your inbox/WhatsApp for your bonus toolkit.
            </div>
          )}
        </div>

        {/* Links Grid & Socials */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="col-span-2 grid content-start gap-4 lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 text-[length:var(--text-h3)] leading-none tracking-tight font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-black font-extrabold text-xs">
                RIY
              </div>
              <p className="text-white">{brand}</p>
            </a>
            {note && <p className="max-w-[20rem] text-balance text-[length:var(--text-small)] leading-[1.45] text-muted-foreground">{note}</p>}
            
            {/* Business info details */}
            <div className="text-xs text-zinc-400 space-y-1">
              <div>📍 Lagos, Nigeria (9am–5pm WAT)</div>
              <div>✉️ <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-400 underline">{siteConfig.email}</a></div>
              <div>📲 WhatsApp: <a href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`} className="hover:text-amber-400 underline">{siteConfig.whatsapp}</a></div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-zinc-500 font-medium">Follow us:</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.55-1.35 2.56-.01.73.27 1.47.75 2.01.67.75 1.69 1.12 2.67 1.03 1.13-.07 2.19-.74 2.68-1.74.34-.67.44-1.45.43-2.2-.02-5.46-.01-10.93-.01-16.39z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="grid content-start gap-4">
              <h3 className="font-sans text-[length:var(--text-small)] font-bold text-white tracking-wide uppercase">{col.title}</h3>
              <ul className="grid gap-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="btn-link pb-0.5 text-[length:var(--text-body)] text-foreground/85 hover:text-amber-400 transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mandatory CAC Legal Disclaimer Box */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-xs text-zinc-400 leading-relaxed">
          <span className="font-bold text-zinc-300 block mb-1">⚖️ Legal & Affiliation Disclaimer:</span>
          Register It Yourself provides general information and step-by-step guidance on the CAC registration process. It is not a law firm, does not provide legal advice, and is not affiliated with the Corporate Affairs Commission (CAC).
        </div>

        {/* Copyright & Legal Links Footer */}
        <div className="flex flex-col gap-3 border-t border-border pt-6 text-[length:var(--text-small)] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          {copyright && <p>{copyright}</p>}
          {legal.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {legal.map((link) => (
                <a key={link.text} href={link.href} className="transition-colors duration-300 hover:text-amber-400">
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
