import React from 'react';

import useApi, { IApiState } from 'shared/hooks/api';

interface IResultsContext {
	state: IApiState;
	loadResults: () => any;
	setResults: (data: any) => any;
}

export const ResultsContext = React.createContext({} as IResultsContext);

type ResultsProviderProps = {
	children: React.ReactNode;
};

export const ResultsProvider = ({ children }: ResultsProviderProps) => {
	const { state, request: loadData, setData } = useApi('/speedtest', 'get', true);

	return (
		<ResultsContext.Provider value={{ state, loadResults: loadData, setResults: setData }}>
			{children}
		</ResultsContext.Provider>
	);
};
