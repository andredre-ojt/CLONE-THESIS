"use client"

import type React from "react"
import { useState } from "react"
import { ShoppingCart, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"

interface LoginFormProps {
    onLogin: (username: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Simple validation
        if (!username || !password) {
            setError("Please enter both username and password")
            return
        }

        // Admin credentials: admin/admin or staff/staff123
        // Parent credentials: parent/parent123
        if (
            (username === "admin" && password === "admin") ||
            (username === "staff" && password === "staff123") ||
            (username === "parent" && password === "parent123")
        ) {
            onLogin(username)
        } else {
            setError("Invalid username or password")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
                        <ShoppingCart className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">EduTap System</CardTitle>
                    <CardDescription>Sign in to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button type="submit" className="w-full" size="lg">
                            Sign In
                        </Button>

                        <div className="mt-6 space-y-2 rounded-md bg-muted p-4 text-xs text-muted-foreground">
                            <p className="font-semibold text-foreground">Demo Credentials:</p>
                            <p>Admin: admin / admin</p>
                            <p>Staff: staff / staff123</p>
                            <p>Parent: parent / parent123</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}