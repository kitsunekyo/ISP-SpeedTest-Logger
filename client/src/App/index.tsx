import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './Routes';

import './styles/font.css';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';
import { ToasterProvider } from './../Toaster';
import { Socket } from 'shared/Socket';
import { AuthProvider } from '../Auth/AuthProvider';

const App = () => {
	return (
		<>
			<NormalizeStyles />
			<BaseStyles />
			<Router>
				<AuthProvider>
					<Socket>
						<ToasterProvider>
							<AppRoutes />
						</ToasterProvider>
					</Socket>
				</AuthProvider>
			</Router>
		</>
	);
};

export default App;
