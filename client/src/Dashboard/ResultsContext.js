import React from 'react';
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
	const { state, request: loadData, setData } = useApi('/speedtest', 'get', true);

	return (
		<ResultsContext.Provider value={{ state, loadResults: loadData, setResults: setData }}>
			{children}
		</ResultsContext.Provider>
	);
};
