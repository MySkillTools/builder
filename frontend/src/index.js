import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styling
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/style.scss';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home/Home'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

// App component with routing
function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

// Root rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);