"use client"
import { useState } from "react"
import { ProductGrid } from "../components/ui/product-grid"
import { Cart } from "../components/ui/cart"
import { Header } from "../components/ui/header"
import { TransactionHistory } from "../components/ui/transaction-history"

interface User {
    username: string
    role: string
}

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    category: string
    image: string
}

interface Transaction {
    id: string
    timestamp: number
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    paymentMethod: "card" | "cash"
    change: number
}

export default function POSPage() {
    const [showHistory, setShowHistory] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])

    // You can pass the user as a prop or get it from context/session
    const user: User = { username: "staff", role: "staff" } // Placeholder - replace with actual user data

    const handleLogout = () => {
        // Handle logout logic here (redirect, clear session, etc.)
        console.log("Logout")
    }

    const handleAddToCart = (product: Omit<CartItem, "quantity">) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const handleRemoveFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const handleUpdateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveFromCart(id)
            return
        }
        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }

    const handleClearCart = () => {
        setCartItems([])
    }

    const handleAddTransaction = (transaction: Omit<Transaction, "id" | "timestamp">) => {
        setTransactions((prev) => [
            {
                ...transaction,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: Date.now(),
            },
            ...prev,
        ])
    }

    return (
        <div className="flex h-screen flex-col bg-background">
            <Header user={user} onLogout={handleLogout} onShowHistory={() => setShowHistory(!showHistory)} />

            {showHistory ? (
                <TransactionHistory transactions={transactions} onClose={() => setShowHistory(false)} />
            ) : (
                <div className="flex flex-1 overflow-hidden">
                    <ProductGrid onAddToCart={handleAddToCart} />
                    <Cart
                        items={cartItems}
                        onRemoveItem={handleRemoveFromCart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onClearCart={handleClearCart}
                        onAddTransaction={handleAddTransaction}
                    />
                </div>
            )}
        </div>
    )
}