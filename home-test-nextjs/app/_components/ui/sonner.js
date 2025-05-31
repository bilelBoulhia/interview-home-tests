"use client"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
    return (
        <Sonner
            className="toaster group"
            richColors
            {...props}
        />
    )
}

export { Toaster }
