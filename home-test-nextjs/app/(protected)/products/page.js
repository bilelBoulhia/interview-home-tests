"use client"

import { Suspense } from "react"
import ProductList from "@/app/(protected)/products/_components/products-list"
import Loading from "@/app/_components/ui/loading"
import LogoutButton from "@/app/_components/logout-button"
import useSWR from "swr"

const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
    })



export default function ProductsPage() {
    const { data: products ,isLoading } = useSWR("https://fakestoreapi.com/products", fetcher)
    if (isLoading) return <Loading/>
    return (
        <div>
            <LogoutButton />
            <ProductList products={products}/>
        </div>
    )
}
