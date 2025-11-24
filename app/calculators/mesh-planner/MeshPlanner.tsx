'use client'

import { useState } from 'react'

// IEEE 802.15.4 / ITU-R P.2040-1 based propagation data
const MESH_DATA = {
  protocols: {
    zigbee: {
      range: 30, // meters indoor (2-3 walls)
      maxHops: 30, // Zigbee 3.0 spec
      nodeCost: 25, // Average USB repeater
      power: 1 // mW TX power (0 dBm typical)
    },
    zwave: {
      range: 40, // meters indoor (908MHz better penetration)
      maxHops: 4, // Z-Wave limitation
      nodeCost: 30, // Z-Wave repeater
      power: 1 // mW (0 dBm)
    },
    thread: {
      range: 25, // meters indoor (2.4GHz, similar to Zigbee)
      maxHops: 32, // Thread 1.3 spec
      nodeCost: 35, // Border router + repeater
      power: 1 // mW
    }
  },
  // ITU-R P.2040-1 indoor attenuation (dB at 2.4GHz / 900MHz)
  wallAttenuation: {
    drywall: { factor: 1.0, db: 3 }, // Low attenuation
    wood: { factor: 1.4, db: 5 }, // Moderate
    brick: { factor: 2.0, db: 8 }, // High
    concrete: { factor: 2.5, db: 12 } // Very high
  }
}

interface MeshResult {
  totalLocks: number
  totalNodes: number
  nodesPerFloor: number
  nodeCost: number
  totalCost: number
  effectiveRange: number
  hopsRequired: number
  redundancy: number
}

export default function MeshPlanner() {
  const [floors, setFloors] = useState(2)
  const [locksPerFloor, setLocksPerFloor] = useState(5)
  const [floorArea, setFloorArea] = useState(150) // m²
  const [wallType, setWallType] = useState<keyof typeof MESH_DATA.wallAttenuation>('drywall')
  const [protocol, setProtocol] = useState<keyof typeof MESH_DATA.protocols>('zigbee')

  const calculate = (): MeshResult => {
    const prot = MESH_DATA.protocols[protocol]
    const wall = MESH_DATA.wallAttenuation[wallType]
    
    const totalLocks = floors * locksPerFloor
    
    // Effective range considering wall attenuation
    const effectiveRange = Math.round(prot.range / wall.factor)
    
    // Calculate coverage area per node (circle area)
    const coverageArea = Math.PI * effectiveRange * effectiveRange
    
    // Locks density per floor
    const locksPerM2 = locksPerFloor / floorArea
    
    // Estimate locks per node coverage
    const locksInNodeRange = coverageArea * locksPerM2
    
    // Nodes needed per floor (with 20% redundancy for reliability)
    const nodesPerFloor = Math.max(1, Math.ceil((locksPerFloor / Math.max(1, locksInNodeRange - 1)) * 1.2))
    
    // Total nodes across all floors
    const totalNodes = nodesPerFloor * floors
    
    // Estimate hops (maximum distance across floor)
    const floorDiameter = Math.sqrt(floorArea) * 1.4 // Diagonal distance
    const hopsRequired = Math.min(prot.maxHops, Math.ceil(floorDiameter / effectiveRange))
    
    // Redundancy factor (how many paths available)
    const redundancy = Math.floor(totalNodes / Math.max(1, totalLocks / 10))
    
    const nodeCost = prot.nodeCost
    const totalCost = totalNodes * nodeCost
    
    return {
      totalLocks,
      totalNodes,
      nodesPerFloor,
      nodeCost,
      totalCost,
      effectiveRange,
      hopsRequired,
      redundancy
    }
  }

  const result = calculate()
  const prot = MESH_DATA.protocols[protocol]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Configuration</h2>
            
            <div className="space-y-6">
              {/* Floors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Floors: {floors}
                </label>
                <input type="range" min="1" max="20" value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 floor</span>
                  <span>20 floors</span>
                </div>
              </div>

              {/* Locks per Floor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Smart Locks per Floor: {locksPerFloor}
                </label>
                <input type="range" min="1" max="50" value={locksPerFloor} onChange={(e) => setLocksPerFloor(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 lock</span>
                  <span>50 locks</span>
                </div>
              </div>

              {/* Floor Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Area: {floorArea}m² ({Math.round(floorArea * 10.764)}sqft)
                </label>
                <input type="range" min="50" max="1000" step="50" value={floorArea} onChange={(e) => setFloorArea(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50m² (small)</span>
                  <span>1000m² (large)</span>
                </div>
              </div>

              {/* Wall Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Material</label>
                <select value={wallType} onChange={(e) => setWallType(e.target.value as any)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="drywall">Drywall/Gypsum (3dB loss)</option>
                  <option value="wood">Wood/Timber (5dB loss)</option>
                  <option value="brick">Brick/Masonry (8dB loss)</option>
                  <option value="concrete">Concrete/Stone (12dB loss)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Based on ITU-R P.2040-1 indoor propagation</p>
              </div>

              {/* Protocol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mesh Protocol</label>
                <select value={protocol} onChange={(e) => setProtocol(e.target.value as any)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="zigbee">Zigbee 3.0 (30m range, 30 hops, 2.4GHz)</option>
                  <option value="zwave">Z-Wave Plus (40m range, 4 hops, 908MHz)</option>
                  <option value="thread">Thread 1.3 (25m range, 32 hops, 2.4GHz)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">IEEE 802.15.4 / ITU-T G.9959 specs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-xl p-8 text-white sticky top-4">
            <h2 className="text-xl font-bold mb-6">Mesh Requirements</h2>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2">{result.totalNodes}</div>
              <div className="text-lg opacity-90">Repeater Nodes</div>
              <div className="text-sm opacity-75 mt-1">+ 20% redundancy buffer</div>
            </div>

            <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between">
                <span className="opacity-90">Total Locks:</span>
                <span className="font-semibold">{result.totalLocks}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Nodes per Floor:</span>
                <span className="font-semibold">{result.nodesPerFloor}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Effective Range:</span>
                <span className="font-semibold">{result.effectiveRange}m</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Max Hops:</span>
                <span className="font-semibold">{result.hopsRequired} / {prot.maxHops}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Redundancy:</span>
                <span className="font-semibold">{result.redundancy}× paths</span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between">
                <span className="opacity-90">Cost per Node:</span>
                <span className="font-semibold">${result.nodeCost}</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-white/40">
              <div className="flex justify-between items-center">
                <span className="text-lg">Total Cost:</span>
                <span className="text-3xl font-bold">${result.totalCost}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg text-xs">
              <p className="mb-2"><strong>💡 Recommendation:</strong></p>
              <p>{
                result.totalNodes < 3 ? 'Minimal mesh. Consider Wi-Fi as alternative.' :
                result.totalNodes < 10 ? 'Good mesh topology. Reliable coverage expected.' :
                result.totalNodes < 20 ? 'Complex mesh. Plan placement carefully.' :
                'Large deployment. Consider professional site survey.'
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
