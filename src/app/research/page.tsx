export const metadata = { title: "Research — Nuuvixx" };

export default function ResearchPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "var(--space-24) var(--space-6)", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <header style={{ marginBottom: "var(--space-16)", paddingTop: "var(--space-12)" }}>
        <h1 style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "clamp(2.5rem, 5vw, var(--font-size-5xl))", 
          fontWeight: 800, 
          color: "var(--color-volt)", 
          marginBottom: "var(--space-4)", 
          letterSpacing: "-0.02em", 
          textAlign: "left" 
        }}>
          Research
        </h1>
        <p style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "var(--font-size-xl)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 820, 
          textAlign: "left" 
        }}>
          Exploring the theoretical and practical boundaries of agentic infrastructure.
        </p>
      </header>

      <section style={{ marginBottom: "var(--space-16)" }}>
        <h2 style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "var(--font-size-2xl)", 
          fontWeight: 700, 
          color: "var(--color-text-primary)", 
          marginBottom: "var(--space-4)", 
          textAlign: "left" 
        }}>
          Focus Areas
        </h2>
        <p style={{ 
          fontSize: "var(--font-size-lg)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 960, 
          textAlign: "left" 
        }}>
          Our research centers on autonomous agent reliability, deterministic state recovery, 
          decentralized agent verification, and sub-millisecond model routing protocols.
        </p>
      </section>
    </main>
  );
}
