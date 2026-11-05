import { RawProductRecord } from "../types";

export interface CsvParseResult {
  products: RawProductRecord[];
  totalRows: number;
  delimiter: string;
  errors: string[];
}

/**
 * Normalizes header string to standard GMC attribute name.
 * e.g. 'g:id' -> 'id', 'Product ID' -> 'id', 'g:image_link' -> 'image_link'
 */
export function normalizeHeaderKey(rawHeader: string): string {
  const clean = rawHeader.trim().toLowerCase().replace(/^g:/, "");
  
  const map: Record<string, string> = {
    "sku": "id",
    "product_id": "id",
    "item_id": "id",
    "product id": "id",
    "item id": "id",
    "handle": "id",
    "product_name": "title",
    "product title": "title",
    "product title / name": "title",
    "body (html)": "description",
    "body": "description",
    "prod_desc": "description",
    "url": "link",
    "product_url": "link",
    "product url": "link",
    "image": "image_link",
    "image_url": "image_link",
    "image url": "image_link",
    "featured image": "image_link",
    "stock_status": "availability",
    "stock status": "availability",
    "in_stock": "availability",
    "variant price": "price",
    "regular_price": "price",
    "sale price": "sale_price",
    "barcode": "gtin",
    "upc": "gtin",
    "ean": "gtin",
    "vendor": "brand",
    "category": "google_product_category",
    "type": "product_type",
  };

  return map[clean] || clean.replace(/\s+/g, "_");
}

/**
 * Robust RFC 4180 streaming-capable delimiter parser.
 * Handles embedded newlines, quotes, commas, and tabs safely.
 */
export function parseCsvRows(text: string, maxRows: number = 10000): { rows: string[][]; delimiter: string } {
  // Detect delimiter from first non-empty line
  const firstLine = text.slice(0, 1000).split(/\r\n|\n|\r/)[0] || "";
  const commaCount = (firstLine.match(/,/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const delimiter = tabCount > commaCount ? "\t" : ",";

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;
  let i = 0;
  const len = text.length;

  while (i < len) {
    if (rows.length >= maxRows) break;

    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote: "" -> "
          currentField += '"';
          i += 2;
          continue;
        } else {
          // Closing quote
          insideQuotes = false;
          i++;
          continue;
        }
      } else {
        currentField += char;
        i++;
        continue;
      }
    }

    if (char === '"') {
      insideQuotes = true;
      i++;
      continue;
    }

    if (char === delimiter) {
      currentRow.push(currentField.trim());
      currentField = "";
      i++;
      continue;
    }

    if (char === "\r" || char === "\n") {
      // Handle CRLF or single LF/CR
      currentRow.push(currentField.trim());
      currentField = "";
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];

      if (char === "\r" && nextChar === "\n") {
        i += 2;
      } else {
        i++;
      }
      continue;
    }

    currentField += char;
    i++;
  }

  // Push last remaining field and row
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return { rows, delimiter };
}

/**
 * Parses CSV/TSV product feed text into normalized RawProductRecord array
 */
export function parseCsvFeed(content: string, maxProducts: number = 10000): CsvParseResult {
  const errors: string[] = [];
  const { rows, delimiter } = parseCsvRows(content, maxProducts + 1);

  if (rows.length < 2) {
    return {
      products: [],
      totalRows: rows.length,
      delimiter,
      errors: ["Feed file does not contain enough data (must contain a header row and at least 1 product row)."],
    };
  }

  const rawHeaders = rows[0];
  const normalizedHeaders = rawHeaders.map(normalizeHeaderKey);
  const products: RawProductRecord[] = [];

  for (let r = 1; r < rows.length; r++) {
    if (products.length >= maxProducts) {
      errors.push(`Product count limit reached (${maxProducts}). Remaining rows truncated.`);
      break;
    }

    const row = rows[r];
    const record: RawProductRecord = {};

    for (let c = 0; c < normalizedHeaders.length; c++) {
      const key = normalizedHeaders[c];
      const val = row[c] !== undefined ? row[c] : "";
      if (key) {
        record[key] = val;
      }
    }

    products.push(record);
  }

  return {
    products,
    totalRows: rows.length - 1,
    delimiter,
    errors,
  };
}
