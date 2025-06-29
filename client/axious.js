import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // This is required for sending cookies
    headers: {
        'Content-Type': 'application/json' // ensure it's JSON
    }
});

export default api;