import axios from 'axios';

const defaults = {
	baseUrl: 'http://localhost:3000',
	headers: () => ({
		'Content-Type': 'application/json',
	}),
};

const api = (method, url, payload) => {
	return new Promise((resolve, reject) => {
		axios({
			url: `${defaults.baseUrl}${url}`,
			method,
			headers: defaults.headers(),
			params: method === 'get' ? payload : undefined,
			data: method !== 'get' ? payload : undefined,
		}).then(
			response => {
				resolve(response);
			},
			error => {
				reject(error);
			}
		);
	});
};

export default {
	get: (...args) => api('get', ...args),
	post: (...args) => api('post', ...args),
	put: (...args) => api('put', ...args),
	patch: (...args) => api('patch', ...args),
	delete: (...args) => api('delete', ...args),
};
