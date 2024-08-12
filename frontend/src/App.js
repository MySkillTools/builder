import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/style.scss';

// Lazy load each section
const Home = lazy(() => import('./pages/Home/Home'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;