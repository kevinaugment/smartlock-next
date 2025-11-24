'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompatibilityChecker() {
  const [doorType, setDoorType] = useState('wood')
  const [thickness, setThickness] = useState('44')
  const [backset, setBackset] = useState('60')
  const [handleType, setHandleType] = useState('lever')
  const [existingDeadbolt, setExistingDeadbolt] = useState(true)
  const [glassInsert, setGlassInsert] = useState(false)

  const checkCompatibility = () => {
    let score = 100
    const issues: string[] = []
    const recommendations: string[] = []

    // 门材质检查
    if (doorType === 'metal') {
      score -= 20
      issues.push('Metal doors require special mounting hardware')
      recommendations.push('Use metal-specific smart locks with reinforced mounting plates')
    } else if (doorType === 'glass') {
      score -= 40
      issues.push('Glass doors have very limited mounting options')
      recommendations.push('Consider rim locks or surface-mounted smart lock models')
    } else if (doorType === 'composite') {
      score -= 10
      recommendations.push('Verify composite material density before installation')
    }

    // 厚度检查
    const thick = parseInt(thickness)
    if (thick < 35) {
      score -= 30
      issues.push('Door is too thin for most standard smart locks')
      recommendations.push('Look for surface-mounted or rim lock options')
    } else if (thick > 60) {
      score -= 15
      issues.push('Extra thick door may require extension kits')
      recommendations.push('Contact manufacturer for door thickness extender kits')
    }

    // Backset检查
    const back = parseInt(backset)
    if (back !== 60 && back !== 70) {
      score -= 20
      issues.push('Non-standard backset distance may limit lock choices')
      recommendations.push('Search for locks with adjustable backset options')
    }

    // 把手类型
    if (handleType === 'knob') {
      recommendations.push('Consider upgrading to lever handle for better accessibility')
    }

    // 现有deadbolt
    if (!existingDeadbolt) {
      score -= 10
      recommendations.push('New installation will require drilling holes in door')
    }

    // 玻璃嵌入
    if (glassInsert) {
      score -= 15
      issues.push('Glass insert near lock area may interfere with installation')
      recommendations.push('Ensure at least 6 inches clearance between lock and glass')
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations,
      compatible: score >= 60,
    }
  }

  const result = checkCompatibility()

  const getCompatibilityLevel = (score: number) => {
    if (score >= 85) return { label: 'Excellent', color: 'from-green-600 to-green-700', icon: '✓', textColor: 'text-green-600' }
    if (score >= 70) return { label: 'Good', color: 'from-blue-600 to-blue-700', icon: '✓', textColor: 'text-blue-600' }
    if (score >= 50) return { label: 'Fair', color: 'from-yellow-600 to-yellow-700', icon: '⚠️', textColor: 'text-yellow-600' }
    return { label: 'Poor', color: 'from-red-600 to-red-700', icon: '✗', textColor: 'text-red-600' }
  }

  const level = getCompatibilityLevel(result.score)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/calculators" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Calculators
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚪</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Door Compatibility Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check if your door is compatible with smart lock installation and get personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Door Specifications</h2>

              <div className="space-y-6">
                {/* Door Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Door Material
                  </label>
                  <select
                    value={doorType}
                    onChange={(e) => setDoorType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="wood">Wood (Highest compatibility)</option>
                    <option value="composite">Composite/Fiberglass (Good)</option>
                    <option value="metal">Metal/Steel (Moderate)</option>
                    <option value="glass">Glass/French Door (Limited)</option>
                  </select>
                </div>

                {/* Door Thickness */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Door Thickness: {thickness}mm
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="70"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30mm</span>
                    <span className="text-green-600 font-semibold">44mm (Standard)</span>
                    <span>70mm</span>
                  </div>
                </div>

                {/* Backset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backset Distance: {backset}mm
                  </label>
                  <input
                    type="range"
                    min="45"
                    max="85"
                    step="5"
                    value={backset}
                    onChange={(e) => setBackset(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>45mm</span>
                    <span className="text-green-600 font-semibold">60mm / 70mm (Standard)</span>
                    <span>85mm</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Backset is the distance from the door edge to the center of the lock hole
                  </p>
                </div>

                {/* Handle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Handle Type
                  </label>
                  <select
                    value={handleType}
                    onChange={(e) => setHandleType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="lever">Lever Handle (Recommended)</option>
                    <option value="knob">Door Knob</option>
                    <option value="none">No Handle (Deadbolt Only)</option>
                  </select>
                </div>

                {/* Existing Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Door Features
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={existingDeadbolt}
                        onChange={(e) => setExistingDeadbolt(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="font-medium text-gray-900 block">Existing Deadbolt Hole</span>
                        <span className="text-sm text-gray-600">Door is pre-drilled for deadbolt lock</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={glassInsert}
                        onChange={(e) => setGlassInsert(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="font-medium text-gray-900 block">Glass Insert/Window</span>
                        <span className="text-sm text-gray-600">Decorative glass panel near lock area</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-lg p-8 text-white sticky top-4 bg-gradient-to-br ${level.color}`}>
              <h2 className="text-xl font-bold mb-6">Compatibility Score</h2>

              <div className="text-center mb-8">
                <div className="text-6xl mb-3">{level.icon}</div>
                <div className="text-5xl font-bold mb-2">{result.score}%</div>
                <div className="text-xl opacity-90">{level.label}</div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Material</span>
                  <span className="font-semibold capitalize">{doorType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Thickness</span>
                  <span className="font-semibold">{thickness}mm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-white/20">
                  <span className="opacity-90">Backset</span>
                  <span className="font-semibold">{backset}mm</span>
                </div>
              </div>

              {result.compatible ? (
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-xs opacity-90">
                    ✓ <strong>Great!</strong> Your door is compatible with most smart lock models
                  </p>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-xs opacity-90">
                    ⚠️ <strong>Note:</strong> Limited options available. Consult with a professional installer
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Issues and Recommendations */}
        {(result.issues.length > 0 || result.recommendations.length > 0) && (
          <div className="max-w-6xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Issues */}
              {result.issues.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg border-2 border-orange-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Potential Issues ({result.issues.length})
                  </h3>
                  <ul className="space-y-3">
                    {result.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Recommendations ({result.recommendations.length})
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-600 font-bold mt-0.5">✓</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Measurement Guide</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📏</span>
                  <h3 className="text-lg font-semibold text-gray-900">Door Thickness</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>35-45mm:</strong> Standard residential doors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>44mm:</strong> Most common size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>50-60mm:</strong> Security/fire-rated doors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span><strong>60mm+:</strong> May require extender kits</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-semibold text-gray-900">Backset Distance</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>60mm:</strong> Standard backset (most common)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>70mm:</strong> Common alternative size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span><strong>Other sizes:</strong> May need adapter plates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Measure:</strong> Door edge to hole center</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏗️</span>
                  <h3 className="text-lg font-semibold text-gray-900">Door Materials</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Wood:</strong> Best compatibility, easiest install</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Composite:</strong> Good option, durable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span><strong>Metal:</strong> Requires special mounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span><strong>Glass:</strong> Very limited lock options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Measure Guide */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">📐 How to Measure Your Door</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 1: Thickness</h3>
                <p className="text-sm opacity-90">Use a ruler or tape measure to measure the door thickness from one face to the other</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 2: Backset</h3>
                <p className="text-sm opacity-90">Measure from the edge of the door to the center of the existing lock cylinder hole</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step 3: Material</h3>
                <p className="text-sm opacity-90">Identify your door material by appearance or tap test (wood sounds hollow, metal rings)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/articles/installation"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">📚 Installation Guides</h4>
              <p className="text-sm text-gray-600">Step-by-step installation instructions</p>
            </Link>
            <Link
              href="/calculators"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">🧮 Other Calculators</h4>
              <p className="text-sm text-gray-600">Explore more planning tools</p>
            </Link>
            <Link
              href="/articles"
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <h4 className="font-semibold text-gray-900 mb-2">📖 Knowledge Base</h4>
              <p className="text-sm text-gray-600">Browse all articles and guides</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
