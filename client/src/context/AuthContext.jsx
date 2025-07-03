// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from "../../axious.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = not logged in
    const [userContext, setUserContext] = useState(null); // null = not logged in

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async (userId) => {
            try {
                const res = await api.get('/user/resume', {
                    params: { userId },
                });

                setUserContext(res.data.resume);
                console.log(res.data.user);
            } catch {
                setUserContext(null);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/user/profile');
                const currentUser = res.data.user;
                setUser(currentUser);
                console.log(currentUser);
                await fetchResume(currentUser._id); // ✅ Pass the ID directly
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading , userContext, setUserContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
