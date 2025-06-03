"use client"
import { useMemo, useState } from "react"
import Menu from '@/app/_components/dynamic-menu'
import ProductCard from "@/app/(protected)/products/_components/product-card";
export default function ProductList({ products }) {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category))
        return ["All", ...Array.from(unique)]
    }, [products])

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "All") return products
        return products.filter((product) => product.category === selectedCategory)
    }, [products, selectedCategory])

    return (
        <div className="min-h-screen  bg-[var(--color-background)]">
            <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-6">Liste des produits</h1>
                    <Menu
                        options={categories}
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product,i) => (
                       <ProductCard key={i} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
