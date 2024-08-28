//import React, { Suspense, lazy } from 'react';
//import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { Suspense, useContext, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

// Styling
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loaded components
const About = lazy(() => import('./pages/About/About'));
const CV = lazy(() => import('./pages/CV/CV'));
const CL = lazy(() => import('./pages/CL/CL'));
const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Skills = lazy(() => import('./pages/Skills/Skills'));
const Login = lazy(() => import('./pages/Login/Login'));

// ProtectedRoute component to protect private routes
const ProtectedRoute = ({ element, ...rest }) => {
    const { token, user } = useContext(AuthContext);
    //TODO: checkToken
    //validate();
    //console.log(user);
    return token ? element : <Navigate to="/login" />;

    //return element
};

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/CL" element={<ProtectedRoute element={<CL />} />} />
                    <Route path="/CV" element={<ProtectedRoute element={<CV />} />} />
                    <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                    <Route path="/skills" element={<ProtectedRoute element={<Skills />} />} />
                    
                    {/* Redirect all other routes to Home */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

ReactDOM.render(
    <AuthProvider>
        <App />
        <ToastContainer />
    </AuthProvider>,
    document.getElementById('root')
);