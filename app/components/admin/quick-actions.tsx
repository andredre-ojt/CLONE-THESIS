import { Home, Plus, Users, FileText, Settings } from 'lucide-react'

type PageType = 'dashboard' | 'products' | 'staff' | 'reports' | 'settings'

interface QuickActionsProps {
    currentPage: PageType
    onNavigate: (page: PageType) => void
}

export function QuickActions({ currentPage, onNavigate }: QuickActionsProps) {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                        currentPage === 'dashboard'
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <Home className="w-6 h-6 mb-2" />
                    <span className="text-sm">Dashboard</span>
                </button>

                <button
                    onClick={() => onNavigate('products')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                        currentPage === 'products'
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="text-sm">Products</span>
                </button>

                <button
                    onClick={() => onNavigate('staff')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                        currentPage === 'staff'
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <Users className="w-6 h-6 mb-2" />
                    <span className="text-sm">Staff</span>
                </button>

                <button
                    onClick={() => onNavigate('reports')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                        currentPage === 'reports'
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Reports</span>
                </button>

                <button
                    onClick={() => onNavigate('settings')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                        currentPage === 'settings'
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    <Settings className="w-6 h-6 mb-2" />
                    <span className="text-sm">Settings</span>
                </button>
            </div>
        </div>
    )
}