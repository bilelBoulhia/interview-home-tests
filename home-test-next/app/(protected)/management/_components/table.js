"use client"

import { useMemo, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { myTheme } from "@/app/_configs/_tableConfig/desgin-config"
import { agGridBaseOptions } from "@/app/_configs/_tableConfig/features-config"
import {Trash} from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { toast } from "sonner"
import { deleteProduct } from "@/app/actions"
import Form from "@/app/(protected)/management/_components/form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog"



export default function Table({ Products }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("create")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const rowSelection = useMemo(() => {
        return {
            mode: "singleRow",
        }
    }, [])

    const handleAction = (action, data) => {
        if (action === "edit") {
            setSelectedProduct(data)
            setModalMode("edit")
            setModalOpen(true)
        } else if (action === "delete") {
            setProductToDelete(data)
            setDeleteDialogOpen(true)
        }
    }

    const handleDelete = async () => {
        if (!productToDelete) return

        setIsDeleting(true)
        try {
            const result = await deleteProduct(productToDelete.id)
            if (result.success) {
                toast.success("Product deleted successfully")

            } else {
                toast.error(result.error || "Failed to delete product")
            }
        } catch (error) {
            toast.error("Failed to delete product")
        } finally {
            setIsDeleting(false)
            setDeleteDialogOpen(false)
            setProductToDelete(null)
        }
    }

    const handleCreateNew = () => {
        setSelectedProduct(null)
        setModalMode("create")
        setModalOpen(true)
    }

    const handleModalSuccess = (result) => {
        if (result?.success) {
            toast.success(result.message)
            setModalOpen(false)
        } else if (result?.error) {
            toast.error(result.error)
        }
    }



    const columnDefs = useMemo(
        () => [
            {
                headerName: "ID",
                field: "id",
                width: 80,
                sortable: true,
            },
            {
                headerName: "Image",
                field: "image",
                width: 100,
                cellRenderer: (params) => {
                    return params.value ? (
                        <img
                            src={params.value || "/placeholder.svg"}
                            alt="Product"
                            className="w-12 h-12 object-cover rounded"

                        />
                    ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No img</span>
                        </div>
                    )
                },
            },
            {
                headerName: "Title",
                field: "title",
                flex: 1,
                sortable: true,
                filter: true,
            },
            {
                headerName: "Price ($)",
                field: "price",
                width: 120,
                sortable: true,
                cellRenderer: (params) => `$${params.value?.toFixed(2) || "0.00"}`,
            },
            {
                headerName: "Category",
                field: "category",
                width: 150,
                sortable: true,
                filter: true,
            },
            {
                headerName: "Description",
                field: "description",
                flex: 1,
                cellRenderer: (params) => {
                    const description = params.value || ""
                    return description.length > 100 ? `${description.substring(0, 100)}...` : description
                },
            },
            {
                headerName: "Rating",
                field: "rating.rate",
                width: 100,
                sortable: true,
                cellRenderer: (params) => {
                    const rate = params.value
                    return rate ? `${rate.toFixed(1)}` : "N/A"
                },
            },
            {
                headerName: "Actions",
                field: "actions",
                width: 120,
                cellRenderer: (params) => {
                    return (
                        <div className="flex gap-2 items-center h-full">
                            <button
                                onClick={() => handleAction("edit", params.data)}
                                className="p-3 hover:scale-105"
                                title="Edit product"
                            >
                                <FilePenLineIcon className="h-4 w-4 text-[var(--color-warning)]" />
                            </button>
                            <button
                                onClick={() => handleAction("delete", params.data)}
                                className="p-1 hover:scale-105"
                                title="Delete product"
                            >
                                <Trash className="h-4 w-4 text-[var(--color-error)]" />
                            </button>
                        </div>
                    )
                },
            },
        ],
        [],
    )

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end p-4 items-center">
                <Button onClick={handleCreateNew} className="flex items-center gap-2">
                    Add Product
                </Button>
            </div>
            <div style={{ height: "70vh" }} className="w-full">
                <AgGridReact
                    rowSelection={rowSelection}
                    rowData={Products}
                    theme={myTheme}
                    gridOptions={agGridBaseOptions}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        resizable: true,
                        sortable: true,
                    }}
                />
            </div>
            <Form
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                product={selectedProduct}
                mode={modalMode}
                onSuccess={handleModalSuccess}
            />
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>confirm delete</AlertDialogTitle>
                        <AlertDialogDescription>
                           vous etes en train de faire un suprimmer
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
