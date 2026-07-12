import styles from "./about.module.css";

export const metadata = {
  title: "About — Nuuvixx",
  description: "Building the infrastructure for the machines that think.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1 className={styles.title}>About Nuuvixx</h1>
        <p className={styles.subtitle}>
          We build production-grade AI infrastructure.
        </p>
      </header>

      <section className={styles.section}>
        <h2>The Origin</h2>
        <p>
          Nuuvixx was born from a simple observation: everyone is rushing to build AI applications, 
          but very few are building the resilient, observable infrastructure required to keep those 
          applications running safely in production. We decided to fix that.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          To provide developers and enterprises with the open-source building blocks necessary 
          to govern, orchestrate, and observe autonomous systems at scale.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Core Values</h2>
        <ul className={styles.valuesList}>
          <li>
            <strong>Open by Default</strong>
            <span>Proprietary black boxes have no place in foundational infrastructure.</span>
          </li>
          <li>
            <strong>Engineer-Philosophers</strong>
            <span>We think deeply before we write code. Architecture matters.</span>
          </li>
          <li>
            <strong>Production or Nothing</strong>
            <span>If it can't run securely at scale, it's just a toy.</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
