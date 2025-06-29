import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../axious.js";
import {useAuth} from "../context/AuthContext.jsx";

const GoogleSuccess = () => {
    const navigate = useNavigate();

    const {user,  setUser} = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Automatically sends the cookie if `withCredentials: true` is set in your axios instance
                const res = await api.get('/auth/user/profile');

                const data = res.data;

                setUser(data.user);


                // Redirect based on user visit status
                if (data.user.isFirstVisit) {
                    navigate('/decide-user-type');
                } else {
                    navigate(data.user.userType === 'freelancer' ? '/freelancer-dashboard' : '/entrepreneur-dashboard');
                }
            } catch (err) {
                alert('Failed to verify session. Please log in again.');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    return <div>Logging you in...</div>;
};

export default GoogleSuccess;
