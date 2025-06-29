// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from "../../axious.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = not logged in
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in via cookie
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/user/profile'); // backend must return user from token
                setUser(res.data.user);
                console.log(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
