import React, { useState } from 'react'
import { AuthContext } from './AuthContext';

export default function AuthProvier({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        localStorage.setItem("token", userData.token)
        setIsAuthenticated(true);
        setUser(userData.user);
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false);
        setUser(null);
    };

    const updatedValues = {
        isAuthenticated,
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={updatedValues}>
            {children}
        </AuthContext.Provider>
    )
}
