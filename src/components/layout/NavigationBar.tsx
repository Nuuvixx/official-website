"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import styles from "./navigation-bar.module.css";

const links = [
  { href: "/projects", label: "Products" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/about", label: "About" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="Nuuvixx Logo"
                width={28}
                height={28}
                className={styles.logoImage}
                priority
              />
              <span className={styles.logoText}>NUUVIXX</span>
            </Link>

            {/* Desktop nav links */}
            <div className={styles.links}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.link} ${pathname === link.href ? styles.activeLink : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger button */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <nav className={styles.mobileNav}>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.mobileLinkNum}>0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom tagline */}
            <motion.p
              className={styles.mobileMenuTagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              Infrastructure for the machines that think.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
