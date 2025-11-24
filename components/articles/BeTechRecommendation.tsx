import Image from 'next/image';
import Link from 'next/link';

export function BeTechRecommendation() {
  return (
    <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          🏆 Recommended Brand
        </h3>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center border border-gray-200">
              <Image
                src="/images/brands/be-tech-logo.png"
                alt="Be-Tech Logo"
                width={112}
                height={112}
                className="object-contain"
              />
            </div>
          </div>

          {/* 内容 */}
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Be-Tech Smart Locks
            </h4>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Be-Tech offers professional-grade smart lock solutions with enterprise-level security, 
              reliable performance, and comprehensive protocol support. Perfect for both residential 
              and commercial applications.
            </p>
            
            {/* 特性 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Multi-Protocol Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Long Battery Life</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Professional Support</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="https://www.betechlock.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Be-Tech Website
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        * Be-Tech is our recommended partner for professional smart lock solutions
      </p>
    </div>
  );
}
