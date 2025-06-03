import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import LoginScreen from "../screens/Login";
import ProductDetailsScreen from "../screens/ProductsDetails";
import Products from "../screens/Products";
import Management from "../screens/management";

import { useAuth } from "../hooks/useAuth";

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStackScreen() {
    return (
        <AuthStack.Navigator id="auth" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    );
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Products') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                    } else if (route.name === 'Management') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e3a8a',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5EA',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 5,
                    paddingTop: 5,
                    height: Platform.OS === 'ios' ? 85 : 60,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 2,
                },
                tabBarItemStyle: {
                    paddingVertical: 5,
                },
            })}
        >
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: 'Products',
                }}
            />
            <Tab.Screen
                name="Management"
                component={Management}
                options={{
                    tabBarLabel: 'Management',
                }}
            />
        </Tab.Navigator>
    );
}

function AppStackScreen() {
    return (
        <AppStack.Navigator id="app" screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="HomeTabs" component={HomeTabs} />
            <AppStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{
                    headerShown: true,
                    title: "Product Details",
                    headerStyle: {
                        backgroundColor: '#007AFF',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </AppStack.Navigator>
    );
}

export default function RootNavigator() {
    const { credentials } = useAuth();

    return credentials ? <AppStackScreen /> : <AuthStackScreen />;
}
