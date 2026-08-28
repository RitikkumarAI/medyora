import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import "@/i18n";

import { ThemeProvider } from "@/shared/theme/ThemeProvider";
import { SkipToContent } from "@/shared/accessibility/SkipToContent";
import { LiveAnnouncer } from "@/shared/accessibility/LiveAnnouncer";
import { OfflineStatusBanner } from "@/shared/offline/OfflineStatusBanner";
import { PWAInstallPrompt } from "@/shared/pwa/PWAInstallPrompt";
import { CommandPalette } from "@/shared/components/CommandPalette";
import { MedicalSchema } from "@/shared/seo/MedicalSchema";
import { GlobalAICopilot } from "@/modules/patient/care-ai/components/GlobalAICopilot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Application error:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes",
      },
      { title: "Medyora — Book Verified Doctors Online & Live Queue Tracking" },
      {
        name: "description",
        content:
          "Discover verified doctors, book instant in-clinic or video appointments, and track live clinic queues in real-time with Medyora.",
      },
      { name: "author", content: "Medyora Health" },
      { name: "theme-color", content: "#2563EB" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Medyora" },
      { name: "application-name", content: "Medyora" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "Medyora" },
      { property: "og:title", content: "Medyora — Book Verified Doctors Online" },
      {
        property: "og:description",
        content:
          "Doctor discovery, instant booking, digital prescriptions, and live queue tracking on one unified healthcare platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/medyora-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@medyora" },
      { name: "twitter:title", content: "Medyora — Healthcare Platform" },
      {
        name: "twitter:description",
        content: "Discover top verified specialists and track live clinic queues with Medyora.",
      },
      { name: "twitter:image", content: "/medyora-logo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/Logo.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-600 selection:text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Service Worker Registration for PWA & Offline Support
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("[SW] Registration error:", err);
        });
      });
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="medyora-theme">
      <QueryClientProvider client={queryClient}>
        <SkipToContent targetId="main-content" />
        <OfflineStatusBanner />
        
        {/* Core Router Outlet */}
        <Outlet />
        
        {/* Cross-Platform Global Modals, AI Copilot & Notifications */}
        <GlobalAICopilot />
        <CommandPalette />
        <PWAInstallPrompt />
        <LiveAnnouncer />
        <MedicalSchema />
        <Toaster position="top-center" richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
