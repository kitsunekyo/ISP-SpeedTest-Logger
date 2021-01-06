import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { getStoredAuthToken, removeStoredAuthToken } from 'shared/utils/authToken';

export interface IApiState {
	data: any | null;
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

const useApi = (path: string, method: HttpMethod = 'get', immediate = false) => {
	const [state, setState] = useState<IApiState>({
		data: null,
		error: null,
		isLoading: false,
	});
	const history = useHistory();

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const api = useCallback(
		async (method: HttpMethod, path: string, payload: any) => {
			const url = `${DEFAULTS.baseUrl}${path}`;

			const response = await axios({
				cancelToken: source.token,
				url,
				method,
				headers: DEFAULTS.headers(),
				params: method === 'get' ? payload : undefined,
				data: method !== 'get' ? payload : undefined,
			});

			return response;
		},
		[source.token]
	);

	const send = useCallback(
		async (payload?: any) => {
			setState({ ...state, isLoading: true });

			api(method, path, payload)
				.then((res) => {
					setState({ ...state, data: res.data?.data, isLoading: false });
				})
				.catch((error) => {
					if (axios.isCancel(error)) return;

					if (error.response.status === 401) {
						removeStoredAuthToken();
						history.push('/login');
						return;
					}

					setState({ ...state, error, isLoading: false });
				});
		},
		[api, history, method, path, state]
	);

	const setData = (data: any) => {
		setState({ ...state, data });
	};

	useEffect(() => {
		if (immediate) {
			send();
		}
		return () => {
			source.cancel();
		};
	}, [source, immediate, send]);

	return { state, request: send, setData };
};

export default useApi;
