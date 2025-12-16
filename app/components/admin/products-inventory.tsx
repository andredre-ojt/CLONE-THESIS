import { Plus } from 'lucide-react'
import { useState } from 'react'

interface Product {
    id: string
    name: string
    category: string
    price: string
    stock: number
    status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

interface ProductsInventoryProps {
    products: Product[]
    onAddProduct: (product: Omit<Product, 'id' | 'status'>) => void
}

export function ProductsInventory({ products, onAddProduct }: ProductsInventoryProps) {
    const [showAddProductForm, setShowAddProductForm] = useState(false)
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' })

    const handleSaveProduct = () => {
        if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
            onAddProduct({
                name: newProduct.name,
                category: newProduct.category,
                price: newProduct.price,
                stock: parseInt(newProduct.stock)
            })
            setShowAddProductForm(false)
            setNewProduct({ name: '', category: '', price: '', stock: '' })
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Products Inventory</h2>
                <button
                    onClick={() => setShowAddProductForm(true)}
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
                                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                                    product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
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
    )
}