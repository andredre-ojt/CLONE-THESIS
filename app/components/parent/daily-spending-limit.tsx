"use client"

import { useState } from "react"
import { TrendingDown, TrendingUp, Edit2, Check, X } from "lucide-react"

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
    // FIX 1: Removed 'h-full' and 'justify-between'. Added 'h-fit' so it hugs content.
    <div className="flex h-fit flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Daily Spending Limit</h2>
        {!isEditingLimit && (
          <button onClick={handleEditLimit} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* 2. Content Row: Budget & Remaining side-by-side */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        
        {/* Left: Daily Budget */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Daily Budget</p>
          {isEditingLimit ? (
            <div className="flex items-center gap-1">
              <span className="text-xl font-extrabold text-gray-900">₱</span>
              <input
                type="number"
                value={tempLimit}
                onChange={(e) => setTempLimit(e.target.value)}
                className="w-16 bg-transparent text-xl font-extrabold text-gray-900 focus:outline-none border-b-2 border-blue-500"
                autoFocus
              />
              <button onClick={handleSaveLimit} className="text-green-600 hover:bg-green-50 rounded p-0.5"><Check className="h-4 w-4"/></button>
            </div>
          ) : (
            <div className="text-2xl font-extrabold text-gray-900">₱{dailyLimit.toFixed(2)}</div>
          )}
        </div>

        {/* Right: Remaining Budget */}
        <div className={`rounded-lg border px-3 py-2 ${isOverLimit ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-bold text-gray-500 uppercase">Remaining</p>
                 <p className={`text-lg font-bold ${isOverLimit ? 'text-red-600' : 'text-blue-600'}`}>
                    {isOverLimit ? '-' : ''}₱{Math.abs(remaining).toFixed(0)}
                 </p>
              </div>
              <div className={isOverLimit ? 'text-red-500' : 'text-blue-500'}>
                  {isOverLimit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
           </div>
        </div>
      </div>

      {/* 3. Progress Bar */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-end justify-between">
            <div>
                <p className="text-[10px] text-gray-500">Today's Spending</p>
                <p className="text-base font-bold text-gray-900">₱{todaySpent.toFixed(2)}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${getStatusColor()} bg-opacity-10 bg-gray-100`}>
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

      {/* 4. Footer Stats */}
      {/* FIX 2: Removed 'mt-auto' so it doesn't push to the bottom */}
      <div className="border-t border-gray-100 pt-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-400">Avg/Day</p>
            <p className="text-xs font-bold text-gray-700">₱85.50</p>
          </div>
          <div>
            <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-400">Week</p>
            <p className="text-xs font-bold text-gray-700">₱428</p>
          </div>
          <div>
            <p className="mb-0.5 text-[9px] font-bold uppercase text-gray-400">Month</p>
            <p className="text-xs font-bold text-gray-700">₱1,852</p>
          </div>
        </div>
      </div>

    </div>
  )
}