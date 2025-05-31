import { useCookie } from "@/app/_hooks/useCookie";
import { useContext } from "react";
import {AuthContext} from "@/app/_contexts/AuthContext";


export const useCredentials = ()=>{
    const { credentials, setCredentials } = useContext(AuthContext);
    const {setCookie} = useCookie();

    const addCredentials = (LoginInfo)=>{
        setCredentials(LoginInfo);
        setCookie("credentials",JSON.stringify(LoginInfo));
    }
    const removeCredentials = ()=>{
        setCredentials(null);
        setCookie("credentials","");
    }


    return {  credentials, addCredentials, removeCredentials, setCredentials };
}
