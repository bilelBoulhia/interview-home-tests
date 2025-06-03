import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
    const { login } = useAuth();
    const theme = useTheme();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { username: "", password: "" } });

    const onSubmit = async (data) => {
        await login(data.username, data.password);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    borderRadius: 20,
                    padding: 32,
                }}
            >
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        color: theme.colors.primary,
                        marginBottom: 24,
                        textAlign: "center",
                    }}
                >
                    Bienvenue
                </Text>

                <Text
                    style={{
                        fontWeight: "600",
                        color: theme.colors.text,
                        marginBottom: 8,
                        textTransform: "uppercase",
                        fontSize: 12,
                        letterSpacing: 1,
                    }}
                >
                    Nom d'utilisateur
                </Text>
                <Controller
                    control={control}
                    rules={{ required: "Le nom d'utilisateur est obligatoire" }}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{
                                backgroundColor: theme.colors.background,
                                borderWidth: 1.5,
                                borderColor: errors.username
                                    ? theme.colors.error
                                    : theme.colors.border,
                                borderRadius: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 14,
                                fontSize: 16,
                                color: theme.colors.text,
                                marginBottom: errors.username ? 4 : 16,
                            }}
                            placeholder="Entrez le nom d'utilisateur"
                            placeholderTextColor={theme.colors.muted}
                            autoCapitalize="none"
                            autoComplete="username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.username && (
                    <Text style={{ color: theme.colors.error, marginBottom: 16, fontSize: 12 }}>
                        {errors.username.message}
                    </Text>
                )}

                {/* Password */}
                <Text
                    style={{
                        fontWeight: "600",
                        color: theme.colors.text,
                        marginBottom: 8,
                        textTransform: "uppercase",
                        fontSize: 12,
                        letterSpacing: 1,
                    }}
                >
                    Mot de passe
                </Text>
                <Controller
                    control={control}
                    rules={{ required: "Le mot de passe est obligatoire" }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{
                                backgroundColor: theme.colors.background,
                                borderWidth: 1.5,
                                borderColor: errors.password
                                    ? theme.colors.error
                                    : theme.colors.border,
                                borderRadius: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 14,
                                fontSize: 16,
                                color: theme.colors.text,
                                marginBottom: errors.password ? 4 : 24,
                            }}
                            placeholder="Entrez le mot de passe"
                            placeholderTextColor={theme.colors.muted}
                            secureTextEntry
                            autoComplete="password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && (
                    <Text style={{ color: theme.colors.error, marginBottom: 24, fontSize: 12 }}>
                        {errors.password.message}
                    </Text>
                )}


                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        backgroundColor: theme.colors.primary,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 18,
                        }}
                    >
                        Se connecter
                    </Text>
                </TouchableOpacity>


                <View
                    style={{
                        marginTop: 24,
                        backgroundColor: theme.colors.muted + "22",
                        borderRadius: 12,
                        padding: 16,
                    }}
                >
                    <Text
                        style={{
                            fontStyle: "italic",
                            color: theme.colors.muted,
                            textAlign: "center",
                            marginBottom: 8,
                        }}
                    >
                        * Utilisez les identifiants suivants pour la connexion de démonstration :
                    </Text>
                    <Text
                        style={{
                            color: theme.colors.muted,
                            fontWeight: "600",
                            marginBottom: 4,
                            textAlign: "center",
                        }}
                    >
                        Nom d'utilisateur : <Text style={{ fontWeight: "400" }}>mor_2314</Text>
                    </Text>
                    <Text
                        style={{
                            color: theme.colors.muted,
                            fontWeight: "600",
                            textAlign: "center",
                        }}
                    >
                        Mot de passe : <Text style={{ fontWeight: "400" }}>83r5^_</Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
