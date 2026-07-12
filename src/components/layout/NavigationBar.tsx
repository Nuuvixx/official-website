"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation-bar.module.css";

export default function NavigationBar() {
  const pathname = usePathname();

  const links = [
    { href: "/manifesto", label: "Manifesto" },
    { href: "/about", label: "About" },
    { href: "/open-source", label: "Open Source" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            NUUVIXX <span className={styles.logoDot}></span>
          </Link>
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
        </div>
      </nav>
    </div>
  );
}
