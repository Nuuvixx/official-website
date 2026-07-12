export const metadata = { title: "Blog — Nuuvixx" };
export default function BlogPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "100px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "3rem", color: "var(--color-volt)", marginBottom: 16 }}>Blog</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.2rem" }}>Engineering thoughts and updates coming soon.</p>
      </div>
    </main>
  );
}
