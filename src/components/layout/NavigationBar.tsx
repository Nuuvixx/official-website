"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import NuuvixxLogo from "@/components/brand/NuuvixxLogo";
import styles from "./navigation-bar.module.css";

const navItems = [
  { href: "/studio", label: "Studio" },
  { href: "/studio#services", label: "Services" },
  { href: "/labs", label: "Labs" },
  { href: "/studio/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const items = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a, button"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => { element.inert = false; });
      toggleButton?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Left: NUUVIXX® Brand Symbol & Wordmark */}
          <Link href="/" className={styles.logo} aria-label="Nuuvixx Home">
            <NuuvixxLogo size="md" />
          </Link>

          {/* Center: Studio + Services + Labs + Work + About */}
          <nav className={styles.centerNav} aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = item.label === "Services"
                ? pathname === "/studio" && hash === "#services"
                : pathname === item.href && (item.label !== "Studio" || hash !== "#services");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary action */}
          <div className={styles.rightActions}>
            <Link href="/studio/contact" className={styles.ctaButton}>
              <span>Build with us</span>
              <ArrowUpRight size={14} strokeWidth={2.2} className={styles.ctaArrow} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              ref={toggleRef}
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-navigation"
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className={styles.drawerInner}>
              <div className={styles.drawerSection}>
                <span className={styles.drawerKicker}>NAVIGATION</span>
                <nav className={styles.drawerNav}>
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.drawerLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className={styles.drawerNum}>0{idx + 1}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.drawerSection}>
                <span className={styles.drawerKicker}>COMMERCIAL SERVICES</span>
                <nav className={styles.drawerSubNav}>
                  <Link href="/studio/commerce" className={styles.drawerSubLink} onClick={() => setMenuOpen(false)}>
                    <span>Commerce Rescue</span>
                    <span className={styles.subTag}>FEED AUDIT</span>
                  </Link>
                  <Link href="/studio/secure" className={styles.drawerSubLink} onClick={() => setMenuOpen(false)}>
                    <span>Nuuvixx Secure</span>
                    <span className={styles.subTag}>SECURITY</span>
                  </Link>
                  <Link href="/studio/creative" className={styles.drawerSubLink} onClick={() => setMenuOpen(false)}>
                    <span>Nuuvixx Creative</span>
                    <span className={styles.subTag}>CAMPAIGNS</span>
                  </Link>
                  <Link href="/studio/trade" className={styles.drawerSubLink} onClick={() => setMenuOpen(false)}>
                    <span>Trade Intelligence</span>
                    <span className={styles.subTag}>RECONCILIATION</span>
                  </Link>
                  <Link href="/studio/bids" className={styles.drawerSubLink} onClick={() => setMenuOpen(false)}>
                    <span>Bid Intelligence</span>
                    <span className={styles.subTag}>TENDERS</span>
                  </Link>
                </nav>
              </div>

              <div className={styles.drawerFooter}>
                <Link
                  href="/studio/contact"
                  className={styles.drawerCta}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Build with us</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
