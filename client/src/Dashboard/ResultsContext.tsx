import { authFetchContext } from 'Auth/AuthFetchContext';
import { SpeedtestResult } from 'models/speedtest';
import React, { useContext, useEffect, useState } from 'react';

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
    const { authAxios } = useContext(authFetchContext);

    const loadResults = async (): Promise<SpeedtestResult[]> => {
        const { data } = await authAxios.get('/speedtest');
        setResults(data);
        return data;
    };

    useEffect(() => {
        loadResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <resultsContext.Provider value={{ results, loadResults, setResults }}>
            {children}
        </resultsContext.Provider>
    );
};
