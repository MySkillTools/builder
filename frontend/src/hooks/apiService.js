// apiService.js

const API_URL = '/api'; // Base URL for your API

// Utility function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        // Handle or log the error as needed
        console.error('API Error:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export default apiRequest;
