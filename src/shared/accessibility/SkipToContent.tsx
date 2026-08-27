/**
 * Accessible Skip to Content Link (WCAG 2.1 AA Success Criterion 2.4.1)
 * Allows screen reader and keyboard users to bypass navigation headers directly to main content.
 */

export function SkipToContent({ targetId = "main-content" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-primary/40 focus:outline-none font-bold text-sm transition-all"
    >
      Skip to main content
    </a>
  );
}
