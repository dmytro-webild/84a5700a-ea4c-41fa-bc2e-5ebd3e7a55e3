import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CardShine, { CardReveal } from "@/components/kit/CardShine";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string };

type ContactRingFormProps = {
  title?: string;
  titleDim?: string;
  fields?: Field[];
  buttonText?: string;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const ContactRingForm = ({
  title = "Talk to us",
  titleDim = "we reply within a day",
  fields = [
    { name: "name", label: "Name", placeholder: "Your name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
    { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?" },
  ],
  buttonText = "Send message",
  imageSrc = "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1200",
  imageAlt = "A person working on a laptop",
  ariaLabel,
  className,
}: ContactRingFormProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, (v) => `circle(${24 + 58 * clamp01(v / 0.5)}% at 50% 50%)`);
  const scale = useTransform(scrollYProgress, (v) => 1.18 - 0.18 * clamp01(v / 0.5));
  const ringScale = useTransform(scrollYProgress, (v) => 0.5 + 0.9 * clamp01(v / 0.5));
  const ringOpacity = useTransform(scrollYProgress, (v) => 1 - clamp01((v - 0.3) / 0.2));

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <CardReveal className="kit-card relative flex flex-col overflow-hidden p-6 lg:p-8">
          <CardShine />
          <h2 className="max-w-[18ch] text-balance text-[length:var(--text-h1)]">
            <div>{title}</div>
            {titleDim && <div className="text-foreground/50">{titleDim}</div>}
          </h2>
          <form onSubmit={(event) => event.preventDefault()} className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-col gap-4">
            {fields.map((field) => (
              <label key={field.name} className="flex flex-col gap-2">
                <p className="text-[length:var(--text-small)] text-foreground/70">{field.label}</p>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={4}
                    className="resize-none rounded-[var(--radius-button)] border border-border bg-background px-4 py-3.5 text-[length:var(--text-body)] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground/60"
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className="h-[3.125rem] rounded-[var(--radius-button)] border border-border bg-background px-4 text-[length:var(--text-body)] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground/60"
                  />
                )}
              </label>
            ))}
            <button type="submit" className="btn-primary mt-2 w-full sm:w-auto sm:self-start">
              <p className="btn-label">{buttonText}</p>
              <div aria-hidden="true" className="btn-dot">
                <svg viewBox="0 0 10 10">
                  <path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </form>
        </CardReveal>
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] lg:aspect-auto">
          <motion.div style={reduce ? undefined : { clipPath }} className="absolute inset-0 overflow-hidden rounded-[var(--radius-image)]">
            <MotionMedia
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { scale }}
              className="absolute inset-0 size-full object-cover will-change-transform"
            />
          </motion.div>
          {!reduce && (
            <motion.div
              aria-hidden="true"
              style={{ scale: ringScale, opacity: ringOpacity }}
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40 will-change-transform"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactRingForm;
