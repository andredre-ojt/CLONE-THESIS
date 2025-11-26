"use client"

import { LoginForm } from "@/components/ui/login-form"

export default function LoginPage() {
    const handleLogin = (username: string) => {
        // Store username and role in localStorage
        const role = username === "admin" ? "admin" : username === "staff" ? "staff" : "parent"
        localStorage.setItem("username", username)
        localStorage.setItem("role", role)

        // Redirect based on user role
        if (username === "admin" || username === "staff") {
            window.location.href = "/pos" // Redirect to POS system
        } else if (username === "parent") {
            window.location.href = "/parent-dashboard" // Redirect to parent dashboard
        }
    }

    return (
        <div>
            <LoginForm onLogin={handleLogin} />
        </div>
    )
}