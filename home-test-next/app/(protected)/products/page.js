"use client"


import ProductList from "@/app/(protected)/products/_components/products-list"
import Loading from "@/app/_components/ui/loading"
import useSWR from "swr"

const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
    })

export default function ProductsPage() {
    const { data: products ,isLoading } = useSWR("https://fakestoreapi.com/products", fetcher)
    if (isLoading) return <div className='min-h-screen flex items-center justify-center'><Loading/></div>
    return (<ProductList products={products}/>)
}
