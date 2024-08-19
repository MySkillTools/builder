import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';

import SettingsInfo from '../../components/SettingsInfo/SettingsInfo';

function Settings() {



    return (
        <div id="app">

            <Navbar />
                <SettingsInfo />
            <Footer />
        </div>
    );
}

export default Settings;