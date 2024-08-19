import React from 'react';
import useUserData from '../../hooks/useUserData';

function UserInfo() {
    const { user, loading, error } = useUserData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {user ? (
                <div>
                    <h1>User Information</h1>
                    <p><strong>User ID:</strong> {user.user_id}</p>
                    <p><strong>Cookie Expires:</strong> {user.cookie_expires}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    )
}

export default UserInfo;