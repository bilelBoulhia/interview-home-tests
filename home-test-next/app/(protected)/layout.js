'use client'

import { AuthContext } from "../_contexts/AuthContext";
import Navbar from "@/app/_components/nav-bar";
import LogoutButton from "@/app/_components/logout-button";
import DynamicBreadCrumb from "@/app/_components/dynamic-bread-crumb";
import {useState} from "react";



export default function RootLayout({ children }) {
    const [authState] = useState(() => ({
        credentials: null,
        setCredentials: function(creds) {
            authState.credentials = creds;
        }
    }))
    return (
        <AuthContext.Provider value={authState}>
            <header>
                <Navbar/>
            </header>
            <main>
                <LogoutButton/>
                <DynamicBreadCrumb/>
                {children}
            </main>
        </AuthContext.Provider>

    );
}
