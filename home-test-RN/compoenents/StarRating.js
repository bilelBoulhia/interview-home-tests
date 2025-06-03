import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {StarIcon} from "lucide-react-native";


export default function StarRating({ rating }) {
    const fullStars = Math.floor(rating);

    return (
        <View style={styles.container}>
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < fullStars} />
            ))}
            <Text style={styles.text}>{rating.toFixed(1)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    text: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
    },
});
