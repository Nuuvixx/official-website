export const metadata = { title: "Projects — Nuuvixx" };
export default function ProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "100px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "3rem", color: "var(--color-volt)", marginBottom: 16 }}>Projects</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.2rem" }}>Sub-projects hosted under nuuvixx.dev (coming soon).</p>
      </div>
    </main>
  );
}
