import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import {useCredentials} from "./useCredentials";
import {navigate} from "../navigation/NavigationRef";

export const useAuth = () => {
    const { credentials, addCredentials, removeCredentials, setCredentials } = useCredentials();


    const login = async (username, password) => {
        try {
            const res = await fetch(`https://fakestoreapi.com//auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const err = await res.text();
                Toast.show({ type: "error", text1: "Échec de la connexion", text2: err });
                return;
            }

            const data = await res.text();
            const parsedData = JSON.parse(data);

            await addCredentials(parsedData);

            navigate("Products");
            Toast.show({ type: "success", text1: "Succès", text2: "Connecté avec succès" });
        } catch (err) {
            Toast.show({ type: "error", text1: "Erreur", text2: "Une erreur a été établie" });
        }
    };



    return { credentials, login, setCredentials };
};
