'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InstallationTime() {
  const [doorCount, setDoorCount] = useState(10)
  const [doorType, setDoorType] = useState('standard')
  const [wireRequired, setWireRequired] = useState(false)
  const [technicianCount, setTechnicianCount] = useState(2)
  const [laborRate, setLaborRate] = useState(75)

  const calculate = () => {
    const baseTimePerDoor = { standard: 45, thick: 60, metal: 75, glass: 90 }[doorType] || 45
    const wireTimePerDoor = wireRequired ? 30 : 0
    const totalMinutesPerDoor = baseTimePerDoor + wireTimePerDoor
    const totalMinutes = doorCount * totalMinutesPerDoor
    const totalHours = totalMinutes / 60
    const hoursPerTech = totalHours / technicianCount
    const crewDays = Math.ceil(hoursPerTech / 8)
    const laborCost = totalHours * laborRate
    const costPerDoor = laborCost / doorCount
    
    return {
      totalMinutes,
      totalHours: Math.round(totalHours * 10) / 10,
      hoursPerTech: Math.round(hoursPerTech * 10) / 10,
      crewDays,
      laborCost: Math.round(laborCost),
      costPerDoor: Math.round(costPerDoor),
      minutesPerDoor: totalMinutesPerDoor
    }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⏱️</div>
          <h1 className="text-4xl font-bold mb-4">Installation Time Estimator</h1>
          <p className="text-xl text-gray-600">Estimate technician hours and labor cost</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Doors: {doorCount}</label>
                <input type="range" min="1" max="100" value={doorCount} onChange={(e) => setDoorCount(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Door Type</label>
                <select value={doorType} onChange={(e) => setDoorType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="standard">Standard (45 min/door)</option>
                  <option value="thick">Thick/Security (60 min/door)</option>
                  <option value="metal">Metal (75 min/door)</option>
                  <option value="glass">Glass/Special (90 min/door)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={wireRequired} onChange={(e) => setWireRequired(e.target.checked)} className="w-4 h-4"/>
                  <span>Wiring Required (+30 min/door)</span>
                </label>
              </div>
              <div>
                <label className="block mb-2 font-medium">Number of Technicians: {technicianCount}</label>
                <input type="range" min="1" max="10" value={technicianCount} onChange={(e) => setTechnicianCount(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Labor Rate: ${laborRate}/hour</label>
                <input type="range" min="50" max="150" step="5" value={laborRate} onChange={(e) => setLaborRate(Number(e.target.value))} className="w-full"/>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-lg shadow-lg text-white sticky top-4">
              <h2 className="text-xl font-bold mb-6">Time & Cost Estimate</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.crewDays}</div>
                <div className="text-lg">Crew-Days</div>
                <div className="text-sm opacity-90 mt-2">{result.totalHours}h total</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Time per Door</span>
                  <span className="font-semibold">{result.minutesPerDoor} min</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Hours per Tech</span>
                  <span className="font-semibold">{result.hoursPerTech}h</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Labor Cost</span>
                  <span className="font-semibold">${result.laborCost}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Cost per Door</span>
                  <span className="font-semibold">${result.costPerDoor}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="text-sm opacity-90">Based on 8-hour work days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Time Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 mb-1">{Math.round(result.totalHours * 0.6)}h</div>
              <div className="text-sm text-gray-600">Physical Installation</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700 mb-1">{Math.round(result.totalHours * 0.25)}h</div>
              <div className="text-sm text-gray-600">Testing & Setup</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 mb-1">{Math.round(result.totalHours * 0.15)}h</div>
              <div className="text-sm text-gray-600">Cleanup & Documentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
