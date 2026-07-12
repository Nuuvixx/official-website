import { Metadata } from "next";
import styles from "./labs.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Labs | Nuuvixx",
  description: "Experimental AI visualizations and open-source prototypes by Nuuvixx.",
};

export default function LabsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>Experimental</div>
        <h1 className={styles.title}>Nuuvixx Labs</h1>
        <p className={styles.subtitle}>
          Where we explore weird ideas, generative interfaces, and prototypes that aren't ready for production (but are too cool to keep hidden).
        </p>
      </header>
      
      <div className={styles.grid}>
        {/* Experiment 1 */}
        <div className={styles.experimentCard}>
          <div className={styles.visualizer}>
            <div className={styles.chaosMock}>
              <div className={styles.node} style={{top: '20%', left: '30%', animationDelay: '0s'}}></div>
              <div className={styles.node} style={{top: '60%', left: '70%', animationDelay: '0.5s'}}></div>
              <div className={styles.node} style={{top: '40%', left: '50%', animationDelay: '1s'}}></div>
              <div className={styles.node} style={{top: '80%', left: '20%', animationDelay: '1.5s'}}></div>
              <div className={styles.connection} style={{top: '30%', left: '40%', width: '100px', transform: 'rotate(45deg)'}}></div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.tag}>WebGL</span>
              <span className={styles.date}>July 2026</span>
            </div>
            <h3 className={styles.experimentTitle}>agentchaos: Entropy Visualizer</h3>
            <p className={styles.experimentDesc}>
              A real-time representation of multi-agent swarm state. When agents hallucinate or diverge, the entropy visualizer distorts to reflect system instability.
            </p>
            <Link href="#" className={styles.launchBtn}>Launch Experiment</Link>
          </div>
        </div>

        {/* Experiment 2 */}
        <div className={styles.experimentCard}>
          <div className={styles.visualizer}>
            <div className={styles.codeMock}>
              <code>{`function optimize(state) {`}</code>
              <code>{`  if (state.entropy > MAX) {`}</code>
              <code className={styles.highlight}>{`    collapse(state);`}</code>
              <code>{`  }`}</code>
              <code>{`}`}</code>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.tag}>AST Parsing</span>
              <span className={styles.date}>June 2026</span>
            </div>
            <h3 className={styles.experimentTitle}>Codebase Constellation</h3>
            <p className={styles.experimentDesc}>
              Mapping 100,000 lines of code into a navigable 3D galaxy using AST analysis to determine gravitational pull between related modules.
            </p>
            <Link href="#" className={styles.launchBtn}>Launch Experiment</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
