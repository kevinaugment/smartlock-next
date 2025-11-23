import Link from 'next/link'

const calculators = [
  {
    name: 'TCO Calculator',
    slug: 'lock-tco',
    icon: '💰',
    description: 'Calculate total cost of ownership for smart lock deployments. Compare protocols, battery costs, and hub investments over time',
    features: ['Multi-year TCO analysis', 'Protocol comparison', 'Battery cost projection', 'ROI calculation'],
    complexity: 'Simple',
  },
  {
    name: 'Battery Life Calculator',
    slug: 'battery-life',
    icon: '🔋',
    description: 'Estimate how long your smart lock batteries will last based on usage patterns and features',
    features: ['Usage frequency analysis', 'Battery type comparison', 'Feature impact calculation', 'Optimization tips'],
    complexity: 'Simple',
  },
  {
    name: 'Signal Strength Analyzer',
    slug: 'signal-strength',
    icon: '📶',
    description: 'Analyze and optimize your smart lock\'s wireless signal strength for reliable operation',
    features: ['Signal quality assessment', 'Distance calculation', 'Interference detection', 'Improvement suggestions'],
    complexity: 'Moderate',
  },
  {
    name: 'Installation Cost Estimator',
    slug: 'installation-cost',
    icon: '💰',
    description: 'Calculate the total cost of your smart lock installation including hardware and labor',
    features: ['Hardware cost breakdown', 'Labor estimation', 'Additional materials', 'Total project cost'],
    complexity: 'Simple',
  },
  {
    name: 'Door Compatibility Checker',
    slug: 'compatibility',
    icon: '🚪',
    description: 'Check if your door is compatible with different smart lock models',
    features: ['Door measurements', 'Material compatibility', 'Lock type matching', 'Installation difficulty'],
    complexity: 'Moderate',
  },
  {
    name: 'Protocol Selection Wizard',
    slug: 'protocol-wizard',
    icon: '🧙‍♂️',
    description: 'Get personalized protocol recommendations based on your specific requirements and priorities',
    features: ['Smart recommendation engine', 'Multi-factor scoring', 'Pros/cons analysis', 'Ecosystem matching'],
    complexity: 'Moderate',
  },
  {
    name: 'STR ROI Calculator',
    slug: 'str-roi',
    icon: '🏠',
    description: 'Calculate ROI and payback time for smart locks in short-term rental properties',
    features: ['Labor time savings', 'Lockout cost reduction', 'Lost key savings', 'Payback analysis'],
    complexity: 'Simple',
  },
  {
    name: 'Mesh Node Planner',
    slug: 'mesh-planner',
    icon: '🔗',
    description: 'Estimate required mesh repeaters for your deployment by floor and area',
    features: ['Node count calculation', 'Coverage analysis', 'Cost estimation', 'Placement guidelines'],
    complexity: 'Simple',
  },
  {
    name: 'RF Coverage Estimator',
    slug: 'rf-coverage',
    icon: '📡',
    description: 'Plan mesh network topology and calculate signal coverage for your building',
    features: ['Coverage area calculation', 'Hub requirement', 'Signal quality analysis', 'Placement recommendations'],
    complexity: 'Moderate',
  },
  {
    name: 'Multi-Property Fleet Planner',
    slug: 'fleet-planner',
    icon: '🏢',
    description: 'Analyze protocol fragmentation and plan unified fleet across properties',
    features: ['Fragmentation scoring', 'Unification cost analysis', 'Maintenance savings', 'Payback calculation'],
    complexity: 'Moderate',
  },
  {
    name: 'Credential Capacity Planner',
    slug: 'credential-planner',
    icon: '🔑',
    description: 'Check if your locks can handle all employee, contractor, and guest credentials',
    features: ['Capacity utilization', 'User type breakdown', 'Overflow detection', 'Upgrade recommendations'],
    complexity: 'Simple',
  },
  {
    name: 'Installation Time Estimator',
    slug: 'installation-time',
    icon: '⏱️',
    description: 'Estimate technician hours, crew-days, and total labor cost for installation projects',
    features: ['Time per door calculation', 'Labor cost estimation', 'Crew planning', 'Project timeline'],
    complexity: 'Simple',
  },
  {
    name: 'Subscription vs Purchase',
    slug: 'subscription-compare',
    icon: '⚖️',
    description: 'Compare long-term costs of cloud subscription versus local system purchase',
    features: ['Multi-year cost analysis', 'Break-even calculation', 'Pros/cons comparison', 'TCO projection'],
    complexity: 'Simple',
  },
  {
    name: 'Offline Resilience Scorecard',
    slug: 'offline-resilience',
    icon: '🔋',
    description: 'Score how well your locks work during internet and power outages',
    features: ['Resilience scoring', 'Weakness identification', 'Backup system evaluation', 'Improvement recommendations'],
    complexity: 'Moderate',
  },
  {
    name: 'Emergency Backup Evaluator',
    slug: 'emergency-backup',
    icon: '🆘',
    description: 'Evaluate your emergency unlock backup plan robustness',
    features: ['Backup method assessment', 'Risk analysis', 'Security evaluation', 'Emergency scenario planning'],
    complexity: 'Simple',
  },
]

const categories = [
  { name: 'Power & Energy', icon: '⚡', calculators: ['battery-life'] },
  { name: 'Connectivity', icon: '📡', calculators: ['signal-strength'] },
  { name: 'Planning & Budget', icon: '📋', calculators: ['installation-cost'] },
  { name: 'Hardware', icon: '🔧', calculators: ['compatibility'] },
]

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🧮 Smart Lock Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive tools to help you make informed decisions about smart lock systems.
            Get instant calculations and expert recommendations.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.calculators.length} tool{category.calculators.length > 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/calculators/${calculator.slug}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-400 overflow-hidden"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{calculator.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {calculator.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          calculator.complexity === 'Simple' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {calculator.complexity}
                        </span>
                      </div>
                    </div>
                    <svg 
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">
                    {calculator.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {calculator.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-gray-50 group-hover:bg-blue-50 transition-colors">
                  <span className="text-blue-600 font-semibold text-sm">
                    Try Calculator →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Calculators?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600">Get immediate calculations without waiting</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Algorithms</h3>
              <p className="text-sm text-gray-600">Based on industry standards and real data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customizable</h3>
              <p className="text-sm text-gray-600">Adjust parameters to match your exact needs</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive knowledge base for detailed guides and articles about smart lock systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Articles
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
