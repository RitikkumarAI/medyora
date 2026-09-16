import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 2026</p>

      <h2>1. Introduction</h2>
      <p>
        At Medyora, we take your privacy seriously. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you visit our platform.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We may collect information about you in a variety of ways. The information we may collect on
        the Site includes:
      </p>
      <ul>
        <li>
          <strong>Personal Data:</strong> Personally identifiable information, such as your name,
          shipping address, email address, and telephone number.
        </li>
        <li>
          <strong>Medical Data:</strong> Health-related information that you choose to provide for
          consultations and symptom checking.
        </li>
      </ul>

      <h2>3. Use of Your Information</h2>
      <p>
        Having accurate information about you permits us to provide you with a smooth, efficient,
        and customized experience. Specifically, we may use information collected about you via the
        Site to:
      </p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Process your medical consultations and bookings.</li>
        <li>Deliver targeted advertising, coupons, newsletters, and other information.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We use administrative, technical, and physical security measures to help protect your
        personal information. While we have taken reasonable steps to secure the personal
        information you provide to us, please be aware that despite our efforts, no security
        measures are perfect or impenetrable.
      </p>
    </article>
  );
}
