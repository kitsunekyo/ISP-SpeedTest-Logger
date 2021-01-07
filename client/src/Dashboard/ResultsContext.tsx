import { SpeedtestResult } from 'models/speedtest';
import React from 'react';

import useApi, { ApiState } from 'shared/hooks/useApi';

interface ResultsContext {
	state: ApiState<SpeedtestResult[]>;
	loadResults: () => any;
	setResults: (data: SpeedtestResult[]) => void;
}

export const resultsContext = React.createContext({} as ResultsContext);

type ResultsProviderProps = {
	children: React.ReactNode;
};

export const ResultsProvider = ({ children }: ResultsProviderProps) => {
	const { state, request: loadData, setData } = useApi<SpeedtestResult[]>(
		'/speedtest',
		'get',
		true
	);

	return (
		<resultsContext.Provider value={{ state, loadResults: loadData, setResults: setData }}>
			{children}
		</resultsContext.Provider>
	);
};
