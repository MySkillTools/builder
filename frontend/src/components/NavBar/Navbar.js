import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import '../../styles/style.scss';
import './Navbar.scss';

// Navbar Component
const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const { auth, logout } = useContext(AuthContext); // Get authentication state

    const isLoginPage = (currentPath === '/login');

    // Handle login click
    const handleLoginClick = () => {
        navigate('/login', { state: { from: location.pathname } }); // Pass the current path to login page
    };

    return (
        <nav className="navbar navbar-expand-md no-padding pt-0 pb-0">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* Left Navbar */}
                    <ul className="navbar-nav me-auto">

                        {/* Logo */}
                        <li className="nav-item px-1">
                            <img src='/images/MSB_Wide.png' style={{maxHeight: '40px'}} alt="Logo"/>
                        </li>

                        {/* Home */}
                        <li className="nav-item">
                            <Link className={`nav-link navbar-border ${currentPath === '/' ? 'active' : ''}`} to="/">
                                <i className="fa-solid fa-house"></i>&nbsp;Home
                            </Link>
                        </li>

                        {/* Conditionally Render My Skill Bank */}
                        {auth.isAuthenticated && (
                            <li className="nav-item">
                                <Link className={`nav-link navbar-border ${currentPath === '/mySkillBank' ? 'active' : ''}`} to="/mySkillBank">
                                    <i className="fa-solid fa-database"></i>&nbsp;My Skill Bank
                                </Link>
                            </li>
                        )}

                        {/* Conditionally Render Settings */}
                        {auth.isAuthenticated && (
                            <li className="nav-item">
                                <Link className={`nav-link navbar-border ${currentPath === '/settings' ? 'active' : ''}`} to="/settings">
                                    <i className="fa-solid fa-gear"></i>&nbsp;Settings
                                </Link>
                            </li>
                        )}

                        {/* About */}
                        <li className="nav-item">
                            <Link className={`nav-link navbar-border ${currentPath === '/about' ? 'active' : ''}`} to="/about">
                                <i className="fa-solid fa-circle-question"></i>&nbsp;About
                            </Link>
                        </li>
                    </ul>

                    {/* Right Navbar */}
                    <ul className="navbar-nav ms-auto">

                        {/* Display a logout button if logged in. */}
                        {!isLoginPage && auth.isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link navbar-border btn btn-link" onClick={logout}>
                                    <i className="fa-solid fa-sign-out-alt"></i>&nbsp;Logout
                                </button>
                            </li>
                        )}

                        {/* Otherwise, display a logout button. */}
                        {!isLoginPage && !auth.isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link navbar-border btn btn-link" onClick={handleLoginClick}>
                                    <i className="fa-solid fa-right-to-bracket"></i>&nbsp;Login
                                </button>
                            </li>
                        )}

                        {/* GitHub */}
                        <li className="nav-item">
                            <a className="nav-link navbar-border" href="https://github.com/stewebb/MSB" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>&nbsp;GitHub Repo
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
