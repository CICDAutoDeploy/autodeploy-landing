export default function TermsPage() {
  return (
    <div className="px-4 md:px-10 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="text-sm text-text-light/60 dark:text-text-dark/60 mb-4">
        Last Updated: January 2025
      </p>

      <div className="flex flex-col gap-4 text-base leading-7 text-text-light/80 dark:text-text-dark/80">
        <p>
          Welcome to AutoDeploy. By accessing or using our website, tools, or
          services, you agree to be bound by these Terms of Service. If you do
          not agree, you may not use AutoDeploy.
        </p>

        <h2 className="text-2xl font-semibold mt-6">1. Use of the Service</h2>
        <p>
          AutoDeploy provides tools for generating, validating, and deploying
          CI/CD workflows using MCP, GitHub OAuth, AWS OIDC, and automation
          capabilities. You agree to use the service responsibly and in
          compliance with applicable laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Accounts and Security</h2>
        <p>
          When signing in with GitHub, you are responsible for maintaining the
          confidentiality of your account. You may not share access, impersonate
          others, or attempt to bypass authentication mechanisms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. Acceptable Use</h2>
        <ul className="list-disc ml-6">
          <li>No attempting to access other users’ repositories or data.</li>
          <li>No interfering with system performance or stability.</li>
          <li>No using AutoDeploy for abusive or malicious automation.</li>
          <li>No reverse engineering or unauthorized scraping.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Generated Content</h2>
        <p>
          AutoDeploy generates YAML, workflow files, CI/CD configurations, and
          other artifacts. You are responsible for reviewing these outputs before
          deploying or integrating them into production systems.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Third-Party Integrations</h2>
        <p>
          AutoDeploy interacts with GitHub, Supabase, AWS, and other providers.
          Your use of these providers is governed by their respective terms.
          AutoDeploy is not responsible for outages, errors, or changes in those
          third-party APIs.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Disclaimer of Warranties</h2>
        <p>
          AutoDeploy is provided “as is” without warranties of any kind. We do
          not guarantee error-free automation, successful deployments, or
          compatibility with all repositories or AWS configurations.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Limitation of Liability</h2>
        <p>
          In no event shall AutoDeploy be liable for damages arising from the use
          or inability to use the service, including data loss, workflow
          misconfiguration, deployment errors, or repository changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          service constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Contact</h2>
        <p>
          For questions about these terms, reach out at:
        </p>
        <p className="font-medium">team@autodeploy.app</p>
      </div>
    </div>
  );
}