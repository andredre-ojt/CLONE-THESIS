import { Users, TrendingDown } from 'lucide-react'

interface SystemStatusProps {
    activeStaff: number
    openRegisters: number
    onViewAllActivity: () => void
}

export function SystemStatus({ activeStaff, openRegisters, onViewAllActivity }: SystemStatusProps) {
    return (
        <div>
            <h3 className="text-sm font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Active Staff</span>
                    </div>
                    <span className="text-sm font-semibold">{activeStaff}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Open Registers</span>
                    </div>
                    <span className="text-sm font-semibold">{openRegisters}</span>
                </div>
            </div>

            <button
                onClick={onViewAllActivity}
                className="w-full mt-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
                View All Activity
            </button>
        </div>
    )
}