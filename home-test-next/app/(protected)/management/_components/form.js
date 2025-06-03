"use client"

import { useState, useEffect } from "react"
import { createProduct, updateProduct } from "@/app/actions"
import { X } from "lucide-react"

export default function Form({ open, onClose, product, mode, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (mode === "edit" && product) {
            setFormData(product)
        } else {
            setFormData({
                title: "",
                price: 0,
                description: "",
                category: "",
                image: "",
            })
        }
    }, [product, mode, open])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = mode === "create"
                ? await createProduct(formData)
                : await updateProduct(product.id, formData)

            onSuccess(result)

            if (result?.success) {
                onClose()
            }
        } catch (error) {
            onSuccess({ success: false, error: "An unexpected error occurred." })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="card max-w-lg w-full mx-4 relative" style={{ maxHeight: "90vh", overflowY: "auto" }}>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <h2 className="h2 mb-6">{mode === "create" ? "Create New Product" : "Edit Product"}</h2>

                <form onSubmit={handleSubmit}>
                    {["title", "price", "category", "image", "description"].map((field) => (
                        <div className="form-group" key={field}>
                            <label htmlFor={field} className="form-label capitalize">
                                {field === "image" ? "Image URL" : field}
                            </label>
                            {field === "description" ? (
                                <textarea
                                    id={field}
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder="Product description"
                                    rows={3}
                                    required
                                />
                            ) : (
                                <input
                                    id={field}
                                    type={field === "price" ? "number" : "text"}
                                    step={field === "price" ? "0.01" : undefined}
                                    min={field === "price" ? "0" : undefined}
                                    value={formData[field]}
                                    onChange={(e) =>
                                        handleChange(field, field === "price"
                                            ? Number.parseFloat(e.target.value) || 0
                                            : e.target.value
                                        )
                                    }
                                    placeholder={`Enter ${field}`}
                                    required={field !== "image"}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium hover:opacity-90 transition-all"
                            style={{ boxShadow: "0 4px 14px rgba(30, 58, 138, 0.4)" }}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {mode === "create" ? "Creating..." : "Updating..."}
                                </span>
                            ) : mode === "create" ? "Create Product" : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
