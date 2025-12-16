import { X, ShoppingBag, AlertCircle } from "lucide-react"

interface Notification {
    id: string
    type: "purchase" | "warning"
    title: string
    description: string
    amount?: number
    icon: "purchase" | "warning"
    timestamp: string
}

interface NotificationDetailsModalProps {
    isOpen: boolean
    notification: Notification | null
    onClose: () => void
    onMarkAsRead: (id: string) => void
}

export function NotificationDetailsModal({ isOpen, notification, onClose, onMarkAsRead }: NotificationDetailsModalProps) {
    if (!isOpen || !notification) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Notification Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="mb-6 space-y-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${notification.icon === "purchase" ? "bg-blue-100" : "bg-red-100"}`}>
                        {notification.icon === "purchase" ? (
                            <ShoppingBag className="h-6 w-6 text-blue-600" />
                        ) : (
                            <AlertCircle className="h-6 w-6 text-red-600" />
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-500">{notification.timestamp}</p>
                    </div>
                    <p className="text-gray-700">{notification.description}</p>
                    {notification.amount && (
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-600">Amount</p>
                            <p className="text-2xl font-bold text-red-600">
                                {notification.amount < 0 ? "- " : ""}₱{Math.abs(notification.amount).toFixed(2)}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                >
                    Mark as Read
                </button>
            </div>
        </div>
    )
}