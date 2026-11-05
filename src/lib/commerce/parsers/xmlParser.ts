import { RawProductRecord } from "../types";

export interface XmlParseResult {
  products: RawProductRecord[];
  totalItems: number;
  feedType: "rss2" | "atom" | "unknown";
  errors: string[];
}

/**
 * Unescapes standard XML entity sequences and CDATA blocks safely.
 */
function cleanXmlText(raw: string): string {
  if (!raw) return "";

  // 1. Extract CDATA content if present
  let text = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1");

  // 2. Unescape XML predefined entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  return text.trim();
}

/**
 * Checks for dangerous XML entity declarations (XXE, Billion Laughs attacks).
 */
export function validateXmlSecurity(xmlContent: string): { safe: boolean; error?: string } {
  // Disallow DTD entity declarations
  if (/<!ENTITY/i.test(xmlContent)) {
    return {
      safe: false,
      error: "Malicious XML construct detected: External and custom <!ENTITY declarations are prohibited (XXE / Entity Expansion defense).",
    };
  }

  // Disallow external DTD references
  if (/<!DOCTYPE[^>]+(?:SYSTEM|PUBLIC)[^>]*>/i.test(xmlContent)) {
    return {
      safe: false,
      error: "Malicious XML construct detected: External DTD references (SYSTEM/PUBLIC) are prohibited to prevent SSRF and XXE.",
    };
  }

  return { safe: true };
}

/**
 * Safe, streaming-style parser for Google Merchant Center XML feeds (RSS 2.0 and Atom).
 * Avoids DOM-level entity expansion vulnerabilities by operating on explicit item boundaries.
 */
export function parseXmlFeed(content: string, maxProducts: number = 10000): XmlParseResult {
  const errors: string[] = [];

  // Security Check
  const secCheck = validateXmlSecurity(content);
  if (!secCheck.safe) {
    return {
      products: [],
      totalItems: 0,
      feedType: "unknown",
      errors: [secCheck.error || "Unsafe XML construct."],
    };
  }

  // Detect feed flavor
  const isRss = /<rss|<channel/i.test(content);
  const isAtom = /<feed|<entry/i.test(content);
  const feedType = isRss ? "rss2" : isAtom ? "atom" : "unknown";

  const itemRegex = isAtom
    ? /<entry[\s>]([\s\S]*?)<\/entry>/gi
    : /<item[\s>]([\s\S]*?)<\/item>/gi;

  const products: RawProductRecord[] = [];
  let match: RegExpExecArray | null = null;
  let itemCount = 0;

  while ((match = itemRegex.exec(content)) !== null) {
    itemCount++;
    if (products.length >= maxProducts) {
      errors.push(`Product count limit reached (${maxProducts}). Remaining XML items omitted.`);
      break;
    }

    const itemBody = match[1];
    const record: RawProductRecord = {};

    // Extract all tags within the item, supporting with or without namespace (e.g. <g:id> or <id>)
    const tagRegex = /<(?:g:)?([a-zA-Z0-9_\-]+)(?:\s+[^>]*?)?>([\s\S]*?)<\/(?:g:)?\1>/gi;
    let tagMatch: RegExpExecArray | null = null;

    while ((tagMatch = tagRegex.exec(itemBody)) !== null) {
      const tagName = tagMatch[1].toLowerCase().replace(/^g:/, "");
      const tagValue = cleanXmlText(tagMatch[2]);

      // If key already exists (e.g. additional_image_link), concatenate or preserve
      if (record[tagName]) {
        if (tagName === "additional_image_link") {
          record[tagName] = `${record[tagName]}, ${tagValue}`;
        }
      } else {
        record[tagName] = tagValue;
      }
    }

    // Atom-specific fallback mapping
    if (isAtom) {
      if (!record.id && record.link) record.id = record.link;
      if (!record.link) {
        const linkHrefMatch = /<link[^>]+href=["']([^"']+)["'][^>]*>/i.exec(itemBody);
        if (linkHrefMatch) record.link = linkHrefMatch[1];
      }
    }

    products.push(record);
  }

  if (itemCount === 0) {
    errors.push("No valid <item> or <entry> product elements found in the XML feed.");
  }

  return {
    products,
    totalItems: itemCount,
    feedType,
    errors,
  };
}
