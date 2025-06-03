'use client'
import {DynamicBreadCrumb} from "@/app/_components/dynamic-bread-crumb";
import LogoutButton from "@/app/_components/logout-button";
import { useState } from "react";
import { AuthContext } from "@/app/_contexts/AuthContext";


export default function RootLayout({ children }) {
    const [authState] = useState(() => ({
        credentials: null,
        setCredentials: function(creds) {
            authState.credentials = creds;
        }
    }))


    return (
        <AuthContext.Provider value={authState}>
            <main>
                <LogoutButton/>
                <DynamicBreadCrumb/>
                {children}
            </main>
        </AuthContext.Provider>

    );
}
