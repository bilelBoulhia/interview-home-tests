"use client"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cn } from "@/lib/utils"

function AlertDialog({ ...props }) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }) {
    return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal({ ...props }) {
    return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={cn(
                "fixed inset-0 z-50 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)",
                "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
                className,
            )}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            {...props}
        />
    )
}

function AlertDialogContent({ className, ...props }) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                className={cn(
                    "fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
                    "transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)",
                    "data-[state=open]:scale-100 data-[state=closed]:scale-95",
                    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
                    "mx-4 sm:mx-0",
                    className,
                )}
                style={{
                    background: "var(--color-card)",
                    borderRadius: "20px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    padding: "2rem",
                    border: "2px solid var(--color-border)",
                    color: "var(--color-foreground)",
                }}
                {...props}
            />
        </AlertDialogPortal>
    )
}

function AlertDialogHeader({ className, ...props }) {
    return (
        <div
            data-slot="alert-dialog-header"
            className={cn("flex flex-col gap-3 text-center sm:text-left mb-6", className)}
            {...props}
        />
    )
}

function AlertDialogFooter({ className, ...props }) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end mt-6", className)}
            {...props}
        />
    )
}

function AlertDialogTitle({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn("text-xl font-700 leading-tight", className)}
            style={{
                color: "var(--color-foreground)",
                marginBottom: "0.5rem",
            }}
            {...props}
        />
    )
}

function AlertDialogDescription({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn("text-base leading-relaxed", className)}
            style={{
                color: "var(--color-muted)",
                lineHeight: "1.7",
            }}
            {...props}
        />
    )
}

function AlertDialogAction({ className, variant = "primary", ...props }) {
    const baseStyles = {
        padding: "0.75rem 1.5rem",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "2px solid transparent",
        textTransform: "none",
        letterSpacing: "0.5px",
    }

    const variantStyles = {
        primary: {
            background: "var(--color-primary)",
            color: "white",
            border: "2px solid var(--color-primary)",
        },
        destructive: {
            background: "var(--color-error)",
            color: "white",
            border: "2px solid var(--color-error)",
        },
    }

    return (
        <AlertDialogPrimitive.Action
            className={cn("inline-flex items-center justify-center", className)}
            style={{
                ...baseStyles,
                ...variantStyles[variant],
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.15)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
            }}
            {...props}
        />
    )
}

function AlertDialogCancel({ className, ...props }) {
    const baseStyles = {
        padding: "0.75rem 1.5rem",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "var(--color-background)",
        color: "var(--color-foreground)",
        border: "2px solid var(--color-border)",
        textTransform: "none",
        letterSpacing: "0.5px",
    }

    return (
        <AlertDialogPrimitive.Cancel
            className={cn("inline-flex items-center justify-center", className)}
            style={baseStyles}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.borderColor = "var(--color-primary)"
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(30, 58, 138, 0.1), 0 4px 12px rgba(30, 58, 138, 0.15)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "var(--color-border)"
                e.currentTarget.style.boxShadow = "none"
            }}
            {...props}
        />
    )
}

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
}
