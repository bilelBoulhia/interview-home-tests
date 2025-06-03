import React, { useEffect, useState } from "react"
import { View, ActivityIndicator, Alert } from "react-native"

import Form from "../compoenents/ManagmentForm";
import Table from "../compoenents/ManagementTable";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../utils/api";


export default function Management() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [formOpen, setFormOpen] = useState(false)
    const [formMode, setFormMode] = useState("create")
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        try {
            setLoading(true)
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            Alert.alert("Erreur", error.message)
        } finally {
            setLoading(false)
        }
    }

    const onAddPress = () => {
        setSelectedProduct(null)
        setFormMode("create")
        setFormOpen(true)
    }

    const onEditPress = (product) => {
        setSelectedProduct(product)
        setFormMode("edit")
        setFormOpen(true)
    }

    const onDeletePress = async (product) => {
        Alert.alert(
            "Confirmer la suppression",
            `Êtes-vous sûr de vouloir supprimer "${product.title}" ?`,
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteProduct(product.id)
                            loadProducts()
                        } catch {
                            Alert.alert("Échec de la suppression")
                        }
                    },
                },
            ]
        )
    }

    const onFormSubmit = async (formData) => {
        try {
            if (formMode === "create") {
                await createProduct(formData)
            } else if (formMode === "edit" && selectedProduct) {
                await updateProduct(selectedProduct.id, formData)
            }
            setFormOpen(false)
            loadProducts()
        } catch {
            Alert.alert("Échec de la sauvegarde")
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Table
                products={products}
                onAddPress={onAddPress}
                onEditPress={onEditPress}
                onDeletePress={onDeletePress}
            />
            <Form
                visible={formOpen}
                mode={formMode}
                product={selectedProduct}
                onClose={() => setFormOpen(false)}
                onSubmit={onFormSubmit}
            />
        </View>
    )
}
