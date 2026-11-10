import {
  CampaignBlueprint,
  CreativeBriefInput,
  ProductionDeliverable,
  StoryboardScene,
} from "./types";

/**
 * Deterministically synthesizes an actionable creative campaign blueprint and multi-scene storyboard
 * from structured brand parameters.
 */
export function synthesizeCreativeBlueprint(
  input: CreativeBriefInput
): CampaignBlueprint {
  const brand = input.brandName.trim() || "Brand";
  const product = input.productTitle.trim() || "Hardware System";
  const audience = input.targetAudience.trim() || "Engineers & Creators";
  const valueProp = input.primaryValueProp.trim() || "Precision engineering performance";

  // Narrative frameworks based on tone
  let narrativeFramework = "Problem-Agitation-Solution Arc";
  let coreHookAngle = `Stop settling for compromised performance in your daily workflow.`;

  if (input.toneOfVoice === "minimal-editorial") {
    narrativeFramework = "Sensory Tactility & Monolithic Design Showcase";
    coreHookAngle = `Pure tactile engineering. Designed for the relentless craft of ${audience}.`;
  } else if (input.toneOfVoice === "technical-authority") {
    narrativeFramework = "Hardware Exploded View & Precision Tolerance Breakdown";
    coreHookAngle = `Engineered down to the micrometer. Why off-the-shelf solutions fail ${audience}.`;
  } else if (input.toneOfVoice === "high-energy-direct-response") {
    narrativeFramework = "Direct Disruptive Pattern Interrupt with High-Velocity Social Hook";
    coreHookAngle = `Your current setup is costing you hours every day. Watch this before upgrading.`;
  }

  // Generate 4 Storyboard Scenes
  const storyboard: StoryboardScene[] = [
    {
      sceneNumber: 1,
      timeRange: "00:00 - 00:03",
      durationSeconds: 3,
      cameraDirection: "Extreme macro slow-push, shallow depth-of-field (f/1.8).",
      visualPrompt: `Extreme macro close-up of ${product} chassis showing matte anodized texture and fine engraved tolerances. Lighting shifts from dark charcoal to subtle amber rim highlight.`,
      voiceoverCopy: `${coreHookAngle}`,
      onScreenText: `${brand.toUpperCase()} // ${product.toUpperCase()}`,
      soundDesign: "Subtle low sub-bass drone with crisp mechanical tactile latch click.",
    },
    {
      sceneNumber: 2,
      timeRange: "00:03 - 00:09",
      durationSeconds: 6,
      cameraDirection: "Smooth orbital 360-degree crane tracking shot.",
      visualPrompt: `Exploded assembly view highlighting internal engineering: ${input.keyDifferentiators.slice(0, 2).join(", ")}. Translucent layers reveal precision circuits and structural alloy frame.`,
      voiceoverCopy: `Engineered specifically for ${audience}. Most tools break under heavy loads—${brand} delivers ${valueProp}.`,
      onScreenText: input.keyDifferentiators[0] || "Zero-Compromise Architecture",
      soundDesign: "Rhythmic percussive pulse; crisp metallic slide accents syncing with component snaps.",
    },
    {
      sceneNumber: 3,
      timeRange: "00:09 - 00:15",
      durationSeconds: 6,
      cameraDirection: "High-contrast dynamic whip pan transitioning to in-situ workspace setup.",
      visualPrompt: `User interaction shot showing seamless operation in a minimalist architectural studio. Clean desktop cables, ambient warm desk lighting, fluid physical response.`,
      voiceoverCopy: `Tactile feedback, zero latency, and absolute reliability when deadlines matter most.`,
      onScreenText: input.keyDifferentiators[1] || "Built For Peak Focus",
      soundDesign: "Satisfying tactile acoustic resonance; upward melodic synth riser.",
    },
    {
      sceneNumber: 4,
      timeRange: "00:15 - 00:20",
      durationSeconds: 5,
      cameraDirection: "Frontal locked hero perspective with subtle cinematic float.",
      visualPrompt: `Full hero product lockup with subtle atmospheric haze. Brand wordmark snaps center-frame with product release batch details.`,
      voiceoverCopy: `Experience ${product}. Available for pre-order now at ${brand.toLowerCase().replace(/[^a-z0-9]/g, "")}.com.`,
      onScreenText: `ORDER AT ${brand.toUpperCase()}.COM\nLIMITED PILOT BATCH`,
      soundDesign: "Clean studio logo mnemonic chime decaying into deep analog reverb.",
    },
  ];

  // Generate Deliverables based on aspect ratios
  const deliverables: ProductionDeliverable[] = [];
  const ratios = input.aspectRatios.length > 0 ? input.aspectRatios : ["9:16", "1:1", "16:9"];

  if (ratios.includes("9:16")) {
    deliverables.push({
      id: "deliv-916-reel",
      name: "Short-Form Video Ad (Vertical)",
      format: "MP4 (H.265 / ProRes 422 HQ)",
      resolution: "1080 x 1920 (9:16)",
      platformTarget: "Meta Reels, TikTok, YouTube Shorts",
      assetType: "hero_video",
    });
    deliverables.push({
      id: "deliv-916-hook",
      name: "High-Energy Hook Variations (3x 3-sec cutdowns)",
      format: "MP4",
      resolution: "1080 x 1920 (9:16)",
      platformTarget: "Meta Ad Creative Testing (A/B testing)",
      assetType: "ugc_hook",
    });
  }

  if (ratios.includes("1:1")) {
    deliverables.push({
      id: "deliv-11-feed",
      name: "Square Feed Hero Video",
      format: "MP4",
      resolution: "1080 x 1080 (1:1)",
      platformTarget: "Instagram Feed & LinkedIn Sponsored Content",
      assetType: "hero_video",
    });
  }

  if (ratios.includes("16:9")) {
    deliverables.push({
      id: "deliv-169-master",
      name: "Cinematic 4K Master Header Video",
      format: "ProRes 4444 / WebM Transparent",
      resolution: "3840 x 2160 (16:9)",
      platformTarget: "Shopify Storefront Hero & YouTube Landscape Ads",
      assetType: "hero_video",
    });
  }

  // Planning stages only; production timing is scoped separately.
  const milestones = [
    { day: "Stage 1", description: "Review the product brief, narrative direction, and copy." },
    { day: "Stage 2", description: "Plan camera framing, visual treatment, and motion references." },
    { day: "Stage 3", description: "Scope production assets, rendering, and sound work separately." },
    { day: "Stage 4", description: "Review proposed formats and agree a delivery plan." },
  ];

  return {
    brandName: brand,
    productTitle: product,
    coreHookAngle,
    narrativeFramework,
    storyboard,
    deliverables,
    estimatedProductionDays: null,
    milestones,
    synthesizedAt: new Date().toISOString(),
  };
}

