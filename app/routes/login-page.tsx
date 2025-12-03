"use client"

import { LoginForm } from "@/components/ui/login-form"

// Add a loader function (required by React Router)
export async function loader() {
    return null // No data needed for login page
}

export default function LoginPage() {
    const handleLogin = (username: string) => {

        const role = username === "admin" ? "admin" : username === "staff" ? "staff" : "parent"
        localStorage.setItem("username", username)
        localStorage.setItem("role", role)

        if (username === "admin") {
            window.location.href = "/admin-panel"
        } else if (username === "staff") {
            window.location.href = "/pos"
        } else if (username === "parent") {
            window.location.href = "/parent-dashboard"
        }
    }

    return (
        <div>
            <LoginForm onLogin={handleLogin} />
        </div>
    )
}