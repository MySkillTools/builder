//import React, { Suspense, lazy } from 'react';
//import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { Suspense, useContext, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

// Styling
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/style.scss';

// Lazy loaded components
const About = lazy(() => import('./pages/About/About'));
const Home = lazy(() => import('./pages/Home/Home'));
const MySkillBank = lazy(() => import('./pages/MySkillBank/MySkillBank'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Login = lazy(() => import('./pages/Login/Login'));

// ProtectedRoute component to protect private routes
const ProtectedRoute = ({ element, ...rest }) => {
    const { auth } = useContext(AuthContext);
    return auth.isAuthenticated ? element : <Navigate to="/login" />;
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
                    <Route path="/mySkillBank" element={<ProtectedRoute element={<MySkillBank />} />} />
                    <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                    
                    {/* Redirect all other routes to Home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);