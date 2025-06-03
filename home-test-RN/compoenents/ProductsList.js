import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import StarRating from "../compoenents/StarRating";

export default function ProductsList({ products }) {
    const [selectedCategory, setSelectedCategory] = useState("Toutes");
    const theme = useTheme();
    const navigation = useNavigation();


    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category));
        return ["Toutes", ...Array.from(unique)];
    }, [products]);


    const filteredProducts = useMemo(() => {
        if (selectedCategory === "Toutes") return products;
        return products.filter((p) => p.category === selectedCategory);
    }, [products, selectedCategory]);

    const handleSelectProduct = (id) => {
        navigation.navigate("ProductDetails", { id });
    };


    const renderCategoryItem = (category) => {
        const selected = category === selectedCategory;
        return (
            <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                    styles.categoryButton,
                    {
                        backgroundColor: selected
                            ? theme.colors.primary
                            : theme.colors.card,
                        borderColor: theme.colors.primary,


                    },
                ]}
            >
                <Text
                    style={{
                        color: selected ? theme.colors.accent : theme.colors.text,
                        fontWeight: "600",
                        lineHeight: 26,
                        textAlignVertical: 'center',
                    }}
                >
                    {category}
                </Text>
            </TouchableOpacity>
        );
    };


    const renderProductCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleSelectProduct(item.id)}
            style={[
                styles.card,
                {
                    backgroundColor: theme.colors.card,
                    shadowColor: theme.colors.primary,
                    borderColor: theme.colors.border,
                },
            ]}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <View
                    style={[
                        styles.priceTag,
                        { backgroundColor: theme.colors.primary },
                    ]}
                >
                    <Text style={{ color: theme.colors.accent, fontWeight: "bold" }}>
                        ${item.price.toFixed(2)}
                    </Text>
                </View>
                <View
                    style={[
                        styles.categoryTag,
                        { backgroundColor: theme.colors.primary },
                    ]}
                >
                    <Text style={{ color: theme.colors.accent, fontSize: 10 }}>
                        {item.category}
                    </Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.ratingRow}>
                    <StarRating rating={item.rating.rate} />
                    <Text style={{ color: theme.colors.muted, fontSize: 10 }}>
                        {item.rating.count} avis
                    </Text>
                </View>

                <Text
                    style={[
                        styles.productTitle,
                        { color: theme.colors.text },
                    ]}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>

                <Text
                    style={[
                        styles.productDescription,
                        { color: theme.colors.muted },
                    ]}
                    numberOfLines={3}
                >
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={[styles.container, { backgroundColor: theme.colors.background, }]}
        >
            <Text
                style={[styles.heading, { color: theme.colors.text }]}
            >
                Liste des produits
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {categories.map(renderCategoryItem)}
            </ScrollView>

            <FlatList
                data={filteredProducts}
                renderItem={renderProductCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 12,marginTop:50 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    categoriesContainer: {
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,

        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        justifyContent: "space-between",
        marginBottom: 20,
    },
    card: {
        flex: 1,
        marginHorizontal: 6,
        borderRadius: 20,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    imageWrapper: {
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        backgroundColor: "white",
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    priceTag: {
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    categoryTag: {
        position: "absolute",
        bottom: 10,
        left: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    cardContent: {
        padding: 12,
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    productDescription: {
        fontSize: 12,
        lineHeight: 16,
    },
});
