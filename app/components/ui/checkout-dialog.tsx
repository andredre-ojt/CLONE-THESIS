"use client"

import { useState } from "react"
import { CreditCard, Banknote, CheckCircle2 } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import { Label } from "./label"
import { Input } from "./input"


interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    category: string
    image: string
}

interface CheckoutDialogProps {
    open: boolean
    onClose: () => void
    onComplete: () => void
    total: number
    items: CartItem[]
    onAddTransaction: (transaction: any) => void
}

export function CheckoutDialog({ open, onClose, onComplete, total, items, onAddTransaction }: CheckoutDialogProps) {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
    const [cashReceived, setCashReceived] = useState("")
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)

    const change = paymentMethod === "cash" ? Math.max(0, Number.parseFloat(cashReceived || "0") - total) : 0

    const handleComplete = async () => {
        setProcessing(true)

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Add transaction to history
        onAddTransaction({
            items: items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            total,
            paymentMethod,
            change: paymentMethod === "cash" ? change : 0,
        })

        setSuccess(true)

        // Reset and close after showing success
        setTimeout(() => {
            setProcessing(false)
            setSuccess(false)
            setCashReceived("")
            onComplete()
        }, 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete Payment</DialogTitle>
                    <DialogDescription>Select payment method and complete the transaction</DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                            <CheckCircle2 className="h-8 w-8 text-accent-foreground" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">Payment Successful!</h3>
                        <p className="text-muted-foreground">Transaction completed</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <Label className="mb-3 block text-sm font-medium">Payment Method</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant={paymentMethod === "card" ? "default" : "outline"}
                                    className="h-20 flex-col gap-2"
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <CreditCard className="h-6 w-6" />
                                    <span>Card</span>
                                </Button>
                                <Button
                                    variant={paymentMethod === "cash" ? "default" : "outline"}
                                    className="h-20 flex-col gap-2"
                                    onClick={() => setPaymentMethod("cash")}
                                >
                                    <Banknote className="h-6 w-6" />
                                    <span>Cash</span>
                                </Button>
                            </div>
                        </div>

                        {paymentMethod === "cash" && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="cash-received">Cash Received</Label>
                                    <Input
                                        id="cash-received"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={cashReceived}
                                        onChange={(e) => setCashReceived(e.target.value)}
                                        className="mt-1.5"
                                    />
                                </div>
                                {cashReceived && Number.parseFloat(cashReceived) >= total && (
                                    <div className="rounded-lg bg-secondary p-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Change Due</span>
                                            <span className="text-lg font-semibold text-accent">${change.toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="rounded-lg border bg-muted/30 p-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-medium">Total Amount</span>
                                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleComplete}
                            disabled={processing || (paymentMethod === "cash" && Number.parseFloat(cashReceived || "0") < total)}
                        >
                            {processing ? "Processing..." : "Complete Payment"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
