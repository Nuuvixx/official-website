"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { 
  Pulse, 
  Cpu, 
  ShieldCheck, 
  Lightning, 
  Globe, 
  ArrowRight,
  GitFork
} from "@phosphor-icons/react";

interface TelemetryEvent {
  id: string;
  time: string;
  subsystem: string;
  message: string;
  tag: string;
  tagColor: string;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: "evt-1",
    time: "01:24:02",
    subsystem: "AGENTSTORE",
    message: "MicroVM sandbox verification passed for @agent/deep-researcher-v4 [SHA-256: 4f1a..88c]",
    tag: "VERIFIED",
    tagColor: "#4ade80",
  },
  {
    id: "evt-2",
    time: "01:24:05",
    subsystem: "SYNAPSE",
    message: "High-throughput token payload routed via Frankfurt edge -> 11.4ms",
    tag: "OPTIMAL",
    tagColor: "#4facfe",
  },
  {
    id: "evt-3",
    time: "01:24:08",
    subsystem: "BUGPULSE",
    message: "Exception stack captured on node-eu-2 -> Automated triage created GitHub Issue #842",
    tag: "TRIAGED",
    tagColor: "#fbbf24",
  },
  {
    id: "evt-4",
    time: "01:24:12",
    subsystem: "AGENTVERSE",
    message: "Multi-agent execution graph session #19208 converged successfully in 280ms",
    tag: "CONVERGED",
    tagColor: "#FF6B2C",
  },
  {
    id: "evt-5",
    time: "01:24:16",
    subsystem: "CORTEXGATE",
    message: "Semantic cache hit saved 4,120 prompt tokens (Model latency reduced by 82%)",
    tag: "CACHED",
    tagColor: "#a855f7",
  },
  {
    id: "evt-6",
    time: "01:24:19",
    subsystem: "MESH_GUARD",
    message: "Zero-trust mutual TLS handshake validated across 18 distributed worker nodes",
    tag: "ENCRYPTED",
    tagColor: "#38bdf8",
  },
];

const STREAMING_POOL: Omit<TelemetryEvent, "id" | "time">[] = [
  {
    subsystem: "AGENTSTORE",
    message: "Automated OWASP ASI-01 security audit cleared for tool manifest [v2.8.0]",
    tag: "SECURITY",
    tagColor: "#4ade80",
  },
  {
    subsystem: "SYNAPSE",
    message: "Dynamic failover route triggered -> Traffic switched in 1.8ms with 0 dropped frames",
    tag: "ROUTED",
    tagColor: "#4facfe",
  },
  {
    subsystem: "BUGPULSE",
    message: "Agent memory leak pattern analyzed -> Heap dump snapshot synchronized to dashboard",
    tag: "TELEMETRY",
    tagColor: "#fbbf24",
  },
  {
    subsystem: "AGENTVERSE",
    message: "Autonomous subagent pipeline spawned in ephemeral MicroVM cluster [zone: us-east]",
    tag: "EXECUTING",
    tagColor: "#FF6B2C",
  },
  {
    subsystem: "CORTEXGATE",
    message: "Cost router optimized inference batch -> Dispatched to cheapest low-latency endpoint",
    tag: "COST_SAVED",
    tagColor: "#a855f7",
  },
  {
    subsystem: "MESH_GUARD",
    message: "Real-time token rate limiter refreshed: 120,000 req/min capacity healthy",
    tag: "HEALTHY",
    tagColor: "#38bdf8",
  },
];

const REGIONAL_NODES = [
  { region: "US-East (N. Virginia)", ping: "4.2ms", status: "Nominal" },
  { region: "EU-Central (Frankfurt)", ping: "9.8ms", status: "Nominal" },
  { region: "AP-South (Mumbai)", ping: "14.1ms", status: "Nominal" },
  { region: "AP-East (Tokyo)", ping: "17.6ms", status: "Nominal" },
];

