"use client";

import { useState } from "react";
import { PaperPlaneRight, CheckCircle, WarningCircle, CircleNotch } from "@phosphor-icons/react";
import styles from "./commercial-inquiry.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";

interface CommercialInquiryFormProps {
  defaultService?: string;
  sourceContext?: string;
}

export default function CommercialInquiryForm({
  defaultService = "commerce-rescue",
  sourceContext = "Direct Studio Intake",
}: CommercialInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyOrWebsite: "",
    service: defaultService,
    problem: "",
    budget: "",
    timeline: "immediate",
    consent: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [inquiryId, setInquiryId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }
    if (!formData.companyOrWebsite.trim()) {
      setErrorMessage("Please provide your company name or store/app URL.");
      return;
    }
    if (!formData.problem.trim() || formData.problem.trim().length < 10) {
      setErrorMessage("Please share a brief summary of the issue or project scope (min 10 characters).");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please check the consent box to submit your project inquiry.");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourceContext,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Unable to submit your inquiry. Please try again.");
      } else {
        setStatus("success");
        setInquiryId(data.inquiryId || "");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network connection failure. Please email us directly at hello@nuuvixx.com.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      companyOrWebsite: "",
      service: defaultService,
      problem: "",
      budget: "",
      timeline: "immediate",
      consent: false,
      honeypot: "",
    });
    setStatus("idle");
    setErrorMessage("");
    setInquiryId("");
  };

  if (status === "success") {
    return (
      <div className={styles.formCard}>
        <div className={styles.successBox}>
          <CheckCircle size={56} weight="fill" className={styles.successIcon} />
          <h3 className={styles.successTitle}>Inquiry Confirmed</h3>
          <p className={styles.successDesc}>
            Thank you for reaching out. We have registered your inquiry
            {inquiryId ? ` (Ref: ${inquiryId})` : ""}. A dedicated Nuuvixx technical lead will review your
            requirements and respond within 24 business hours with initial diagnostic steps.
          </p>
          <button onClick={handleReset} className={styles.resetBtn}>
            Submit Another Project Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <div className={styles.badge}>Commercial Intake</div>
        <h3 className={styles.formTitle}>Initiate Technical Project</h3>
        <p className={styles.formSubtitle}>
          Direct scope qualification with our founding engineers. No generic sales reps or spam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Elena Rostova"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Business Email <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="elena@company.com"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="companyOrWebsite" className={styles.label}>
              Company / Store URL <span className={styles.required}>*</span>
            </label>
            <input
              id="companyOrWebsite"
              name="companyOrWebsite"
              type="text"
              placeholder="brand.com or company name"
              value={formData.companyOrWebsite}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="service" className={styles.label}>
              Commercial Division <span className={styles.required}>*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={styles.select}
              required
            >
              {STUDIO_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.introPricing.range})
                </option>
              ))}
              <option value="custom-enterprise">Custom Architecture / Enterprise Advisory</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="problem" className={styles.label}>
            Problem Description & Scope <span className={styles.required}>*</span>
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={4}
            placeholder="Describe the technical bottleneck, error codes, affected SKUs, repo stack, or timeline urgency..."
            value={formData.problem}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="budget" className={styles.label}>
              Estimated Budget (USD)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select an introductory tier...</option>
              <option value="intro-100-250">$99 – $250 (Fixed-Scope Pilot / Diagnostic)</option>
              <option value="tier-250-500">$250 – $500 (Comprehensive Remediation)</option>
              <option value="tier-500-1500">$500 – $1,500 (Complex Multi-System Engagement)</option>
              <option value="custom">Custom / Retainer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeline" className={styles.label}>
              Target Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="immediate">Immediate / Critical (within 24-48 hrs)</option>
              <option value="this-week">Within this week</option>
              <option value="this-month">Planning for this month</option>
              <option value="exploratory">Exploratory / Discovery</option>
            </select>
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={handleChange}
            className={styles.checkbox}
            required
          />
          <label htmlFor="consent" className={styles.checkboxLabel}>
            I confirm that I am an authorized technical or business representative. I consent to Nuuvixx
            reviewing this brief under mutual professional confidentiality. (Never submit passwords or live credentials).
          </label>
        </div>

        {errorMessage && (
          <div className={`${styles.statusMessage} ${styles.errorMessage}`}>
            <WarningCircle size={18} weight="fill" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={styles.submitBtn}
        >
          {status === "submitting" ? (
            <>
              <CircleNotch size={18} className="animate-spin" />
              Submitting Brief...
            </>
          ) : (
            <>
              Submit Technical Project Brief
              <PaperPlaneRight size={18} weight="bold" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
