"use client";

import { useState, useMemo } from "react";
import {
  FilmStrip,
  VideoCamera,
  SpeakerHigh,
  ArrowRight,
  FileCode,
  ShieldCheck,
} from "@phosphor-icons/react";
import styles from "./demos.module.css";
import {
  synthesizeCreativeBlueprint,
  ALL_SAMPLE_BRIEFS,
  SAMPLE_LUMINADESK_BRIEF,
} from "@/lib/creative/briefBuilder";
import { CreativeBriefInput, CreativeTone } from "@/lib/creative/types";

export default function CreativeWorkflowDemo() {
  const [selectedPresetId, setSelectedPresetId] = useState("luminadesk");
  const [briefInput, setBriefInput] = useState<CreativeBriefInput>(SAMPLE_LUMINADESK_BRIEF);

  const blueprint = useMemo(() => {
    return synthesizeCreativeBlueprint(briefInput);
  }, [briefInput]);

  const handleSelectPreset = (id: string) => {
    const found = ALL_SAMPLE_BRIEFS.find((b) => b.id === id);
    if (found) {
      setSelectedPresetId(found.id);
      setBriefInput(found.brief);
    }
  };

  const handleDownloadBlueprint = () => {
    const jsonStr = JSON.stringify(blueprint, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${blueprint.brandName.toLowerCase()}-campaign-blueprint.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.demoContainer}>
      {/* Header */}
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Blueprint Generator</span>
          <h4 className={styles.demoTitle}>
            Nuuvixx Creative: Storyboard Blueprint &amp; Brief Pipeline
          </h4>
        </div>
        <div className={styles.demoControls}>
          {ALL_SAMPLE_BRIEFS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`${styles.presetBtn} ${
                selectedPresetId === preset.id ? styles.presetBtnActive : ""
              }`}
              onClick={() => handleSelectPreset(preset.id)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.demoBody}>
        {/* Transparency Banner */}
        <div className={styles.privacyBanner}>
          <ShieldCheck size={16} weight="fill" color="#52C41A" />
          <span>
            <strong>Deterministic Storyboard Architecture:</strong> Generates concrete shot lists, lighting prompts, camera directions, and multi-ratio deliverable matrices from structured product parameters.
          </span>
        </div>

        {/* Interactive Brief Parameter Controls */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
            background: "rgba(255, 255, 255, 0.02)",
            padding: "14px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <label htmlFor="creative-brand" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#A6A095", marginBottom: "4px" }}>
              Brand Name
            </label>
            <input
              id="creative-brand"
              type="text"
              value={briefInput.brandName}
              onChange={(e) => setBriefInput({ ...briefInput, brandName: e.target.value })}
              style={{
                width: "100%",
                background: "#0B0B0C",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "6px 10px",
                borderRadius: "3px",
                color: "#FFFFFF",
                fontSize: "0.82rem",
              }}
            />
          </div>

          <div>
            <label htmlFor="creative-product" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#A6A095", marginBottom: "4px" }}>
              Product Title
            </label>
            <input
              id="creative-product"
              type="text"
              value={briefInput.productTitle}
              onChange={(e) => setBriefInput({ ...briefInput, productTitle: e.target.value })}
              style={{
                width: "100%",
                background: "#0B0B0C",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "6px 10px",
                borderRadius: "3px",
                color: "#FFFFFF",
                fontSize: "0.82rem",
              }}
            />
          </div>

          <div>
            <label htmlFor="creative-tone" style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#A6A095", marginBottom: "4px" }}>
              Tone of Voice
            </label>
            <select
              id="creative-tone"
              value={briefInput.toneOfVoice}
              onChange={(e) => setBriefInput({ ...briefInput, toneOfVoice: e.target.value as CreativeTone })}
              style={{
                width: "100%",
                background: "#0B0B0C",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "6px 10px",
                borderRadius: "3px",
                color: "#FFFFFF",
                fontSize: "0.82rem",
              }}
            >
              <option value="problem-solution-cinematic">Problem-Solution Cinematic</option>
              <option value="minimal-editorial">Minimal Editorial &amp; Tactile</option>
              <option value="technical-authority">Technical Authority &amp; Exploded View</option>
              <option value="high-energy-direct-response">High-Energy Direct Response</option>
            </select>
          </div>
        </div>

        {/* Scorecard */}
        <div className={styles.scorecard}>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Storyboard Scenes</div>
            <div className={styles.scoreValue}>{blueprint.storyboard.length} Shots</div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Narrative sequence
            </div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Suggested Formats</div>
            <div className={styles.scoreValue} style={{ color: "var(--color-orange)" }}>
              {blueprint.deliverables.length} Options
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Multi-ratio formats
            </div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Production Timeline</div>
            <div className={styles.scoreValue} style={{ fontSize: "0.95rem" }}>Scoped separately</div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Subject to scope lock
            </div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Target Ratios</div>
            <div className={styles.scoreValue} style={{ fontSize: "0.85rem" }}>
              {briefInput.aspectRatios.join(" · ")}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Platform adaptations
            </div>
          </div>
        </div>

        {/* Boundary & Scope Disclosure */}
        <div style={{ marginBottom: "16px", padding: "10px 14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", fontSize: "0.78rem", color: "#A6A095", lineHeight: 1.5 }}>
          <strong style={{ color: "#E5DFD6" }}>Pre-Production Blueprint Notice:</strong> Output represents a structured creative concept, shot list, and copy outline for production planning. It is NOT a finished video render or ready-to-run advertising campaign. Custom 3D modeling, rendering, and sound mastering are executed during paid production engagements.
        </div>

        {/* Storyboard Render Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <div className={styles.statusIndicator}>
              <FilmStrip size={18} weight="bold" color="var(--color-orange)" />
              <span style={{ color: "#FFFFFF" }}>
                Campaign Narrative: {blueprint.narrativeFramework}
              </span>
            </div>

            <button
              type="button"
              className={styles.presetBtn}
              onClick={handleDownloadBlueprint}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FileCode size={16} weight="bold" />
              <span>Export Production Blueprint (JSON)</span>
            </button>
          </div>

          <div style={{ marginBottom: "14px", padding: "10px 14px", background: "rgba(245, 107, 37, 0.05)", border: "1px solid rgba(245, 107, 37, 0.25)", borderRadius: "4px" }}>
            <span style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "var(--color-orange)", fontWeight: 700 }}>
              Primary Hook Angle:{" "}
            </span>
            <span style={{ fontSize: "0.85rem", color: "#E5DFD6", fontStyle: "italic" }}>
              &ldquo;{blueprint.coreHookAngle}&rdquo;
            </span>
          </div>

          {/* Scenes Grid */}
          <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
            {blueprint.storyboard.map((scene) => (
              <div
                key={scene.sceneNumber}
                className={styles.issueCard}
                style={{ borderLeft: "3px solid var(--color-orange)" }}
              >
                <div className={styles.issueHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className={styles.tagWarning}>
                      Scene {scene.sceneNumber} ({scene.timeRange})
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#A6A095", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <VideoCamera size={14} />
                      {scene.cameraDirection}
                    </span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--color-orange)" }}>
                    {scene.durationSeconds}s
                  </span>
                </div>

                <div style={{ fontSize: "0.82rem", color: "#E5DFD6", marginBottom: "6px" }}>
                  <strong>Visual Framing:</strong> {scene.visualPrompt}
                </div>

                <div style={{ fontSize: "0.78rem", color: "var(--color-orange)", marginBottom: "8px", fontFamily: "monospace" }}>
                  <strong>On-Screen Text:</strong> {scene.onScreenText}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    background: "#0B0B0C",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                  }}
                >
                  <div>
                    <span style={{ color: "#A6A095", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>
                      Voiceover / Script
                    </span>
                    <span style={{ color: "#FFFFFF" }}>{scene.voiceoverCopy}</span>
                  </div>

                  <div>
                    <span style={{ color: "#A6A095", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>
                      Sound Design Cues
                    </span>
                    <span style={{ color: "#FFA940", display: "flex", alignItems: "center", gap: "4px" }}>
                      <SpeakerHigh size={12} />
                      {scene.soundDesign}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables Section */}
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <h5 style={{ fontSize: "0.85rem", color: "#FFFFFF", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Possible production formats:
            </h5>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
              {blueprint.deliverables.map((deliv) => (
                <div
                  key={deliv.id}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{deliv.name}</div>
                  <div style={{ color: "var(--color-orange)", fontFamily: "monospace" }}>{deliv.resolution}</div>
                  <div style={{ color: "#A6A095", fontSize: "0.72rem", marginTop: "2px" }}>{deliv.platformTarget}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div className={styles.ctaBar}>
            <div style={{ fontSize: "0.85rem", color: "#A6A095" }}>
              Ready to commission full 3D product animation, motion storyboards, and short-form video ads?
            </div>
            <a href="#intake" className={styles.ctaButton}>
              <span>Discuss a creative engagement</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
