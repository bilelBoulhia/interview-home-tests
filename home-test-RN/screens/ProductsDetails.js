import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { getProductById } from "../utils/api";

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }) => {
    const { id } = route.params;
    const { colors } = useTheme();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            if (data) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const styles = createStyles(colors);

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.muted }]}>
                    Chargement...
                </Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                    Produit introuvable
                </Text>
                <Text style={[styles.errorSubtext, { color: colors.muted }]}>
                    Le produit que vous recherchez n'existe pas.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.categoryBadgeText, { color: colors.background }]}>
                        {product.category}
                    </Text>
                </View>
            </View>

            {/* Product Info Card */}
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                {/* Title and Price Section */}
                <View style={styles.titleSection}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {product.title}
                    </Text>
                    <View style={[styles.priceContainer, { backgroundColor: colors.accent }]}>
                        <Text style={[styles.priceLabel, { color: colors.muted }]}>
                            Prix
                        </Text>
                        <Text style={[styles.price, { color: colors.primary }]}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Rating Section (if available) */}
                {product.rating && (
                    <View style={styles.ratingSection}>
                        <View style={styles.ratingContainer}>
                            <Text style={[styles.ratingText, { color: colors.warning }]}>
                                ★ {product.rating.rate}
                            </Text>
                            <Text style={[styles.ratingCount, { color: colors.muted }]}>
                                ({product.rating.count} avis)
                            </Text>
                        </View>
                    </View>
                )}

                {/* Description Section */}
                <View style={styles.descriptionSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Description
                    </Text>
                    <Text style={[styles.description, { color: colors.muted }]}>
                        {product.description}
                    </Text>
                </View>


            </View>
        </ScrollView>
    );
};

const createStyles = (colors) => StyleSheet.create({
    container: {
        paddingBottom: 32,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    errorSubtext: {
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: colors.card,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: colors.background,
    },
    categoryBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoCard: {
        margin: 16,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    titleSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
        marginBottom: 16,
    },
    priceContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    priceLabel: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    ratingSection: {
        marginBottom: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
    },
    ratingCount: {
        fontSize: 14,
    },
    descriptionSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    actionSection: {
        gap: 12,
    },
    primaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    secondaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProductDetailsScreen;
