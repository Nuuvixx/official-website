import VoidClockHero from "@/components/home/VoidClockHero";
import ProblemStatement from "@/components/home/ProblemStatement";
import VisionLayer from "@/components/home/VisionLayer";
import FeaturedBento from "@/components/home/FeaturedBento";
import StudioPillarsSection from "@/components/home/StudioPillarsSection";
import EngineeringPhilosophy from "@/components/home/EngineeringPhilosophy";
import GitHubActivity from "@/components/home/GitHubActivity";

export default function Home() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <VoidClockHero />
      <ProblemStatement />
      <VisionLayer />
      <FeaturedBento />
      <StudioPillarsSection />
      <EngineeringPhilosophy />
      <GitHubActivity />
    </div>
  );
}
