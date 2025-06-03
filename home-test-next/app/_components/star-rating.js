import {Star} from "lucide-react";

export default function StarRating({rating}){
    return(
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={`${
                        i < Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                    }`}
                />
            ))}
            <span className="ml-2 text-sm font-medium text-[var(--color-muted)]">{rating}</span>
        </div>
    )
}
