import { useState } from 'react'

interface Transaction {
    orderId: string
    staff: string
    items: string
    total: string
    status: 'Completed' | 'Pending' | 'Voided'
}

type FilterType = 'All' | 'Completed' | 'Pending' | 'Voided'

interface TransactionsTableProps {
    transactions: Transaction[]
    searchQuery: string
    onSearchChange: (query: string) => void
    activeFilter: FilterType
    onFilterChange: (filter: FilterType) => void
}

export function TransactionsTable({
    transactions,
    searchQuery,
    onSearchChange,
    activeFilter,
    onFilterChange
}: TransactionsTableProps) {
    const getStatusColor = (status: 'Completed' | 'Pending' | 'Voided') => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800'
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'Voided':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
            </div>

            <div className="p-6">
                {/* Search and Filters */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="flex gap-2">
                        {(['All', 'Completed', 'Pending', 'Voided'] as FilterType[]).map(filter => (
                            <button
                                key={filter}
                                onClick={() => onFilterChange(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === filter
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    Order ID ↓
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    Staff
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    Items
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    Total
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm">{transaction.orderId}</td>
                                    <td className="py-3 px-4 text-sm">{transaction.staff}</td>
                                    <td className="py-3 px-4 text-sm">{transaction.items}</td>
                                    <td className="py-3 px-4 text-sm font-medium">{transaction.total}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<FilterType>('All')

    const transactions: Transaction[] = [
        { orderId: '202251101', staff: 'admin (Staff)', items: '2 Fruit Juice', total: '₱12,500.00', status: 'Completed' },
        { orderId: '202251210', staff: 'admin (Staff)', items: 'Coffee, Caesar Salad', total: '₱330.00', status: 'Pending' },
        { orderId: '202251205', staff: 'admin (Staff)', items: 'Veggie Wrap, Coffee', total: '₱350.00', status: 'Voided' },
    ]

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.items.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = activeFilter === 'All' || t.status === activeFilter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <TransactionsTable 
                transactions={filteredTransactions}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
        </div>
    )
}