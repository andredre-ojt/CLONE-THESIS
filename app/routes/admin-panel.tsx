"use client"

import React, { useState, useEffect } from 'react';
import { Users, FileText, Settings, Plus, TrendingDown, Clock, LogOut, History, Home } from 'lucide-react';

interface Transaction {
    orderId: string;
    staff: string;
    items: string;
    total: string;
    status: 'Completed' | 'Pending' | 'Voided';
}

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

type FilterType = 'All' | 'Completed' | 'Pending' | 'Voided';
type PageType = 'dashboard' | 'products' | 'staff' | 'reports' | 'settings';

const AdminPanel: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [showProductsModal, setShowProductsModal] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' });
    const [products, setProducts] = useState<Product[]>([
        { id: 'P001', name: 'Fruit Juice', category: 'Beverages', price: '₱6,250.00', stock: 25, status: 'In Stock' },
        { id: 'P002', name: 'Chicken Sandwich', category: 'Food', price: '₱125.00', stock: 15, status: 'In Stock' },
        { id: 'P003', name: 'Veggie Wrap', category: 'Food', price: '₱200.00', stock: 8, status: 'Low Stock' },
        { id: 'P004', name: 'Coffee', category: 'Beverages', price: '₱150.00', stock: 30, status: 'In Stock' },
        { id: 'P005', name: 'Caesar Salad', category: 'Food', price: '₱180.00', stock: 0, status: 'Out of Stock' },
    ]);

    // Check authentication and get user data
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        // Redirect if not logged in or not admin
        if (!storedUsername || storedRole !== 'admin') {
            window.location.href = '/';
            return;
        }

        setUsername(storedUsername);
        setRole(storedRole);

        // Update time every minute
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
            setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    const openModal = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleNavigate = (page: PageType) => {
        setCurrentPage(page);
    };

    const handleAddProduct = () => {
        setShowProductsModal(true);
    };

    const handleOpenAddProductForm = () => {
        setShowAddProductForm(true);
    };

    const handleCloseProductsModal = () => {
        setShowProductsModal(false);
        setShowAddProductForm(false);
        setNewProduct({ name: '', category: '', price: '', stock: '' });
    };

    const handleSaveProduct = () => {
        if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
            const stockNum = parseInt(newProduct.stock);
            let status: 'In Stock' | 'Low Stock' | 'Out of Stock';

            if (stockNum === 0) status = 'Out of Stock';
            else if (stockNum < 10) status = 'Low Stock';
            else status = 'In Stock';

            const product: Product = {
                id: `P${String(products.length + 1).padStart(3, '0')}`,
                name: newProduct.name,
                category: newProduct.category,
                price: `₱${parseFloat(newProduct.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
                stock: stockNum,
                status
            };

            setProducts([...products, product]);
            setShowAddProductForm(false);
            setNewProduct({ name: '', category: '', price: '', stock: '' });
        }
    };

    const handleManageStaff = () => {
        setCurrentPage('staff');
    };

    const handleViewReports = () => {
        setCurrentPage('reports');
    };

    const handleSystemSettings = () => {
        setCurrentPage('settings');
    };

    const handleViewAllActivity = () => {
        openModal('All Activity', 'This would show a comprehensive log of all system activity, including staff logins, transactions, and system changes.');
    };

    const transactions: Transaction[] = [
        { orderId: '202251101', staff: 'admin (Staff)', items: '2 Fruit Juice', total: '₱12,500.00', status: 'Completed' },
        { orderId: '202251209', staff: 'admin (Administrator)', items: '2 Chicken Sanwin', total: '₱250.00', status: 'Completed' },
        { orderId: '202251207', staff: 'admin (Parent)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
        { orderId: '202251206', staff: 'admin (Administrator)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
        { orderId: '202251203', staff: 'admin (Parent)', items: 'Library Fine', total: '₱200.00', status: 'Completed' },
    ];

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.items.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || t.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    // Dashboard Content
    const renderDashboard = () => (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Total Sales Today</p>
                    <p className="text-3xl font-bold">₱12,500.00</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Total Orders</p>
                    <p className="text-3xl font-bold">45</p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Low Stock Alerts</p>
                    <p className="text-3xl font-bold">3 items</p>
                </div>
            </div>

            {/* Recent Transactions */}
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
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="flex gap-2">
                            {(['All', 'Completed', 'Pending', 'Voided'] as FilterType[]).map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
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
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm">{transaction.orderId}</td>
                                        <td className="py-3 px-4 text-sm">{transaction.staff}</td>
                                        <td className="py-3 px-4 text-sm">{transaction.items}</td>
                                        <td className="py-3 px-4 text-sm font-medium">{transaction.total}</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
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
        </>
    );

    // Products Page Content
    const renderProductsPage = () => (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Products Inventory</h2>
                <button
                    onClick={handleOpenAddProductForm}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            <div className="p-6">
                {!showAddProductForm ? (
                    <>
                        <p className="text-gray-600 mb-6">Total Products: {products.length}</p>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Stock</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">{product.id}</td>
                                            <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                                            <td className="py-3 px-4 text-sm">{product.category}</td>
                                            <td className="py-3 px-4 text-sm">{product.price}</td>
                                            <td className="py-3 px-4 text-sm">{product.stock}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                onClick={() => setShowAddProductForm(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ← Back
                            </button>
                            <h4 className="text-lg font-semibold">Add New Product</h4>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="e.g., Food, Beverages"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="0"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowAddProductForm(false)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProduct}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Save Product
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Staff Page Content
    const renderStaffPage = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-4">Staff Management</h2>
            <p className="text-gray-600 mb-6">Manage your staff members, roles, and permissions.</p>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">Staff management features will be implemented here.</p>
            </div>
        </div>
    );

    // Reports Page Content
    const renderReportsPage = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-4">Sales Reports</h2>
            <p className="text-gray-600 mb-6">View detailed reports, analytics, and insights.</p>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">Reports and analytics features will be implemented here.</p>
            </div>
        </div>
    );

    // Settings Page Content
    const renderSettingsPage = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
            <p className="text-gray-600 mb-6">Configure your POS system settings and preferences.</p>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Settings className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">System settings features will be implemented here.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">Point of Sale</h1>
                            <p className="text-sm text-gray-500">Retail System</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{username} ({role === 'admin' ? 'Administrator' : role})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{currentTime}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-400"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {currentPage === 'dashboard' && renderDashboard()}
                    {currentPage === 'products' && renderProductsPage()}
                    {currentPage === 'staff' && renderStaffPage()}
                    {currentPage === 'reports' && renderReportsPage()}
                    {currentPage === 'settings' && renderSettingsPage()}
                </main>

                {/* Sidebar */}
                <aside className="w-80 bg-white border-l border-gray-200 p-6">
                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleNavigate('dashboard')}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentPage === 'dashboard'
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Home className="w-6 h-6 mb-2" />
                                <span className="text-sm">Dashboard</span>
                            </button>

                            <button
                                onClick={() => handleNavigate('products')}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentPage === 'products'
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Plus className="w-6 h-6 mb-2" />
                                <span className="text-sm">Products</span>
                            </button>

                            <button
                                onClick={handleManageStaff}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentPage === 'staff'
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Users className="w-6 h-6 mb-2" />
                                <span className="text-sm">Staff</span>
                            </button>

                            <button
                                onClick={handleViewReports}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentPage === 'reports'
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <FileText className="w-6 h-6 mb-2" />
                                <span className="text-sm">Reports</span>
                            </button>

                            <button
                                onClick={handleSystemSettings}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${currentPage === 'settings'
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Settings className="w-6 h-6 mb-2" />
                                <span className="text-sm">Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm">Active Staff</span>
                                </div>
                                <span className="text-sm font-semibold">5</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm">Open Registers</span>
                                </div>
                                <span className="text-sm font-semibold">2</span>
                            </div>
                        </div>

                        <button
                            onClick={handleViewAllActivity}
                            className="w-full mt-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            View All Activity
                        </button>
                    </div>
                </aside>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-3">{modalContent.title}</h3>
                        <p className="text-gray-600 mb-6">{modalContent.message}</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;