'use client';

import { notFound, useParams } from 'next/navigation';
import useSWR from 'swr';
import StarRating from '@/app/_components/star-rating';
import Loading from "@/app/_components/ui/loading";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function ProductPage() {
    const { slug } = useParams();
    const { data: product, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_URL}/products/${slug}`,
        fetcher
    );

    if (error) return notFound();
    if (!product && !isLoading) return notFound();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                <div className="relative w-full bg-white h-[500px] bg-[var(--color-card)] rounded-3xl overflow-hidden shadow-xl">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 h-full w-full object-contain p-8 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                    />
                </div>

                <div className="w-full space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[var(--color-primary)] px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white">
                            {product.category}
                        </span>
                        <span className="text-[var(--color-muted)] text-sm">
                            {product.rating.count} avis
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-[var(--color-foreground)]">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-2">
                        <StarRating rating={product.rating.rate} />
                    </div>

                    <p className="text-lg text-[var(--color-muted)]">
                        {product.description}
                    </p>

                    <div className="text-3xl font-bold text-[var(--color-primary)]">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="mt-16 w-full">
                <h2 className="h2 mb-6">Avis des clients</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        {
                            name: "Alice Johnson",
                            rating: 5,
                            comment:
                                "J'adore absolument ce produit ! Excellente qualité et expédition rapide. Je recommande vivement !",
                        },
                        {
                            name: "Mark Thompson",
                            rating: 4,
                            comment:
                                "Très satisfait de l'achat. Le produit correspond parfaitement à la description.",
                        },
                        {
                            name: "Sara Lee",
                            rating: 5,
                            comment:
                                "A dépassé mes attentes. Je vais certainement racheter !",
                        },
                    ].map((review, index) => (
                        <div key={index} className="card p-6 shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-[var(--color-foreground)]">
                                    {review.name}
                                </span>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-[var(--color-muted)]">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
