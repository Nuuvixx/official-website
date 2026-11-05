/**
 * Nuuvixx Commerce Rescue v1: Official Google Merchant Center Validation Rules
 * Source: Google Merchant Center Product Data Specification
 * https://support.google.com/merchants/answer/7052112
 */

export const GMC_SPEC_URL = "https://support.google.com/merchants/answer/7052112";

export const ALLOWED_AVAILABILITY = new Set([
  "in_stock",
  "out_of_stock",
  "preorder",
  "backorder",
]);

export const ALLOWED_CONDITIONS = new Set(["new", "refurbished", "used"]);

export const ALLOWED_AGE_GROUPS = new Set([
  "newborn",
  "infant",
  "toddler",
  "kids",
  "adult",
]);

export const ALLOWED_GENDERS = new Set(["male", "female", "unisex"]);

// ISO 4217 3-letter currency codes commonly used in Google Shopping
export const COMMON_CURRENCY_CODES = new Set([
  "USD", "CAD", "EUR", "GBP", "AUD", "NZD", "JPY", "CHF", "SEK", "NOK",
  "DKK", "PLN", "SGD", "HKD", "INR", "BRL", "MXN", "ZAR", "AED", "SAR"
]);

/**
 * Validates GTIN check digit using official GS1 Modulo-10 algorithm
 * Valid for GTIN-8, GTIN-12 (UPC), GTIN-13 (EAN), and GTIN-14.
 */
export function validateGtinChecksum(gtin: string): boolean {
  const clean = gtin.trim().replace(/[-\s]/g, "");
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(clean)) {
    return false;
  }

  const digits = clean.split("").map(Number);
  const checkDigit = digits.pop()!;
  
  // Starting from right to left, alternate weights 3 and 1
  let sum = 0;
  let weight = 3;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += digits[i] * weight;
    weight = weight === 3 ? 1 : 3;
  }

  const calculatedCheck = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheck;
}

/**
 * Validates Google Merchant Center price format:
 * [Number] [ISO 4217 Currency Code]
 * Examples: '15.99 USD', '120.00 EUR', '4500 JPY'
 */
export function parseGmcPrice(priceStr: string): { valid: boolean; amount?: number; currency?: string; error?: string } {
  if (!priceStr || typeof priceStr !== "string") {
    return { valid: false, error: "Price attribute is missing or empty." };
  }

  const trimmed = priceStr.trim();
  
  // Pattern: numeric amount (allowing optional decimal) followed by whitespace and 3-letter currency
  const match = trimmed.match(/^(\d+(?:\.\d{1,2})?)\s+([A-Za-z]{3})$/);
  if (!match) {
    if (/^\$?\d+(?:\.\d{1,2})?$/.test(trimmed)) {
      return {
        valid: false,
        error: "Missing ISO 4217 currency code (e.g., '19.99 USD' rather than '$19.99').",
      };
    }
    if (/,\d{2}/.test(trimmed)) {
      return {
        valid: false,
        error: "Comma used as decimal separator. GMC requires periods (e.g. '19.99' instead of '19,99').",
      };
    }
    return {
      valid: false,
      error: "Malformed price format. Required format: [amount] [CURRENCY] (e.g. '24.99 USD').",
    };
  }

  const amount = parseFloat(match[1]);
  const currency = match[2].toUpperCase();

  if (amount <= 0) {
    return { valid: false, error: "Price must be a positive value greater than zero." };
  }

  return { valid: true, amount, currency };
}
