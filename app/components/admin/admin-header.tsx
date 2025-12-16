import { Users, Clock, LogOut } from 'lucide-react'

interface AdminHeaderProps {
    username: string
    role: string
    currentTime: string
    onLogout: () => void
}

export function AdminHeader({ username, role, currentTime, onLogout }: AdminHeaderProps) {
    return (
        <header className="bg-gradient-to-r from-red-950 to-red-900 border-b border-red-900 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white text-red-900 p-2 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white">EDUTAP</h1>
                        <p className="text-sm text-red-100">St. Clare College of Caloocan</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-white">
                        <Users className="w-4 h-4" />
                        <span>{username} ({role === 'admin' ? 'Administrator' : role})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-100">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 rounded-lg bg-white border border-white px-4 py-2 text-sm font-semibold text-red-900 transition hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}