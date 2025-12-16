import { X } from "lucide-react"

interface ShareModalProps {
    isOpen: boolean
    balance: number
    onClose: () => void
    onCopy: () => void
}

export function ShareModal({ isOpen, balance, onClose, onCopy }: ShareModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Share Dashboard</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900">₱{balance.toFixed(2)}</p>
                </div>

                <button
                    onClick={onCopy}
                    className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                >
                    Copy to Clipboard
                </button>
            </div>
        </div>
    )
}