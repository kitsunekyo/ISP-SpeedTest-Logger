import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import useApi from '../shared/hooks/api';
import {
	getStoredAuthToken,
	removeStoredAuthToken,
	storeAuthToken,
} from '../shared/utils/authToken';

export const AuthContext = React.createContext({
	user: null,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const loginApi = useApi('/oauth2/token', 'post');
	const history = useHistory();

	useEffect(() => {
		getTokenFromLocalStorage();

		return () => {};
	}, []);

	function getTokenFromLocalStorage() {
		const accessToken = getStoredAuthToken();

		if (accessToken) {
			const tokenData = jwt_decode(accessToken);
			const now = new Date();
			const expires = new Date(tokenData.exp * 1000);

			if (expires <= now) {
				logout();
			}

			setToken(accessToken);
		}
	}

	async function login({ username, password }) {
		const response = await loginApi.request({ username, password });
		const token = response.data.accessToken;
		setToken(token);
		storeAuthToken(token);
	}

	function logout() {
		setToken(null);
		removeStoredAuthToken();
		history.push('/login');
	}

	/**
	 * using a function instead of another user state,
	 * because i'd have to keep token and user state synced
	 * -> could lead to inconsistent data
	 */
	function getUser() {
		if (!token) return {};

		const decoded = jwt_decode(token);
		const user = decoded;

		return user;
	}

	return (
		<AuthContext.Provider value={{ token, getUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};
