import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes';
import Header from './Header';

import './normalize.css';
import './font.css';
import './base.scss';

const App = () => {
	return (
		<>
			<Header />
			<Routes />
		</>
	);
};

export default hot(module)(App);
