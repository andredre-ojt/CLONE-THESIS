"use client"

import { useState, useEffect } from "react"
import { Bell, ShoppingBag, BookOpen, AlertCircle, Clock, History, LogIn, Share2, Wallet } from "lucide-react"

interface Notification {
    id: string
    type: "purchase" | "warning"
    title: string
    description: string
    amount?: number
    icon: "purchase" | "warning"
}

interface Activity {
    id: string
    item: string
    date: string
    time: string
    amount: number
    type: "expense" | "income"
}

export default function ParentDashboard() {
    const [currentTime, setCurrentTime] = useState("")
    const [balance] = useState(102.00)
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

    const notifications: Notification[] = [
        {
            id: "1",
            type: "purchase",
            title: "Purchase Alert",
            description: "Student bought Chicken Sandwich",
            amount: -25.00,
            icon: "purchase"
        },
        {
            id: "2",
            type: "warning",
            title: "Low Balance",
            description: "Balance below ₱150.00 threshold",
            icon: "warning"
        }
    ]

    const recentActivity: Activity[] = [
        { id: "1", item: "Fruit Juice", date: "Nov 22", time: "10:32 AM", amount: -12.00, type: "expense" },
        { id: "2", item: "Veggie Wrap", date: "Nov 21", time: "12:15 PM", amount: -20.00, type: "expense" },
        { id: "3", item: "Library Fine", date: "Nov 20", time: "09:00 AM", amount: -5.00, type: "expense" }
    ]

    const paymentMethods = [
        { id: "cash", name: "Cash", icon: "💵" },
        { id: "gcash", name: "GCash", icon: "📱" },
        { id: "paymaya", name: "PayMaya", icon: "💳" },
        { id: "gotyme", name: "GoTyme", icon: "🏦" }
    ]

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const ampm = hours >= 12 ? "PM" : "AM"
            const displayHours = hours % 12 || 12
            const displayMinutes = minutes.toString().padStart(2, "0")
            setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 60000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">EduTap</h1>
                        <span className="text-xs text-gray-500">Parent Dashboard</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm">
                        <span className="text-gray-600">admin (Parent)</span>
                    </div>
                    <div className="min-w-[70px] text-center text-sm font-medium text-gray-600">
                        {currentTime}
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        <History className="h-4 w-4" />
                        History
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        <LogIn className="h-4 w-4" />
                        Login
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        <Share2 className="h-4 w-4" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Notifications Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900">Notifications</h2>
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">2 New</span>
                            </div>

                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${notification.icon === "purchase" ? "bg-blue-100" : "bg-red-100"
                                            }`}>
                                            {notification.icon === "purchase" ? (
                                                <ShoppingBag className="h-4 w-4 text-blue-600" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4 text-red-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-900">{notification.title}</div>
                                            <div className="text-xs text-gray-500">{notification.description}</div>
                                        </div>
                                        {notification.amount && (
                                            <div className="text-sm font-bold text-red-600">
                                                {notification.amount < 0 ? "- " : ""}₱{Math.abs(notification.amount).toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                                <button className="text-gray-400 hover:text-gray-600">⋯</button>
                            </div>

                            <div className="space-y-3">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                                            <ShoppingBag className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-900">{activity.item}</div>
                                            <div className="text-xs text-gray-500">{activity.date} • {activity.time}</div>
                                        </div>
                                        <div className={`text-sm font-bold ${activity.amount < 0 ? "text-red-600" : "text-blue-600"
                                            }`}>
                                            {activity.amount < 0 ? "- " : "+ "}₱{Math.abs(activity.amount).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Current Balance */}
                <div className="flex w-96 flex-col border-l border-gray-200 bg-white p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Current Balance</h2>
                        <p className="text-sm text-gray-500">Jane Parent's Wallet</p>
                    </div>

                    <div className="mb-6 flex flex-1 flex-col items-center justify-center text-center">
                        <div className="mb-4 text-5xl text-gray-300">
                            <Wallet className="h-12 w-12" />
                        </div>
                        <p className="mb-2 text-sm text-gray-500">Available Funds</p>
                        <p className="mb-1 text-4xl font-extrabold text-gray-900">₱{balance.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">Last updated just now</p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">Quick Top-Up</h3>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`rounded-lg border p-2.5 text-center text-sm font-medium transition ${selectedPayment === method.id
                                        ? "border-gray-600 bg-white text-gray-900"
                                        : "border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="mb-1 text-lg">{method.icon}</div>
                                    {method.name}
                                </button>
                            ))}
                        </div>

                        <div className="mb-6 flex items-center justify-between text-lg font-bold text-gray-900">
                            <span>Account Total</span>
                            <span>₱{balance.toFixed(2)}</span>
                        </div>

                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-gray-700">
                            <Wallet className="h-5 w-5" />
                            Top Up Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}