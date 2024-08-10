import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.scss';
import './Navbar.scss';

//import '@fortawesome/fontawesome-free/css/all.min.css'
//import institution_logo from '../../assets/images/test_uni_logo.png';

// SuperHeader Component

const SuperHeader = () => {
    return (
        <div></div>
    );
};


// Navbar Component
const Navbar = () => {

    //const notificationCount = 5;

    return (
        <nav className="navbar navbar-expand-md no-padding pt-0 pb-0">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">

                        {/* Home */}
                        <li className="nav-item">
                            <Link className="nav-link navbar-border active" to="/">Home</Link>
                        </li>
                        
                        {/* About */}
                        <li className="nav-item">
                            <Link className="nav-link navbar-border" to="/about">About</Link>
                        </li>
                        
                        {/* FAQs */}
                        <li className="nav-item">
                            <Link className="nav-link navbar-border" to="/myEvents">FAQs</Link>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav ms-auto">

                        {/* GitHub */}
                        
                        <li className="nav-item">
                            <a className="nav-link navbar-border" href="https://github.com/stewebb/my-skills-builder" target="_blank">
                                <i className="fab fa-github"></i>&nbsp;GitHub
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Export both components
export { SuperHeader, Navbar };
