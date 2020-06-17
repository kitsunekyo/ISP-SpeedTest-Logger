import { useState } from 'react';

import api from 'shared/utils/api';

const useApi = (path, method = 'get') => {
	const [state, setState] = useState({
		data: null,
		error: null,
		isLoading: false,
	});

	const sendRequest = payload => {
		return new Promise((resolve, reject) => {
			setState({ ...state, isLoading: true });
			api[method](path, payload).then(
				res => {
					setState({ ...state, data: res.data, isLoading: false });
					resolve(res);
				},
				error => {
					setState({ ...state, error: true, isLoading: false });
					reject(error);
				}
			);
		});
	};

	const setLocalData = data => {
		setState({ ...state, data });
	};

	return [state, sendRequest, setLocalData];
};

export default useApi;
