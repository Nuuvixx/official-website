"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styles from "@/app/studio/studio.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="question-0" className={styles.faqList}>
      {items.map((item, index) => (
        <Accordion.Item key={item.question} value={`question-${index}`} className={styles.faqItem}>
          <Accordion.Header className={styles.faqHeader}>
            <Accordion.Trigger className={styles.faqQuestion}>
              <span>{item.question}</span>
              <ChevronDown size={18} aria-hidden="true" className={styles.faqChevron} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.faqContent}>
            <div className={styles.faqAnswer}>{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
