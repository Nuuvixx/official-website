import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { parseProductFeed } from "@/lib/commerce/parsers";
import { validateProductFeed } from "@/lib/commerce/validator";
import { SAMPLE_BROKEN_CSV_FEED } from "@/lib/commerce/sampleFeeds";
import { SERVICE_VISUALS } from "@/data/serviceVisuals";
import styles from "./lower-split-section.module.css";

const sampleName = "example-catalog-with-errors.csv";
const parsed = parseProductFeed(sampleName, SAMPLE_BROKEN_CSV_FEED, SAMPLE_BROKEN_CSV_FEED.length);
const sampleAudit = validateProductFeed(sampleName, SAMPLE_BROKEN_CSV_FEED.length, parsed.products, parsed.errors);
const sampleFindings = sampleAudit.findings.flatMap((finding) =>
  finding.issues.map((issue) => ({ sku: finding.sku, issue }))
).slice(0, 4);

const labs = [
  { name: "AgentVerse", description: "Public agent workflow interface and runtime project.", href: "https://agentverse.nuuvixx.com" },
  { name: "AgentStore", description: "Public agent manifest catalog preview.", href: "https://agentstore.nuuvixx.com" },
  { name: "BugPulse", description: "Issue and telemetry tooling with public CLI and MCP repositories.", href: "https://github.com/Nuuvixx/BugPulse-CLI" },
];

const steps = [
  ["Understand", "Define the problem and the useful outcome."],
  ["Diagnose", "Inspect the data, code or workflow."],
  ["Build", "Make and test a scoped change."],
  ["Verify", "Review the result and hand it over."],
];

export default function LowerSplitSection() {
  return (
    <section className={styles.section} aria-label="Products and engineering work">
      <div className={styles.container}>
        <div className={styles.feature}>
          <div className={styles.featureCopy}>
            <span className={styles.eyebrow}>Featured tool · Commerce Rescue</span>
            <h2>Find product-feed issues before they become a bigger problem.</h2>
            <p>Run local checks on CSV, TSV and XML feeds. The full validator explains findings and exports a report for review.</p>
            <Link href="/studio/commerce" className={styles.primaryLink}>Open the feed validator <ArrowUpRight size={17} /></Link>
            <p className={styles.limitation}>Local file checks do not confirm Google Merchant Center approval or live storefront behavior.</p>
          </div>
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <span>Sample data · bundled CSV feed</span>
              <span>Actual validator output</span>
            </div>
            <ul className={styles.findings}>
              {sampleFindings.map(({ sku, issue }, index) => (
                <li key={`${sku}-${issue.id}-${index}`}>
                  <span className={styles.findingMeta}>{sku} · {issue.severity}</span>
                  <strong>{issue.title}</strong>
                  <span>{issue.message}</span>
                </li>
              ))}
            </ul>
            <Link href="/studio/commerce#demo" className={styles.previewLink}>Upload your own feed <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className={styles.work}>
          <figure className={styles.workImage}>
            <Image src={SERVICE_VISUALS.commerce.src} alt={SERVICE_VISUALS.commerce.alt} width={1200} height={800} sizes="(max-width: 767px) 100vw, 48vw" />
          </figure>
          <div className={styles.workCopy}>
            <span className={styles.eyebrow}>Selected work</span>
            <h2>See the tools before you start a project.</h2>
            <p>Try a working diagnostic, review exactly what it checks, and bring us the findings you want help resolving. Every service begins with a clear scope and a practical next step.</p>
            <div className={styles.workLinks}>
              <Link href="/studio/commerce">Try Commerce Rescue <ArrowUpRight size={16} /></Link>
              <Link href="/studio/work">See all working tools <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </div>

        <div className={styles.labs}>
          <div className={styles.labsIntro}>
            <span className={styles.eyebrow}>Nuuvixx Labs</span>
            <h2>Open systems for practical work.</h2>
            <p>Public interfaces and repositories from our agent tooling work. Follow each project to inspect its current state.</p>
            <Link href="/labs" className={styles.textLink}>Explore Labs <ArrowUpRight size={16} /></Link>
          </div>
          <div className={styles.labList}>
            {labs.map((project) => (
              <a key={project.name} href={project.href} target="_blank" rel="noopener noreferrer">
                <span><strong>{project.name}</strong><small>{project.description}</small></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.process}>
          <div>
            <span className={styles.eyebrow}>How we work</span>
            <h2>From problem to production.</h2>
          </div>
          <ol>
            {steps.map(([title, description]) => (
              <li key={title}><CheckCircle2 size={18} aria-hidden="true" /><span><strong>{title}</strong><small>{description}</small></span></li>
            ))}
          </ol>
        </div>

        <div className={styles.contact}>
          <div><span className={styles.eyebrow}>Start a project</span><h2>Tell us what needs fixing or building.</h2></div>
          <Link href="/studio/contact">Build with us <ArrowUpRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
