import styles from "./contact.module.css";
import { PaperPlaneRight, GithubLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";

export const metadata = {
  title: "Contact & Project Intake — Nuuvixx",
  description: "Get in touch with the Nuuvixx engineering and commercial division.",
};

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nuuvixx@gmail.com";

  return (
    <main className={styles.main}>
      {/* Ambient Grid Background + Spotlight */}
      <div className={styles.gridBackground} />
      <div className={styles.gridSpotlight} />

      <div className={styles.container}>
        <div className={styles.grid}>
              {/* Direct links and project intake */}
          <div className={styles.leftColumn || styles.contactInfo}>
            <header className={styles.hero}>
              <h1 className={styles.title}>Let&apos;s talk engineering.</h1>
              <p className={styles.subtitle}>
                Whether you&apos;re looking to engage Nuuvixx Studio for commercial project remediation, build on AgentVerse, or explore enterprise partnerships.
              </p>
            </header>

            <div className={styles.contactInfo}>
              <h2>Connect</h2>
              <p>
                We&apos;re a distributed engineering team building resilient infrastructure for autonomous systems and high-stakes digital businesses.
              </p>
              
              <div className={styles.links}>
                <a href={`mailto:${contactEmail}`} className={styles.linkItem}>
                  <PaperPlaneRight size={22} weight="duotone" />
                  <span>{contactEmail}</span>
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

            <div style={{ marginTop: "40px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
              <h2>What happens next</h2>
              <p>Tell us the problem, the system involved, and your timeline. We will review your request and agree on a practical scope before work begins.</p>
            </div>
          </div>

          {/* Right Column: Commercial Inquiry Form (Durable Supabase Ingestion) */}
          <div className={styles.formWrapper || ""}>
            <CommercialInquiryForm sourceContext="Main /contact page" />
          </div>
        </div>
      </div>
    </main>
  );
}
