'use client'

import { useState } from 'react'
import Link from 'next/link'

interface WizardAnswers {
  doorCount: number
  buildingType: 'residential' | 'commercial' | 'mixed'
  internetReliability: 'excellent' | 'good' | 'poor'
  budget: 'low' | 'medium' | 'high'
  priority: 'battery' | 'latency' | 'offline' | 'ecosystem'
  existingSmartHome: 'none' | 'homekit' | 'alexa' | 'google' | 'smartthings'
}

interface ProtocolScore {
  protocol: string
  score: number
  pros: string[]
  cons: string[]
  icon: string
}

export default function ProtocolWizard() {
  const [answers, setAnswers] = useState<WizardAnswers>({
    doorCount: 3,
    buildingType: 'residential',
    internetReliability: 'good',
    budget: 'medium',
    priority: 'battery',
    existingSmartHome: 'none',
  })

  const calculateScores = (): ProtocolScore[] => {
    const scores = [
      { protocol: 'Zigbee', score: 70, icon: '📡', pros: [] as string[], cons: [] as string[] },
      { protocol: 'Z-Wave', score: 70, icon: '🌊', pros: [] as string[], cons: [] as string[] },
      { protocol: 'Wi-Fi', score: 60, icon: '📶', pros: [] as string[], cons: [] as string[] },
      { protocol: 'Thread', score: 65, icon: '🧵', pros: [] as string[], cons: [] as string[] },
    ]

    // 门数量影响
    if (answers.doorCount > 10) {
      scores[0].score += 15 // Zigbee - 好的mesh
      scores[1].score += 15 // Z-Wave - 好的mesh
      scores[2].score -= 10 // WiFi - 不适合大规模
    }

    // 互联网可靠性
    if (answers.internetReliability === 'poor') {
      scores[0].score += 20 // Zigbee - 本地控制
      scores[1].score += 20 // Z-Wave - 本地控制
      scores[2].score -= 30 // WiFi - 依赖云
      scores[3].score += 10 // Thread - 可本地
    }

    // 预算
    if (answers.budget === 'low') {
      scores[0].score += 10 // Zigbee - hub便宜
      scores[2].score += 15 // WiFi - 无hub
      scores[1].score -= 5 // Z-Wave - hub较贵
      scores[3].score -= 10 // Thread - hub贵
    }

    // 优先级
    if (answers.priority === 'battery') {
      scores[0].score += 15
      scores[1].score += 15
      scores[2].score -= 20 // WiFi耗电
      scores[3].score += 10
    } else if (answers.priority === 'latency') {
      scores[2].score += 10 // WiFi快
      scores[3].score += 15 // Thread快
    } else if (answers.priority === 'offline') {
      scores[0].score += 20
      scores[1].score += 20
      scores[2].score -= 25
    }

    // 现有生态
    if (answers.existingSmartHome === 'homekit') {
      scores[3].score += 25 // Thread for HomeKit
      scores[2].score += 10
    } else if (answers.existingSmartHome === 'smartthings') {
      scores[0].score += 20 // Zigbee
      scores[1].score += 20 // Z-Wave
    }

    // 添加优缺点
    scores.forEach(s => {
      if (s.protocol === 'Zigbee') {
        s.pros.push('Excellent battery life (12+ months)')
        s.pros.push('Low-cost hub ($80)')
        s.pros.push('Strong mesh network')
        if (answers.doorCount > 10) s.pros.push('Scales well for large deployments')
        s.cons.push('Requires hub/bridge')
        if (answers.internetReliability === 'excellent') s.cons.push('Cloud features need internet')
      } else if (s.protocol === 'Z-Wave') {
        s.pros.push('Excellent battery life (12+ months)')
        s.pros.push('No 2.4GHz interference')
        s.pros.push('Reliable mesh')
        s.cons.push('Higher hub cost ($120)')
        s.cons.push('Fewer device options')
      } else if (s.protocol === 'Wi-Fi') {
        s.pros.push('No hub required')
        s.pros.push('Fast response time')
        s.pros.push('Easy setup')
        s.cons.push('Poor battery life (3-6 months)')
        s.cons.push('Requires reliable internet')
        if (answers.doorCount > 10) s.cons.push('Not ideal for large fleets')
      } else if (s.protocol === 'Thread') {
        s.pros.push('Good battery life (10+ months)')
        s.pros.push('Low latency')
        s.pros.push('Future-proof (Matter)')
        s.cons.push('Expensive hub ($150+)')
        s.cons.push('Limited lock options')
        s.cons.push('Newer technology')
      }
    })

    return scores.sort((a, b) => b.score - a.score)
  }

  const results = calculateScores()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/calculators" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Calculators
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧙‍♂️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Protocol Selection Wizard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Answer a few questions and get personalized protocol recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Questions */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Requirements</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Doors: {answers.doorCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={answers.doorCount}
                  onChange={(e) => setAnswers({...answers, doorCount: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Type
                </label>
                <select
                  value={answers.buildingType}
                  onChange={(e) => setAnswers({...answers, buildingType: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed">Mixed Use</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internet Reliability
                </label>
                <select
                  value={answers.internetReliability}
                  onChange={(e) => setAnswers({...answers, internetReliability: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="excellent">Excellent (99%+ uptime)</option>
                  <option value="good">Good (occasional outages)</option>
                  <option value="poor">Poor (frequent issues)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Level
                </label>
                <select
                  value={answers.budget}
                  onChange={(e) => setAnswers({...answers, budget: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low (minimize upfront cost)</option>
                  <option value="medium">Medium (balanced)</option>
                  <option value="high">High (best quality)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Priority
                </label>
                <select
                  value={answers.priority}
                  onChange={(e) => setAnswers({...answers, priority: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="battery">Battery Life</option>
                  <option value="latency">Response Speed</option>
                  <option value="offline">Offline Operation</option>
                  <option value="ecosystem">Ecosystem Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Smart Home
                </label>
                <select
                  value={answers.existingSmartHome}
                  onChange={(e) => setAnswers({...answers, existingSmartHome: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">None</option>
                  <option value="homekit">Apple HomeKit</option>
                  <option value="alexa">Amazon Alexa</option>
                  <option value="google">Google Home</option>
                  <option value="smartthings">Samsung SmartThings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
            
            {results.map((result, index) => (
              <div
                key={result.protocol}
                className={`rounded-lg border-2 p-6 ${
                  index === 0 
                    ? 'border-green-500 bg-green-50' 
                    : index === 1
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{result.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{result.protocol}</h3>
                      {index === 0 && <span className="text-xs text-green-700 font-semibold">RECOMMENDED</span>}
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-green-700' : index === 1 ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {result.score}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Pros:</p>
                    <ul className="space-y-1">
                      {result.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Cons:</p>
                    <ul className="space-y-1">
                      {result.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How This Wizard Works</h2>
            <p className="text-gray-700 mb-4">
              Each protocol is scored based on battery life, latency, coverage, offline resilience, 
              ecosystem fit, and cost. Your answers adjust weights and add bonuses or penalties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Scoring Factors</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Door count (scalability)</li>
                  <li>• Internet reliability (cloud dependency)</li>
                  <li>• Budget constraints (hub costs)</li>
                  <li>• Priority requirements</li>
                  <li>• Existing ecosystem</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Result Interpretation</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>80+:</strong> Excellent match</li>
                  <li>• <strong>60-79:</strong> Good option</li>
                  <li>• <strong>40-59:</strong> Acceptable with tradeoffs</li>
                  <li>• <strong>&lt;40:</strong> Not recommended</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Learn More</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/articles/protocols" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">Protocol Deep Dive</h4>
              <p className="text-sm text-gray-600">Technical comparison</p>
            </Link>
            <Link href="/calculators/lock-tco" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">TCO Calculator</h4>
              <p className="text-sm text-gray-600">Cost analysis by protocol</p>
            </Link>
            <Link href="/calculators" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-900 mb-2">All Calculators</h4>
              <p className="text-sm text-gray-600">More tools</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
