import { Outlet } from "react-router-dom";
import NavbarGlidePill from "@/components/navbars/NavbarGlidePill";
import FooterRingHorizon from "@/components/sections/footer/FooterRingHorizon";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="glass" data-pattern="sky">
      <header data-webild-section="Header">
        <NavbarGlidePill
          brand="RIY"
          navItems={[
            {
              name: "Why RIY",
              href: "#about"
            },
            {
              name: "How It Works",
              href: "#process"
            },
            {
              name: "Pricing",
              href: "#pricing"
            },
            {
              name: "Name Checker",
              href: "#name-teaser"
            },
            {
              name: "Ebook",
              href: "#ebook-grid"
            },
            {
              name: "Founder",
              href: "#founder"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          primaryButton={{
            text: "Get the Guide — ₦10k",
            href: "#pricing"
          }}
          secondaryButton={{
            text: "Do It With Us — ₦25k",
            href: "#pricing"
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="glass" data-pattern="sky">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterRingHorizon
          brand="Register It Yourself"
          titleMuted="Register your business with CAC."
          title="Yourself. This week."
          note="Clear step-by-step video guidance, direct support, and zero hidden agent fees. An independent training platform for Nigerian business founders."
          primaryButton={{
            text: "Start Registration",
            href: "#pricing"
          }}
          columns={[
            {
              title: "Platform",
              links: [
                {
                  text: "How It Works",
                  href: "#process"
                },
                {
                  text: "Pricing & Plans",
                  href: "#pricing"
                },
                {
                  text: "Name Checker Tool",
                  href: "#name-teaser"
                },
                {
                  text: "3D Letterhead Showcase",
                  href: "#letterhead-showcase"
                },
                {
                  text: "Ebook Curriculum",
                  href: "#ebook-grid"
                }
              ]
            },
            {
              title: "About & Proof",
              links: [
                {
                  text: "Why RIY",
                  href: "#about"
                },
                {
                  text: "Founder's Story",
                  href: "#founder"
                },
                {
                  text: "Testimonials",
                  href: "#testimonial"
                },
                {
                  text: "FAQ & Help",
                  href: "#faq"
                }
              ]
            },
            {
              title: "Contact & Legal",
              links: [
                {
                  text: "hello@registerityourself.com",
                  href: "mailto:hello@registerityourself.com"
                },
                {
                  text: "Lagos, Nigeria (9am–5pm WAT)",
                  href: "#start-now"
                },
                {
                  text: "WhatsApp Support",
                  href: "#start-now"
                }
              ]
            }
          ]}
          copyright="© 2026 Register It Yourself. All rights reserved."
          legal={[
            {
              text: "Privacy Policy",
              href: "#"
            },
            {
              text: "Terms of Service",
              href: "#"
            },
            {
              text: "CAC Disclaimer",
              href: "#"
            }
          ]}
        />
      </footer>
    </div>
  );
}
