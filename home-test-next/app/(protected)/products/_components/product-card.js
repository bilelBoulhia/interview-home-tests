import { Star } from "lucide-react"
import StarRating from "@/app/_components/star-rating";
import {useRouter} from "next/navigation";

export default function ProductCard({ product }) {
    const router = useRouter();
    return (
        <div
            onClick={()=>router.push(`/products/${product.id}`)}
            className="group relative w-full max-w-sm cursor-pointer">

            <div className="relative overflow-hidden rounded-3xl bg-[var(--color-card)] shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">

                <div className="relative h-80 overflow-hidden bg-white">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 h-full w-full object-contain p-8 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                    />


                    <div className="absolute right-4 top-4">
                        <div className="rounded-2xl bg-[var(--color-primary)] px-4 py-2 shadow-xl">
                            <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                        </div>
                    </div>


                    <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider  backdrop-blur-sm">
              {product.category}
            </span>
                    </div>
                </div>


                <div className="relative p-6">

                    <div className="mb-3 flex items-center justify-between">
                        <StarRating rating={product.rating.rate}/>
                        <span className="text-xs text-[var(--color-muted)]">{product.rating.count} reviews</span>
                    </div>


                    <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                        {product.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">{product.description}</p>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
    )
}
