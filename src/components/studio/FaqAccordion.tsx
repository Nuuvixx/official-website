"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
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
              <CaretDown
                size={18}
                weight="bold"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                  color: isOpen ? "var(--color-volt)" : "var(--color-text-secondary)",
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
