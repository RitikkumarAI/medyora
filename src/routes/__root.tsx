import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

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
import { PreloaderProvider, usePreloader } from "@/shared/components/loaders/PreloaderProvider";
import { CinematicMedicalPreloader } from "@/shared/components/loaders/CinematicMedicalPreloader";

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
        {error?.message && (
          <p className="mt-2 text-xs font-mono text-rose-500/80 bg-rose-500/10 p-2 rounded-lg break-all text-left">
            {error.message}
          </p>
        )}
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
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content",
      },
      { title: "Medyora — Book Verified Doctors Online & Live Queue Tracking | Binarize Technologies" },
      {
        name: "description",
        content:
          "Discover verified doctors, book instant appointments, and track live clinic queues in real-time with Medyora. Developed and maintained by Binarize Technologies.",
      },
      { name: "author", content: "Binarize Technologies" },
      { name: "publisher", content: "Binarize Technologies" },
      { name: "theme-color", content: "#2563EB" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Medyora" },
      { name: "application-name", content: "Medyora" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "Medyora by Binarize Technologies" },
      { property: "og:title", content: "Medyora — Book Verified Doctors Online & Live Clinic Queues" },
      {
        property: "og:description",
        content:
          "Doctor discovery, instant booking, digital prescriptions, and live queue tracking on one unified healthcare platform built by Binarize Technologies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/medyora-logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@medyora" },
      { name: "twitter:creator", content: "@binarizetech" },
      { name: "twitter:title", content: "Medyora — Healthcare Platform by Binarize Technologies" },
      {
        name: "twitter:description",
        content: "Discover top verified specialists and track live clinic queues with Medyora.",
      },
      { name: "twitter:image", content: "/medyora-logo.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "canonical", href: "https://medyora.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.webp", type: "image/webp" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden max-w-full touch-pan-y select-none">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden max-w-full touch-pan-y overscroll-none select-none">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalPreloaderGate() {
  const { isVisible, hidePreloader } = usePreloader();
  if (!isVisible) return null;
  return (
    <CinematicMedicalPreloader
      onComplete={hidePreloader}
      durationMs={1300}
    />
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
        <PreloaderProvider>
          <GlobalPreloaderGate />
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
        </PreloaderProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
