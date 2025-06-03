import React, { createContext, useState } from "react";

export const AuthContext = createContext({
    credentials: null,
    setCredentials: () => {},
});

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState(null);

    return (
        <AuthContext.Provider value={{ credentials, setCredentials }}>
            {children}
        </AuthContext.Provider>
    );
};
