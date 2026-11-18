import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavbarGlidePill from "@/components/navbars/NavbarGlidePill";
import FooterRingHorizon from "@/components/sections/footer/FooterRingHorizon";
import WhatsAppWidget from "@/components/kit/WhatsAppWidget";
import ExitIntentPopup from "@/components/kit/ExitIntentPopup";
import { siteConfig } from "@/config/site";
import { initAnalytics, trackPageView } from "@/utils/analytics";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

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
              name: "Add-ons",
              href: "/add-ons",
            },
            {
              name: "Blog & Guides",
              href: "/blog",
            },
            {
              name: "About",
              href: "/about",
            },
          ]}
          primaryButton={{
            text: "Get Your CAC Certificate",
            href: "/ebook",
          }}
          secondaryButton={{
            text: "Do It With Us — ₦25k",
            href: "/do-it-with-us",
          }}
        />
      </header>

      <main className="flex-grow pt-16" data-button="default" data-card="glass" data-pattern="sky">
        <Outlet />
      </main>

      <footer data-webild-section="Footer" data-section="footer">
        <FooterRingHorizon />
      </footer>

      {/* Persistent Global Floating WhatsApp Chat Widget */}
      <WhatsAppWidget />

      {/* Desktop Exit-Intent & Mobile Timed Checklist Popup */}
      <ExitIntentPopup />
    </div>
  );
}
