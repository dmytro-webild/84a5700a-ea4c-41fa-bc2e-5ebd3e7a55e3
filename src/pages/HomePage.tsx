import HeroFloatingCard from "@/components/sections/hero/HeroFloatingCard";
import ProofStrip from "@/components/sections/proof/ProofStrip";
import ProblemHurdles from "@/components/sections/problem/ProblemHurdles";
import ProcessRingSteps from "@/components/sections/features/ProcessRingSteps";
import PricingRingPlans from "@/components/sections/pricing/PricingRingPlans";
import NameGeneratorTeaser from "@/components/sections/tools/NameGeneratorTeaser";
import Letterhead3DShowcase from "@/components/sections/showcase/Letterhead3DShowcase";
import EbookContentsGrid from "@/components/sections/ebook/EbookContentsGrid";
import AboutRingStatement from "@/components/sections/about/AboutRingStatement";
import FounderStory from "@/components/sections/about/FounderStory";
import TestimonialRingQuotes from "@/components/sections/testimonial/TestimonialRingQuotes";
import FaqRippleAccordion from "@/components/sections/faq/FaqRippleAccordion";
import StartNowCTA from "@/components/sections/cta/StartNowCTA";
import LoaderRingCounter from "@/components/loaders/LoaderRingCounter";

export default function HomePage() {
  return (
    <>
      <LoaderRingCounter brand="Register It Yourself" />

      {/* 1. Hero */}
      <div id="home" data-webild-section="HeroFloatingCard" data-webild-section-id="HeroFloatingCard-1" data-section="home">
        <HeroFloatingCard
          shape="twist"
          title="Register your business with CAC."
          titleMuted="Yourself. This week."
          description="Skip the agent fees. Our step-by-step guide, and a real person on call if you want one, takes you from business idea to CAC certificate, first time."
          primaryButton={{
            text: "Get the Guide — ₦10,000",
            href: "#pricing"
          }}
          secondaryButton={{
            text: "Do It With Us — ₦25,000",
            href: "#pricing"
          }}
        />
      </div>

      {/* 2. Proof strip */}
      <div id="proof" data-webild-section="ProofStrip" data-webild-section-id="ProofStrip-1" data-section="proof">
        <ProofStrip
          approvedTime="Name approved in 3 minutes"
          lawyerText="Registered without a lawyer"
          initialCount={1420}
          targetCount={1850}
        />
      </div>

      {/* 3. Problem section */}
      <div id="problem" data-webild-section="ProblemHurdles" data-webild-section-id="ProblemHurdles-1" data-section="problem">
        <ProblemHurdles
          tag="CAC Hurdles"
          title="Opened the CAC portal and closed it again?"
          description="Navigating official government portals alone shouldn't feel like a nightmare. Here is why most founders give up or overpay."
        />
      </div>

      {/* 4. How it works (3-step 3D journey) */}
      <div id="process" data-webild-section="ProcessRingSteps" data-webild-section-id="ProcessRingSteps-1" data-section="process">
        <ProcessRingSteps
          tag="3D 3-Step Journey"
          title="Three steps to"
          titleDim="officially registered"
          description="From business idea to CAC certificate, without paying agent markups."
          items={[
            {
              title: "Pick & reserve your name",
              description: "Search availability on the portal and reserve your exact business name in 3 minutes without common query rejections.",
              imageSrc: "https://img.b2bpic.net/free-photo/flat-lay-top-view-office-table-desk-workspace-background_1150-6860.jpg",
              imageAlt: "Office table workspace for name search"
            },
            {
              title: "Follow the screen guide",
              description: "Walk through every portal section using our step-by-step video lessons and direct personal review.",
              imageSrc: "https://img.b2bpic.net/free-photo/knolling-concept-with-sticky-notes-accessories-green-shades_23-2148362185.jpg",
              imageAlt: "Screen-by-screen filing guide notes"
            },
            {
              title: "Get CAC approved & certified",
              description: "Submit your filing with full confidence and receive your official CAC certificate without paying expensive agent fees.",
              imageSrc: "https://img.b2bpic.net/free-photo/workspace-with-office-supplies-laptop-notebook-stationery_23-2151968886.jpg",
              imageAlt: "Approved CAC certificate documents"
            }
          ]}
        />
      </div>

      {/* 5. Choose your path (Pricing cards) */}
      <div id="pricing" data-webild-section="PricingRingPlans" data-webild-section-id="PricingRingPlans-1" data-section="pricing">
        <PricingRingPlans
          tag="Choose Your Path"
          title="Clear pricing,"
          titleDim="zero hidden agent fees"
          description="Select the level of guidance you need to register independently."
          upgradeNote="Already bought the ebook? Upgrade to Do It With Us for just ₦15,000. We deduct what you already paid."
          items={[
            {
              title: "Do it yourself",
              price: "₦10,000",
              period: "one-time payment",
              description: "The complete Register It Yourself ebook: screen-by-screen CAC walkthrough for business names and limited companies, name search tips, query fixes, post-registration roadmap (TIN, bank account, annual returns), templates and checklists. Instant download.",
              features: [
                "Complete Register It Yourself Ebook",
                "Screen-by-screen CAC walkthrough (BN & LTD)",
                "3-minute name search & reservation strategy",
                "Fast query resolution guide (24h turnaround)",
                "Post-registration roadmap (TIN, Bank, Annual Returns)",
                "Fillable templates and checklists",
                "Instant download after purchase"
              ],
              button: {
                text: "Get the Guide — ₦10,000",
                href: "#start-now"
              }
            },
            {
              title: "Do it with us",
              badge: "Most Popular",
              popular: true,
              price: "₦25,000",
              period: "one-time payment",
              deposit: "Book today with a ₦7,500 deposit",
              description: "Includes the full ebook, plus a live 1-on-1 Zoom or Google Meet session where we go through the CAC registration process together, screen by screen, from name search to submission. Also includes 2 custom letterhead designs (print-ready PDF + editable version), delivered 2–3 working days after CAC approval.",
              features: [
                "Full Register It Yourself Ebook included",
                "Live 1-on-1 Zoom / Google Meet session with a guide",
                "Screen-by-screen portal submission walkthrough",
                "2 Custom Letterhead designs (Print PDF + Editable)",
                "Letterhead delivered 2–3 working days post-approval",
                "Book with a ₦7,500 deposit",
                "100% CAC Approval Guarantee"
              ],
              button: {
                text: "Book Do It With Us — ₦25,000",
                href: "#start-now"
              }
            }
          ]}
        />
      </div>

      {/* 6. Name Generator teaser */}
      <div id="name-teaser" data-webild-section="NameGeneratorTeaser" data-webild-section-id="NameGeneratorTeaser-1" data-section="name-teaser">
        <NameGeneratorTeaser />
      </div>

      {/* 7. 3D Letterhead showcase */}
      <div id="letterhead-showcase" data-webild-section="Letterhead3DShowcase" data-webild-section-id="Letterhead3DShowcase-1" data-section="letterhead-showcase">
        <Letterhead3DShowcase />
      </div>

      {/* 8. Ebook contents grid */}
      <div id="ebook-grid" data-webild-section="EbookContentsGrid" data-webild-section-id="EbookContentsGrid-1" data-section="ebook-grid">
        <EbookContentsGrid />
      </div>

      {/* 9. Why RIY section */}
      <div id="about" data-webild-section="AboutRingStatement" data-webild-section-id="AboutRingStatement-1" data-section="about">
        <AboutRingStatement
          tag="Why RIY"
          title="The trusted middle path: cheaper than an agent, clearer than YouTube, with a real person beside you if you want one."
          items={[
            {
              title: "Cheaper than an agent",
              description: "Save ₦50,000 to ₦80,000+ compared to agent markups. Pay official CAC portal fees directly.",
              imageSrc: "https://img.b2bpic.net/free-photo/young-businessman-analyzing-data-holding-magnifying-glass-generated-by-ai_188544-36940.jpg",
              imageAlt: "Cheaper than traditional agent markups"
            },
            {
              title: "Clearer than YouTube",
              description: "Structured step-by-step video lessons updated for current CAC rules. No outdated advice or trial-and-error.",
              imageSrc: "https://img.b2bpic.net/free-photo/flat-lay-top-view-office-table-desk-workspace-background_1150-6860.jpg",
              imageAlt: "Clear step-by-step guide"
            },
            {
              title: "Real person beside you",
              description: "Need someone to double-check your submission? Our team is on call via WhatsApp and 1-on-1 Zoom.",
              imageSrc: "https://img.b2bpic.net/free-photo/coffee-cup-pen-keyboard-spiral-notebook-colored-wooden-background_23-2147916222.jpg",
              imageAlt: "Direct human support backup"
            }
          ]}
        />
      </div>

      {/* 10. Founder's story */}
      <div id="founder" data-webild-section="FounderStory" data-webild-section-id="FounderStory-1" data-section="founder">
        <FounderStory />
      </div>

      {/* 11. Testimonial carousel */}
      <div id="testimonial" data-webild-section="TestimonialRingQuotes" data-webild-section-id="TestimonialRingQuotes-1" data-section="testimonial">
        <TestimonialRingQuotes
          tag="Founder Stories"
          title="Trusted by entrepreneurs"
          titleDim="who skipped agent fees"
          items={[
            {
              quote: "I saved over ₦80,000 in agent fees by following the RIY guide. The step-by-step videos made navigating the CAC portal completely stress-free.",
              name: "Chidi E.",
              role: "Tech Founder, Lagos",
              imageSrc: "https://img.b2bpic.net/free-photo/handsome-african-american-man-with-beard-turn-face-camera-smiling-confident-standing-pink-background_1258-77841.jpg",
              imageAlt: "Chidi E, Tech Founder"
            },
            {
              quote: "Michelle's approach is pure gold. My business name registration was submitted and approved within 3 minutes without a single query.",
              name: "Amaka O.",
              role: "Business Consultant, Abuja",
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-woman-women-s-day_23-2151931543.jpg",
              imageAlt: "Amaka O, Business Consultant"
            },
            {
              quote: "I was intimidated by official government forms, but this course broke down every field into simple language. Got registered in four days.",
              name: "Bayo T.",
              role: "Creative Director, Port Harcourt",
              imageSrc: "https://img.b2bpic.net/free-photo/closeup-portrait-curly-brunet-bearded-man-floral-shirt-smiling-gently-leaning-wall-outside-listening-music-headphones_197531-28846.jpg",
              imageAlt: "Bayo T, Creative Director"
            },
            {
              quote: "Clear, professional, and genuinely helpful. Registering my brand myself gave me full control over our legal setup from day one.",
              name: "Nneka U.",
              role: "Fashion Entrepreneur, Enugu",
              imageSrc: "https://img.b2bpic.net/free-photo/young-smiling-professional-woman-having-coffee-break-her-full-working-day-she-holds-paper-cup-outdoors-near-business-building-while-relaxing-enjoying-her-beverage_158595-6856.jpg",
              imageAlt: "Nneka U, Fashion Entrepreneur"
            }
          ]}
        />
      </div>

      {/* 12. FAQ accordion */}
      <div id="faq" data-webild-section="FaqRippleAccordion" data-webild-section-id="FaqRippleAccordion-1" data-section="faq">
        <FaqRippleAccordion
          tag="Common Questions"
          title="Frequently Asked"
          titleDim="Questions"
          description="Everything you need to know about registering your business with CAC yourself."
          primaryButton={{
            text: "Contact Support",
            href: "#start-now"
          }}
          items={[
            {
              title: "Is it legal to register my business without a lawyer or agent?",
              description: "Yes! The Corporate Affairs Commission (CAC) of Nigeria explicitly permits business founders and proprietors to register their own business names and limited companies directly on the CAC Public Portal without paying third-party agent markups."
            },
            {
              title: "What is included in the ₦10,000 DIY Guide vs ₦25,000 Do It With Us?",
              description: "The ₦10,000 DIY option gives you instant access to the complete Register It Yourself ebook with screen-by-screen video tutorials, templates, and post-registration guides. The ₦25,000 Do It With Us plan adds a live 1-on-1 Zoom session where we complete the filing together, plus 2 custom corporate letterhead designs delivered 2–3 days after approval."
            },
            {
              title: "Can I upgrade from the ₦10,000 ebook to Do It With Us later?",
              description: "Yes! If you purchase the ₦10,000 ebook and decide you want live 1-on-1 guidance, you can upgrade to Do It With Us for just ₦15,000. We deduct what you already paid."
            },
            {
              title: "How long does CAC approval take?",
              description: "Name reservations can be approved within 3 minutes to 24 hours depending on name availability. Full registration certificates are typically issued by CAC within 2 to 5 working days."
            },
            {
              title: "What happens if CAC queries my application?",
              description: "Our guide includes a complete 24-hour query resolution playbook. If you chose the Do It With Us plan or face a guidance error, our team personally assists you to fix the query until approved — backed by our 100% Satisfaction Guarantee."
            }
          ]}
        />
      </div>

      {/* 13. Start Now CTA */}
      <div id="start-now" data-webild-section="StartNowCTA" data-webild-section-id="StartNowCTA-1" data-section="start-now">
        <StartNowCTA />
      </div>
    </>
  );
}
