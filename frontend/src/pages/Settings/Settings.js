import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

import useUserData from '../../hooks/useUserData';

function Settings() {

    const { user, loading, error } = useUserData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div id="app">
            
            <Navbar />
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
            <Footer />
        </div>
    );
}

export default Settings;