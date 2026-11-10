import {
  synthesizeCreativeBlueprint,
  SAMPLE_LUMINADESK_BRIEF,
  SAMPLE_PULSEROAST_BRIEF,
} from "../src/lib/creative/briefBuilder.ts";

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`  ✓ PASS: ${message}`);
}

console.log("==================================================================");
console.log("  NUUVIXX CREATIVE: BLUEPRINT & STORYBOARD SYNTHESIZER TEST      ");
console.log("==================================================================");

// --- TEST GROUP 1: LuminaDesk Blueprint ---
console.log("\n--- TEST GROUP 1: LuminaDesk Hardware Campaign Blueprint ---");
const luminaBlueprint = synthesizeCreativeBlueprint(SAMPLE_LUMINADESK_BRIEF);

assert(luminaBlueprint.brandName === "LuminaDesk", "Brand name preserved");
assert(luminaBlueprint.storyboard.length === 4, "Generated 4-scene narrative arc");
assert(luminaBlueprint.storyboard[0].cameraDirection.includes("f/1.8"), "Scene 1 contains camera depth-of-field direction");
assert(luminaBlueprint.storyboard[0].soundDesign.includes("sub-bass"), "Scene 1 has audio sound cues");
assert(luminaBlueprint.deliverables.length >= 3, `Generated aspect ratio deliverables (got ${luminaBlueprint.deliverables.length})`);
assert(luminaBlueprint.deliverables.some((d) => d.resolution.includes("1080 x 1920")), "Includes 9:16 vertical resolution deliverable");
assert(luminaBlueprint.deliverables.some((d) => d.resolution.includes("3840 x 2160")), "Includes 16:9 4K master header deliverable");
assert(luminaBlueprint.milestones.length === 4, "Includes 4-step delivery schedule");
assert(luminaBlueprint.estimatedProductionDays === null && luminaBlueprint.milestones.every((step) => step.day.startsWith("Stage")), "Blueprint leaves production timing for a scoped engagement");

// --- TEST GROUP 2: Minimal Editorial Roaster ---
console.log("\n--- TEST GROUP 2: Minimal Editorial Roaster Blueprint ---");
const pulseBlueprint = synthesizeCreativeBlueprint(SAMPLE_PULSEROAST_BRIEF);

assert(pulseBlueprint.narrativeFramework.includes("Sensory Tactility"), "Tone of voice selects minimal-editorial framework");
assert(pulseBlueprint.coreHookAngle.includes("Pure tactile"), "Tone-specific hook generated");

console.log("\n==================================================================");
console.log(`✅ ALL ${passedTests}/${totalTests} CREATIVE BLUEPRINT TESTS PASSED!`);
console.log("==================================================================");

