import React from 'react';

//import Tooltip from '../Tooltip/Tooltip';

import useUserData from '../../hooks/useUserData';
import { Tooltip } from 'react-tooltip'

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
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Attribute</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a data-tooltip-id="user-id" data-tooltip-content={`A unique and random user identifier, which will be generated when you first visit this site. It is valid for ${user.cookie_lifespan} days.`}>
                                            <i class="fa-solid fa-circle-question"></i>
                                        </a>
                                        &nbsp;User ID
                                    </td>
                                    <td>{user.user_id}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a data-tooltip-id="cookie-expires" data-tooltip-content="Your user session will be invalid after this time. But the expiration date can be renewed when you visit this site before your session expires.">
                                            <i class="fa-solid fa-circle-question"></i>
                                        </a>
                                        &nbsp;Cookie Expires
                                    </td>
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
            
            <Tooltip id="user-id" />
            <Tooltip id="cookie-expires" />

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