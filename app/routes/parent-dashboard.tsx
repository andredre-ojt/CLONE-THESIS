"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { ParentHeader } from "@/components/parent/parent-header"
import { Notifications } from "@/components/parent/notifications"
import { RecentActivity } from "@/components/parent/recent-activity"
import { BalanceSidebar } from "@/components/parent/balance-sidebar"
import { TopUpModal } from "@/components/parent/modals/topup-modal"
import { NotificationDetailsModal } from "@/components/parent/modals/notification-details-modal"
import { ShareModal } from "@/components/parent/modals/share-modal"
import { ActivityFilterModal } from "@/components/parent/modals/activity-filter-modal"
import { DailySpendingLimit } from "@/components/parent/daily-spending-limit"

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

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

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

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg">
                    <Check className="h-5 w-5" />
                    <span>Top-up successful!</span>
                </div>
            )}

            {/* Header */}
            <ParentHeader 
                username="admin"
                currentTime={currentTime}
                onShare={handleShare}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="space-y-4">
                            <Notifications 
                                notifications={notifications}
                                onNotificationClick={handleNotificationClick}
                                onClearAll={clearAllNotifications}
                            />
                            <RecentActivity 
                                activities={filteredActivity}
                                onFilterClick={() => setShowActivityFilter(true)}
                                onDownloadClick={handleDownloadReport}
                            />
                        </div>
                        <DailySpendingLimit />
                    </div>
                </div>

                <BalanceSidebar 
                    balance={balance}
                    paymentMethods={paymentMethods}
                    selectedPayment={selectedPayment}
                    onPaymentSelect={setSelectedPayment}
                    onTopUpClick={() => setShowTopUpModal(true)}
                />
            </div>

            {/* Modals */}
            <TopUpModal 
                isOpen={showTopUpModal}
                onClose={() => setShowTopUpModal(false)}
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                onPaymentSelect={setSelectedPayment}
                topUpAmount={topUpAmount}
                onAmountChange={setTopUpAmount}
                quickAmounts={quickAmounts}
                onQuickAmount={handleQuickAmount}
                onConfirm={handleTopUp}
            />

            <NotificationDetailsModal 
                isOpen={showNotificationDetails}
                notification={selectedNotification}
                onClose={() => setShowNotificationDetails(false)}
                onMarkAsRead={markNotificationAsRead}
            />

            <ShareModal 
                isOpen={showShareModal}
                balance={balance}
                onClose={() => setShowShareModal(false)}
                onCopy={copyToClipboard}
            />

            <ActivityFilterModal 
                isOpen={showActivityFilter}
                currentFilter={activityFilter}
                onClose={() => setShowActivityFilter(false)}
                onSelectFilter={setActivityFilter}
            />
        </div>
    )
}