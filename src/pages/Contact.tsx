export default function ContactPage() {
  return (
    <div className="px-4 md:px-10 py-24 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>

      <p className="text-sm text-slate-300 mb-4">
        We'd love to hear from you.
      </p>

      <div className="flex flex-col gap-6 text-base leading-7 text-slate-200/80 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-md shadow-glass p-6 md:p-8">
        <p>
          Have questions about AutoDeploy, the MCP-powered pipeline builder, or
          your early access invitation? We're here to help.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Support Email</h2>
          <p className="font-medium">team@autodeploy.app</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Business & Partnerships
          </h2>
          <p className="font-medium">partners@autodeploy.app</p>
        </div>

        <p className="mt-6">
          We typically respond within 24–48 hours during the week.
        </p>
      </div>
    </div>
  );
}