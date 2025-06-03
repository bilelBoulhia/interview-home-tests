import Toast from 'react-native-toast-message';

export async function getProducts() {
    try {
        const res = await fetch(`https://fakestoreapi.com/products`);
        if (!res.ok) {
            Toast.show({ type: 'error', text1: 'Erreur', text2: 'Échec de la récupération des produits' });
            return [];
        }
        return await res.json();
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Erreur réseau', text2: error.message });
        return [];
    }
}


export async function getProductById(id) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: `Échec de la récupération du produit ${id}`,
            });
            return null;
        }
        return await res.json();
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erreur réseau',
            text2: error.message,
        });
        return null;
    }
}


export async function createProduct(productData) {
    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!res.ok) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: `Échec de la création du produit. Statut: ${res.status}`,
            });
            return { success: false, error: `${res.status}` };
        }

        const product = await res.json();
        Toast.show({
            type: 'success',
            text1: 'Succès',
            text2: 'Produit créé avec succès',
        });
        return { success: true, product, message: "succès" };
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erreur réseau',
            text2: error.message,
        });
        return { success: false, error: error.message };
    }
}

export async function updateProduct(id, productData) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!res.ok) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: `Échec de la mise à jour du produit. Statut: ${res.status}`,
            });
            return { success: false, error: `${res.status}` };
        }

        const product = await res.json();
        Toast.show({
            type: 'success',
            text1: 'Succès',
            text2: 'Produit mis à jour avec succès',
        });
        return { success: true, product, message: "succès" };
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erreur réseau',
            text2: error.message,
        });
        return { success: false, error: error.message };
    }
}

export async function deleteProduct(id) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });

        if (!res.ok) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: `Échec de la suppression du produit. Statut: ${res.status}`,
            });
            return { success: false, error: `Statut: ${res.status}` };
        }

        Toast.show({
            type: 'success',
            text1: 'Succès',
            text2: 'Produit supprimé avec succès',
        });
        return { success: true, message: "Produit supprimé avec succès" };
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erreur réseau',
            text2: error.message,
        });
        return { success: false, error: error.message };
    }
}
