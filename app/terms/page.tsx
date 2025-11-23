export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-12">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Smart Lock Hub, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Service</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Permitted Use</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Access and read articles for personal or commercial use</li>
                <li>• Use calculators for planning and analysis</li>
                <li>• Share links to our content</li>
                <li>• Print content for offline reference</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Prohibited Use</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Scraping or automated data collection</li>
                <li>• Reproducing content without attribution</li>
                <li>• Commercial redistribution of our content</li>
                <li>• Reverse engineering our calculators</li>
                <li>• Interfering with website operation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content and Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on Smart Lock Hub, including articles, calculators, designs, and code, 
                is owned by us or our licensors and protected by copyright law.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may reference our content with proper attribution. For commercial use or 
                republication, please contact us for permission.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Smart Lock Hub is provided "as is" without warranties of any kind, either express or implied.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• We do not guarantee accuracy of all information</li>
                <li>• Calculator results are estimates only</li>
                <li>• Content may contain errors or omissions</li>
                <li>• Website availability is not guaranteed</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Important Notice</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Professional Advice:</strong> Our content is for informational purposes only 
                and does not constitute professional advice. Always consult qualified professionals 
                for installation, security, and compliance matters.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Liability:</strong> We are not responsible for any decisions made based on 
                our content or calculator results. Users assume all risks and liability.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Smart Lock Hub shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, or any loss of 
                profits or revenues, whether incurred directly or indirectly, or any loss of data, 
                use, goodwill, or other intangible losses.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for 
                the content, privacy policies, or practices of third-party sites.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting. Your continued use of the website constitutes 
                acceptance of modified terms.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, 
                without regard to conflict of law principles.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these Terms? Contact us at{' '}
                <a href="mailto:legal@smartlockhub.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                  legal@smartlockhub.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
