import { Bell, ShoppingBag, AlertCircle } from "lucide-react"

interface Notification {
    id: string
    type: "purchase" | "warning"
    title: string
    description: string
    amount?: number
    icon: "purchase" | "warning"
    timestamp: string
}

interface NotificationsProps {
    notifications: Notification[]
    onNotificationClick: (notification: Notification) => void
    onClearAll: () => void
}

export function Notifications({ notifications, onNotificationClick, onClearAll }: NotificationsProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Notifications</h2>
                <div className="flex items-center gap-2">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {notifications.length} New
                    </span>
                    {notifications.length > 0 && (
                        <button
                            onClick={onClearAll}
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
                            onClick={() => onNotificationClick(notification)}
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
    )
}