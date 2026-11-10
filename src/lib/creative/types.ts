export type CreativeTone =
  | "high-energy-direct-response"
  | "minimal-editorial"
  | "problem-solution-cinematic"
  | "technical-authority";

export interface CreativeBriefInput {
  brandName: string;
  productCategory: string;
  productTitle: string;
  targetAudience: string;
  primaryValueProp: string;
  keyDifferentiators: string[];
  aspectRatios: string[];
  toneOfVoice: CreativeTone;
}

export interface StoryboardScene {
  sceneNumber: number;
  timeRange: string;
  durationSeconds: number;
  cameraDirection: string;
  visualPrompt: string;
  voiceoverCopy: string;
  onScreenText: string;
  soundDesign: string;
}

export interface ProductionDeliverable {
  id: string;
  name: string;
  format: string;
  resolution: string;
  platformTarget: string;
  assetType: "hero_video" | "motion_bumper" | "static_carousel" | "ugc_hook";
}

export interface CampaignBlueprint {
  brandName: string;
  productTitle: string;
  coreHookAngle: string;
  narrativeFramework: string;
  storyboard: StoryboardScene[];
  deliverables: ProductionDeliverable[];
  estimatedProductionDays: number | null;
  milestones: { day: string; description: string }[];
  synthesizedAt: string;
}

