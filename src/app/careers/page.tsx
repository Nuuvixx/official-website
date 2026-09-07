export const metadata = { title: "Careers — Nuuvixx" };

export default function CareersPage() {
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
          Careers
        </h1>
        <p style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "var(--font-size-xl)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 820, 
          textAlign: "left" 
        }}>
          Building resilient systems for autonomous machine intelligence.
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
          Open Positions
        </h2>
        <p style={{ 
          fontSize: "var(--font-size-lg)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 960, 
          textAlign: "left" 
        }}>
          We do not have open formal listings right now, but we are always eager to talk with exceptional systems programmers, distributed systems engineers, and open-source contributors.
        </p>
      </section>
    </main>
  );
}
