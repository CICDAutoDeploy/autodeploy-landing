export default function PrivacyPage() {
  return (
    <div className="px-4 md:px-10 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-text-light/60 dark:text-text-dark/60 mb-4">
        Last Updated: January 2025
      </p>

      <div className="flex flex-col gap-4 text-base leading-7 text-text-light/80 dark:text-text-dark/80">
        <p>
          AutoDeploy (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, and safeguard your information when you use our websites and
          services, including autodeploy.app and any related applications or
          integrations.
        </p>

        <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
        <p>
          We collect the following types of information:
        </p>
        <ul className="list-disc ml-6">
          <li>
            <strong>Waitlist Information:</strong> When you join the waitlist,
            we collect your email address and basic metadata like when you
            subscribed.
          </li>
          <li>
            <strong>Authentication Data:</strong> When you sign in with GitHub
            (in the main app), we may receive your GitHub username, email,
            avatar, and repository metadata you choose to connect.
          </li>
          <li>
            <strong>Usage and Log Data:</strong> We may collect basic technical
            information, such as IP address, browser type, and interaction
            events, to help improve stability and security.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc ml-6">
          <li>Manage the waitlist and invite users to early access.</li>
          <li>Authenticate users and connect to GitHub on your behalf.</li>
          <li>Generate and manage CI/CD pipelines using MCP and GitHub APIs.</li>
          <li>Maintain and improve the performance, security, and reliability of the service.</li>
          <li>Communicate with you about product updates or important changes.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. How We Store and Protect Data</h2>
        <p>
          We use Supabase (hosted Postgres with row-level security) as our primary
          data store. Data is transmitted over HTTPS and stored using secure
          configurations. We do not store long-lived GitHub access tokens or AWS
          access keys; instead, we rely on OAuth and OIDC-based flows designed to
          minimize secret exposure.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Third-Party Services</h2>
        <p>
          We rely on several third-party providers to deliver the service:
        </p>
        <ul className="list-disc ml-6">
          <li>GitHub – for authentication and repository access.</li>
          <li>Supabase – for database, authentication, and storage.</li>
          <li>AWS – for OIDC-based deployments (no long-lived keys stored).</li>
          <li>Cloudflare – for hosting and edge delivery of autodeploy.app.</li>
        </ul>
        <p>
          Your use of those services is also subject to their respective privacy
          policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to access, update,
          or delete your personal data. If you would like to exercise these
          rights, contact us at:
        </p>
        <p className="font-medium">team@autodeploy.app</p>

        <h2 className="text-2xl font-semibold mt-6">6. Data Retention</h2>
        <p>
          We retain waitlist and account data only as long as necessary to
          operate the service or as required by law. You may request removal of
          your data at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will update the &quot;Last Updated&quot; date at
          the top of this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data
          is handled, please reach out at:
        </p>
        <p className="font-medium">team@autodeploy.app</p>
      </div>
    </div>
  );
}