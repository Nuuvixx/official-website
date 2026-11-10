"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/app/studio/studio.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={styles.faqList}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={item.question} className={styles.faqItem}>
            <button
              onClick={() => toggle(idx)}
              className={styles.faqQuestion}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  color: isOpen ? "var(--color-orange)" : "var(--color-muted)",
                  flexShrink: 0,
                }}
              />
            </button>
            {isOpen && <div className={styles.faqAnswer}>{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
