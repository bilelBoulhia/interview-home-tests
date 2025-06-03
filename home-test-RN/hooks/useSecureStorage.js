import { useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

export const useSecureStorage = () => {
    const [value, setValue] = useState(null);

    const setItem = useCallback(async (key, val) => {
        await SecureStore.setItemAsync(key, val);
        setValue(val);
    }, []);

    const getItem = useCallback(async (key) => {
        const val = await SecureStore.getItemAsync(key);
        setValue(val);
        return val;
    }, []);

    const removeItem = useCallback(async (key) => {
        await SecureStore.deleteItemAsync(key);
        setValue(null);
    }, []);

    return { value, setItem, getItem, removeItem };
};
