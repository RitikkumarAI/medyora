/**
 * Content Security Policy & Enterprise Security Headers
 */

export const CSP_CONFIG = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://ui-avatars.com",
    "https://*.supabase.co",
  ],
  "connect-src": [
    "'self'",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://api.medyora.com",
  ],
  "frame-ancestors": ["'none'"],
};

export const generateCspString = (): string => {
  return Object.entries(CSP_CONFIG)
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");
};

export const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": generateCspString(),
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(self), microphone=(self), geolocation=(self)",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
