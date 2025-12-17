"use client"

import React, { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { StatsCards } from '@/components/admin/stats-cards'
import { TransactionsTable } from '@/components/admin/transactions-table'
import { ProductsInventory } from '@/components/admin/products-inventory'
import { QuickActions } from '@/components/admin/quick-actions'
import { SystemStatus } from '@/components/admin/system-status'
import { ActivityModal } from '@/components/admin/activity-modal'
import { StaffPage, ReportsPage, SettingsPage } from '@/components/admin/placeholder-pages'

interface Transaction {
    orderId: string
    staff: string
    items: string
    total: string
    status: 'Completed' | 'Pending' | 'Voided'
}

interface Product {
    id: string
    name: string
    category: string
    price: string
    stock: number
    status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

type FilterType = 'All' | 'Completed' | 'Pending' | 'Voided'
type PageType = 'dashboard' | 'products' | 'staff' | 'reports' | 'settings'

export default function AdminPanel() {
    const [currentPage, setCurrentPage] = useState<PageType>('dashboard')
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<FilterType>('All')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ title: '', message: '' })
    const [products, setProducts] = useState<Product[]>([
        { id: 'P001', name: 'Fruit Juice', category: 'Beverages', price: '₱6,250.00', stock: 25, status: 'In Stock' },
        { id: 'P002', name: 'Chicken Sandwich', category: 'Food', price: '₱125.00', stock: 15, status: 'In Stock' },
        { id: 'P003', name: 'Veggie Wrap', category: 'Food', price: '₱200.00', stock: 8, status: 'Low Stock' },
        { id: 'P004', name: 'Coffee', category: 'Beverages', price: '₱150.00', stock: 30, status: 'In Stock' },
        { id: 'P005', name: 'Caesar Salad', category: 'Food', price: '₱180.00', stock: 0, status: 'Out of Stock' },
    ])

    const transactions: Transaction[] = [
    { orderId: '202251219', staff: 'Sarah Wong (Staff)', items: 'Caesar Salad, Veggie Wrap', total: '₱380.00', status: 'Pending' },
    { orderId: '202251205', staff: 'admin (Staff)', items: 'Veggie Wrap, Coffee', total: '₱350.00', status: 'Voided' },
    { orderId: '202251222', staff: 'Ana Cruz (Parent)', items: 'Caesar Salad, Coffee', total: '₱330.00', status: 'Completed' },
    { orderId: '202251209', staff: 'admin (Administrator)', items: '2 Chicken Sandwich', total: '₱250.00', status: 'Completed' },
    { orderId: '202251214', staff: 'John Reyes (Administrator)', items: '2 Caesar Salad', total: '₱360.00', status: 'Pending' },
    { orderId: '202251230', staff: 'Pedro Garcia (Staff)', items: '2 Veggie Wrap', total: '₱400.00', status: 'Voided' },
    { orderId: '202251207', staff: 'admin (Parent)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
    { orderId: '202251228', staff: 'John Reyes (Administrator)', items: 'Coffee, Chicken Sandwich', total: '₱275.00', status: 'Voided' },
    { orderId: '202251211', staff: 'admin (Parent)', items: 'Chicken Sandwich', total: '₱125.00', status: 'Pending' },
    { orderId: '202251225', staff: 'Mark Lim (Administrator)', items: '4 Coffee', total: '₱600.00', status: 'Completed' },
    { orderId: '202251216', staff: 'Pedro Garcia (Staff)', items: '5 Coffee', total: '₱750.00', status: 'Pending' },
    { orderId: '202251202', staff: 'admin (Administrator)', items: 'Chicken Sandwich', total: '₱125.00', status: 'Voided' },
    { orderId: '202251224', staff: 'Lisa Tan (Parent)', items: 'Veggie Wrap, Caesar Salad', total: '₱380.00', status: 'Completed' },
    { orderId: '202251101', staff: 'admin (Staff)', items: '2 Fruit Juice', total: '₱12,500.00', status: 'Completed' },
    { orderId: '202251232', staff: 'Mark Lim (Administrator)', items: '4 Chicken Sandwich', total: '₱500.00', status: 'Voided' },
    { orderId: '202251212', staff: 'admin (Administrator)', items: '3 Fruit Juice', total: '₱18,750.00', status: 'Pending' },
    { orderId: '202251221', staff: 'John Reyes (Administrator)', items: '3 Veggie Wrap', total: '₱600.00', status: 'Completed' },
    { orderId: '202251217', staff: 'Lisa Tan (Parent)', items: 'Veggie Wrap', total: '₱200.00', status: 'Pending' },
    { orderId: '202251206', staff: 'admin (Administrator)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
    { orderId: '202251233', staff: 'Sarah Wong (Staff)', items: 'Caesar Salad, Coffee, Fruit Juice', total: '₱415.00', status: 'Voided' },
    { orderId: '202251215', staff: 'Ana Cruz (Parent)', items: 'Fruit Juice, Chicken Sandwich', total: '₱210.00', status: 'Pending' },
    { orderId: '202251227', staff: 'Maria Santos (Staff)', items: '3 Fruit Juice', total: '₱255.00', status: 'Voided' },
    { orderId: '202251210', staff: 'admin (Staff)', items: 'Coffee, Caesar Salad', total: '₱330.00', status: 'Pending' },
    { orderId: '202251220', staff: 'Maria Santos (Staff)', items: 'Coffee, Fruit Juice', total: '₱235.00', status: 'Completed' },
    { orderId: '202251204', staff: 'admin (Parent)', items: '2 Caesar Salad', total: '₱360.00', status: 'Voided' },
    { orderId: '202251223', staff: 'Pedro Garcia (Staff)', items: '2 Chicken Sandwich, Fruit Juice', total: '₱335.00', status: 'Completed' },
    { orderId: '202251229', staff: 'Ana Cruz (Parent)', items: 'Veggie Wrap, Caesar Salad, Coffee', total: '₱530.00', status: 'Voided' },
    { orderId: '202251218', staff: 'Mark Lim (Administrator)', items: '2 Chicken Sandwich, 2 Fruit Juice', total: '₱420.00', status: 'Pending' },
    { orderId: '202251203', staff: 'admin (Parent)', items: 'Library Fine', total: '₱200.00', status: 'Completed' },
    { orderId: '202251231', staff: 'Lisa Tan (Parent)', items: 'Fruit Juice', total: '₱85.00', status: 'Voided' },
    { orderId: '202251226', staff: 'Sarah Wong (Staff)', items: 'Chicken Sandwich', total: '₱125.00', status: 'Completed' },
    { orderId: '202251213', staff: 'Maria Santos (Staff)', items: 'Veggie Wrap, Coffee', total: '₱350.00', status: 'Pending' },
]

    // Check authentication and get user data
    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        const storedRole = localStorage.getItem('role')

        // Redirect if not logged in or not admin
        if (!storedUsername || storedRole !== 'admin') {
            window.location.href = '/'
            return
        }

        setUsername(storedUsername)
        setRole(storedRole)

        // Update time every minute
        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const ampm = hours >= 12 ? 'PM' : 'AM'
            const displayHours = hours % 12 || 12
            const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
            setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 60000)

        return () => clearInterval(interval)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        window.location.href = '/'
    }

    const openModal = (title: string, message: string) => {
        setModalContent({ title, message })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleAddProduct = (newProductData: Omit<Product, 'id' | 'status'>) => {
        const stockNum = newProductData.stock
        let status: 'In Stock' | 'Low Stock' | 'Out of Stock'

        if (stockNum === 0) status = 'Out of Stock'
        else if (stockNum < 10) status = 'Low Stock'
        else status = 'In Stock'

        const product: Product = {
            id: `P${String(products.length + 1).padStart(3, '0')}`,
            name: newProductData.name,
            category: newProductData.category,
            price: `₱${parseFloat(newProductData.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            stock: stockNum,
            status
        }

        setProducts([...products, product])
    }

    const handleViewAllActivity = () => {
        openModal('All Activity', 'This would show a comprehensive log of all system activity, including staff logins, transactions, and system changes.')
    }

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.items.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = activeFilter === 'All' || t.status === activeFilter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <AdminHeader 
                username={username}
                role={role}
                currentTime={currentTime}
                onLogout={handleLogout}
            />

            <div className="flex">
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {currentPage === 'dashboard' && (
                        <>
                            <StatsCards 
                                totalSales="₱12,500.00"
                                totalOrders={45}
                                lowStockAlerts={3}
                            />
                            <TransactionsTable 
                                transactions={filteredTransactions}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                            />
                        </>
                    )}
                    {currentPage === 'products' && (
                        <ProductsInventory 
                            products={products}
                            onAddProduct={handleAddProduct}
                        />
                    )}
                    {currentPage === 'staff' && <StaffPage />}
                    {currentPage === 'reports' && <ReportsPage />}
                    {currentPage === 'settings' && <SettingsPage />}
                </main>

                {/* Sidebar */}
                <aside className="w-80 bg-white border-l border-gray-200 p-6">
                    <QuickActions 
                        currentPage={currentPage}
                        onNavigate={setCurrentPage}
                    />
                    <SystemStatus 
                        activeStaff={5}
                        openRegisters={2}
                        onViewAllActivity={handleViewAllActivity}
                    />
                </aside>
            </div>

            {/* Modal */}
            <ActivityModal 
                isOpen={showModal}
                title={modalContent.title}
                message={modalContent.message}
                onClose={closeModal}
            />
        </div>
    )
}