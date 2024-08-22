import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Updated import
import { toast } from 'react-toastify';

import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
//import AlertMessage from '../../components/AlertMessage/AlertMessage';

import "./Login.scss";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, login } = useContext(AuthContext);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    //const handleSubmit = async (e) => {
    //    e.preventDefault();
    //    try {
    //        await login(email, password);
            //navigate('/protected'); // Redirect to protected route

            //console.log(auth.isAuthenticated)
            //console.log(auth.user)
            //console.log(auth.token)
            //console.log(auth.loginMessage)

            //setTimeout(() => {
            //    console.log(auth.isAuthenticated);
            //    console.log(auth.user);
            //    console.log(auth.token);
            ///    console.log(auth.loginMessage);
            //}, 100);

    //        console.log("hello")
    //        console.log(auth)   // FIXME: Still undefined user

    //    } catch (error) {
    //        console.warn('Login failed:', error);
    //        toast.error(String(error));
    //    }
    //};

    const handleSubmit = async (e) => {
        e.preventDefault();
        //try {
            await login(email, password);

            // Use setTimeout as a workaround to allow state update for debugging (if necessary)
            //setTimeout(() => {
            //    console.log(auth.isAuthenticated);
            //    console.log(auth.user);
            //    console.log(auth.token);
            //    console.log(auth.loginMessage);
            //}, 100);

            // Redirect to protected route only after login is successful
            //if (auth.isAuthenticated) {
            //    //navigate('/protected');
            //}

        //} catch (error) {
        //    console.warn('Login failed:', error);
        //    toast.error(String(error));
        //}
    };

    // Logging auth state when it changes
    useEffect(() => {
        //console.log('Updated auth state 11111111111:', auth);

        // Case 1: Error in login (e.g., 500 internal server error)
        if(auth.hasError) {
            //alert(auth.msg)
            //console.log(auth.msg)
            toast.error(String(auth.msg));
        }

        // Case 2: Login successful
        else if (auth.isAuthenticated) {
            toast.success('Login success!');
            setTimeout(() => {
                navigate('/');
            }, 500);
        }

        // Case 3: Login failed (e.g., incorrect password)
        else if (auth.msg != null && auth.msg.length > 0) {
            toast.warn(String(auth.msg));
        }

        // Hidden case 4: First visit this page, do nothing
    }, [auth]);

    //useEffect(() => {
    //    toast.success('This is a test message!');
    //  }, []);

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


                        {/*
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Enter your email"
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
                                        <label htmlFor="email" className="form-label">email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            placeholder="Enter your email"
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
