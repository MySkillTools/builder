import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';

import "./Login.scss";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const isInitialRender = useRef(true);

    // Submit login credentials
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn('Please enter both email and password.');
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            toast.error('An error occurred during login.' + error);
        }
    };

    // Logging auth state when it changes
    useEffect(() => {

        // Skip the effect on the first render
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        //if (token) {

            //console.log(token);

            // Case 1: Error in login (e.g., 500 internal server error)
            if (token === undefined) {
                toast.error('Error when login!');
            }

            // Case 2: Login failed (e.g., incorrect password)
            else if (token === null) {
                toast.warn('Invalid credentials!');
            }

            // Case 3: Login successful
            else {
                toast.success('Login success!');
                setTimeout(() => {
                    //navigate('/');
                }, 500);
            }

            
        //}
    }, [token, navigate]);

    return (
        <div id="app">
            <Navbar />

            <div class="login-container">
                <div class="login-box">
                    <div className='d-flex justify-content-center mb-3'>
                        <h4 className="custom-card-header">Login to MSB</h4>
                    </div>

                    <div>

                        {/* Email */}
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
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

                        <button type="button" className="btn btn-outline-primary w-100" onClick={handleSubmit}>
                            <i class="fa-solid fa-right-to-bracket"></i>&nbsp;Login
                        </button>

                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LoginPage;
