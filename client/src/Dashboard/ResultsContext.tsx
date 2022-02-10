import { authFetchContext } from 'Auth/AuthFetchContext';
import { SpeedtestResult } from 'models/speedtest';
import React, { useCallback, useContext, useEffect, useState } from 'react';

interface ResultsContext {
    results: SpeedtestResult[];
    loadResults: () => Promise<SpeedtestResult[]>;
    setResults: (results: SpeedtestResult[]) => void;
}

export const resultsContext = React.createContext({} as ResultsContext);

type ResultsProviderProps = {
    children: React.ReactNode;
};

export const ResultsProvider = ({ children }: ResultsProviderProps) => {
    const [results, setResults] = useState<SpeedtestResult[]>([]);
    const { authApi } = useContext(authFetchContext);

    const loadResults = useCallback(async (): Promise<SpeedtestResult[]> => {
        const { data } = await authApi.get('/speedtest');
        setResults(data);
        return data;
    }, [authApi]);

    useEffect(() => {
        loadResults();
    }, [loadResults]);

    return (
        <resultsContext.Provider value={{ results, loadResults, setResults }}>
            {children}
        </resultsContext.Provider>
    );
};
