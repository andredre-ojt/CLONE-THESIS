"use client"

import { useState, useEffect } from "react"
import { Bell, ShoppingBag, BookOpen, AlertCircle, Clock, LogOut, Share2, Wallet, X, Check, TrendingUp, Calendar, Filter, Download } from "lucide-react"

interface Notification {
    id: string
    type: "purchase" | "warning"
    title: string
    description: string
    amount?: number
    icon: "purchase" | "warning"
    timestamp: string
}

interface Activity {
    id: string
    item: string
    date: string
    time: string
    amount: number
    type: "expense" | "income"
    category: string
}

export default function ParentDashboard() {
    const [currentTime, setCurrentTime] = useState("")
    const [balance, setBalance] = useState(333.00)
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
    const [showTopUpModal, setShowTopUpModal] = useState(false)
    const [topUpAmount, setTopUpAmount] = useState("")
    const [showShareModal, setShowShareModal] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showNotificationDetails, setShowNotificationDetails] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [showActivityFilter, setShowActivityFilter] = useState(false)
    const [activityFilter, setActivityFilter] = useState<"all" | "expense" | "income">("all")

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "purchase",
            title: "Purchase Alert",
            description: "Student bought Chicken Sandwich",
            amount: -25.00,
            icon: "purchase",
            timestamp: "2 mins ago"
        },
        {
            id: "2",
            type: "warning",
            title: "Low Balance",
            description: "Balance below ₱150.00 threshold",
            icon: "warning",
            timestamp: "15 mins ago"
        },
        {
            id: "3",
            type: "purchase",
            title: "Purchase Alert",
            description: "Student bought School Supplies",
            amount: -45.00,
            icon: "purchase",
            timestamp: "1 hour ago"
        }
    ])

    const [recentActivity, setRecentActivity] = useState<Activity[]>([
        { id: "1", item: "Fruit Juice", date: "Nov 22", time: "10:32 AM", amount: -12.00, type: "expense", category: "Food & Drinks" },
        { id: "2", item: "Veggie Wrap", date: "Nov 21", time: "12:15 PM", amount: -20.00, type: "expense", category: "Food & Drinks" },
        { id: "3", item: "Library Fine", date: "Nov 20", time: "09:00 AM", amount: -5.00, type: "expense", category: "Academic" },
        { id: "4", item: "Notebook Set", date: "Nov 19", time: "02:30 PM", amount: -35.00, type: "expense", category: "Supplies" },
        { id: "5", item: "Wallet Top-up", date: "Nov 18", time: "08:00 AM", amount: 200.00, type: "income", category: "Top-up" }
    ])

    const paymentMethods = [
        { id: "cash", name: "Cash", icon: "💵" },
        { id: "gcash", name: "GCash", icon: "📱" },
        { id: "paymaya", name: "PayMaya", icon: "💳" },
        { id: "gotyme", name: "GoTyme", icon: "🏦" }
    ]

    const quickAmounts = [50, 100, 200, 500]

    const handleLogout = () => {

        localStorage.removeItem("username")
        localStorage.removeItem("role")
        window.location.href = "/"
    }

    const handleTopUp = () => {
        if (!selectedPayment) {
            alert("Please select a payment method")
            return
        }
        if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
            alert("Please enter a valid amount")
            return
        }

        const amount = parseFloat(topUpAmount)
        setBalance(prev => prev + amount)

        // Add to recent activity
        const newActivity: Activity = {
            id: Date.now().toString(),
            item: `Top-up via ${paymentMethods.find(p => p.id === selectedPayment)?.name}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            amount: amount,
            type: "income",
            category: "Top-up"
        }
        setRecentActivity(prev => [newActivity, ...prev])

        setShowTopUpModal(false)
        setTopUpAmount("")
        setSelectedPayment(null)

        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
    }

    const handleQuickAmount = (amount: number) => {
        setTopUpAmount(amount.toString())
    }

    const handleShare = () => {
        const shareData = {
            title: 'EduTap Parent Dashboard',
            text: `Current Balance: ₱${balance.toFixed(2)}`,
            url: window.location.href
        }

        if (navigator.share) {
            navigator.share(shareData).catch(() => {
                setShowShareModal(true)
            })
        } else {
            setShowShareModal(true)
        }
    }

    const copyToClipboard = () => {
        const text = `EduTap Balance: ₱${balance.toFixed(2)}\n${window.location.href}`
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!")
            setShowShareModal(false)
        })
    }

    const handleNotificationClick = (notification: Notification) => {
        setSelectedNotification(notification)
        setShowNotificationDetails(true)
    }

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        setShowNotificationDetails(false)
    }

    const clearAllNotifications = () => {
        setNotifications([])
    }

    const handleDownloadReport = () => {
        // Generate CSV data
        const csvContent = [
            ['Date', 'Time', 'Item', 'Category', 'Amount', 'Type'],
            ...recentActivity.map(activity => [
                activity.date,
                activity.time,
                activity.item,
                activity.category,
                activity.amount.toFixed(2),
                activity.type
            ])
        ].map(row => row.join(',')).join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `edutap-activity-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)

        alert("Activity report downloaded successfully!")
    }

    const filteredActivity = recentActivity.filter(activity => {
        if (activityFilter === "all") return true
        return activity.type === activityFilter
    })

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
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg">
                    <Check className="h-5 w-5" />
                    <span>Top-up successful!</span>
                </div>
            )}

            {/* Notification Details Modal */}
            {showNotificationDetails && selectedNotification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Notification Details</h3>
                            <button onClick={() => setShowNotificationDetails(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${selectedNotification.icon === "purchase" ? "bg-blue-100" : "bg-red-100"}`}>
                                {selectedNotification.icon === "purchase" ? (
                                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                                ) : (
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">{selectedNotification.title}</h4>
                                <p className="text-sm text-gray-500">{selectedNotification.timestamp}</p>
                            </div>
                            <p className="text-gray-700">{selectedNotification.description}</p>
                            {selectedNotification.amount && (
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm text-gray-600">Amount</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {selectedNotification.amount < 0 ? "- " : ""}₱{Math.abs(selectedNotification.amount).toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => markNotificationAsRead(selectedNotification.id)}
                            className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                        >
                            Mark as Read
                        </button>
                    </div>
                </div>
            )}

            {/* Top Up Modal */}
            {showTopUpModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Top Up Wallet</h3>
                            <button onClick={() => setShowTopUpModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Select Payment Method</label>
                            <div className="grid grid-cols-2 gap-2">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`rounded-lg border p-3 text-center text-sm font-medium transition ${selectedPayment === method.id
                                            ? "border-gray-600 bg-gray-100"
                                            : "border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="mb-1 text-2xl">{method.icon}</div>
                                        {method.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Enter Amount</label>
                            <input
                                type="number"
                                value={topUpAmount}
                                onChange={(e) => setTopUpAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Quick Amounts</label>
                            <div className="grid grid-cols-4 gap-2">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => handleQuickAmount(amount)}
                                        className="rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
                                    >
                                        ₱{amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleTopUp}
                            className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                        >
                            Confirm Top Up
                        </button>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Share Dashboard</h3>
                            <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                            <p className="mb-2 text-sm text-gray-600">Current Balance</p>
                            <p className="text-2xl font-bold text-gray-900">₱{balance.toFixed(2)}</p>
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            )}

            {/* Activity Filter Modal */}
            {showActivityFilter && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Filter Activity</h3>
                            <button onClick={() => setShowActivityFilter(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {[
                                { value: "all", label: "All Transactions" },
                                { value: "expense", label: "Expenses Only" },
                                { value: "income", label: "Income Only" }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setActivityFilter(option.value as any)
                                        setShowActivityFilter(false)
                                    }}
                                    className={`w-full rounded-lg border p-3 text-left font-medium transition ${activityFilter === option.value
                                        ? "border-gray-600 bg-gray-100"
                                        : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        <Share2 className="h-4 w-4" />
                    </button>
                    <button

                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-400"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout

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
                                <div className="flex items-center gap-2">
                                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                        {notifications.length} New
                                    </span>
                                    {notifications.length > 0 && (
                                        <button
                                            onClick={clearAllNotifications}
                                            className="text-xs text-red-600 hover:text-red-700"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {notifications.length === 0 ? (
                                    <div className="py-8 text-center text-gray-500">
                                        <Bell className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                        <p className="text-sm">No notifications</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <button
                                            key={notification.id}
                                            onClick={() => handleNotificationClick(notification)}
                                            className="flex w-full items-start gap-3 border-b border-gray-100 pb-3 text-left transition hover:bg-gray-50 last:border-0"
                                        >
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${notification.icon === "purchase" ? "bg-blue-100" : "bg-red-100"}`}>
                                                {notification.icon === "purchase" ? (
                                                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                                                ) : (
                                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-900">{notification.title}</div>
                                                <div className="text-xs text-gray-500">{notification.description}</div>
                                                <div className="mt-1 text-xs text-gray-400">{notification.timestamp}</div>
                                            </div>
                                            {notification.amount && (
                                                <div className="text-sm font-bold text-red-600">
                                                    {notification.amount < 0 ? "- " : ""}₱{Math.abs(notification.amount).toFixed(2)}
                                                </div>
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Activity Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowActivityFilter(true)}
                                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <Filter className="h-3 w-3" />
                                        Filter
                                    </button>
                                    <button
                                        onClick={handleDownloadReport}
                                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <Download className="h-3 w-3" />
                                        Export
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {filteredActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.type === "expense" ? "bg-red-100" : "bg-green-100"}`}>
                                            {activity.type === "expense" ? (
                                                <ShoppingBag className="h-4 w-4 text-red-600" />
                                            ) : (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-900">{activity.item}</div>
                                            <div className="text-xs text-gray-500">{activity.category}</div>
                                            <div className="text-xs text-gray-400">{activity.date} • {activity.time}</div>
                                        </div>
                                        <div className={`text-sm font-bold ${activity.amount < 0 ? "text-red-600" : "text-green-600"}`}>
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

                        <button
                            onClick={() => setShowTopUpModal(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-gray-700"
                        >
                            <Wallet className="h-5 w-5" />
                            Top Up Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}