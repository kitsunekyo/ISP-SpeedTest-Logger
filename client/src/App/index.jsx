import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes';
import Header from './Header';

import './styles/font.css';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';

const App = () => {
	return (
		<>
			<NormalizeStyles />
			<BaseStyles />
			<Header />
			<Routes />
		</>
	);
};

// eslint-disable-next-line no-undef
export default hot(module)(App);
