import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';

import { getStoredAuthToken } from 'shared/utils/authToken';
import { useAuth } from 'Auth/AuthProvider';

export interface ApiState<T = any> {
	data: T | null;
	error: Error | null;
	isLoading: boolean;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const DEFAULTS = {
	baseUrl: 'http://localhost:3000',
	headers: () => ({
		'Content-Type': 'application/json',
		Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
	}),
};

const useApi = <T = any>(path: string, method: HttpMethod = 'get', immediate = false) => {
	const [state, setState] = useState<ApiState<T>>({
		data: null,
		error: null,
		isLoading: immediate ? true : false,
	});
	const { logout } = useAuth();

	const api = useCallback(async (method: HttpMethod, path: string, payload: any) => {
		const url = `${DEFAULTS.baseUrl}${path}`;

		const response = await axios({
			url,
			method,
			headers: DEFAULTS.headers(),
			params: method === 'get' ? payload : undefined,
			data: method !== 'get' ? payload : undefined,
		});

		return response;
	}, []);

	const send = useCallback(
		async (payload?: any): Promise<AxiosResponse<T>> => {
			setState((s) => ({ ...s, isLoading: true }));

			try {
				const res = await api(method, path, payload);
				setState((s) => ({ ...s, data: res.data, isLoading: false }));
				return res;
			} catch (error) {
				if (error.response.status === 401) {
					setState((s) => ({ ...s, error, isLoading: false }));
					logout();
				} else {
					setState((s) => ({ ...s, error, isLoading: false }));
				}
				throw error;
			}
		},
		[api, method, path, logout]
	);

	const setData = (data: T) => {
		setState((s) => ({ ...s, data }));
	};

	useEffect(() => {
		if (immediate) {
			send();
		}
		return () => {};
	}, [immediate, send]);

	return { state, request: send, setData };
};

export default useApi;