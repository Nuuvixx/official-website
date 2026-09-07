export const metadata = { title: "Contributors — Nuuvixx" };

export default function ContributorsPage() {
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
          Contributors
        </h1>
        <p style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "var(--font-size-xl)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 820, 
          textAlign: "left" 
        }}>
          The open-source engineers, researchers, and builders shaping the Nuuvixx ecosystem.
        </p>
      </header>

      <section style={{ marginBottom: "var(--space-16)" }}>
        <p style={{ 
          fontSize: "var(--font-size-lg)", 
          color: "var(--color-text-secondary)", 
          lineHeight: "var(--leading-relaxed)", 
          maxWidth: 960, 
          textAlign: "left" 
        }}>
          All our repositories are open-source by default. We welcome PRs, RFC contributions, and bug triage from engineers around the world.
        </p>
      </section>
    </main>
  );
}
