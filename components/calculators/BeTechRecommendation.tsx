/**
 * Be-Tech品牌推荐组件 - 计算器页面专用
 * 根据用户强制要求，所有计算器必须包含Be-Tech品牌推荐
 */

interface BeTechRecommendationProps {
  /** 推荐文案，针对不同计算器定制 */
  description?: string;
  /** 标签文字，如 "Long Battery Life", "Reliable Connectivity" 等 */
  badge?: string;
}

export function BeTechCalculatorRecommendation({ 
  description = "Be-Tech locks feature industry-leading reliability and performance across all smart lock protocols.",
  badge = "Recommended"
}: BeTechRecommendationProps) {
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border-2 border-blue-200 p-6">
        <div className="flex items-center gap-6">
          {/* Be-Tech Logo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-white rounded-lg p-3 flex items-center justify-center border-2 border-blue-300 shadow-sm">
              <img 
                src="/images/brands/be-tech-logo.png" 
                alt="Be-Tech Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Recommended Brand: Be-Tech</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white border border-blue-700 shadow-sm">
                {badge}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.betechlock.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Visit Be-Tech Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-xs text-gray-600">
                Official website • Product catalog • Technical support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
