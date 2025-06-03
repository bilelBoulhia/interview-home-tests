import Table from "@/app/(protected)/management/_components/table"
import {Suspense} from "react";
import Loading from "@/app/_components/ui/loading";
import {getProducts} from "@/app/actions";




export default async function Page() {
    const products = await getProducts()

    return (
        <Suspense fallback={<Loading />}>
            <Table Products={products} />
        </Suspense>
    )
}
