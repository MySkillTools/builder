import React from 'react';
import './NotFound.scss';

//import Navbar from '../../components/NavBar/Navbar';
//import Footer from '../../components/Footer/Footer';

function Settings() {
    return (
        <div id="app" className='error-page'>
            <div>
                <div className="error-code text-primary">404</div>
                <div className="error-message">Oops! The page you’re looking for doesn’t exist.</div>
                <a href="/" className="btn btn-primary mt-4">
                <i className="fa-solid fa-house"></i>&nbsp;Go to Home
                </a>
            </div>

            {/*
            <Navbar />
                 
            <Footer />
            */}
        </div>
    );
}

export default Settings;