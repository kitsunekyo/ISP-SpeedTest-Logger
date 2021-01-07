import React from 'react';

import useApi, { ApiState } from 'shared/hooks/useApi';

interface ResultsContext {
	state: ApiState;
	loadResults: () => any;
	setResults: (data: any) => any;
}

export const resultsContext = React.createContext({} as ResultsContext);

type ResultsProviderProps = {
	children: React.ReactNode;
};

export const ResultsProvider = ({ children }: ResultsProviderProps) => {
	const { state, request: loadData, setData } = useApi('/speedtest', 'get', true);

	return (
		<resultsContext.Provider value={{ state, loadResults: loadData, setResults: setData }}>
			{children}
		</resultsContext.Provider>
	);
};
