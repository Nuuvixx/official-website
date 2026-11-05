import {
  FeedAuditSummary,
  FeedIssue,
  ProductAuditFinding,
  RawProductRecord,
} from "./types";
import {
  ALLOWED_AVAILABILITY,
  ALLOWED_CONDITIONS,
  GMC_SPEC_URL,
  parseGmcPrice,
  validateGtinChecksum,
} from "./rules";

const PROMOTIONAL_PHRASES = [
  "free shipping",
  "free delivery",
  "buy now",
  "best price",
  "discount",
  "on sale",
  "cheap",
  "save big",
  "limited time",
];

export function validateProductFeed(
  fileName: string,
  fileSizeBytes: number,
  products: RawProductRecord[],
  parseErrors: string[] = []
): FeedAuditSummary {
  const findings: ProductAuditFinding[] = [];
  const seenIds = new Map<string, number>(); // ID -> first rowIndex
  const issuesByField: Record<string, number> = {};

  let criticalTotal = 0;
  let warningTotal = 0;
  let infoTotal = 0;

  function addIssue(issues: FeedIssue[], issue: FeedIssue) {
    issues.push(issue);
    issuesByField[issue.field] = (issuesByField[issue.field] || 0) + 1;
    if (issue.severity === "critical") criticalTotal++;
    else if (issue.severity === "warning") warningTotal++;
    else if (issue.severity === "info") infoTotal++;
  }

  // First pass: identify duplicate IDs across the entire catalog
  const duplicateIds = new Set<string>();
  for (let idx = 0; idx < products.length; idx++) {
    const rawId = products[idx].id?.trim();
    if (rawId) {
      if (seenIds.has(rawId)) {
        duplicateIds.add(rawId);
      } else {
        seenIds.set(rawId, idx + 1);
      }
    }
  }

  // Second pass: audit each product individually
  for (let idx = 0; idx < products.length; idx++) {
    const p = products[idx];
    const rowIndex = idx + 1;
    const issues: FeedIssue[] = [];

    const rawId = p.id?.trim() || "";
    const rawTitle = p.title?.trim() || "";
    const rawDesc = p.description?.trim() || "";
    const rawLink = p.link?.trim() || "";
    const rawImage = p.image_link?.trim() || "";
    const rawAvail = p.availability?.trim() || "";
    const rawPrice = p.price?.trim() || "";
    const rawBrand = p.brand?.trim() || "";
    const rawGtin = p.gtin?.trim() || "";
    const rawIdentExists = p.identifier_exists?.trim().toLowerCase() || "";

    const sku = rawId || `ROW_${rowIndex}`;
    const displayTitle = rawTitle || `(Untitled Product ${rowIndex})`;

    // -------------------------------------------------------------------------
    // 1. Identifier Validation (id / g:id)
    // -------------------------------------------------------------------------
    if (!rawId) {
      addIssue(issues, {
        id: `ERR_ID_MISSING_${rowIndex}`,
        ruleId: "ID_REQUIRED",
        field: "id",
        severity: "critical",
        title: "Missing Required Attribute: id",
        message: "Product lacks a unique item identifier. Google Merchant Center will reject this item.",
        remediation: "Map your store SKU or Variant ID to the `<g:id>` / `id` attribute.",
        specCitation: `${GMC_SPEC_URL}#id`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      if (rawId.length > 50) {
        addIssue(issues, {
          id: `ERR_ID_LENGTH_${rowIndex}`,
          ruleId: "ID_MAX_LENGTH",
          field: "id",
          severity: "critical",
          title: "Identifier Exceeds 50 Characters",
          message: `The item ID length (${rawId.length}) exceeds Google's 50-character limit.`,
          remediation: "Truncate or re-hash the SKU/Variant ID to under 50 characters.",
          specCitation: `${GMC_SPEC_URL}#id`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }

      if (duplicateIds.has(rawId)) {
        addIssue(issues, {
          id: `ERR_ID_DUP_${rowIndex}`,
          ruleId: "ID_UNIQUE",
          field: "id",
          severity: "critical",
          title: "Duplicate Product Identifier",
          message: `The identifier '${rawId}' appears multiple times in this feed. Each product and variant must have a unique ID.`,
          remediation: "Ensure variant-level uniqueness by combining product ID with variant ID (e.g. 'PROD_123_VAR_456').",
          specCitation: `${GMC_SPEC_URL}#id`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 2. Title Validation (title / g:title)
    // -------------------------------------------------------------------------
    if (!rawTitle) {
      addIssue(issues, {
        id: `ERR_TITLE_MISSING_${rowIndex}`,
        ruleId: "TITLE_REQUIRED",
        field: "title",
        severity: "critical",
        title: "Missing Required Attribute: title",
        message: "Product title is empty. Google Shopping cannot index or display products without titles.",
        remediation: "Provide a descriptive product title including brand, product type, and key attributes.",
        specCitation: `${GMC_SPEC_URL}#title`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      if (rawTitle.length > 150) {
        addIssue(issues, {
          id: `ERR_TITLE_MAX_${rowIndex}`,
          ruleId: "TITLE_MAX_LENGTH",
          field: "title",
          severity: "critical",
          title: "Title Exceeds 150 Characters",
          message: `Title length (${rawTitle.length} chars) exceeds the hard 150-character limit.`,
          remediation: "Shorten title to 150 characters or fewer while retaining high-value search keywords.",
          specCitation: `${GMC_SPEC_URL}#title`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else if (rawTitle.length > 70) {
        addIssue(issues, {
          id: `WARN_TITLE_TRUNC_${rowIndex}`,
          ruleId: "TITLE_MOBILE_TRUNCATION",
          field: "title",
          severity: "warning",
          title: "Title Exceeds Recommended 70 Characters",
          message: `Title is ${rawTitle.length} characters. Mobile shopping cards will truncate the title, hiding attributes from shoppers before click.`,
          remediation: "Front-load brand, product type, and primary variant (color/size) in the first 70 characters.",
          specCitation: `${GMC_SPEC_URL}#title`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }

      // Check all-caps policy violation
      const letters = rawTitle.replace(/[^a-zA-Z]/g, "");
      if (letters.length > 12 && letters === letters.toUpperCase()) {
        addIssue(issues, {
          id: `WARN_TITLE_CAPS_${rowIndex}`,
          ruleId: "TITLE_CAPITALIZATION",
          field: "title",
          severity: "warning",
          title: "Excessive Capitalization in Title",
          message: "Title contains all-uppercase text. Google Merchant Center penalizes or disapproves promotional all-caps formatting.",
          remediation: "Convert title to title case or sentence case.",
          specCitation: `${GMC_SPEC_URL}#title`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }

      // Check promotional text in title
      const lowerTitle = rawTitle.toLowerCase();
      const matchedPromo = PROMOTIONAL_PHRASES.find((phrase) => lowerTitle.includes(phrase));
      if (matchedPromo) {
        addIssue(issues, {
          id: `WARN_TITLE_PROMO_${rowIndex}`,
          ruleId: "TITLE_PROMOTIONAL_TEXT",
          field: "title",
          severity: "warning",
          title: "Promotional Text in Title",
          message: `Title contains promotional text ('${matchedPromo}'). Google Shopping prohibits marketing phrases in the title attribute.`,
          remediation: `Remove '${matchedPromo}' from the product title and configure shipping/promotions in Merchant Center settings.`,
          specCitation: `${GMC_SPEC_URL}#title`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 3. Description Validation (description / g:description)
    // -------------------------------------------------------------------------
    if (!rawDesc) {
      addIssue(issues, {
        id: `ERR_DESC_MISSING_${rowIndex}`,
        ruleId: "DESC_REQUIRED",
        field: "description",
        severity: "critical",
        title: "Missing Required Attribute: description",
        message: "Product description is empty.",
        remediation: "Provide a detailed product description highlighting materials, dimensions, and specifications.",
        specCitation: `${GMC_SPEC_URL}#description`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      if (rawDesc.length > 5000) {
        addIssue(issues, {
          id: `ERR_DESC_MAX_${rowIndex}`,
          ruleId: "DESC_MAX_LENGTH",
          field: "description",
          severity: "critical",
          title: "Description Exceeds 5,000 Characters",
          message: `Description length (${rawDesc.length} chars) exceeds the 5,000-character maximum.`,
          remediation: "Truncate description to under 5,000 characters.",
          specCitation: `${GMC_SPEC_URL}#description`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else if (rawDesc.length < 25) {
        addIssue(issues, {
          id: `WARN_DESC_SHORT_${rowIndex}`,
          ruleId: "DESC_MIN_RECOMMENDED",
          field: "description",
          severity: "warning",
          title: "Description is Excessively Brief",
          message: `Description has only ${rawDesc.length} characters. Thin descriptions harm Google algorithmic relevance.`,
          remediation: "Expand description with key technical specifications and product features.",
          specCitation: `${GMC_SPEC_URL}#description`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }

      // Check for raw HTML tags in description
      if (/<[a-z][\s\S]*>/i.test(rawDesc)) {
        addIssue(issues, {
          id: `WARN_DESC_HTML_${rowIndex}`,
          ruleId: "DESC_CONTAINS_HTML",
          field: "description",
          severity: "warning",
          title: "Raw HTML Markup in Description",
          message: "Description contains raw HTML markup tags. Google Merchant Center expects clean text.",
          remediation: "Strip HTML tags (e.g. `<p>`, `<div>`, `<br>`) during feed export.",
          specCitation: `${GMC_SPEC_URL}#description`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 4. Product Link (link / g:link)
    // -------------------------------------------------------------------------
    if (!rawLink) {
      addIssue(issues, {
        id: `ERR_LINK_MISSING_${rowIndex}`,
        ruleId: "LINK_REQUIRED",
        field: "link",
        severity: "critical",
        title: "Missing Required Attribute: link",
        message: "Product lacks a destination landing page URL.",
        remediation: "Map the canonical storefront product/variant URL to the `<g:link>` field.",
        specCitation: `${GMC_SPEC_URL}#link`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(rawLink)) {
        addIssue(issues, {
          id: `ERR_LINK_INVALID_${rowIndex}`,
          ruleId: "LINK_INVALID_URL",
          field: "link",
          severity: "critical",
          title: "Malformed Landing Page URL",
          message: `The landing page URL '${rawLink.slice(0, 60)}...' is not a valid web URL.`,
          remediation: "Ensure the URL is absolute and starts with `https://`.",
          specCitation: `${GMC_SPEC_URL}#link`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else if (rawLink.startsWith("http://")) {
        addIssue(issues, {
          id: `WARN_LINK_INSECURE_${rowIndex}`,
          ruleId: "LINK_INSECURE_HTTP",
          field: "link",
          severity: "warning",
          title: "Insecure Landing Page Link (HTTP)",
          message: "Landing page URL uses unencrypted `http://`. Google requires SSL (`https://`) on landing pages.",
          remediation: "Update storefront domain to enforce `https://` on all product links.",
          specCitation: `${GMC_SPEC_URL}#link`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 5. Image Link (image_link / g:image_link)
    // -------------------------------------------------------------------------
    if (!rawImage) {
      addIssue(issues, {
        id: `ERR_IMAGE_MISSING_${rowIndex}`,
        ruleId: "IMAGE_REQUIRED",
        field: "image_link",
        severity: "critical",
        title: "Missing Required Attribute: image_link",
        message: "Product lacks a main image URL. Google Shopping will not show items without images.",
        remediation: "Attach a high-resolution primary image URL (at least 100x100px; 250x250px for apparel).",
        specCitation: `${GMC_SPEC_URL}#image_link`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(rawImage)) {
        addIssue(issues, {
          id: `ERR_IMAGE_INVALID_${rowIndex}`,
          ruleId: "IMAGE_INVALID_URL",
          field: "image_link",
          severity: "critical",
          title: "Malformed Image URL",
          message: "The image_link value is not a valid absolute URL.",
          remediation: "Ensure image link starts with `https://` and points to a publicly accessible image file.",
          specCitation: `${GMC_SPEC_URL}#image_link`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else if (rawImage.startsWith("http://")) {
        addIssue(issues, {
          id: `ERR_IMAGE_HTTP_${rowIndex}`,
          ruleId: "IMAGE_INSECURE_HTTP",
          field: "image_link",
          severity: "critical",
          title: "Insecure HTTP Image URL (Disapproval Risk)",
          message: "The image URL uses `http://` instead of `https://`. Google Shopping blocks insecure image assets.",
          remediation: "Serve catalog images over HTTPS via CDN.",
          specCitation: `${GMC_SPEC_URL}#image_link`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else {
        const cleanUrl = rawImage.split("?")[0].toLowerCase();
        const hasValidExt = /\.(jpe?g|png|webp|gif|bmp|tiff)$/i.test(cleanUrl);
        const isCdn = cleanUrl.includes("cdn.shopify.com") || cleanUrl.includes("cloudinary") || cleanUrl.includes("imgix");
        if (!hasValidExt && !isCdn) {
          addIssue(issues, {
            id: `INFO_IMAGE_FORMAT_${rowIndex}`,
            ruleId: "IMAGE_FILE_EXTENSION",
            field: "image_link",
            severity: "info",
            title: "Non-Standard Image URL Extension",
            message: "Image URL does not end with standard extension (.jpg, .png, .webp). Verify content-type header.",
            remediation: "Ensure server returns standard `image/jpeg` or `image/png` MIME type.",
            specCitation: `${GMC_SPEC_URL}#image_link`,
            productSku: sku,
            productTitle: displayTitle,
            rowIndex,
          });
        }
      }
    }

    // -------------------------------------------------------------------------
    // 6. Availability (availability / g:availability)
    // -------------------------------------------------------------------------
    if (!rawAvail) {
      addIssue(issues, {
        id: `ERR_AVAIL_MISSING_${rowIndex}`,
        ruleId: "AVAILABILITY_REQUIRED",
        field: "availability",
        severity: "critical",
        title: "Missing Required Attribute: availability",
        message: "Product lacks availability status.",
        remediation: "Specify one of the 4 supported values: `in_stock`, `out_of_stock`, `preorder`, or `backorder`.",
        specCitation: `${GMC_SPEC_URL}#availability`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      const lowerAvail = rawAvail.toLowerCase().replace(/[-\s]/g, "_");
      if (!ALLOWED_AVAILABILITY.has(rawAvail)) {
        let suggested = "in_stock";
        if (lowerAvail === "out_of_stock" || lowerAvail === "outofstock" || lowerAvail === "false") {
          suggested = "out_of_stock";
        }

        addIssue(issues, {
          id: `ERR_AVAIL_ENUM_${rowIndex}`,
          ruleId: "AVAILABILITY_INVALID_ENUM",
          field: "availability",
          severity: "critical",
          title: `Invalid Availability Value: '${rawAvail}'`,
          message: `The value '${rawAvail}' is rejected by Google's parser. Google Merchant Center strictly requires exact snake_case values.`,
          remediation: `Change '${rawAvail}' to '${suggested}'. Allowed values: in_stock, out_of_stock, preorder, backorder.`,
          specCitation: `${GMC_SPEC_URL}#availability`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 7. Price Validation (price / g:price)
    // -------------------------------------------------------------------------
    if (!rawPrice) {
      addIssue(issues, {
        id: `ERR_PRICE_MISSING_${rowIndex}`,
        ruleId: "PRICE_REQUIRED",
        field: "price",
        severity: "critical",
        title: "Missing Required Attribute: price",
        message: "Product lacks a price attribute.",
        remediation: "Provide price formatted with ISO 4217 currency code (e.g. `24.99 USD`).",
        specCitation: `${GMC_SPEC_URL}#price`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    } else {
      const priceParsed = parseGmcPrice(rawPrice);
      if (!priceParsed.valid) {
        addIssue(issues, {
          id: `ERR_PRICE_FORMAT_${rowIndex}`,
          ruleId: "PRICE_FORMAT_INVALID",
          field: "price",
          severity: "critical",
          title: `Malformed Price: '${rawPrice}'`,
          message: priceParsed.error || "Price format invalid.",
          remediation: "Format as numeric value followed by ISO 4217 currency code (e.g. `19.99 USD`).",
          specCitation: `${GMC_SPEC_URL}#price`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else {
        // Check sale_price if present
        if (p.sale_price && p.sale_price.trim()) {
          const saleParsed = parseGmcPrice(p.sale_price.trim());
          if (!saleParsed.valid) {
            addIssue(issues, {
              id: `ERR_SALE_PRICE_FORMAT_${rowIndex}`,
              ruleId: "SALE_PRICE_INVALID",
              field: "sale_price",
              severity: "critical",
              title: `Malformed Sale Price: '${p.sale_price}'`,
              message: saleParsed.error || "Sale price format invalid.",
              remediation: "Format sale_price identically to price (e.g. `14.99 USD`).",
              specCitation: `${GMC_SPEC_URL}#sale_price`,
              productSku: sku,
              productTitle: displayTitle,
              rowIndex,
            });
          } else if (priceParsed.amount && saleParsed.amount && saleParsed.amount >= priceParsed.amount) {
            addIssue(issues, {
              id: `ERR_SALE_PRICE_HIGH_${rowIndex}`,
              ruleId: "SALE_PRICE_NOT_LOWER",
              field: "sale_price",
              severity: "critical",
              title: "Sale Price Greater than or Equal to Regular Price",
              message: `Sale price (${saleParsed.amount}) must be strictly lower than regular price (${priceParsed.amount}).`,
              remediation: "Verify discount calculations or clear sale_price when no promotion is active.",
              specCitation: `${GMC_SPEC_URL}#sale_price`,
              productSku: sku,
              productTitle: displayTitle,
              rowIndex,
            });
          }
        }
      }
    }

    // -------------------------------------------------------------------------
    // 8. Unique Identifiers & GTIN (brand, gtin, mpn, identifier_exists)
    // -------------------------------------------------------------------------
    if (rawGtin) {
      const gtinValid = validateGtinChecksum(rawGtin);
      if (!gtinValid) {
        addIssue(issues, {
          id: `ERR_GTIN_CHECKSUM_${rowIndex}`,
          ruleId: "GTIN_INVALID_CHECKSUM",
          field: "gtin",
          severity: "critical",
          title: `Invalid GTIN Barcode: '${rawGtin}'`,
          message: "GTIN failed GS1 Modulo-10 checksum validation. Google rejects products with invalid UPC/EAN check digits.",
          remediation: "Verify the manufacturer barcode or scan data from packaging.",
          specCitation: `${GMC_SPEC_URL}#gtin`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    if (!rawBrand) {
      addIssue(issues, {
        id: `WARN_BRAND_MISSING_${rowIndex}`,
        ruleId: "BRAND_RECOMMENDED",
        field: "brand",
        severity: "warning",
        title: "Missing Brand Attribute",
        message: "Brand is missing. Required for all manufactured products and apparel.",
        remediation: "Provide the brand or vendor name in the `<g:brand>` attribute.",
        specCitation: `${GMC_SPEC_URL}#brand`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    }

    // Policy check: identifier_exists = 'no' on branded products
    if (rawIdentExists === "no" || rawIdentExists === "false") {
      if (rawBrand && rawGtin) {
        addIssue(issues, {
          id: `ERR_IDENT_CONFLICT_${rowIndex}`,
          ruleId: "IDENTIFIER_EXISTS_CONFLICT",
          field: "identifier_exists",
          severity: "critical",
          title: "Contradictory Identifier Flags",
          message: "Marked `identifier_exists=no`, yet both brand and GTIN are present. This triggers Google policy disapproval.",
          remediation: "Remove `identifier_exists` or change it to `yes`.",
          specCitation: `${GMC_SPEC_URL}#identifier_exists`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      } else if (rawBrand && rawBrand.toLowerCase() !== "custom" && rawBrand.toLowerCase() !== "generic") {
        addIssue(issues, {
          id: `WARN_IDENT_EXISTS_RISK_${rowIndex}`,
          ruleId: "IDENTIFIER_EXISTS_POLICY_RISK",
          field: "identifier_exists",
          severity: "warning",
          title: "Identifier Policy Disapproval Risk",
          message: `Brand '${rawBrand}' is defined, but identifier_exists is set to 'no'. Google will disapprove commercial apparel/electronics without barcode data.`,
          remediation: "Acquire authentic GS1 barcodes (GTIN/UPC) and submit with brand.",
          specCitation: `${GMC_SPEC_URL}#identifier_exists`,
          productSku: sku,
          productTitle: displayTitle,
          rowIndex,
        });
      }
    }

    // -------------------------------------------------------------------------
    // 9. Condition & Categorization
    // -------------------------------------------------------------------------
    if (p.condition && !ALLOWED_CONDITIONS.has(p.condition.trim().toLowerCase())) {
      addIssue(issues, {
        id: `ERR_COND_INVALID_${rowIndex}`,
        ruleId: "CONDITION_INVALID_ENUM",
        field: "condition",
        severity: "critical",
        title: `Invalid Condition Value: '${p.condition}'`,
        message: "Condition must strictly be one of: `new`, `refurbished`, or `used`.",
        remediation: "Update the condition field to `new`.",
        specCitation: `${GMC_SPEC_URL}#condition`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    }

    if (!p.google_product_category && !p.product_type) {
      addIssue(issues, {
        id: `INFO_CATEGORY_MISSING_${rowIndex}`,
        ruleId: "CATEGORY_RECOMMENDED",
        field: "google_product_category",
        severity: "info",
        title: "Missing Category Classification",
        message: "Neither google_product_category nor product_type is defined. Google will attempt automated categorization, which often lowers bidding accuracy.",
        remediation: "Provide the official Google taxonomy numerical ID or text path.",
        specCitation: `${GMC_SPEC_URL}#google_product_category`,
        productSku: sku,
        productTitle: displayTitle,
        rowIndex,
      });
    }

    // Determine product check status
    const hasCritical = issues.some((i) => i.severity === "critical");
    const hasWarning = issues.some((i) => i.severity === "warning");
    const status = hasCritical
      ? "errors_detected"
      : hasWarning
      ? "warnings_detected"
      : "passed_local_checks";

    findings.push({
      product: p,
      rowIndex,
      sku,
      title: displayTitle,
      issues,
      status,
    });
  }

  const passedLocalChecks = findings.filter((f) => f.status === "passed_local_checks").length;
  const errorsDetected = findings.filter((f) => f.status === "errors_detected").length;
  const warningsDetected = findings.filter((f) => f.status === "warnings_detected").length;

  const totalProducts = products.length;
  const complianceScore = totalProducts > 0
    ? Math.round((passedLocalChecks / totalProducts) * 100)
    : 0;

  return {
    fileName,
    fileSizeBytes,
    totalProducts,
    passedLocalChecks,
    errorsDetected,
    warningsDetected,
    complianceScore,
    criticalIssueCount: criticalTotal,
    warningIssueCount: warningTotal,
    infoIssueCount: infoTotal,
    issuesByField,
    auditedAt: new Date().toISOString(),
    findings,
    parseErrors,
    uncheckedAttributes: [
      "Live storefront landing page price & inventory match (verified during Google crawler visits)",
      "Landing page HTTP response codes & mobile page load performance",
      "Google Merchant Center account-level policy standing and suspension flags",
      "Merchant Center regional tax and automated shipping rule matrices",
      "Trademark, brand authenticity, and prohibited products policy determinations",
    ],
  };
}
