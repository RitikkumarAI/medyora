/**
 * Medyora Enterprise Service Worker
 * Features: Static asset caching, network-first page navigation with offline fallback,
 * background sync, and push notifications.
 */

const CACHE_NAME = "medyora-cache-v2";
const OFFLINE_FALLBACK_PAGE = "/offline.html";

const PRECACHE_ASSETS = [
  "/",
  "/favicon.webp",
  "/Logo.webp",
  "/manifest.json",
];

// Install Event: Pre-cache shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn("[SW] Pre-cache error:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Cleanup stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Intelligent Strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // 1. Static Assets (Images, Fonts, CSS, JS) -> Cache First with Network Fallback
  if (
    request.destination === "image" ||
    request.destination === "font" ||
    request.destination === "style" ||
    request.destination === "script" ||
    url.pathname.startsWith("/assets/")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Stale-while-revalidate for assets
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => {
            // Return empty fallback for missing images if offline
            if (request.destination === "image") {
              return caches.match("/Logo.webp");
            }
          });
      })
    );
    return;
  }

  // 2. Page Navigations (HTML) -> Network First with Cached / Offline Fallback
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const rootCache = await caches.match("/");
          if (rootCache) return rootCache;

          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Offline — Medyora</title>
                <style>
                  body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
                  .card { background: #1e293b; padding: 32px; border-radius: 24px; max-width: 440px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }
                  h1 { font-size: 24px; margin-bottom: 8px; font-weight: 700; }
                  p { font-size: 14px; color: #94a3b8; line-height: 1.5; margin-bottom: 24px; }
                  button { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="card">
                  <div style="font-size: 40px; margin-bottom: 16px;">📶</div>
                  <h1>You're currently offline</h1>
                  <p>Medyora cached your recent appointments, live queue status, and emergency cards. Reconnect to sync latest updates.</p>
                  <button onclick="window.location.reload()">Try Reconnecting</button>
                </div>
              </body>
            </html>`,
            {
              headers: { "Content-Type": "text/html; charset=utf-8" },
            }
          );
        })
    );
    return;
  }

  // 3. Default Handler: Network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// Push Notifications Handler
self.addEventListener("push", (event) => {
  let data = { title: "Medyora Health Update", body: "You have a new update in Medyora." };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "Medyora", body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: "/Logo.webp",
    badge: "/favicon.webp",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/patient/queue",
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click Handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
