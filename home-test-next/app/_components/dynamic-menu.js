"use client"

import { cn } from '@/lib/cn'
import { Button } from "@/app/_components/ui/button"

export default function Menu({
                                 options,
                                 selected,
                                 onSelect,
                                 className
                             }) {
    return (
        <div
            className={cn(
                "sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-neutral-800",
                className
            )}
        >
            <div className="flex flex-wrap justify-center gap-2 px-4 py-3">
                {options.map((option) => (
                    <Button
                        key={option}
                        variant={selected === option ? "default" : "outline"}
                        onClick={() => onSelect(option)}
                        className="capitalize"
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    )
}
