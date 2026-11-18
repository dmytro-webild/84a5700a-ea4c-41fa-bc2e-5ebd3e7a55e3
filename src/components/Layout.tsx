import { Outlet } from "react-router-dom";
import NavbarGlidePill from "@/components/navbars/NavbarGlidePill";
import FooterRingHorizon from "@/components/sections/footer/FooterRingHorizon";
import { siteConfig } from "@/config/site";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="glass" data-pattern="sky">
      <header data-webild-section="Header">
        <NavbarGlidePill
          brand={siteConfig.shortName}
          navItems={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "DIY Ebook",
              href: "/ebook",
            },
            {
              name: "Do It With Us",
              href: "/do-it-with-us",
            },
            {
              name: "Name Generator",
              href: "/name-generator",
            },
            {
              name: "About Founder",
              href: "/about",
            },
            {
              name: "Pricing",
              href: "/#pricing",
            },
            {
              name: "FAQ",
              href: "/#faq",
            },
          ]}
          primaryButton={{
            text: "Get the Guide — ₦10k",
            href: "/ebook",
          }}
          secondaryButton={{
            text: "Do It With Us — ₦25k",
            href: "/do-it-with-us",
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="glass" data-pattern="sky">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterRingHorizon
          brand={siteConfig.name}
          titleMuted="Register your business with CAC."
          title="Yourself. This week."
          note="Clear step-by-step guidance, live 1-on-1 support, and zero hidden agent fees. An independent training platform for Nigerian entrepreneurs."
          primaryButton={{
            text: "Get DIY Ebook — ₦10,000",
            href: "/ebook",
          }}
          columns={[
            {
              title: "Products & Tools",
              links: [
                {
                  text: "DIY Ebook Sales Page",
                  href: "/ebook",
                },
                {
                  text: "Do It With Us (Live Session)",
                  href: "/do-it-with-us",
                },
                {
                  text: "Free Name Generator Tool",
                  href: "/name-generator",
                },
                {
                  text: "Pricing & Plans",
                  href: "/#pricing",
                },
              ],
            },
            {
              title: "About & Proof",
              links: [
                {
                  text: "About & Founder's Story",
                  href: "/about",
                },
                {
                  text: "Dr. Michelle's Story",
                  href: "/about#founder-story",
                },
                {
                  text: "CAC Approval Guarantee",
                  href: "/#trust",
                },
                {
                  text: "Frequently Asked Questions",
                  href: "/#faq",
                },
              ],
            },
            {
              title: "Contact & Legal",
              links: [
                {
                  text: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                },
                {
                  text: `WhatsApp / Call: ${siteConfig.whatsapp}`,
                  href: `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`,
                },
                {
                  text: `CAC Reg: ${siteConfig.cacNumber}`,
                  href: "#",
                },
                {
                  text: "Lagos, Nigeria (9am–5pm WAT)",
                  href: "/about",
                },
              ],
            },
          ]}
          copyright={`© 2026 ${siteConfig.name}. All rights reserved.`}
          legal={[
            {
              text: "Privacy Policy",
              href: "#",
            },
            {
              text: "Terms of Service",
              href: "#",
            },
            {
              text: "CAC Disclaimer",
              href: "#",
            },
          ]}
        />
      </footer>
    </div>
  );
}
