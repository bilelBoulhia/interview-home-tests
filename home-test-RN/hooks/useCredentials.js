import { useContext } from "react";

import {useSecureStorage} from "./useSecureStorage";
import {AuthContext} from "../context/AuthContext";


export const useCredentials = () => {
    const { credentials, setCredentials } = useContext(AuthContext);
    const { setItem } = useSecureStorage();

    const addCredentials = async (loginInfo) => {
        setCredentials(loginInfo);
        await setItem("credentials", JSON.stringify(loginInfo));
    };

    const removeCredentials = async () => {
        setCredentials(null);
        await setItem("credentials", "");
    };

    return { credentials, addCredentials, removeCredentials, setCredentials };
};
