import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/cookies")({
  component: CookiesPolicy,
});

function CookiesPolicy() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Cookies Policy</h1>
      <p>Last updated: August 2026</p>

      <h2>1. What are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you
        visit a website. They are widely used in order to make websites work, or work more
        efficiently, as well as to provide information to the owners of the site.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>Medyora uses cookies to improve your experience on our platform, including:</p>
      <ul>
        <li>Keeping you signed in.</li>
        <li>Understanding how you use our platform.</li>
        <li>Remembering your preferences, such as theme and language.</li>
        <li>Providing secure medical sessions.</li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <p>
        We use both session and persistent cookies on the platform and we use different types of
        cookies to run the platform:
      </p>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Necessary for the operation of the platform.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Used to analyze how visitors use the platform.
        </li>
        <li>
          <strong>Functionality Cookies:</strong> Used to recognize you when you return to the
          platform.
        </li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>
        You can set your browser not to accept cookies. However, in a few cases, some of our
        platform features may not function as a result.
      </p>
    </article>
  );
}
