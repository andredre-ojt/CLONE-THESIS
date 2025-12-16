interface StatsCardsProps {
    totalSales: string
    totalOrders: number
    lowStockAlerts: number
}

export function StatsCards({ totalSales, totalOrders, lowStockAlerts }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg--400 rounded-lg p-6 border border-gray-700">
                <p className="text-sm text-gray-600 mb-2">Total Sales Today</p>
                <p className="text-3xl font-bold">{totalSales}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-700">
                <p className="text-sm text-gray-600 mb-2">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-700">
                <p className="text-sm text-gray-600 mb-2">Low Stock Alerts</p>
                <p className="text-3xl font-bold">{lowStockAlerts} items</p>
            </div>
        </div>
    )
}