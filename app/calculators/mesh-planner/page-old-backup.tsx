'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MeshPlanner() {
  const [floors, setFloors] = useState(2)
  const [locksPerFloor, setLocksPerFloor] = useState(3)
  const [floorArea, setFloorArea] = useState(100)
  const [wallType, setWallType] = useState('drywall')
  const [protocol, setProtocol] = useState('zigbee')

  const calculate = () => {
    const totalLocks = floors * locksPerFloor
    const wallAttenuation = { drywall: 1, wood: 1.3, brick: 1.8, concrete: 2.2 }[wallType] || 1
    const protocolRange = { zigbee: 30, zwave: 40, thread: 25 }[protocol] || 30
    const effectiveRange = protocolRange / wallAttenuation
    const locksPerNode = Math.floor((effectiveRange * effectiveRange * 0.785) / (floorArea / locksPerFloor))
    const nodesPerFloor = Math.max(1, Math.ceil(locksPerFloor / Math.max(1, locksPerNode - 1)))
    const totalNodes = nodesPerFloor * floors
    const nodeCost = protocol === 'zwave' ? 30 : 25
    const totalCost = totalNodes * nodeCost

    return { totalLocks, nodesPerFloor, totalNodes, nodeCost, totalCost, effectiveRange: Math.round(effectiveRange) }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-4xl font-bold mb-4">Mesh Node Planner</h1>
          <p className="text-xl text-gray-600">Calculate required mesh repeaters for your deployment</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Building Parameters</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Floors: {floors}</label>
                <input type="range" min="1" max="10" value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Locks per Floor: {locksPerFloor}</label>
                <input type="range" min="1" max="20" value={locksPerFloor} onChange={(e) => setLocksPerFloor(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Floor Area: {floorArea}m²</label>
                <input type="range" min="50" max="500" step="50" value={floorArea} onChange={(e) => setFloorArea(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Wall Type</label>
                <select value={wallType} onChange={(e) => setWallType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="drywall">Drywall (Low attenuation)</option>
                  <option value="wood">Wood (Moderate)</option>
                  <option value="brick">Brick (High)</option>
                  <option value="concrete">Concrete (Very High)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Protocol</label>
                <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="zigbee">Zigbee</option>
                  <option value="zwave">Z-Wave</option>
                  <option value="thread">Thread</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-lg shadow-lg text-white sticky top-4">
              <h2 className="text-xl font-bold mb-6">Required Equipment</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.totalNodes}</div>
                <div className="text-lg">Mesh Repeaters Needed</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Total Locks</span>
                  <span className="font-semibold">{result.totalLocks}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Nodes per Floor</span>
                  <span className="font-semibold">{result.nodesPerFloor}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Effective Range</span>
                  <span className="font-semibold">{result.effectiveRange}m</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Cost per Node</span>
                  <span className="font-semibold">${result.nodeCost}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between">
                  <span className="text-lg">Total Cost</span>
                  <span className="text-3xl font-bold">${result.totalCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Placement Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Optimal Placement</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Place nodes centrally between locks</li>
                <li>• Avoid metal obstacles</li>
                <li>• Keep away from WiFi routers</li>
                <li>• Maintain line-of-sight when possible</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Coverage Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Add 20% buffer for reliability</li>
                <li>• Test signal strength after installation</li>
                <li>• Consider future expansion</li>
                <li>• Document node locations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
