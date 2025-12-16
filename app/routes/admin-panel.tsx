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
        { orderId: '202251101', staff: 'admin (Staff)', items: '2 Fruit Juice', total: '₱12,500.00', status: 'Completed' },
        { orderId: '202251209', staff: 'admin (Administrator)', items: '2 Chicken Sanwin', total: '₱250.00', status: 'Completed' },
        { orderId: '202251207', staff: 'admin (Parent)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
        { orderId: '202251206', staff: 'admin (Administrator)', items: 'Veggie Wrap', total: '₱200.00', status: 'Completed' },
        { orderId: '202251203', staff: 'admin (Parent)', items: 'Library Fine', total: '₱200.00', status: 'Completed' },
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