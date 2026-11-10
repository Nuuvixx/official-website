import EditorialHero from "@/components/home/EditorialHero";
import EditorialServiceIndex from "@/components/home/EditorialServiceIndex";
import LowerSplitSection from "@/components/home/LowerSplitSection";

export default function Home() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      <EditorialHero />
      <EditorialServiceIndex />
      <LowerSplitSection />
    </main>
  );
}
