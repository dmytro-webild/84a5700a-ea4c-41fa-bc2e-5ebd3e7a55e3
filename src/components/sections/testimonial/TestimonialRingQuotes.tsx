import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BlurReveal from "@/components/kit/BlurReveal";
import CardShine from "@/components/kit/CardShine";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Review = { quote: string; name: string; role?: string; imageSrc?: string; imageAlt?: string };

type TestimonialRingQuotesProps = {
  tag?: string;
  title?: string;
  titleDim?: string;
  items?: Review[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=400`;

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 10 10" aria-hidden="true" className={cn("size-3", flip && "rotate-180")}>
    <path d="M2 5h6M5.5 2.5 8 5 5.5 7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TestimonialRingQuotes = ({
  tag = "Reviews",
  title = "People who switched",
  titleDim = "and never looked back",
  items = [
    { quote: "I opened an account on the train and paid for lunch with the card before I got off. That is the whole review.", name: "Grace Tan", role: "Designer, Singapore", imageSrc: photo(15780884) },
    { quote: "Spending abroad used to mean a nasty surprise a month later. Now I see the real rate before I tap.", name: "Elena Marsh", role: "Travels for work", imageSrc: photo(8790862) },
    { quote: "The saving spaces finally got me to put money aside. Watching the interest land every morning helps.", name: "Marcus Bell", role: "Teacher, Leeds", imageSrc: photo(36510739) },
    { quote: "Lost my card at a festival, froze it in two taps, found it in my jacket, unfroze it. No phone call.", name: "Ana Silva", role: "Student, Porto", imageSrc: photo(38197025) },
    { quote: "Splitting rent with three flatmates used to take a spreadsheet. Now it is one shared space.", name: "Pedro Vidal", role: "Engineer, Madrid", imageSrc: photo(18232479) },
  ],
  ariaLabel,
  className,
}: TestimonialRingQuotesProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: 30 });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

  const sync = useCallback((api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  const geo = useRef<{ view: number; boxes: { left: number; width: number }[] }>({ view: 0, boxes: [] });

  const measure = useCallback((api: EmblaCarouselType) => {
    const root = api.rootNode().getBoundingClientRect();
    const location = api.internalEngine().location.get();
    geo.current = {
      view: root.width,
      boxes: slides.current.map((node) => {
        const box = node?.parentElement?.getBoundingClientRect();
        return box ? { left: box.left - root.left - location, width: box.width } : { left: 0, width: 1 };
      }),
    };
  }, []);

  const tween = useCallback(
    (api: EmblaCarouselType) => {
      if (reduce) return;
      const location = api.internalEngine().location.get();
      const { view, boxes } = geo.current;
      slides.current.forEach((node, index) => {
        const box = boxes[index];
        if (!node || !box) return;
        const left = box.left + location;
        const t = Math.min(1, Math.max(0, -left, left + box.width - view) / box.width);
        node.style.opacity = String(1 - t * 0.55);
        node.style.transform = `scale(${1 - t * 0.06}) translateY(${t * 1.5}rem)`;
      });
    },
    [reduce],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const remeasure = (api: EmblaCarouselType) => {
      measure(api);
      tween(api);
    };
    sync(emblaApi);
    remeasure(emblaApi);
    emblaApi.on("select", sync).on("reInit", sync).on("scroll", tween).on("reInit", remeasure).on("resize", remeasure);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync).off("scroll", tween).off("reInit", remeasure).off("resize", remeasure);
    };
  }, [emblaApi, sync, tween, measure]);

  if (!items.length) return null;

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
          <div className="flex flex-col gap-4">
            {tag && (
              <BlurReveal as="p" className="text-[length:var(--text-small)] text-muted-foreground">
                {tag}
              </BlurReveal>
            )}
            <BlurReveal as="h2" delay={0.05} className="max-w-[18ch] text-balance text-[length:var(--text-h1)]">
              <div>{title}</div>
              {titleDim && <div className="text-foreground/50">{titleDim}</div>}
            </BlurReveal>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous review" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} className="btn-secondary !size-11 !p-0 disabled:opacity-40">
              <Arrow flip />
            </button>
            <button type="button" aria-label="Next review" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} className="btn-secondary !size-11 !p-0 disabled:opacity-40">
              <Arrow />
            </button>
          </div>
        </div>
        <motion.div initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }} className="mt-[clamp(2rem,4vw,3.5rem)]">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y lg:-ml-6">
              {items.map((item, index) => (
                <div key={index} className="min-w-0 shrink-0 grow-0 basis-[86%] pl-4 md:basis-1/2 lg:basis-1/3 lg:pl-6">
                  <div ref={(node) => { slides.current[index] = node; }} className="h-full origin-bottom will-change-transform">
                    <motion.article
                      variants={{
                        hidden: { opacity: 0, scale: 0.92, rotateX: 16, y: 48 },
                        show: { opacity: 1, scale: 1, rotateX: 0, y: 0, transition: { duration: kit.slow, ease: kit.ease, delay: Math.min(index, 4) * 0.09 } },
                      }}
                      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
                      className="kit-card relative flex h-full select-none flex-col gap-6 overflow-hidden p-6 lg:gap-8 lg:p-8"
                    >
                      <CardShine />
                      <svg viewBox="0 0 24 18" aria-hidden="true" className="h-4 w-5 text-foreground/50">
                        <path d="M0 18V10Q0 2 9 0v4Q4 5 4 10h5v8Zm15 0V10q0-8 9-10v4q-5 1-5 6h5v8Z" fill="currentColor" />
                      </svg>
                      <p className="text-balance text-[length:var(--text-body-lg)] leading-[1.4]">{item.quote}</p>
                      <div className="mt-auto flex items-center gap-4 border-t border-border pt-6">
                        {item.imageSrc && (
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                            <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" draggable={false} className="size-full object-cover" />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="text-[length:var(--text-body)] [overflow-wrap:anywhere]">{item.name}</p>
                          {item.role && <p className="text-[length:var(--text-small)] text-muted-foreground">{item.role}</p>}
                        </div>
                      </div>
                    </motion.article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialRingQuotes;
