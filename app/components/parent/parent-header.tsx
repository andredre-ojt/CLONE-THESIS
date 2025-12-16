import { ShoppingBag, Clock, Share2, LogOut } from "lucide-react"

interface ParentHeaderProps {
    username: string
    currentTime: string
    onShare: () => void
    onLogout: () => void
}

export function ParentHeader({ username, currentTime, onShare, onLogout }: ParentHeaderProps) {
    return (
        <header className="bg-gradient-to-r from-red-950 to-red-900 border-b border-red-900 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-red-900">
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white">EDUTAP</h1>
                        <p className="text-sm text-red-100">St. Clare College of Caloocan</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-sm">
                        <span className="text-white">{username} (Parent)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-100">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                    <button
                        onClick={onShare}
                        className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 rounded-lg bg-white border border-white px-4 py-2 text-sm font-semibold text-red-900 transition hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}

export default function App() {
    const handleShare = () => {
        console.log('Share clicked')
    }

    const handleLogout = () => {
        console.log('Logging out...')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ParentHeader 
                username="Maria Santos"
                currentTime="2:30 PM"
                onShare={handleShare}
                onLogout={handleLogout}
            />
            <div className="p-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-2">Parent Dashboard</h2>
                    <p className="text-gray-600">View your child's transactions and account balance...</p>
                </div>
            </div>
        </div>
    )
}