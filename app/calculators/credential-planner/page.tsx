'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CredentialPlanner() {
  const [employees, setEmployees] = useState(20)
  const [contractors, setContractors] = useState(10)
  const [guests, setGuests] = useState(50)
  const [lockModel, setLockModel] = useState('standard')

  const calculate = () => {
    const capacities: any = { basic: 50, standard: 100, premium: 250, enterprise: 500 }
    const capacity = capacities[lockModel] || 100
    const totalCredentials = employees + contractors + guests
    const utilization = (totalCredentials / capacity) * 100
    const available = Math.max(0, capacity - totalCredentials)
    const status = utilization < 70 ? 'Safe' : utilization < 90 ? 'Warning' : 'Critical'
    const recommendation = utilization > 80 ? 'Upgrade lock model' : utilization > 60 ? 'Monitor closely' : 'Capacity OK'
    
    return { capacity, totalCredentials, utilization: Math.round(utilization), available, status, recommendation }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="text-4xl font-bold mb-4">Credential Capacity Planner</h1>
          <p className="text-xl text-gray-600">Check if your locks can handle all credentials</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">User Requirements</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Employees: {employees}</label>
                <input type="range" min="0" max="100" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Contractors: {contractors}</label>
                <input type="range" min="0" max="50" value={contractors} onChange={(e) => setContractors(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Guests/Temporary: {guests}</label>
                <input type="range" min="0" max="200" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full"/>
              </div>
              <div>
                <label className="block mb-2 font-medium">Lock Model</label>
                <select value={lockModel} onChange={(e) => setLockModel(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="basic">Basic (50 codes)</option>
                  <option value="standard">Standard (100 codes)</option>
                  <option value="premium">Premium (250 codes)</option>
                  <option value="enterprise">Enterprise (500 codes)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.status === 'Safe' ? 'bg-gradient-to-br from-green-600 to-green-700' :
              result.status === 'Warning' ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
              'bg-gradient-to-br from-red-600 to-red-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Capacity Analysis</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.utilization}%</div>
                <div className="text-lg">Capacity Used</div>
                <div className="text-sm opacity-90 mt-2">{result.status}</div>
              </div>
              <div className="mb-6">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all" style={{width: `${Math.min(100, result.utilization)}%`}}/>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Lock Capacity</span>
                  <span className="font-semibold">{result.capacity}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Total Needed</span>
                  <span className="font-semibold">{result.totalCredentials}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Available</span>
                  <span className="font-semibold">{result.available}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="text-sm font-semibold">{result.recommendation}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Credential Management</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Regular audit of active codes</li>
                <li>• Remove expired credentials</li>
                <li>• Use time-limited guest codes</li>
                <li>• Archive inactive users</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Capacity Planning</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Maintain 20% buffer</li>
                <li>• Plan for growth</li>
                <li>• Consider seasonal peaks</li>
                <li>• Document user turnover rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
