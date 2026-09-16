/* eslint-disable no-control-regex */
/**
 * Client-Side Input Sanitization & XSS Prevention Utility
 */

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

export const sanitizeHtml = (str: string): string => {
  if (typeof str !== "string") return "";
  return str.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
};

export const sanitizeSearchQuery = (query: string): string => {
  if (typeof query !== "string") return "";
  // Strip control characters and excessive whitespace
  return query
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, 150);
};

export const sanitizeNumericInput = (input: string): string => {
  if (typeof input !== "string") return "";
  return input.replace(/\D/g, "");
};
