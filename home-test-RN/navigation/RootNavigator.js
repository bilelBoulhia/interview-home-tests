import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/Products";
import ProductDetailsScreen from "../screens/ProductsDetails";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <Stack.Navigator id='navigation'>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </Stack.Navigator>
    );
};

export default ProductsNavigator;
