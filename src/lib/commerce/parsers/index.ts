import { RawProductRecord } from "../types";
import { parseCsvFeed } from "./csvParser";
import { parseXmlFeed } from "./xmlParser";

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB maximum
export const MAX_PRODUCTS_ALLOWED = 10000; // 10,000 product limit for browser responsiveness

export interface ParseFeedResult {
  success: boolean;
  format: "csv" | "tsv" | "xml" | "unknown";
  products: RawProductRecord[];
  totalParsed: number;
  errors: string[];
}

/**
 * Detects feed format by filename extension and content heuristic.
 */
export function detectFeedFormat(fileName: string, content: string): "csv" | "tsv" | "xml" | "unknown" {
  const ext = fileName.toLowerCase().split(".").pop() || "";

  if (ext === "xml") return "xml";
  if (ext === "tsv") return "tsv";
  if (ext === "csv") return "csv";

  // Heuristic inspection on content
  const trimmed = content.trim().slice(0, 500);
  if (trimmed.startsWith("<?xml") || trimmed.startsWith("<rss") || trimmed.startsWith("<feed") || trimmed.includes("<item>")) {
    return "xml";
  }

  const firstLine = trimmed.split(/\r\n|\n|\r/)[0] || "";
  if (firstLine.includes("\t")) return "tsv";
  if (firstLine.includes(",")) return "csv";

  return "unknown";
}

/**
 * Master parser entrypoint for all commercial feed types.
 */
export function parseProductFeed(
  fileName: string,
  content: string,
  fileSizeBytes: number
): ParseFeedResult {
  // 1. File size check
  if (fileSizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      format: "unknown",
      products: [],
      totalParsed: 0,
      errors: [
        `File size (${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB) exceeds the maximum allowed limit of 10 MB.`,
      ],
    };
  }

  if (!content || content.trim().length === 0) {
    return {
      success: false,
      format: "unknown",
      products: [],
      totalParsed: 0,
      errors: ["Feed file is empty."],
    };
  }

  // 2. Format detection
  const format = detectFeedFormat(fileName, content);

  if (format === "xml") {
    const xmlRes = parseXmlFeed(content, MAX_PRODUCTS_ALLOWED);
    return {
      success: xmlRes.products.length > 0 && xmlRes.errors.length === 0,
      format: "xml",
      products: xmlRes.products,
      totalParsed: xmlRes.totalItems,
      errors: xmlRes.errors,
    };
  }

  if (format === "csv" || format === "tsv") {
    const csvRes = parseCsvFeed(content, MAX_PRODUCTS_ALLOWED);
    return {
      success: csvRes.products.length > 0,
      format: csvRes.delimiter === "\t" ? "tsv" : "csv",
      products: csvRes.products,
      totalParsed: csvRes.totalRows,
      errors: csvRes.errors,
    };
  }

  return {
    success: false,
    format: "unknown",
    products: [],
    totalParsed: 0,
    errors: [
      "Unsupported file format. Please upload a standard Google Merchant Center CSV, TSV, or XML feed (.csv, .tsv, .xml, .txt).",
    ],
  };
}
