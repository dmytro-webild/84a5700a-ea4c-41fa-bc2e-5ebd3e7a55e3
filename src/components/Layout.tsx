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
              name: "FAQ",
              href: "#faq"
            }
          ]}
          primaryButton={{
            text: "Get Started",
            href: "#pricing"
          }}
          secondaryButton={{
            text: "Contact",
            href: "#contact"
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
                  text: "Pricing Plans",
                  href: "#pricing"
                },
                {
                  text: "Founder Story",
                  href: "#about"
                },
                {
                  text: "Success Stories",
                  href: "#testimonial"
                }
              ]
            },
            {
              title: "Support",
              links: [
                {
                  text: "FAQ & Help",
                  href: "#faq"
                },
                {
                  text: "Get In Touch",
                  href: "#contact"
                },
                {
                  text: "WhatsApp Support",
                  href: "https://wa.me/"
                }
              ]
            },
            {
              title: "Contact",
              links: [
                {
                  text: "hello@registerityourself.com",
                  href: "mailto:hello@registerityourself.com"
                },
                {
                  text: "Lagos, Nigeria (9am–5pm WAT)",
                  href: "#contact"
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
