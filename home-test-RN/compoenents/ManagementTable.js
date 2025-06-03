import React from "react"
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

export default function Table({ products, onAddPress, onEditPress, onDeletePress }) {
    const theme = useTheme()

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 16,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: "800",
            color: theme.colors.text,
            marginBottom: 8,
        },
        headerSubtitle: {
            fontSize: 16,
            color: theme.colors.text + '80',
            marginBottom: 20,
        },
        addButton: {
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 16,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        addButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 8,
        },
        listContainer: {
            paddingHorizontal: 20,
            paddingTop: 8,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
            overflow: 'hidden',
        },
        cardContent: {
            padding: 20,
        },
        cardHeader: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16,
        },
        imageContainer: {
            width: 80,
            height: 80,
            borderRadius: 16,
            backgroundColor: theme.colors.primary + '15',
            marginRight: 16,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        imagePlaceholder: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
        },
        info: {
            flex: 1,
            justifyContent: 'space-between',
        },
        title: {
            fontSize: 20,
            fontWeight: "700",
            color: theme.colors.text,
            marginBottom: 6,
            lineHeight: 24,
        },
        price: {
            fontSize: 24,
            fontWeight: "800",
            color: theme.colors.primary,
            marginBottom: 4,
        },
        priceLabel: {
            fontSize: 12,
            color: theme.colors.text + '60',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        description: {
            fontSize: 15,
            color: theme.colors.text + '70',
            lineHeight: 20,
            marginTop: 12,
        },
        actions: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border || theme.colors.text + '10',
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginLeft: 8,
        },
        editButton: {
            backgroundColor: theme.colors.primary + '15',
        },
        deleteButton: {
            backgroundColor: (theme.colors.error || '#FF4444') + '15',
        },
        editButtonText: {
            color: theme.colors.primary,
            fontWeight: "600",
            fontSize: 14,
            marginLeft: 6,
        },
        deleteButtonText: {
            color: theme.colors.error || '#FF4444',
            fontWeight: "600",
            fontSize: 14,
            marginLeft: 6,
        },
        emptyState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
            paddingVertical: 60,
        },
        emptyStateIcon: {
            marginBottom: 16,
        },
        emptyStateTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        emptyStateText: {
            fontSize: 16,
            color: theme.colors.text + '60',
            textAlign: 'center',
            lineHeight: 22,
        },
    })

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />

                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.title}
                        </Text>
                        <View>
                            <Text style={styles.priceLabel}>Prix</Text>
                            <Text style={styles.price}>
                                ${item.price?.toFixed(2) || '0.00'}
                            </Text>
                        </View>
                    </View>
                </View>

                {item.description && (
                    <Text style={styles.description} numberOfLines={3}>
                        {item.description}
                    </Text>
                )}

                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => onEditPress(item)}
                        style={[styles.actionButton, styles.editButton]}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="pencil" size={16} color={theme.colors.primary} />
                        <Text style={styles.editButtonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onDeletePress(item)}
                        style={[styles.actionButton, styles.deleteButton]}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="trash" size={16} color={theme.colors.error || '#FF4444'} />
                        <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
                <Ionicons
                    name="cube-outline"
                    size={64}
                    color={theme.colors.text + '30'}
                />
            </View>
            <Text style={styles.emptyStateTitle}>Aucun produit pour l'instant</Text>

        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Produits</Text>
                <Text style={styles.headerSubtitle}>
                    Gérer votre inventaire de produits
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAddPress}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Ajouter un produit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    )
}
