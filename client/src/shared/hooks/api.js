import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const defaults = {
	baseUrl: 'http://localhost:3000',
	headers: () => ({
		'Content-Type': 'application/json',
	}),
};

const useApi = (path, method = 'get', immediate = false) => {
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false,
	});

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const api = useCallback(
		async (method, path, payload) => {
			const url = `${defaults.baseUrl}${path}`;

			const response = await axios({
				cancelToken: source.token,
				url,
				method,
				headers: defaults.headers(),
				params: method === 'get' ? payload : undefined,
				data: method !== 'get' ? payload : undefined,
			});

			return response;
		},
		[defaults]
	);

	const request = useCallback(async payload => {
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
				setState({ ...state, error: true, isLoading: false });
				throw new Error(error);
			}
		}
	});

	const setData = useCallback(data => {
		setState({ ...state, data });
	});

	useEffect(() => {
		if (immediate) {
			request();
		}
		return () => source.cancel();
	}, [immediate]);

	return { state, request, setData };
};

export default useApi;
