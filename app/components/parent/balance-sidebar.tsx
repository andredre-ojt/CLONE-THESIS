import { Wallet } from "lucide-react"

interface PaymentMethod {
    id: string
    name: string
    icon: string
}

interface BalanceSidebarProps {
    balance: number
    paymentMethods: PaymentMethod[]
    selectedPayment: string | null
    // UPDATED: Now accepts null so we can unselect
    onPaymentSelect: (id: string | null) => void 
    onTopUpClick: () => void
}

export function BalanceSidebar({ balance, paymentMethods, selectedPayment, onPaymentSelect, onTopUpClick }: BalanceSidebarProps) {
    
    // LOGIC ADDED: Toggle selection (unselect if already clicked)
    const handlePaymentClick = (id: string) => {
        if (selectedPayment === id) {
            onPaymentSelect(null) // Unselect
        } else {
            onPaymentSelect(id) // Select
        }
    }

    return (
        // ORIGINAL LAYOUT: Fixed width (w-96) and Left Border (border-l)
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
                            // UPDATED: Use the toggle handler
                            onClick={() => handlePaymentClick(method.id)}
                            className={`rounded-lg border p-2.5 text-center text-sm font-medium transition ${
                                selectedPayment === method.id
                                    ? "border-gray-600 bg-white text-gray-900" // Active style
                                    : "border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100" // Inactive style
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
                    onClick={onTopUpClick}
                    // Optional: Disable if nothing selected
                    disabled={!selectedPayment}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-base font-semibold text-white transition ${
                        selectedPayment 
                        ? "bg-gray-600 hover:bg-gray-700" 
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    <Wallet className="h-5 w-5" />
                    Top Up Wallet
                </button>
            </div>
                        <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}