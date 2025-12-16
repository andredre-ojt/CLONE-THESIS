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

const SAMPLE_PRODUCTS: Product[] = 
[
    
  { id: "1", name: "Rice Meal w/ Fried Egg", price: 65.0, category: "Lunch/Heavy", image: "🍚" },
  { id: "2", name: "Adobo (Pork/Chicken)", price: 85.0, category: "Lunch/Heavy", image: "🍗" },
  { id: "3", name: "Pancit Canton", price: 70.0, category: "Noodles", image: "🍜" },
  { id: "4", name: "Hotdog Sandwich", price: 35.0, category: "Snacks", image: "🌭" },
  { id: "5", name: "Cheese Bread Roll", price: 20.0, category: "Bakery", image: "🍞" },
  { id: "6", name: "Banana Cue (2 sticks)", price: 25.0, category: "Dessert/Snacks", image: "🍌" },
  { id: "7", name: "Carbonara/Spaghetti", price: 75.0, category: "Pasta", image: "🍝" },
  { id: "8", name: "Siopao (Bola-Bola)", price: 40.0, category: "Snacks", image: "🥟" },
  { id: "9", name: "Grilled Cheese Sandwich", price: 50.0, category: "Snacks", image: "🥪" },
  { id: "10", name: "Bottled Water (500ml)", price: 15.0, category: "Beverages", image: "💧" },
  { id: "11", name: "Iced Coffee (Sweet)", price: 55.0, category: "Beverages", image: "🥤" },
  { id: "12", name: "Soda in Can", price: 40.0, category: "Beverages", image: "🥫" },
  { id: "13", name: "Tuna Sandwich", price: 60.0, category: "Snacks", image: "🥪" },
  { id: "14", name: "Cup Noodles (Instant)", price: 45.0, category: "Noodles", image: "🍜" },
  { id: "15", name: "Brownies/Bar Slice", price: 30.0, category: "Dessert", image: "🍫" },
  { id: "16", name: "Siomai (4pcs)", price: 50.0, category: "Snacks", image: "🥟" },
  { id: "17", name: "Fish Balls (5pcs)", price: 15.0, category: "Street Food", image: "🍢" },
  { id: "18", name: "Kwek-Kwek (Quail Eggs)", price: 35.0, category: "Street Food", image: "🥚" },
  { id: "19", name: "Suman (Sticky Rice)", price: 30.0, category: "Kakanin/Dessert", image: "🌾" },
  { id: "20", name: "Turon (Banana Spring Roll)", price: 25.0, category: "Dessert/Snacks", image: "🍌" },
  { id: "21", name: "Lumpia Shanghai (3pcs)", price: 55.0, category: "Lunch/Heavy", image: "🥢" },
  { id: "22", name: "Daing na Bangus (Milkfish)", price: 120.0, category: "Lunch/Heavy", image: "🐟" },
  { id: "23", name: "Ginataang Bilo-Bilo", price: 60.0, category: "Dessert", image: "🥣" },
  { id: "24", name: "Halo-Halo (Small)", price: 75.0, category: "Dessert", image: "🍧" },
  { id: "25", name: "Choco Hot Fudge Sundae", price: 45.0, category: "Dessert", image: "🍦" },
  { id: "26", name: "Mango Shake", price: 70.0, category: "Beverages", image: "🥭" },
  { id: "27", name: "Pineapple Juice (in can)", price: 45.0, category: "Beverages", image: "🍍" },
  { id: "28", name: "Puto Cheese (3pcs)", price: 25.0, category: "Kakanin/Snacks", image: "🍚" },
  { id: "29", name: "Pork Sinigang (Soup)", price: 95.0, category: "Lunch/Heavy", image: "🍲" },
  { id: "30", name: "Arroz Caldo (Rice Porridge)", price: 60.0, category: "Breakfast/Snacks", image: "🍚" },
  { id: "31", name: "Pork Menudo w/ Rice", price: 95.0, category: "Lunch/Heavy", image: "🍲" },
  { id: "32", name: "Chicken Curry w/ Rice", price: 105.0, category: "Lunch/Heavy", image: "🍛" },
  { id: "33", name: "Leche Flan Slice", price: 40.0, category: "Dessert", image: "🍮" },
  { id: "34", name: "Pork BBQ Skewers (1 stick)", price: 45.0, category: "Grill/Snacks", image: "🍢" },
  { id: "35", name: "Kare-Kare (Peanut Stew)", price: 130.0, category: "Lunch/Heavy", image: "🥜" },
  { id: "36", name: "Softdrinks in Bottle (Big)", price: 50.0, category: "Beverages", image: "🥤" },
  { id: "37", name: "Sago't Gulaman Drink", price: 30.0, category: "Beverages", image: "🍹" },
  { id: "38", name: "Pork Adobo Flakes", price: 115.0, category: "Silog Meal", image: "🥩" },
  { id: "39", name: "Bibingka (Rice Cake)", price: 55.0, category: "Kakanin/Dessert", image: "🍚" },
  { id: "40", name: "Potato French Fries (Small)", price: 40.0, category: "Snacks", image: "🍟" },
  { id: "41", name: "Ballpoint Pen (Black)", price: 15.0, category: "School Supplies", image: "🖊️" },
  { id: "42", name: "Pencil (#2)", price: 8.0, category: "School Supplies", image: "✏️" },
  { id: "43", name: "Notebook (80 leaves)", price: 30.0, category: "School Supplies", image: "📓" },
  { id: "44", name: "Yellow Pad Paper", price: 25.0, category: "School Supplies", image: "📄" },
  { id: "45", name: "Eraser (Small)", price: 10.0, category: "School Supplies", image: "🧼" },
  { id: "46", name: "Ruler (12 inch/30 cm)", price: 20.0, category: "School Supplies", image: "📏" },
  { id: "47", name: "Correction Fluid/Tape", price: 45.0, category: "School Supplies", image: "🧴" },
  { id: "48", name: "Permanent Marker", price: 35.0, category: "School Supplies", image: "🖍️" },
  { id: "49", name: "Scissors (Blunt Tip)", price: 30.0, category: "School Supplies", image: "✂️" },
  { id: "50", name: "Glue Stick (Small)", price: 25.0, category: "School Supplies", image: "🩹" },
  { id: "51", name: "Coloring Pencils (12-pack)", price: 75.0, category: "School Supplies", image: "🎨" },
  { id: "52", name: "Protractor Set", price: 40.0, category: "School Supplies", image: "📐" },
  { id: "53", name: "Clear Folder", price: 18.0, category: "School Supplies", image: "📂" },
  { id: "54", name: "Highlighter Pen (Yellow)", price: 28.0, category: "School Supplies", image: "🖍️" },
  { id: "55", name: "Bond Paper (per sheet)", price: 2.0, category: "School Supplies", image: "📄" },
  { id: "56", name: "Dangsilog", price: 130.0, category: "Silog Meal", image: "🐟" },
  { id: "57", name: "Chosilog", price: 105.0, category: "Silog Meal", image: "🐷" },
  { id: "58", name: "Adosilog (Pork/Chicken)", price: 95.0, category: "Silog Meal", image: "🍗" },
  { id: "59", name: "Baconsilog", price: 110.0, category: "Silog Meal", image: "🥓" },
  { id: "60", name: "Tinapasilog", price: 120.0, category: "Silog Meal", image: "🐟" },
  { id: "61", name: "Sisisilog (Pork Sisig)", price: 145.0, category: "Silog Meal", image: "🔥" },
  { id: "62", name: "Pancit Palabok", price: 80.0, category: "Noodles", image: "🍤" },
  { id: "63", name: "Pancit Malabon", price: 90.0, category: "Noodles", image: "🦑" },
  { id: "64", name: "Batchoy (Iloilo Style)", price: 110.0, category: "Noodles", image: "🍜" },
  { id: "65", name: "Sotanghon Guisado", price: 85.0, category: "Noodles", image: "🥢" },
  { id: "66", name: "Isaw (Chicken Intestine)", price: 12.0, category: "Street Food", image: "🍢" },
  { id: "67", name: "Betamax (Grilled Pig's Blood)", price: 10.0, category: "Street Food", image: "🟥" }, 
  { id: "68", name: "Adidas (Grilled Chicken Feet)", price: 20.0, category: "Street Food", image: "🍗" },
  { id: "69", name: "Taho (Sweet Tofu Pudding)", price: 40.0, category: "Street Food", image: "🍮" }, 
  { id: "70", name: "Puto Bumbong", price: 50.0, category: "Kakanin/Dessert", image: "🍠" },
  { id: "71", name: "Biko (Sticky Rice Cake)", price: 35.0, category: "Kakanin/Dessert", image: "🍚" },
  { id: "72", name: "Palitaw (Sweet Rice Dumplings)", price: 25.0, category: "Kakanin/Dessert", image: "⚪" },
  { id: "73", name: "Kutsinta", price: 20.0, category: "Kakanin/Dessert", image: "🟡" },
  { id: "74", name: "Inihaw na Liempo (Pork Belly)", price: 150.0, category: "Grill", image: "🍖" },
  { id: "75", name: "Chicken Inasal (Pecho)", price: 125.0, category: "Grill", image: "🍗" },
  { id: "76", name: "Puto Bumbong", price: 50.0, category: "Kakanin/Dessert", image: "🍠" },
  { id: "77", name: "Biko (Sticky Rice Cake)", price: 35.0, category: "Kakanin/Dessert", image: "🍚" },
  { id: "78", name: "Chicken Inasal (Pecho)", price: 125.0, category: "Grill/Heavy", image: "🍗" },
  { id: "79", name: "SkyFlakes Crackers (per pack)", price: 10.0, category: "Snacks", image: "🥣" },
  { id: "80", name: "Hansel Mocha Sandwich", price: 12.0, category: "Snacks", image: "🍪" },
  { id: "81", name: "Fita Crackers (per pack)", price: 10.0, category: "Snacks", image: "🥣" },
  { id: "82", name: "Nissin Butter Coconut Biscuits", price: 10.0, category: "Snacks", image: "🥥" },
  { id: "83", name: "Rebisco Sandwich (Plain Cream)", price: 10.0, category: "Snacks", image: "🍪" },
  { id: "84", name: "Nissin Wafer (Chocolate King Size)", price: 12.0, category: "Snacks", image: "🍫" },
  { id: "85", name: "Cream-O Cookies (Choco)", price: 15.0, category: "Snacks", image: "🍪" },
  { id: "86", name: "Mango Shake (Fresh)", price: 75.0, category: "Local Juices/Shakes", image: "🥭" },
  { id: "87", name: "Calamansi Juice (Iced)", price: 45.0, category: "Local Juices/Shakes", image: "🍋" },
  { id: "88", name: "Melon Juice (Cantaloupe)", price: 40.0, category: "Local Juices/Shakes", image: "🍈" },
  { id: "89", name: "Buko Shake", price: 65.0, category: "Local Juices/Shakes", image: "🥥" },
  { id: "90", name: "Guyabano Juice", price: 70.0, category: "Local Juices/Shakes", image: "🥤" },
  { id: "91", name: "Avocado Shake (Seasonal)", price: 80.0, category: "Local Juices/Shakes", image: "🥑" },
  { id: "92", name: "Dalandan Juice", price: 45.0, category: "Local Juices/Shakes", image: "🍊" },
  { id: "93", name: "Sago at Gulaman", price: 35.0, category: "Beverages", image: "🍹" },
  { id: "94", name: "Buko Pandan Drink", price: 55.0, category: "Beverages", image: "🥥" },
  { id: "95", name: "Taho (Cold/Iced)", price: 45.0, category: "Street Food", image: "🍮" },
  { id: "96", name: "Zest-O Juice (200ml Pouch)", price: 10.0, category: "Beverages", image: "🧃" },
  { id: "97", name: "C2 Ready-to-Drink Tea (Bottle)", price: 30.0, category: "Beverages", image: "🥤" },
  { id: "98", name: "Softdrink (Coke/Pepsi in Can)", price: 45.0, category: "Beverages", image: "🥤" },
  { id: "99", name: "Del Monte Four Seasons Juice (Box)", price: 35.0, category: "Beverages", image: "🧃" },
  { id: "100", name: "Gatorade/Pocari Sweat (Sports Drink)", price: 55.0, category: "Beverages", image: "💧" }

]

const CATEGORIES = ["All", "Beverages", "Bakery", "Snacks", "Dessert", "Lunch/Heavy", "Silog Meal", "Noodles", "Street Food", "Kakanin/Dessert", "Grill/Snacks", "School Supplies"]

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

                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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

            <div className="flex-1 overflow-y-auto scrollbar-hide">
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
                                <p className="text-lg font-semibold text-primary">₱{product.price.toFixed(2)}</p>
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

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}
