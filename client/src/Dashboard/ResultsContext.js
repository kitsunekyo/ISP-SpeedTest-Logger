import React, { useEffect } from 'react';
import useApi from 'shared/hooks/api';

export const ResultsContext = React.createContext({
	state: {
		data: [],
		error: false,
		isLoading: false,
	},
	loadResults: () => {},
	setResults: () => {},
});

export const ResultsProvider = ({ children }) => {
	const [state, loadData, setData] = useApi('/speedtest', 'get');

	useEffect(() => {
		loadData();
	}, []);

	return (
		<ResultsContext.Provider value={{ state, loadResults: loadData, setResults: setData }}>
			{children}
		</ResultsContext.Provider>
	);
};
