/**
 * Content Security Policy & Security Meta Tag Helpers
 */

export const CSP_CONFIG = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  "img-src": ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://ui-avatars.com", "https://*.supabase.co"],
  "connect-src": ["'self'", "https://*.supabase.co", "wss://*.supabase.co", "https://api.medyora.com"],
  "frame-ancestors": ["'none'"],
};

export const generateCspString = (): string => {
  return Object.entries(CSP_CONFIG)
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");
};
