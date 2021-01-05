import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { getStoredAuthToken, removeStoredAuthToken } from 'shared/utils/authToken';

const DEFAULTS = {
	baseUrl: 'http://localhost:3000',
	headers: () => ({
		'Content-Type': 'application/json',
		Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
	}),
};

const useApi = (path, method = 'get', immediate = false) => {
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false,
	});
	const history = useHistory();

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const api = useCallback(async (method, path, payload) => {
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
	});

	const send = useCallback(async payload => {
		setState({ ...state, isLoading: true });

		try {
			const res = await api(method, path, payload);

			if (res.data.error) {
				throw new Error(res.data.message);
			}
			setState({ ...state, data: res.data?.data, isLoading: false });
			return res;
		} catch (error) {
			if (!axios.isCancel(error)) {
				if (error.response.status === 401) {
					removeStoredAuthToken();
					history.push('/login');
				} else {
					setState({ ...state, error, isLoading: false });
				}
				throw error;
			}
		}
	});

	const setData = useCallback(data => {
		setState({ ...state, data });
	});

	useEffect(() => {
		if (immediate) {
			send();
		}
		return () => {
			source.cancel();
		};
	}, [immediate]);

	return { state, request: send, setData };
};

export default useApi;
