import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/caching")({
  component: CachingPolicy,
});

function CachingPolicy() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Caching & Performance Policy</h1>
      <p>Last updated: August 2026</p>
      
      <h2>1. Enterprise Edge Caching</h2>
      <p>
        To deliver a buttery-smooth 60-120fps experience globally, Medyora utilizes advanced
        edge caching mechanisms. We cache static assets, public clinic data, and UI bundles
        at edge nodes closest to you.
      </p>

      <h2>2. Medical Data Privacy in Cache</h2>
      <p>
        <strong>Zero-Trace Medical Caching:</strong> No personally identifiable medical records,
        prescriptions, or active Care AI consultation transcripts are ever cached on our public edge servers.
        All private data is fetched securely with short-lived session tokens and utilizes
        end-to-end encryption.
      </p>

      <h2>3. Local Device Caching (PWA)</h2>
      <p>
        For offline capabilities, we leverage secure IndexedDB and Service Workers on your local device.
        This local cache stores:
      </p>
      <ul>
        <li>Recent appointment references.</li>
        <li>Application layout and pre-fetched resources for instant load times.</li>
        <li>Draft messages and queued actions while offline.</li>
      </ul>

      <h2>4. Cache Expiration</h2>
      <p>
        We employ strict Time-To-Live (TTL) policies. Medical session data expires immediately
        upon logout, and local caches are forcefully invalidated when sensitive changes occur
        to your account.
      </p>
    </article>
  );
}
