import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from './Routes';
import { AppProvider } from './Provider';
import './styles/font.css';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';
import Toaster from 'Toaster/Toaster';

const App = () => {
    return (
        <>
            <NormalizeStyles />
            <BaseStyles />
            <Router>
                <AppProvider>
                    <Toaster />
                    <AppRoutes />
                </AppProvider>
            </Router>
        </>
    );
};

export default App;
