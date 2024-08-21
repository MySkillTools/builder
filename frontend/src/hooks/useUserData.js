// use UserData.js

import { useState, useEffect } from 'react';
import apiRequest from './apiService';

const useUserData = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiRequest('/user');
                setUser(data);
            } catch (error) {
                setError(error.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, loading, error };
};

export default useUserData;
