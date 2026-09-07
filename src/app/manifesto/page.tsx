import styles from "./manifesto.module.css";

export const metadata = {
  title: "Manifesto — Nuuvixx",
  description: "Why AI infrastructure matters now, and why it must be open-source.",
};

export default function ManifestoPage() {
  return (
    <main className={styles.main}>

      <div className={styles.content}>
        <header className={styles.hero}>
          <h1 className={styles.title}>The Nuuvixx Manifesto</h1>
          <p className={styles.subtitle}>
            Why AI infrastructure matters now, and why it must be open-source.
          </p>
        </header>

        <section className={styles.leadSection}>
          <p className={styles.lead}>
            Everyone is building AI applications. Nobody is building AI infrastructure.
          </p>
          <p>
            We are in the middle of a platform shift as significant as the internet itself. 
            Yet, the foundations being built are fragile. Agents fail silently. Prompts are treated as code. 
            Observability is an afterthought.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Infrastructure as Identity</h2>
          <p>
            Nuuvixx doesn&apos;t just build tools. We build the substrate on which AI systems think, act, and evolve.
            We believe that if AI is to become the new operating system for humanity, its core components must be robust, observable, and deeply integrated.
          </p>

          <blockquote className={styles.blockquote}>
            &ldquo;You wouldn&apos;t run a production server without monitoring. Neither should your agents.&rdquo;
          </blockquote>
        </section>

        <section className={styles.section}>
          <h2>Open Source is the Only Way</h2>
          <p>
            The most critical infrastructure of the past 30 years—Linux, Kubernetes, Postgres—was built in the open. 
            AI infrastructure will be no different. Code reviewed by the world is the highest possible quality bar.
            We are committing to open-source because we believe proprietary black boxes have no place at the foundation of autonomous systems.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Production or Nothing</h2>
          <p>
            We do not ship research demos. We ship resilient systems that scale globally.
            Whether it is tracing bug pulses across agent swarms or governing deterministic boundaries, 
            our goal is to make AI production-ready.
          </p>
        </section>
      </div>
    </main>
  );
}
