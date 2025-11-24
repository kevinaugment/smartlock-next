'use client'

import { useState } from 'react'

interface Answers {
  doors: number
  environment: 'residential' | 'commercial' | 'outdoor'
  internet: 'excellent' | 'good' | 'unreliable'
  priority: 'battery' | 'speed' | 'range' | 'cost'
  ecosystem: 'none' | 'homekit' | 'alexa' | 'google' | 'matter'
  technical: 'beginner' | 'intermediate' | 'expert'
}

interface ProtocolResult {
  name: string
  score: number
  match: string
  pros: string[]
  cons: string[]
  locks: string[]
  hubCost: number
}

export default function ProtocolWizard() {
  const [answers, setAnswers] = useState<Answers>({
    doors: 3,
    environment: 'residential',
    internet: 'good',
    priority: 'battery',
    ecosystem: 'none',
    technical: 'beginner'
  })

  const calculateRecommendation = (): ProtocolResult[] => {
    const protocols: ProtocolResult[] = [
      {
        name: 'Zigbee',
        score: 75,
        match: '',
        pros: ['12+ month battery', 'Strong mesh', 'Mature ecosystem'],
        cons: ['Requires hub ($30-80)', '2.4GHz congestion'],
        locks: ['Yale Assure, Aqara, SmartThings'],
        hubCost: 50
      },
      {
        name: 'Z-Wave',
        score: 75,
        match: '',
        pros: ['Best range (30m+)', 'No 2.4GHz interference', '12 month battery'],
        cons: ['Hub required ($60-150)', 'Regional frequency'],
        locks: ['Schlage Encode, Kwikset Halo'],
        hubCost: 100
      },
      {
        name: 'Wi-Fi',
        score: 65,
        match: '',
        pros: ['No hub needed', 'Fast response', 'Cloud connectivity'],
        cons: ['3-4 month battery', 'Internet dependent', 'Router load'],
        locks: ['August Wi-Fi, Wyze Lock'],
        hubCost: 0
      },
      {
        name: 'Thread/Matter',
        score: 70,
        match: '',
        pros: ['Future-proof', 'Apple/Google support', 'Low power'],
        cons: ['Border router needed ($100+)', 'Limited locks', 'New standard'],
        locks: ['Yale Assure Lock 2, Level Lock+'],
        hubCost: 120
      },
      {
        name: 'Bluetooth',
        score: 60,
        match: '',
        pros: ['No hub', 'Low cost', 'Simple setup'],
        cons: ['10-15m range only', 'Phone required', 'No remote access'],
        locks: ['August Smart Lock, Level Bolt'],
        hubCost: 0
      }
    ]

    // Door count impact
    if (answers.doors >= 10) {
      protocols[0].score += 15 // Zigbee mesh scales well
      protocols[1].score += 15 // Z-Wave mesh scales well
      protocols[2].score -= 15 // Wi-Fi router congestion
      protocols[0].pros.push('Mesh handles 10+ devices efficiently')
      protocols[1].pros.push('232 device capacity per hub')
    }

    // Internet reliability
    if (answers.internet === 'unreliable') {
      protocols[0].score += 20 // Zigbee local control
      protocols[1].score += 25 // Z-Wave best local
      protocols[2].score -= 30 // Wi-Fi cloud dependent
      protocols[3].score += 10 // Thread can be local
      protocols[4].score += 15 // Bluetooth always local
      protocols[1].pros.push('Works 100% offline')
      protocols[2].cons.push('No internet = no access')
    }

    // Priority scoring
    if (answers.priority === 'battery') {
      protocols[0].score += 20
      protocols[1].score += 20
      protocols[2].score -= 25
      protocols[3].score += 15
      protocols[2].cons.push('Replace batteries 4× more often')
    } else if (answers.priority === 'speed') {
      protocols[2].score += 15
      protocols[3].score += 20
      protocols[2].pros.push('<200ms response time')
    } else if (answers.priority === 'range') {
      protocols[1].score += 25 // Z-Wave 908MHz best
      protocols[0].score += 10 // Zigbee mesh helps
      protocols[1].pros.push('Sub-GHz penetrates walls 2× better')
    } else if (answers.priority === 'cost') {
      protocols[2].score += 20 // No hub
      protocols[4].score += 15 // No hub
      protocols[0].score += 10 // Cheap hub
      protocols[1].score -= 10 // Expensive hub
    }

    // Ecosystem integration
    if (answers.ecosystem === 'homekit') {
      protocols[3].score += 30 // Matter native
      protocols[0].score += 15 // Many Zigbee support
      protocols[3].pros.push('Native Apple Home Key support')
    } else if (answers.ecosystem === 'alexa' || answers.ecosystem === 'google') {
      protocols[0].score += 15
      protocols[1].score += 15
      protocols[2].score += 10
    } else if (answers.ecosystem === 'matter') {
      protocols[3].score += 35 // Thread is Matter transport
      protocols[3].pros.push('Full Matter 1.3 compatibility')
    }

    // Technical skill
    if (answers.technical === 'beginner') {
      protocols[2].score += 10 // Wi-Fi easiest
      protocols[4].score += 5 // Bluetooth simple
      protocols[1].score -= 5 // Z-Wave setup harder
    } else if (answers.technical === 'expert') {
      protocols[1].score += 10 // Z-Wave advanced features
      protocols[0].score += 5 // Zigbee customization
    }

    // Environment
    if (answers.environment === 'commercial') {
      protocols[1].score += 20 // Z-Wave commercial grade
      protocols[0].score += 10 // Zigbee enterprise
      protocols[2].score -= 10 // Wi-Fi unreliable
      protocols[1].pros.push('BHMA Grade 1 available')
    } else if (answers.environment === 'outdoor') {
      protocols[1].score += 15 // Best penetration
      protocols[2].score -= 15 // Wi-Fi range issues
      protocols[1].pros.push('Weatherproof models available')
    }

    // Calculate match labels
    protocols.forEach(p => {
      if (p.score >= 90) p.match = 'Excellent Match'
      else if (p.score >= 75) p.match = 'Good Match'
      else if (p.score >= 60) p.match = 'Fair Match'
      else p.match = 'Not Recommended'
    })

    return protocols.sort((a, b) => b.score - a.score)
  }

  const results = calculateRecommendation()
  const topChoice = results[0]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-600 to-green-700'
    if (score >= 75) return 'from-blue-600 to-blue-700'
    if (score >= 60) return 'from-yellow-600 to-yellow-700'
    return 'from-gray-600 to-gray-700'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Questionnaire */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Requirements</h2>
        
        <div className="space-y-6">
          {/* Doors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Smart Locks: {answers.doors}</label>
            <input type="range" min="1" max="30" value={answers.doors} onChange={(e) => setAnswers({...answers, doors: Number(e.target.value)})} className="w-full"/>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 door</span>
              <span>30 doors</span>
            </div>
          </div>

          {/* Environment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
            <select value={answers.environment} onChange={(e) => setAnswers({...answers, environment: e.target.value as any})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="residential">Residential (Home/Apartment)</option>
              <option value="commercial">Commercial (Office/Building)</option>
              <option value="outdoor">Outdoor/Exposed Location</option>
            </select>
          </div>

          {/* Internet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Internet Reliability</label>
            <select value={answers.internet} onChange={(e) => setAnswers({...answers, internet: e.target.value as any})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="excellent">Excellent (Fiber, stable Wi-Fi)</option>
              <option value="good">Good (Occasional outages)</option>
              <option value="unreliable">Unreliable (Frequent issues)</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Priority</label>
            <select value={answers.priority} onChange={(e) => setAnswers({...answers, priority: e.target.value as any})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="battery">Battery Life (12+ months)</option>
              <option value="speed">Response Speed (&lt;200ms)</option>
              <option value="range">Range/Penetration (thick walls)</option>
              <option value="cost">Lowest Total Cost</option>
            </select>
          </div>

          {/* Ecosystem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Smart Home Ecosystem</label>
            <select value={answers.ecosystem} onChange={(e) => setAnswers({...answers, ecosystem: e.target.value as any})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="none">None (starting fresh)</option>
              <option value="homekit">Apple HomeKit</option>
              <option value="alexa">Amazon Alexa</option>
              <option value="google">Google Home</option>
              <option value="matter">Matter/Thread (future-proof)</option>
            </select>
          </div>

          {/* Technical */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skill Level</label>
            <select value={answers.technical} onChange={(e) => setAnswers({...answers, technical: e.target.value as any})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="beginner">Beginner (plug-and-play)</option>
              <option value="intermediate">Intermediate (some setup OK)</option>
              <option value="expert">Expert (full control)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Recommendation */}
      <div className={`bg-gradient-to-br ${getScoreColor(topChoice.score)} rounded-lg shadow-xl p-8 text-white`}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏆</div>
          <h2 className="text-3xl font-bold mb-2">Recommended: {topChoice.name}</h2>
          <div className="text-xl opacity-90">{topChoice.match} ({topChoice.score}% compatibility)</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">✓ Advantages</p>
            <ul className="text-sm space-y-1 opacity-90">
              {topChoice.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">⚠ Considerations</p>
            <ul className="text-sm space-y-1 opacity-90">
              {topChoice.cons.map((con, i) => <li key={i}>• {con}</li>)}
            </ul>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm"><strong>Compatible Locks:</strong> {topChoice.locks.join(', ')}</p>
          <p className="text-sm mt-2"><strong>Setup Cost:</strong> ${topChoice.hubCost > 0 ? `${topChoice.hubCost} hub + lock price` : 'Lock price only (no hub)'}</p>
        </div>
      </div>

      {/* All Results */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Protocol Comparisons</h2>
        <div className="space-y-4">
          {results.map((protocol, idx) => (
            <div key={protocol.name} className={`border-2 rounded-lg p-6 ${idx === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{idx + 1}. {protocol.name}</h3>
                  <p className="text-sm text-gray-600">{protocol.match}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{protocol.score}%</div>
                  <div className="text-xs text-gray-500">Compatibility</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-green-800 mb-1">Pros:</p>
                  <ul className="text-gray-700 space-y-0.5">
                    {protocol.pros.map((pro, i) => <li key={i}>✓ {pro}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-800 mb-1">Cons:</p>
                  <ul className="text-gray-700 space-y-0.5">
                    {protocol.cons.map((con, i) => <li key={i}>• {con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
