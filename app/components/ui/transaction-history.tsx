"use client"

import { ArrowLeft, Calendar, CreditCard, Banknote } from "lucide-react"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Card } from "./card"
import { Badge } from "./badge"

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
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b bg-card p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold">Transaction History</h2>
                        <p className="text-sm text-muted-foreground">{transactions.length} total transactions</p>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1 p-6">
                {transactions.length === 0 ? (
                    <div className="flex h-96 flex-col items-center justify-center text-muted-foreground">
                        <Calendar className="mb-3 h-12 w-12" />
                        <p className="font-medium">No transactions yet</p>
                        <p className="text-sm">Completed orders will appear here</p>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl space-y-4">
                        {transactions.map((transaction) => (
                            <Card key={transaction.id} className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{new Date(transaction.timestamp).toLocaleString()}</p>
                                        <p className="mt-1 text-2xl font-bold text-primary">${transaction.total.toFixed(2)}</p>
                                    </div>
                                    <Badge variant="secondary" className="gap-1.5">
                                        {transaction.paymentMethod === "card" ? (
                                            <CreditCard className="h-3 w-3" />
                                        ) : (
                                            <Banknote className="h-3 w-3" />
                                        )}
                                        {transaction.paymentMethod === "card" ? "Card" : "Cash"}
                                    </Badge>
                                </div>

                                <div className="space-y-2 border-t pt-4">
                                    {transaction.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {transaction.change > 0 && (
                                    <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                                        <span className="text-muted-foreground">Change Given</span>
                                        <span className="font-medium text-accent">${transaction.change.toFixed(2)}</span>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
