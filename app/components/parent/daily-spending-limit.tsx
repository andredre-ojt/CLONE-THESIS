"use client"

import { useState } from "react"
import { TrendingDown, TrendingUp, Edit2, Check } from "lucide-react"

export function DailySpendingLimit() {
  const [dailyLimit, setDailyLimit] = useState(100)
  const [todaySpent, setTodaySpent] = useState(57)
  const [isEditingLimit, setIsEditingLimit] = useState(false)
  const [tempLimit, setTempLimit] = useState("")

  const remaining = dailyLimit - todaySpent
  const percentageUsed = (todaySpent / dailyLimit) * 100
  const isOverLimit = todaySpent > dailyLimit

  const handleEditLimit = () => {
    setTempLimit(dailyLimit.toString())
    setIsEditingLimit(true)
  }

  const handleSaveLimit = () => {
    const newLimit = parseFloat(tempLimit)
    if (!isNaN(newLimit) && newLimit > 0) {
      setDailyLimit(newLimit)
      setIsEditingLimit(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditingLimit(false)
    setTempLimit("")
  }

  const getStatusColor = () => {
    if (isOverLimit) return "text-red-600"
    if (percentageUsed > 80) return "text-orange-600"
    if (percentageUsed > 50) return "text-yellow-600"
    return "text-green-600"
  }

  const getProgressBarColor = () => {
    if (isOverLimit) return "bg-red-500"
    if (percentageUsed > 80) return "bg-orange-500"
    if (percentageUsed > 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusMessage = () => {
    if (isOverLimit) return "Over limit!"
    if (percentageUsed > 80) return "Limit near"
    if (percentageUsed > 50) return "Halfway"
    return "Good"
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Daily Spending Limit</h2>
        {!isEditingLimit && (
          <button 
            onClick={handleEditLimit} 
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Budget & Remaining Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Budget */}
          <div className="flex flex-col">
            <p className="mb-1 text-xs text-gray-500">Daily Budget</p>
            {isEditingLimit ? (
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">₱</span>
                <input
                  type="number"
                  value={tempLimit}
                  onChange={(e) => setTempLimit(e.target.value)}
                  className="w-16 border-b-2 border-blue-500 bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
                  autoFocus
                />
                <button 
                  onClick={handleSaveLimit} 
                  className="rounded p-0.5 text-green-600 hover:bg-green-50"
                >
                  <Check className="h-4 w-4"/>
                </button>
              </div>
            ) : (
              <div className="text-sm font-bold text-gray-900">₱{dailyLimit.toFixed(2)}</div>
            )}
          </div>

          {/* Remaining Budget */}
          <div className={`flex items-center justify-between rounded-lg border px-3 py-2 ${isOverLimit ? 'border-red-100 bg-red-50' : 'border-blue-100 bg-blue-50'}`}>
            <div>
              <p className="text-xs text-gray-500">Remaining</p>
              <p className={`text-sm font-bold ${isOverLimit ? 'text-red-600' : 'text-blue-600'}`}>
                {isOverLimit ? '-' : ''}₱{Math.abs(remaining).toFixed(0)}
              </p>
            </div>
            <div className={isOverLimit ? 'text-red-500' : 'text-blue-500'}>
              {isOverLimit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="border-b border-gray-100 pb-3">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">Today's Spending</p>
              <p className="text-sm font-bold text-gray-900">₱{todaySpent.toFixed(2)}</p>
            </div>
            <span className={`rounded bg-gray-100 px-2 py-0.5 text-xs ${getStatusColor()}`}>
              {getStatusMessage()}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="mb-1 text-xs text-gray-400">Avg/Day</p>
            <p className="text-xs font-bold text-gray-700">₱85.50</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-400">Week</p>
            <p className="text-xs font-bold text-gray-700">₱428</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-400">Month</p>
            <p className="text-xs font-bold text-gray-700">₱1,852</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Demo Component
export default function DailySpendingLimitDemo() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <DailySpendingLimit />
      </div>
    </div>
  )
}