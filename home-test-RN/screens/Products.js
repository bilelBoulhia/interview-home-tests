import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getProducts } from '../utils/api';
import ProductsList from "../compoenents/ProductsList";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return <ProductsList products={products} />;
}
