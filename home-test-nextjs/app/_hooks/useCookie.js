'use client'
import {useState} from "react";
import Cookies from "js-cookie";

export const useCookie= ()=>{
    const [value, setValue] = useState(null);
    const setCookie = (key,val,days=7)=>{
        Cookies.set(key,val,{expires:days,path:'/'});
        setValue(val);
    }
    const getCookie = (key)=>{
        const val = Cookies.get(key) ?? null ;
        setValue(val);
        return val;
    }
    const removeCookie = (key) => {
        Cookies.remove(key, { path: "/" });
        setValue(null);
    };

    return { value, setCookie, getCookie, removeCookie };
}
