'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RFCoverage() {
  const [buildingLength, setBuildingLength] = useState(30)
  const [buildingWidth, setBuildingWidth] = useState(20)
  const [floors, setFloors] = useState(2)
  const [lockCount, setLockCount] = useState(10)
  const [protocol, setProtocol] = useState('zigbee')
  const [wallDensity, setWallDensity] = useState('medium')

  const calculate = () => {
    const area = buildingLength * buildingWidth * floors
    const protocolRange = { zigbee: 30, zwave: 40, wifi: 25, thread: 28 }[protocol] || 30
    const wallPenalty = { low: 0.9, medium: 0.7, high: 0.5 }[wallDensity] || 0.7
    const effectiveRange = protocolRange * wallPenalty
    const coverage = Math.PI * effectiveRange * effectiveRange
    const hubsNeeded = Math.ceil(area / coverage) + 1
    const locksPerHub = Math.ceil(lockCount / hubsNeeded)
    const signalQuality = lockCount / hubsNeeded < 15 ? 'Excellent' : lockCount / hubsNeeded < 25 ? 'Good' : 'Fair'
    
    return { area, effectiveRange: Math.round(effectiveRange), hubsNeeded, locksPerHub, signalQuality, coverage: Math.round(coverage) }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-4xl font-bold mb-4">RF Coverage Estimator</h1>
          <p className="text-xl text-gray-600">Plan mesh network topology and signal coverage</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Building Specifications</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Building Length: {buildingLength}m</label>
                <input type="range" min="10" max="100" value={buildingLength} onChange={(e) => setBuildingLength(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Building Width: {buildingWidth}m</label>
                <input type="range" min="10" max="100" value={buildingWidth} onChange={(e) => setBuildingWidth(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Floors: {floors}</label>
                <input type="range" min="1" max="20" value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Total Locks: {lockCount}</label>
                <input type="range" min="1" max="100" value={lockCount} onChange={(e) => setLockCount(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Protocol</label>
                <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="zigbee">Zigbee</option>
                  <option value="zwave">Z-Wave</option>
                  <option value="wifi">Wi-Fi</option>
                  <option value="thread">Thread</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Wall Density</label>
                <select value={wallDensity} onChange={(e) => setWallDensity(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="low">Low (Open plan)</option>
                  <option value="medium">Medium (Normal)</option>
                  <option value="high">High (Many walls)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.signalQuality === 'Excellent' ? 'bg-gradient-to-br from-green-600 to-green-700' :
              result.signalQuality === 'Good' ? 'bg-gradient-to-br from-blue-600 to-blue-700' :
              'bg-gradient-to-br from-yellow-600 to-yellow-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Coverage Analysis</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.hubsNeeded}</div>
                <div className="text-lg">Hubs/Gateways Needed</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Total Area</span>
                  <span className="font-semibold">{result.area}m²</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Effective Range</span>
                  <span className="font-semibold">{result.effectiveRange}m</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Coverage per Hub</span>
                  <span className="font-semibold">{result.coverage}m²</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Locks per Hub</span>
                  <span className="font-semibold">{result.locksPerHub}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between items-center">
                  <span>Signal Quality</span>
                  <span className="text-2xl font-bold">{result.signalQuality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-3">📍 Hub Placement</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Central locations</li>
              <li>• Away from metal</li>
              <li>• Height: 2m optimal</li>
              <li>• Avoid corners</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-3">⚠️ Obstacles</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Metal reduces 50%</li>
              <li>• Concrete reduces 40%</li>
              <li>• Water reduces 30%</li>
              <li>• Glass minimal impact</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-3">✓ Best Practices</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Test before final install</li>
              <li>• Add 20% redundancy</li>
              <li>• Document coverage map</li>
              <li>• Plan for expansion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
