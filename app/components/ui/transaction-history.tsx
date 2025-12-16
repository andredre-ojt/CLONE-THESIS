"use client"

import { ArrowLeft, Calendar, CreditCard, Banknote } from "lucide-react"
import React from 'react';

interface TransactionItem {
    name: string
    quantity: number
    price: number
}

interface Transaction {
    id: string
    timestamp: number
    items: TransactionItem[]
    total: number
    paymentMethod: "card" | "cash"
    change: number
}

interface TransactionHistoryProps {
    transactions: Transaction[]
    onClose: () => void
}

export function TransactionHistory({ transactions, onClose }: TransactionHistoryProps) {
    return (
        <div className="flex h-full flex-col">
            {/* Fixed Header */}
            <div className="border-b bg-white p-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-semibold">Transaction History</h2>
                        <p className="text-sm text-gray-500">{transactions.length} total transactions</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {transactions.length === 0 ? (
                    <div className="flex h-96 flex-col items-center justify-center text-gray-500">
                        <Calendar className="mb-3 h-12 w-12" />
                        <p className="font-medium">No transactions yet</p>
                        <p className="text-sm">Completed orders will appear here</p>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl space-y-4">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="rounded-lg border bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(transaction.timestamp).toLocaleString()}
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-blue-600">
                                            ₱{transaction.total.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                                        {transaction.paymentMethod === "card" ? (
                                            <CreditCard className="h-3 w-3" />
                                        ) : (
                                            <Banknote className="h-3 w-3" />
                                        )}
                                        {transaction.paymentMethod === "card" ? "Card" : "Cash"}
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-4">
                                    {transaction.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span className="font-medium">
                                                ₱{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {transaction.change > 0 && (
                                    <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                                        <span className="text-gray-600">Change Given</span>
                                        <span className="font-medium text-green-600">
                                            ₱{transaction.change.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// Demo component to test the scroll
export default function TransactionHistoryDemo() {
    const [showHistory, setShowHistory] = React.useState(true);

    // Sample data for testing
    const sampleTransactions: Transaction[] = [
        {
            id: "1",
            timestamp: Date.now() - 3600000,
            items: [
                { name: "Chicken Sandwich", quantity: 2, price: 125 },
                { name: "Fruit Juice", quantity: 1, price: 85 }
            ],
            total: 335,
            paymentMethod: "card",
            change: 0
        },
        {
            id: "2",
            timestamp: Date.now() - 7200000,
            items: [
                { name: "Veggie Wrap", quantity: 1, price: 200 },
                { name: "Coffee", quantity: 2, price: 150 }
            ],
            total: 500,
            paymentMethod: "cash",
            change: 100
        },
        {
            id: "3",
            timestamp: Date.now() - 10800000,
            items: [
                { name: "Caesar Salad", quantity: 1, price: 180 },
                { name: "Iced Tea", quantity: 1, price: 75 }
            ],
            total: 255,
            paymentMethod: "card",
            change: 0
        },
        {
            id: "4",
            timestamp: Date.now() - 14400000,
            items: [
                { name: "Burger", quantity: 3, price: 250 },
                { name: "Fries", quantity: 3, price: 100 }
            ],
            total: 1050,
            paymentMethod: "cash",
            change: 450
        },
        {
            id: "5",
            timestamp: Date.now() - 18000000,
            items: [
                { name: "Pizza Slice", quantity: 2, price: 180 }
            ],
            total: 360,
            paymentMethod: "card",
            change: 0
        },
        {
            id: "6",
            timestamp: Date.now() - 21600000,
            items: [
                { name: "Pasta", quantity: 1, price: 220 },
                { name: "Garlic Bread", quantity: 2, price: 90 }
            ],
            total: 400,
            paymentMethod: "cash",
            change: 100
        }
    ];

    if (!showHistory) {
        return (
            <div className="flex h-screen items-center justify-center">
                <button
                    onClick={() => setShowHistory(true)}
                    className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
                >
                    Show Transaction History
                </button>
            </div>
        );
    }
    

    return (
        <div className="h-screen bg-gray-50">
            <TransactionHistory
                transactions={sampleTransactions}
                onClose={() => setShowHistory(false)}
            />
        </div>
        
    );
    
}

