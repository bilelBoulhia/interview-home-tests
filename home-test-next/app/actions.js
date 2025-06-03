"use server"
import { revalidatePath } from "next/cache"
import {toast} from "sonner";

export  async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/products`, {
        next: { revalidate: 60 },
    })
    if (!res.ok) toast.error('echec')
    return res.json()
}


export async function createProduct(productData) {
    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })

        if (!res.ok) {
            return { success: false, error: `${res.status}` }
        }

        const product = await res.json()
        revalidatePath("/management")
        return { success: true, product, message: "sucess" }
    } catch {
        return { success: false, error: "errer de serveur" }
    }
}

export async function updateProduct(id, productData) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })

        if (!res.ok) {
            return { success: false, error: `${res.status}` }
        }

        const product = await res.json()
        revalidatePath("/management")
        return { success: true, product, message: "sucess" }
    } catch {
        return { success: false, error: "errer de serveur" }
    }
}

export async function deleteProduct(id) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

        if (!res.ok) {
            return { success: false, error: `Failed to delete product. Status: ${res.status}` }
        }

        revalidatePath("/management")
        return { success: true, message: "Product deleted successfully" }
    } catch {
        return { success: false, error: "An unexpected error occurred while deleting the product" }
    }
}
