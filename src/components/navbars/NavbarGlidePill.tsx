"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { introSignal } from "@/components/kit/introSignal";
import useMenuDialog from "@/components/kit/useMenuDialog";

type NavbarGlidePillProps = {
  brand?: string;
  navItems?: { name: string; href: string }[];
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NavbarGlidePill({
  brand = "RIY",
  navItems = [
    { name: "Home", href: "/" },
    { name: "Ebook Guide", href: "/ebook" },
    { name: "Do It With Us", href: "/do-it-with-us" },
    { name: "Name Generator", href: "/name-generator" },
    { name: "Add-ons", href: "/add-ons" },
    { name: "About", href: "/about" },
  ],
  primaryButton = { text: "Get the Guide", href: "/ebook" },
  secondaryButton,
  className,
}: NavbarGlidePillProps) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  useMenuDialog(open, panelRef, () => setOpen(false));

  useEffect(() => introSignal.onReveal(() => setReady(true)), []);

  const glide = (el: HTMLElement) => {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
    pill.style.opacity = "1";
  };
  const hidePill = () => {
    if (pillRef.current) pillRef.current.style.opacity = "0";
  };

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1, ease: EASE, delay: i * 0.09 + 0.25 },
  });

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-foreground ${className ?? ""}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_80%,transparent),transparent)] backdrop-blur-md" />
      <div ref={panelRef} className="relative mx-auto w-[var(--container)]">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 lg:grid-cols-[auto_1fr_auto]">
          {/* Logo */}
          <motion.a {...rise(0)} href="/" className="flex items-center gap-2.5 justify-self-start text-[length:var(--text-body-lg)] font-bold tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-black font-extrabold text-sm">
              RIY
            </div>
            <p className="whitespace-nowrap text-white font-bold">{brand}</p>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.nav
            {...rise(1)}
            aria-label="Main"
            onPointerLeave={hidePill}
            className="relative hidden h-[3.125rem] items-center justify-self-center rounded-full bg-zinc-900/80 border border-zinc-800 px-2 backdrop-blur-md lg:flex"
          >
            <div
              ref={pillRef}
              aria-hidden="true"
              className="absolute bottom-1 left-0 top-1 w-0 rounded-full bg-amber-500/20 opacity-0 transition-[transform,width,opacity] duration-[450ms,450ms,300ms] ease-[var(--ease-out)]"
            />
            {navItems.map((item) => (
              <a
                key={item.href + item.name}
                href={item.href}
                onPointerEnter={(e) => glide(e.currentTarget)}
                onFocus={(e) => glide(e.currentTarget)}
                onBlur={hidePill}
                className="relative z-[1] whitespace-nowrap px-4 text-sm font-semibold tracking-tight text-zinc-100 transition-colors duration-300 hover:text-amber-400 focus-visible:text-amber-400 focus-visible:outline-none"
              >
                {item.name}
              </a>
            ))}
          </motion.nav>

          {/* Header Buttons */}
          <motion.div {...rise(2)} className="flex items-center gap-3 justify-self-end">
            {secondaryButton && (
              <DotArrowButton
                text={secondaryButton.text}
                href={secondaryButton.href}
                variant="secondary"
                className="hidden lg:inline-flex text-xs"
              />
            )}
            {/* Gold Get Started Button */}
            <a
              href={primaryButton.href}
              className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>{primaryButton.text}</span>
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <path d="M2.5 7h9M7.5 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-[3.125rem] items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-md lg:hidden"
            >
              <div aria-hidden="true" className={`absolute h-px w-3.5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <div aria-hidden="true" className={`absolute h-px w-3.5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </motion.div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} inert={!open}>
          <div className="overflow-hidden">
            <nav aria-label="Mobile" className="flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 p-5 mt-2 shadow-2xl">
              {navItems.map((item) => (
                <a
                  key={item.href + item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-zinc-800/60 py-3 text-sm font-medium text-zinc-200 hover:text-amber-400"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={primaryButton.href}
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3 text-center text-xs font-bold text-black shadow-lg shadow-amber-500/20"
                >
                  {primaryButton.text} — ₦10,000
                </a>
                {secondaryButton && (
                  <a
                    href={secondaryButton.href}
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-center text-xs font-medium text-zinc-300"
                  >
                    {secondaryButton.text}
                  </a>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
