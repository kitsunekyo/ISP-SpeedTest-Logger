import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import useApi from '../shared/hooks/useApi';
import {
	getStoredAuthToken,
	removeStoredAuthToken,
	storeAuthToken,
} from '../shared/utils/authToken';

type AuthProviderProps = {
	children: React.ReactNode;
};

type TokenData = {
	username: string;
	role?: string;
	exp: number;
	iat: number;
};

interface IAuthContext {
	token: string | null;
	getUser: () => TokenData | null;
	login: (payload: { username: string; password: string }) => Promise<string | void>;
	logout: () => void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const loginApi = useApi('/oauth2/token', 'post');
	const history = useHistory();

	useEffect(() => {
		loadTokenFromLocalStorage();
	});

	function loadTokenFromLocalStorage(): void {
		const accessToken = getStoredAuthToken();

		if (accessToken) {
			const tokenData: TokenData = jwt_decode(accessToken);
			const now = new Date();
			const expires = new Date(tokenData.exp * 1000);

			if (expires <= now) {
				logout();
			}

			setToken(accessToken);
		}
	}

	async function login(payload: { username: string; password: string }): Promise<void> {
		const response = await loginApi.request(payload);
		const token = response.data.accessToken;

		setToken(token);
		storeAuthToken(token);
	}

	function logout(): void {
		setToken(null);
		removeStoredAuthToken();
		history.push('/login');
	}

	/**
	 * using a function instead of another user state,
	 * because i'd have to keep token and user state synced
	 * -> could lead to inconsistent data
	 */
	function getUser(): TokenData | null {
		if (!token) return null;

		const decoded: TokenData = jwt_decode(token);
		const user = decoded;

		return user;
	}

	const authContext: IAuthContext = { token, getUser, login, logout };

	return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