// Preset Samples
export const SAMPLE_LUMINADESK_BRIEF: CreativeBriefInput = {
  brandName: "LuminaDesk",
  productCategory: "Ergonomic Office Hardware",
  productTitle: "Modular Standing Desk Controller with AI Posture Sensor",
  targetAudience: "Software engineers, designers, and remote founders",
  primaryValueProp: "Real-time posture tracking without camera privacy concerns",
  keyDifferentiators: [
    "Sub-millimeter dual-motor height memory",
    "Haptic vibration wrist alert when slouching",
    "Local offline edge sensor (zero cloud video upload)",
  ],
  aspectRatios: ["9:16", "1:1", "16:9"],
  toneOfVoice: "problem-solution-cinematic",
};

export const SAMPLE_PULSEROAST_BRIEF: CreativeBriefInput = {
  brandName: "PulseRoast",
  productCategory: "Specialty Kitchen Appliances",
  productTitle: "Smart Induction Micro-Batch Coffee Roaster",
  targetAudience: "Specialty coffee hobbyists and boutique cafe roasters",
  primaryValueProp: "PID thermal profile curve replication down to 0.1°C",
  keyDifferentiators: [
    "Induction heating drum with zero open flame",
    "Bluetooth real-time Artisan roasting software sync",
    "Chaff collection cyclonic vacuum chamber",
  ],
  aspectRatios: ["9:16", "1:1"],
  toneOfVoice: "minimal-editorial",
};

export const SAMPLE_ZEROLATENCY_BRIEF: CreativeBriefInput = {
  brandName: "ZeroLatency",
  productCategory: "Professional Pro-Audio Interfaces",
  productTitle: "USB-C FPGA 32-Bit Floating Point Audio Interface",
  targetAudience: "Electronic music producers, vocalists, and sound designers",
  primaryValueProp: "Sub-1ms true roundtrip monitoring latency over USB-C",
  keyDifferentiators: [
    "FPGA discrete DSP hardware processing",
    "32-bit float analog-to-digital converters (impossible to clip)",
    "Machined aluminum unibody enclosure",
  ],
  aspectRatios: ["9:16", "16:9"],
  toneOfVoice: "technical-authority",
};

export const ALL_SAMPLE_BRIEFS: { id: string; name: string; brief: CreativeBriefInput }[] = [
  { id: "luminadesk", name: "LuminaDesk (Smart Ergonomics)", brief: SAMPLE_LUMINADESK_BRIEF },
  { id: "pulseroast", name: "PulseRoast (Precision Hardware)", brief: SAMPLE_PULSEROAST_BRIEF },
  { id: "zerolatency", name: "ZeroLatency (Pro-Audio FPGA)", brief: SAMPLE_ZEROLATENCY_BRIEF },
];

