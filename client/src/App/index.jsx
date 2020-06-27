import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes';

import './styles/font.css';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';
import Toaster from './Toaster';

const App = () => {
	return (
		<>
			<NormalizeStyles />
			<BaseStyles />
			<Toaster>
				<Routes />
			</Toaster>
		</>
	);
};

// eslint-disable-next-line no-undef
export default hot(module)(App);
