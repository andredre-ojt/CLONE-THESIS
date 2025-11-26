"use client"

import { useState } from "react"
import { Search, Package } from "lucide-react"
import { Badge } from "./badge"
import { Input } from "./input"
import { Button } from "./button"
import { Card } from "./card"
interface Product {
    id: string
    name: string
    price: number
    category: string
    image: string
}

interface ProductGridProps {
    onAddToCart: (product: Product) => void
}

const SAMPLE_PRODUCTS: Product[] = [
    { id: "1", name: "Espresso", price: 3.5, category: "Beverages", image: "☕" },
    { id: "2", name: "Cappuccino", price: 4.5, category: "Beverages", image: "☕" },
    { id: "3", name: "Latte", price: 4.75, category: "Beverages", image: "☕" },
    { id: "4", name: "Croissant", price: 3.25, category: "Bakery", image: "🥐" },
    { id: "5", name: "Blueberry Muffin", price: 3.75, category: "Bakery", image: "🧁" },
    { id: "6", name: "Chocolate Cookie", price: 2.5, category: "Bakery", image: "🍪" },
    { id: "7", name: "Caesar Salad", price: 8.95, category: "Food", image: "🥗" },
    { id: "8", name: "Turkey Sandwich", price: 9.5, category: "Food", image: "🥪" },
    { id: "9", name: "Fruit Bowl", price: 6.75, category: "Food", image: "🍇" },
    { id: "10", name: "Orange Juice", price: 4.25, category: "Beverages", image: "🧃" },
    { id: "11", name: "Iced Tea", price: 3.75, category: "Beverages", image: "🍹" },
    { id: "12", name: "Bagel", price: 2.95, category: "Bakery", image: "🥯" },
]

const CATEGORIES = ["All", "Beverages", "Bakery", "Food"]

export function ProductGrid({ onAddToCart }: ProductGridProps) {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex flex-1 flex-col overflow-hidden p-6">
            <div className="mb-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg active:scale-95"
                            onClick={() => onAddToCart(product)}
                        >
                            <div className="flex flex-col p-4">
                                <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-secondary text-5xl">
                                    {product.image}
                                </div>
                                <Badge variant="secondary" className="mb-2 w-fit text-xs">
                                    {product.category}
                                </Badge>
                                <h3 className="mb-1 font-medium text-card-foreground">{product.name}</h3>
                                <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
                        <Package className="mb-3 h-12 w-12" />
                        <p>No products found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
