import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Updated import

import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';

import "./Login.scss";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/protected'); // Redirect to protected route
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div id="app">
            <Navbar />

            <div class="container">
                <div class="centered-div">
                    <div className='d-flex justify-content-center mb-3'>
                        <h4 className="custom-card-header">Login to MSB</h4>
                    </div>

                    <div>

                        {/* Email */}
                        <label htmlFor="username" className="form-label fw-bold">Email</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        {/* Password */}
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <div class="input-group mb-4">
                            <span class="input-group-text">
                                <i class="fa-solid fa-key"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="button" className="btn btn-outline-primary w-100">
                            <i class="fa-solid fa-right-to-bracket"></i>&nbsp;Login
                        </button>


                        {/*
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        */}
                    </div>

                </div>
            </div>

            {/*
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row w-100">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <h2 className="card-title text-center mb-4">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            */}

            <Footer />
        </div>
    );
};

export default LoginPage;
