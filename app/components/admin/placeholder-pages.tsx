import { Users, FileText, Settings, Bell, Shield, Database, Phone, X, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package } from 'lucide-react'
import { useState } from 'react'

interface StaffMember {
    id: number
    name: string
    role: string
    email: string
    phone: string
    status: 'Active' | 'On Leave'
    joined: string
}

export function StaffPage() {
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
        { id: 1, name: 'Maria Santos', role: 'Store Manager', email: 'maria@store.com', phone: '+63 912 345 6789', status: 'Active', joined: 'Jan 15, 2024' },
        { id: 2, name: 'Juan Dela Cruz', role: 'Cashier', email: 'juan@store.com', phone: '+63 923 456 7890', status: 'Active', joined: 'Feb 20, 2024' },
        { id: 3, name: 'Ana Reyes', role: 'Inventory Manager', email: 'ana@store.com', phone: '+63 934 567 8901', status: 'Active', joined: 'Mar 10, 2024' },
        { id: 4, name: 'Pedro Garcia', role: 'Cashier', email: 'pedro@store.com', phone: '+63 945 678 9012', status: 'On Leave', joined: 'Apr 5, 2024' },
        { id: 5, name: 'Lisa Mendoza', role: 'Sales Associate', email: 'lisa@store.com', phone: '+63 956 789 0123', status: 'Active', joined: 'May 12, 2024' }
    ])

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        role: 'Cashier',
        email: '',
        phone: '',
        status: 'Active' as 'Active' | 'On Leave'
    })

    const handleAddStaff = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all fields')
            return
        }

        const newStaff: StaffMember = {
            id: staffMembers.length + 1,
            name: formData.name,
            role: formData.role,
            email: formData.email,
            phone: formData.phone,
            status: formData.status,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }

        setStaffMembers([...staffMembers, newStaff])
        setShowModal(false)
        setFormData({
            name: '',
            role: 'Cashier',
            email: '',
            phone: '',
            status: 'Active'
        })
    }

    const handleDeleteStaff = (id: number) => {
        if (confirm('Are you sure you want to remove this staff member?')) {
            setStaffMembers(staffMembers.filter(staff => staff.id !== id))
        }
    }

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Staff Management</h2>
                        <p className="text-gray-600">Manage your staff members, roles, and permissions.</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        + Add Staff
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffMembers.map((staff) => (
                                <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{staff.name}</p>
                                                <p className="text-sm text-gray-500">{staff.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {staff.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            {staff.phone}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            staff.status === 'Active' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{staff.joined}</td>
                                    <td className="py-4 px-4">
                                        <button 
                                            onClick={() => handleDeleteStaff(staff.id)}
                                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Staff Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Add New Staff Member</h2>
                            <p className="text-sm text-gray-500">Fill in the details below</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="Cashier">Cashier</option>
                                    <option value="Store Manager">Store Manager</option>
                                    <option value="Inventory Manager">Inventory Manager</option>
                                    <option value="Sales Associate">Sales Associate</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+63 XXX XXX XXXX"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'On Leave' })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStaff}
                                className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                            >
                                Add Staff
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export function ReportsPage() {
    const salesData = [
        { period: 'Today', sales: '₱45,230', orders: 127, growth: '+12%', trend: 'up' },
        { period: 'This Week', sales: '₱284,560', orders: 892, growth: '+8%', trend: 'up' },
        { period: 'This Month', sales: '₱1,245,890', orders: 3421, growth: '-3%', trend: 'down' },
        { period: 'This Year', sales: '₱8,456,320', orders: 24567, growth: '+15%', trend: 'up' }
    ]

    const topProducts = [
        { name: 'Coca Cola 1.5L', sold: 234, revenue: '₱28,080' },
        { name: 'Instant Noodles Pack', sold: 198, revenue: '₱19,800' },
        { name: 'Bread Loaf', sold: 156, revenue: '₱7,800' },
        { name: 'Bottled Water 500ml', sold: 145, revenue: '₱2,900' },
        { name: 'Coffee 3-in-1 Box', sold: 132, revenue: '₱13,200' }
    ]

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold mb-2">Sales Reports</h2>
                <p className="text-gray-600">View detailed reports, analytics, and insights.</p>
            </div>

            {/* Sales Overview */}
            <div className="grid grid-cols-4 gap-6">
                {salesData.map((data, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-gray-600">{data.period}</p>
                            <div className={`flex items-center gap-1 text-sm font-medium ${
                                data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {data.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {data.growth}
                            </div>
                        </div>
                        <p className="text-2xl font-bold mb-1">{data.sales}</p>
                        <p className="text-sm text-gray-500">{data.orders} orders</p>
                    </div>
                ))}
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Top Selling Products</h3>
                        <p className="text-sm text-gray-500">Best performing items this month</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700">
                                    #{index + 1}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.sold} units sold</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{product.revenue}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">Average Order Value</p>
                    </div>
                    <p className="text-3xl font-bold">₱364</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Total Transactions</p>
                    </div>
                    <p className="text-3xl font-bold">3,421</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-sm text-gray-600">Items Sold</p>
                    </div>
                    <p className="text-3xl font-bold">8,945</p>
                </div>
            </div>
        </div>
    )
}

export function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(true)
    const [lowStockAlerts, setLowStockAlerts] = useState(true)
    const [storeName, setStoreName] = useState('Point of Sale')
    const [storeAddress, setStoreAddress] = useState('123 Main Street, City')
    const [taxRate, setTaxRate] = useState('12')
    const [currency, setCurrency] = useState('PHP')

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold mb-2">System Settings</h2>
                <p className="text-gray-600">Configure your POS system settings and preferences.</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">General Settings</h3>
                        <p className="text-sm text-gray-500">Basic store information and preferences</p>
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                        <input
                            type="text"
                            value={storeAddress}
                            onChange={(e) => setStoreAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                            <input
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="PHP">PHP (₱)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <Bell className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <p className="text-sm text-gray-500">Manage notification preferences</p>
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive push notifications on desktop</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={pushNotifications}
                                onChange={(e) => setPushNotifications(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Low Stock Alerts</p>
                            <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={lowStockAlerts}
                                onChange={(e) => setLowStockAlerts(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Security</h3>
                        <p className="text-sm text-gray-500">Manage security and access controls</p>
                    </div>
                </div>

                <div className="space-y-3 mt-6">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-medium text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-500">Update your account password</p>
                    </button>

                    <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </button>

                    <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-medium text-gray-900">Active Sessions</p>
                        <p className="text-sm text-gray-500">Manage your active login sessions</p>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                        <Database className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">System Information</h3>
                        <p className="text-sm text-gray-500">View system details and status</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Version</p>
                        <p className="font-semibold text-gray-900">v2.4.1</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Database Status</p>
                        <p className="font-semibold text-green-600">Online</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Last Backup</p>
                        <p className="font-semibold text-gray-900">2 hours ago</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Storage Used</p>
                        <p className="font-semibold text-gray-900">2.4 GB / 10 GB</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Cancel
                </button>
                <button className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    )
}