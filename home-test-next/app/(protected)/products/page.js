import {Suspense} from "react";
import Loading from "@/app/_components/ui/loading";
import {getProducts} from "@/app/actions";
import ProductList from "@/app/(protected)/products/_components/products-list";




export default async function Page() {
    const products = await getProducts();

    return (
        <Suspense fallback={<Loading />}>
            <ProductList products={products} />
        </Suspense>
    )
}
