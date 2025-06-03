import React, { useState, useEffect } from "react"
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native"

export default function Form({ visible, mode, product, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    })

    useEffect(() => {
        if (mode === "edit" && product) {
            setFormData({
                title: product.title || "",
                price: product.price?.toString() || "",
                description: product.description || "",
                category: product.category || "",
                image: product.image || "",
            })
        } else {
            setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
                image: "",
            })
        }
    }, [visible, product, mode])

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        // Basic validation
        if (!formData.title || !formData.price || !formData.category) {
            alert("Veuillez remplir tous les champs requis")
            return
        }
        // Convert price to number
        const dataToSubmit = {
            ...formData,
            price: parseFloat(formData.price),
        }
        onSubmit(dataToSubmit)
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.modalWrapper}
            >
                <View style={styles.modal}>
                    <ScrollView>
                        <Text style={styles.heading}>{mode === "create" ? "Créer un nouveau produit" : "Modifier le produit"}</Text>
                        {["title", "price", "category", "image", "description"].map((field) => (
                            <View key={field} style={styles.formGroup}>
                                <Text style={styles.label}>{field === "image" ? "URL de l'image" : field === "title" ? "Titre" : field === "price" ? "Prix" : field === "category" ? "Catégorie" : "Description"}</Text>
                                {field === "description" ? (
                                    <TextInput
                                        multiline
                                        numberOfLines={3}
                                        style={[styles.input, styles.textArea]}
                                        value={formData[field]}
                                        onChangeText={(text) => handleChange(field, text)}
                                        placeholder={`Saisir ${field === "image" ? "l'URL de l'image" : field === "title" ? "le titre" : field === "price" ? "le prix" : field === "category" ? "la catégorie" : "la description"}`}
                                    />
                                ) : (
                                    <TextInput
                                        style={styles.input}
                                        keyboardType={field === "price" ? "numeric" : "default"}
                                        value={formData[field]}
                                        onChangeText={(text) => handleChange(field, text)}
                                        placeholder={`Saisir ${field === "image" ? "l'URL de l'image" : field === "title" ? "le titre" : field === "price" ? "le prix" : field === "category" ? "la catégorie" : "la description"}`}
                                    />
                                )}
                            </View>
                        ))}

                        <View style={styles.buttons}>
                            <Button title="Annuler" onPress={onClose} />
                            <Button title={mode === "create" ? "Créer" : "Mettre à jour"} onPress={handleSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        maxHeight: "80%",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
})
