import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes';

import './styles/font.css';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';
import Toaster from './../Toaster';
import { Socket } from 'shared/Socket';

const App = () => {
	return (
		<>
			<NormalizeStyles />
			<BaseStyles />
			<Socket>
				<Toaster>
					<Routes />
				</Toaster>
			</Socket>
		</>
	);
};

// eslint-disable-next-line no-undef
export default hot(module)(App);
