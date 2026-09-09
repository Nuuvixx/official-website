import styles from "./contact.module.css";
import { PaperPlaneRight, GithubLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact — Nuuvixx",
  description: "Get in touch with the Nuuvixx team.",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      {/* Subtle Orange Grid Background + Ambient Spotlight */}
      <div className={styles.gridBackground} />
      <div className={styles.gridSpotlight} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: Text, Description & Direct Links */}
          <div className={styles.leftColumn}>
            <header className={styles.hero}>
              <h1 className={styles.title}>Let&apos;s talk infrastructure.</h1>
              <p className={styles.subtitle}>
                Whether you&apos;re looking to build on AgentVerse, publish to AgentStore, integrate BugPulse, or explore enterprise partnerships.
              </p>
            </header>

            <div className={styles.contactInfo}>
              <h2>Connect</h2>
              <p>
                We&apos;re a distributed team building the future of autonomous systems.
              </p>
              
              <div className={styles.links}>
                <a href="mailto:nuuvixx@gmail.com" className={styles.linkItem}>
                  <PaperPlaneRight size={22} weight="duotone" />
                  <span>nuuvixx@gmail.com</span>
                </a>
                <a href="https://github.com/Nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  <GithubLogo size={22} weight="fill" />
                  <span>@Nuuvixx</span>
                </a>
                <a href="https://x.com/nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  <XLogo size={22} weight="fill" />
                  <span>@nuuvixx</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Email & Message Form */}
          <div className={styles.formWrapper}>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
