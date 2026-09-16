import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms-of-service")({
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p>Last updated: August 2026</p>

      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing our platform, you agree to be bound by these Terms of Service and to use the
        platform in accordance with these Terms, our Privacy Policy, and any additional terms and
        conditions that may apply to specific sections of the platform.
      </p>

      <h2>2. Medical Disclaimer</h2>
      <p>
        <strong>Medyora is a technology platform, not a healthcare provider.</strong> Our Care AI
        and symptom checkers are for informational purposes only and do not constitute medical
        advice, diagnosis, or treatment. Always seek the advice of a qualified health provider.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for
        all activities that occur under your account. You agree to notify us immediately of any
        unauthorized use of your account.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall Medyora, nor its directors, employees, partners, agents, suppliers, or
        affiliates, be liable for any indirect, incidental, special, consequential or punitive
        damages, including without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from your access to or use of or inability to access or use the
        Service.
      </p>
    </article>
  );
}
