import { X } from "lucide-react"

interface PaymentMethod {
    id: string
    name: string
    icon: string
}

interface TopUpModalProps {
    isOpen: boolean
    onClose: () => void
    paymentMethods: PaymentMethod[]
    selectedPayment: string | null
    onPaymentSelect: (id: string) => void
    topUpAmount: string
    onAmountChange: (amount: string) => void
    quickAmounts: number[]
    onQuickAmount: (amount: number) => void
    onConfirm: () => void
}

export function TopUpModal({
    isOpen,
    onClose,
    paymentMethods,
    selectedPayment,
    onPaymentSelect,
    topUpAmount,
    onAmountChange,
    quickAmounts,
    onQuickAmount,
    onConfirm
}: TopUpModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Top Up Wallet</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => onPaymentSelect(method.id)}
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
                        onChange={(e) => onAmountChange(e.target.value)}
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
                                onClick={() => onQuickAmount(amount)}
                                className="rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                ₱{amount}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    className="w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
                >
                    Confirm Top Up
                </button>
            </div>
        </div>
    )
}