export default function LiveTelemetryNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Stream in new telemetry lines periodically
  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const template = STREAMING_POOL[poolIndex % STREAMING_POOL.length];
      poolIndex++;

      const newEvent: TelemetryEvent = {
        id: `evt-${Date.now()}`,
        time: timeStr,
        ...template,
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 9)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = activeTab === "ALL" 
    ? events 
    : events.filter((e) => e.subsystem.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section ref={containerRef} className={styles.telemetrySection}>
      {/* Ambient background glow */}
      <div className={styles.telemetryAmbientGlow} />

      {/* Header Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={styles.telemetryEyebrowWrapper}
      >
        <span className={styles.telemetryStatusDot} />
        <span className={styles.telemetryEyebrow}>LIVE INFRASTRUCTURE MESH</span>
        <span className={styles.telemetrySystemState}>ALL SYSTEMS OPERATIONAL</span>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={styles.telemetryTitle}
      >
        Autonomous Infrastructure at Scale.
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className={styles.telemetrySubtitle}
      >
        Sub-millisecond routing, cryptographic microVM sandboxes, and autonomous crash telemetry across the Nuuvixx ecosystem.
      </motion.p>

      {/* 4 Telemetry Metrics Cards */}
      <div className={styles.telemetryMetricsGrid}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.telemetryMetricCard}
        >
          <div className={styles.metricIconBox} style={{ color: "#FF6B2C" }}>
            <Cpu size={22} weight="duotone" />
          </div>
          <div className={styles.metricValue}>18.4M+</div>
          <div className={styles.metricLabel}>Tokens Governed & Routed</div>
          <div className={styles.metricSub}>Sub-millisecond inference cache</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.telemetryMetricCard}
        >
          <div className={styles.metricIconBox} style={{ color: "#4facfe" }}>
            <Lightning size={22} weight="duotone" />
          </div>
          <div className={styles.metricValue}>&lt; 14ms</div>
          <div className={styles.metricLabel}>P99 Mesh Routing Latency</div>
          <div className={styles.metricSub}>Distributed global edge dispatch</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.telemetryMetricCard}
        >
          <div className={styles.metricIconBox} style={{ color: "#4ade80" }}>
            <ShieldCheck size={22} weight="duotone" />
          </div>
          <div className={styles.metricValue}>4,280+</div>
          <div className={styles.metricLabel}>Verified Agent Sandboxes</div>
          <div className={styles.metricSub}>Hardware microVM isolation</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.telemetryMetricCard}
        >
          <div className={styles.metricIconBox} style={{ color: "#fbbf24" }}>
            <Pulse size={22} weight="duotone" />
          </div>
          <div className={styles.metricValue}>99.995%</div>
          <div className={styles.metricLabel}>Ecosystem Uptime SLA</div>
          <div className={styles.metricSub}>Auto-recovering agent pods</div>
        </motion.div>
      </div>

      {/* Main Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={styles.telemetryTerminalWindow}
      >
        {/* Terminal Header */}
        <div className={styles.terminalTopBar}>
          <div className={styles.terminalControls}>
            <span className={`${styles.terminalDot} ${styles.dotRed}`} />
            <span className={`${styles.terminalDot} ${styles.dotYellow}`} />
            <span className={`${styles.terminalDot} ${styles.dotGreen}`} />
            <span className={styles.terminalTitle}>nuuvixx-telemetry-mesh // v2.4.8</span>
          </div>

          <div className={styles.terminalTabs}>
            {["ALL", "AGENTSTORE", "SYNAPSE", "BUGPULSE", "AGENTVERSE"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`${styles.terminalTabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.terminalLiveIndicator}>
            <span className={styles.livePulse} />
            <span>LIVE FEED</span>
          </div>
        </div>

        {/* Streaming Event Lines */}
        <div className={styles.terminalLogStream}>
          {filteredEvents.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={styles.terminalLogRow}
            >
              <span className={styles.logTimestamp}>[{evt.time}]</span>
              <span className={styles.logSubsystem}>{evt.subsystem}</span>
              <span className={styles.logArrow}>›</span>
              <span className={styles.logMessage}>{evt.message}</span>
              <span 
                className={styles.logBadge}
                style={{ color: evt.tagColor, borderColor: `${evt.tagColor}40`, backgroundColor: `${evt.tagColor}15` }}
              >
                {evt.tag}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Regional Ping Status Bar */}
        <div className={styles.terminalNodesBar}>
          <div className={styles.nodesBarLabel}>
            <Globe size={15} weight="bold" />
            <span>GLOBAL EDGE NODES</span>
          </div>
          <div className={styles.nodesList}>
            {REGIONAL_NODES.map((node) => (
              <div key={node.region} className={styles.nodeItem}>
                <span className={styles.nodeIndicator} />
                <span className={styles.nodeName}>{node.region.split(" ")[0]}</span>
                <span className={styles.nodePing}>{node.ping}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={styles.telemetryFooterActions}
      >
        <a 
          href="/projects" 
          className={styles.telemetryPrimaryBtn}
        >
          <span>Explore Ecosystem Architecture</span>
          <ArrowRight size={16} weight="bold" />
        </a>
        <a 
          href="/open-source" 
          className={styles.telemetrySecondaryBtn}
        >
          <GitFork size={16} weight="bold" />
          <span>Open Source Manifests</span>
        </a>
      </motion.div>
    </section>
  );
}
