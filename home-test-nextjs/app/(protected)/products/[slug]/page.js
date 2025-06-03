'use client';

import {notFound, useParams} from 'next/navigation';
import useSWR from 'swr';

import StarRating from '@/app/_components/star-rating';


import Loading from "@/app/_components/ui/loading";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function ProductPage() {
    const { slug } = useParams();
    const { data: product, error, isLoading } = useSWR(`https://fakestoreapi.com/products/${slug}`,
        fetcher
    );

    if (error) return notFound();
    if (!product && !isLoading) return notFound();


    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                <div
                    className="relative w-full bg-white h-[500px] bg-[var(--color-card)] rounded-3xl overflow-hidden shadow-xl"
                >
                    {isLoading ? (
                        <Loading/>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="absolute inset-0 h-full w-full object-contain p-8 transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                        />
                    )}
                </div>


                <div
                    className="w-full space-y-6">
                    {isLoading ? (
                        <>
                            <Loading/>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-[var(--color-primary)] px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white">
                                    {product.category}
                                </span>
                                <span className="text-[var(--color-muted)] text-sm">{product.rating.count} reviews</span>
                            </div>

                            <h1 className="text-4xl font-extrabold text-[var(--color-foreground)]">{product.title}</h1>

                            <div className="flex items-center gap-2">
                                <StarRating rating={product.rating.rate} />

                            </div>

                            <p className="text-lg text-[var(--color-muted)]">{product.description}</p>

                            <div className="text-3xl font-bold text-[var(--color-primary)]">${product.price.toFixed(2)}</div>


                        </>
                    )}
                </div>

            </div>

            <div className="mt-16 w-full ">
                <h2 className="h2 mb-6">Customer Reviews</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        {
                            name: "Alice Johnson",
                            rating: 5,
                            comment: "Absolutely love this product! Great quality and fast shipping. Highly recommend!",
                        },
                        {
                            name: "Mark Thompson",
                            rating: 4,
                            comment: "Very satisfied with the purchase. Product matches the description perfectly.",
                        },
                        {
                            name: "Sara Lee",
                            rating: 5,
                            comment: "Exceeded my expectations. Will definitely buy again!",
                        },
                    ].map((review, index) => (
                        <div key={index} className="card p-6 shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-[var(--color-foreground)]">{review.name}</span>
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
