import axios from 'axios';

const MOCK_DATA = {
	data: [
		{
			timestamp: '2020-06-01T15:32:33.000Z',
			ping: {
				jitter: 0.736,
				latency: 19.109,
			},
			download: {
				bandwidth: 4055250,
				bytes: 52817571,
				elapsed: 15003,
			},
			upload: {
				bandwidth: 1264180,
				bytes: 16213883,
				elapsed: 12212,
			},
			packetLoss: 0,
			isp: 'Hutchison Drei Austria GmbH',
			interface: {
				internalIp: '172.27.0.2',
				name: 'eth0',
				macAddr: '02:42:AC:1B:00:02',
				isVpn: false,
				externalIp: '77.119.130.24',
			},
			server: {
				id: 6635,
				name: 'Easyname GmbH',
				location: 'Vienna',
				country: 'Austria',
				host: 'speedtest.easyname.com',
				port: 8080,
				ip: '77.244.243.114',
			},
			result: {
				id: '67b78db3-f901-4247-ae2a-c72d237e6d69',
				url: 'https://www.speedtest.net/result/c/67b78db3-f901-4247-ae2a-c72d237e6d69',
			},
		},
		{
			timestamp: '2020-06-13T15:32:33.000Z',
			ping: {
				jitter: 0.736,
				latency: 19.109,
			},
			download: {
				bandwidth: 4055250,
				bytes: 59817571,
				elapsed: 15003,
			},
			upload: {
				bandwidth: 1264180,
				bytes: 16213883,
				elapsed: 12212,
			},
			packetLoss: 0,
			isp: 'Hutchison Drei Austria GmbH',
			interface: {
				internalIp: '172.27.0.2',
				name: 'eth0',
				macAddr: '02:42:AC:1B:00:02',
				isVpn: false,
				externalIp: '77.119.130.24',
			},
			server: {
				id: 6635,
				name: 'Easyname GmbH',
				location: 'Vienna',
				country: 'Austria',
				host: 'speedtest.easyname.com',
				port: 8080,
				ip: '77.244.243.114',
			},
			result: {
				id: '67b78db3-f901-4247-ae2a-c72d237e6d69',
				url: 'https://www.speedtest.net/result/c/67b78db3-f901-4247-ae2a-c72d237e6d69',
			},
		},
		{
			timestamp: '2020-06-14T15:32:33.000Z',
			ping: {
				jitter: 0.736,
				latency: 19.109,
			},
			download: {
				bandwidth: 4055250,
				bytes: 59817571,
				elapsed: 15003,
			},
			upload: {
				bandwidth: 1264180,
				bytes: 16213883,
				elapsed: 12212,
			},
			packetLoss: 0,
			isp: 'Hutchison Drei Austria GmbH',
			interface: {
				internalIp: '172.27.0.2',
				name: 'eth0',
				macAddr: '02:42:AC:1B:00:02',
				isVpn: false,
				externalIp: '77.119.130.24',
			},
			server: {
				id: 6635,
				name: 'Easyname GmbH',
				location: 'Vienna',
				country: 'Austria',
				host: 'speedtest.easyname.com',
				port: 8080,
				ip: '77.244.243.114',
			},
			result: {
				id: '67b78db3-f901-4247-ae2a-c72d237e6d69',
				url: 'https://www.speedtest.net/result/c/67b78db3-f901-4247-ae2a-c72d237e6d69',
			},
		},
	],
};

const defaults = {
	baseUrl: 'http://localhost:3000',
	headers: () => ({
		'Content-Type': 'application/json',
	}),
};

const api = (method, url, payload) => {
	return new Promise((resolve, reject) => {
		resolve(MOCK_DATA);
		// axios({
		// 	url: `${defaults.baseUrl}${url}`,
		// 	method,
		// 	headers: defaults.headers(),
		// 	params: method === 'get' ? payload : undefined,
		// 	data: method !== 'get' ? payload : undefined,
		// }).then(
		// 	response => {
		// 		resolve(response);
		// 	},
		// 	error => {
		// 		reject(error);
		// 	}
		// );
	});
};

export default {
	get: (...args) => api('get', ...args),
	post: (...args) => api('post', ...args),
	put: (...args) => api('put', ...args),
	patch: (...args) => api('patch', ...args),
	delete: (...args) => api('delete', ...args),
};
