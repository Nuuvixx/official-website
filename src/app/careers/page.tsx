export const metadata = { title: "Careers — Nuuvixx" };
export default function CareersPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "100px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "3rem", color: "var(--color-volt)", marginBottom: 16 }}>Careers</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.2rem" }}>We have no open roles at this moment, but we are always looking for exceptional engineers.</p>
      </div>
    </main>
  );
}
