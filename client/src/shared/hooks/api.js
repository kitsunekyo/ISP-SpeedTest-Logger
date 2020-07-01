import { useState, useCallback } from 'react';

import api from 'shared/utils/api';

const useApi = (path, method = 'get') => {
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false,
	});

	const sendRequest = useCallback(async payload => {
		setState({ ...state, isLoading: true });
		try {
			const res = await api[method](path, payload);
			if (res.data.error) {
				throw new Error(res.data.message);
			}
			setState({ ...state, data: res.data?.data, isLoading: false });
			return res;
		} catch (error) {
			setState({ ...state, error: true, isLoading: false });
			console.log(error, 'error');
			throw new Error(error);
		}
	});

	const setLocalData = useCallback(data => {
		setState({ ...state, data });
	});

	return [state, sendRequest, setLocalData];
};

export default useApi;
