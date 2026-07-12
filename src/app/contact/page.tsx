import styles from "./contact.module.css";
import { PaperPlaneRight, GithubLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Contact — Nuuvixx",
  description: "Get in touch with the Nuuvixx team.",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Let's talk infrastructure.</h1>
          <p className={styles.subtitle}>
            Whether you're looking to integrate BugPulse, contribute to our core, or explore partnerships.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.contactInfo}>
            <h2>Connect</h2>
            <p>
              We're a distributed team building the future of autonomous systems.
            </p>
            
            <div className={styles.links}>
              <a href="mailto:hello@nuuvixx.dev" className={styles.linkItem}>
                <PaperPlaneRight size={24} weight="duotone" />
                <span>hello@nuuvixx.dev</span>
              </a>
              <a href="https://github.com/Nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                <GithubLogo size={24} weight="fill" />
                <span>@Nuuvixx</span>
              </a>
              <a href="https://x.com/nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                <XLogo size={24} weight="fill" />
                <span>@nuuvixx</span>
              </a>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Alan Turing" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="alan@example.com" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="How can we help?" required></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message <PaperPlaneRight weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
