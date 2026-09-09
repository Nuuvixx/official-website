"use client";

import { useState } from "react";
import styles from "@/app/contact/contact.module.css";
import { PaperPlaneRight, CheckCircle, CircleNotch, WarningCircle, EnvelopeSimple } from "@phosphor-icons/react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honey: "", // Anti-bot honeypot
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [needsActivation, setNeedsActivation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setNeedsActivation(Boolean(data.needsActivation));
      setStatus("success");
    } catch (err: unknown) {
      console.error("Failed to submit contact form:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "", honey: "" });
    setStatus("idle");
    setErrorMessage("");
    setNeedsActivation(false);
  };

  const fallbackMailto = `mailto:nuuvixx@gmail.com?subject=${encodeURIComponent(
    `Contact from ${formData.name || "Website Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  if (status === "success") {
    return (
      <div className={styles.form} style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: "var(--space-4)", color: "var(--color-volt)" }}>
          <CheckCircle size={56} weight="duotone" />
        </div>
        <h3 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-text-primary)", marginBottom: "var(--space-2)", fontWeight: 700 }}>
          {needsActivation ? "Activation Email Sent!" : "Message Sent!"}
        </h3>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", lineHeight: 1.6, marginBottom: "var(--space-6)" }}>
          {needsActivation ? (
            <>
              We&apos;ve sent an activation link to <strong>nuuvixx@gmail.com</strong>. Please check your inbox (or Spam/Updates) and click <strong>Activate Form</strong>. Once activated, all future messages arrive instantly!
            </>
          ) : (
            <>
              Thank you for reaching out. Your message has been routed to <strong>nuuvixx@gmail.com</strong>. We will get back to you shortly.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className={styles.submitBtn}
          style={{ width: "100%" }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Anti-spam honeypot field (hidden from genuine users) */}
      <input
        type="text"
        id="honey"
        value={formData.honey}
        onChange={handleChange}
        style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Alan Turing"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="alan@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          placeholder="How can we help?"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === "submitting"}
        ></textarea>
      </div>

      {status === "error" && (
        <div
          style={{
            background: "rgba(255, 68, 68, 0.1)",
            border: "1px solid rgba(255, 68, 68, 0.3)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 16px",
            color: "#ff7b7b",
            fontSize: "var(--font-size-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <WarningCircle size={20} weight="bold" />
            <span>{errorMessage}</span>
          </div>
          <a
            href={fallbackMailto}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--color-volt)",
              fontWeight: 600,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <EnvelopeSimple size={16} weight="bold" />
            Click here to open in your email client instead
          </a>
        </div>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "submitting"}
        style={{
          opacity: status === "submitting" ? 0.7 : 1,
          cursor: status === "submitting" ? "not-allowed" : "pointer",
        }}
      >
        {status === "submitting" ? (
          <>
            <span>Sending...</span>
            <CircleNotch size={20} className={styles.spinner} weight="bold" style={{ animation: "spin 1s linear infinite" }} />
          </>
        ) : (
          <>
            <span>Send Message</span>
            <PaperPlaneRight weight="bold" size={18} />
          </>
        )}
      </button>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
}
