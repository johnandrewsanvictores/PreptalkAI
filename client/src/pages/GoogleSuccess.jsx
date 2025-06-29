import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../axious.js";

const GoogleSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Automatically sends the cookie if `withCredentials: true` is set in your axios instance
                const res = await api.get('/auth/user/profile');

                const user = res.data;
                localStorage.setItem('user', JSON.stringify({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userType: user.userType,
                    isLoggedIn: true,
                    isFirstVisit: user.isFirstVisit,
                }));

                // Redirect based on user visit status
                if (user.isFirstVisit) {
                    navigate('/decide-user-type');
                } else {
                    navigate(user.userType === 'freelancer' ? '/freelancer-dashboard' : '/entrepreneur-dashboard');
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
