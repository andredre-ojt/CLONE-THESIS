import { X } from "lucide-react"

interface ActivityFilterModalProps {
    isOpen: boolean
    currentFilter: "all" | "expense" | "income"
    onClose: () => void
    onSelectFilter: (filter: "all" | "expense" | "income") => void
}

export function ActivityFilterModal({ isOpen, currentFilter, onClose, onSelectFilter }: ActivityFilterModalProps) {
    if (!isOpen) return null

    const options = [
        { value: "all" as const, label: "All Transactions" },
        { value: "expense" as const, label: "Expenses Only" },
        { value: "income" as const, label: "Income Only" }
    ]

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Filter Activity</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-2">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onSelectFilter(option.value)
                                onClose()
                            }}
                            className={`w-full rounded-lg border p-3 text-left font-medium transition ${currentFilter === option.value
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
    )
}