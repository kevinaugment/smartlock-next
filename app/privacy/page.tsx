export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                Smart Lock Hub ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information 
                when you visit our website.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Browser type and version</li>
                <li>• Operating system</li>
                <li>• Pages visited and time spent</li>
                <li>• Referring website</li>
                <li>• IP address (anonymized)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculator Data</h3>
              <p className="text-gray-700 leading-relaxed">
                All calculator inputs and results are processed locally in your browser. 
                We do not store, transmit, or collect any data you enter into our calculators.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Improve website performance and user experience</li>
                <li>• Analyze usage patterns and trends</li>
                <li>• Ensure website security</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use minimal cookies for essential website functionality:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Session cookies for page navigation</li>
                <li>• Preference cookies for user settings</li>
                <li>• Analytics cookies (anonymized)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                information. Our website is hosted on Cloudflare's secure infrastructure with 
                HTTPS encryption for all data transmission.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use the following third-party services:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Cloudflare (hosting and CDN)</li>
                <li>• Analytics providers (anonymized data only)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Opt-out of analytics tracking</li>
                <li>• Object to data processing</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us at <a href="mailto:privacy@smartlockhub.com" className="text-blue-600 hover:text-blue-700 font-semibold">privacy@smartlockhub.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
