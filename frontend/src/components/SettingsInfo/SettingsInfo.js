import React from 'react';
import useUserData from '../../hooks/useUserData';

function UserInfo() {
    const { user, loading, error } = useUserData();

    return (
        <div className="card">
            <h5 className="card-header custom-card-header">User Information</h5>
            <div className="card-body">
                {/* Display loading state */}
                {loading && <p>Loading...</p>}

                {/* Display error state */}
                {error && <p>Error: {error}</p>}

                {/* Display user data or a message if no user data is available */}
                {!loading && !error && (
                    user ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Attribute</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>User ID</td>
                                    <td>{user.user_id}</td>
                                </tr>
                                <tr>
                                    <td>Cookie Expires</td>
                                    <td>{user.cookie_expires}</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    ) : (
                        <p>No user data available</p>
                    )
                )}
            </div>
        </div>
    );
}

function SettingsInfo() {
    return (
        <div className=" container-fluid">
            <div className="row p-3">
                <div className="col-md-6 mb-3">
                    <UserInfo />
                </div>
            </div>
        </div>
    );
}


export default SettingsInfo;