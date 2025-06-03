import {toast} from "sonner";

export default async function getProducts() {
    'use server'
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/products`, {
        next: { revalidate: 60 },
    })
    if (!res.ok) toast.error('echec')
    return res.json()
}
