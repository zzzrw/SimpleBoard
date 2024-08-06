import React, { createContext, useState, useContext } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        const response = await axios.post('http://127.0.0.1:7001/api/login', userData);
        if (response.data.success) {
            setUser(response.data.user);
            return true;
        } else {
            return false
        }
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
