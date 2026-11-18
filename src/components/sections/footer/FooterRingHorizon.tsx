import BlurReveal from "@/components/kit/BlurReveal";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { HaloRings } from "@/components/kit/CardShine";

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
  brand = "Halo",
  title = "from day one",
  titleMuted = "Calm by design",
  note = "Everything you need in one calm place, with nothing hiding in the fine print.",
  primaryButton = { text: "Get started", href: "#" },
  columns = [
    { title: "Product", links: [{ text: "Features", href: "#" }, { text: "Plans", href: "#" }, { text: "Pricing", href: "#" }] },
    { title: "Company", links: [{ text: "About", href: "#" }, { text: "Careers", href: "#" }, { text: "Press", href: "#" }] },
    { title: "Help", links: [{ text: "Support", href: "#" }, { text: "Security", href: "#" }, { text: "Contact", href: "#" }] },
  ],
  copyright = "© 2026 Halo",
  legal = [
    { text: "Privacy", href: "#" },
    { text: "Terms", href: "#" },
  ],
  className,
}: FooterRingHorizonProps) {
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
      <div className="relative mx-auto grid w-[var(--container)] gap-[clamp(3rem,6vw,5rem)]">
        <div className="flex flex-col gap-6 border-b border-border pb-[clamp(3rem,6vw,5rem)] lg:flex-row lg:items-end lg:justify-between">
          <BlurReveal as="h2" y={26} className="max-w-[16ch] text-balance text-[length:var(--text-h1)]">
            {titleMuted && <div className="text-foreground/50">{titleMuted}</div>}
            <div>{title}</div>
          </BlurReveal>
          {primaryButton && <DotArrowButton text={primaryButton.text} href={primaryButton.href} className="w-full sm:w-auto sm:self-start lg:self-auto" />}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="col-span-2 grid content-start gap-4 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 text-[length:var(--text-h3)] leading-none tracking-[-0.035em]">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-6">
                <path d="M16.2 6.4A7 7 0 1 0 17 10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <p>{brand}</p>
            </a>
            {note && <p className="max-w-[18rem] text-balance text-[length:var(--text-small)] leading-[1.45] text-muted-foreground">{note}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="grid content-start gap-4">
              <h3 className="font-sans text-[length:var(--text-small)] font-normal tracking-normal text-muted-foreground">{col.title}</h3>
              <ul className="grid gap-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="btn-link pb-0.5 text-[length:var(--text-body)] text-foreground/85 hover:text-foreground">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-border pt-6 text-[length:var(--text-small)] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          {copyright && <p>{copyright}</p>}
          {legal.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {legal.map((link) => (
                <a key={link.text} href={link.href} className="transition-colors duration-300 hover:text-foreground">
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
