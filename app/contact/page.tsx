import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Smart Lock Hub',
  description: 'Get in touch with Smart Lock Hub. We are here to help with your smart lock questions.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">📧</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@smartlockhub.com" className="text-blue-600 hover:text-blue-700">
                    support@smartlockhub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
                  <p className="text-gray-600">Join our Discord community for discussions and support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Documentation</h3>
                  <p className="text-gray-600">Browse our comprehensive knowledge base for instant answers</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Response Time</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24-48 hours during business days.
                For urgent technical issues, please include "URGENT" in your subject line.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Before You Contact Us</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Check our <a href="/articles" className="text-blue-600 hover:text-blue-700 font-semibold">Knowledge Base</a> for common questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Try our <a href="/calculators" className="text-blue-600 hover:text-blue-700 font-semibold">Calculators</a> for planning and cost estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Review our <a href="/articles/support" className="text-blue-600 hover:text-blue-700 font-semibold">Troubleshooting Guides</a> for technical issues</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
