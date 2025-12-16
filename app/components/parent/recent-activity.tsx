import { ShoppingBag, TrendingUp, Filter, Download } from "lucide-react"

interface Activity {
    id: string
    item: string
    date: string
    time: string
    amount: number
    type: "expense" | "income"
    category: string
}

interface RecentActivityProps {
    activities: Activity[]
    onFilterClick: () => void
    onDownloadClick: () => void
}

export function RecentActivity({ activities, onFilterClick, onDownloadClick }: RecentActivityProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onFilterClick}
                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Filter className="h-3 w-3" />
                        Filter
                    </button>
                    <button
                        onClick={onDownloadClick}
                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Download className="h-3 w-3" />
                        Export
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.type === "expense" ? "bg-red-100" : "bg-green-100"}`}>
                            {activity.type === "expense" ? (
                                <ShoppingBag className="h-4 w-4 text-red-600" />
                            ) : (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">{activity.item}</div>
                            <div className="text-xs text-gray-500">{activity.category}</div>
                            <div className="text-xs text-gray-400">{activity.date} • {activity.time}</div>
                        </div>
                        <div className={`text-sm font-bold ${activity.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                            {activity.amount < 0 ? "- " : "+ "}₱{Math.abs(activity.amount).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}