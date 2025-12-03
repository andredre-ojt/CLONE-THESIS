"use client"

import type React from "react"
import { useState } from "react"
import { ShoppingCart, AlertCircle } from "lucide-react"

interface LoginFormProps {
    onLogin: (username: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Simple validation
        if (!username || !password) {
            setError("Please enter both username and password")
            setIsLoading(false)
            return
        }

        // Admin credentials: admin/admin or staff/staff123
        // Parent credentials: parent/parent123
        if (
            (username === "admin" && password === "admin") ||
            (username === "staff" && password === "staff") ||
            (username === "parent" && password === "parent")
        ) {
            // Store credentials in localStorage
            const role = username === "admin" ? "admin" : username === "staff" ? "staff" : "parent"
            localStorage.setItem("username", username)
            localStorage.setItem("role", role)

            // Call the onLogin callback
            onLogin(username)

            // Redirect based on role
            setTimeout(() => {
                if (username === "admin") {
                    window.location.href = "/admin-panel"
                } else if (username === "staff") {
                    window.location.href = "/pos"
                } else if (username === "parent") {
                    window.location.href = "/parent-dashboard"
                }
            }, 500)
        } else {
            setError("Invalid username or password")
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="space-y-3 p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                        <ShoppingCart className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">EduTap System</h2>
                    <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                                autoComplete="username"
                                autoFocus
                                disabled={isLoading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                                autoComplete="current-password"
                                disabled={isLoading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                        <div className="mt-6 space-y-2 rounded-md bg-gray-50 p-4 text-xs text-gray-600">
                            <p className="font-semibold text-gray-900">Demo Credentials:</p>
                            <p>Admin: admin / admin</p>
                            <p>Staff: staff / staff</p>
                            <p>Parent: parent / parent</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}