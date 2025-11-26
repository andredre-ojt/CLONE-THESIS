"use client"

import { ShoppingCart, History, Clock, LogOut, UserIcon } from "lucide-react"
import { Button } from "./button";

interface HeaderProps {
    user: { username: string; role: string } | null
    onLogout: () => void
    onShowHistory: () => void
    onShowUserPage?: () => void
}

export function Header({ user, onLogout, onShowHistory, onShowUserPage }: HeaderProps) {
    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <header className="flex items-center justify-between border-b bg-card px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-foreground">Point of Sale</h1>
                    <p className="text-sm text-muted-foreground">Retail System</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user && (
                    <Button
                        variant="ghost"
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-muted ${onShowUserPage ? "cursor-pointer" : "cursor-default hover:bg-transparent"
                            }`}
                        onClick={onShowUserPage}
                    >
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.username}</span>
                        <span className="text-xs text-muted-foreground capitalize">({user.role})</span>
                    </Button>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">{currentTime}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onShowHistory}>
                    <History className="mr-2 h-4 w-4" />
                    History
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    )
}
