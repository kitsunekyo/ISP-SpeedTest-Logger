import axios, { AxiosInstance } from 'axios';
import React from 'react';

import { API_BASE_URL } from 'shared/utils/api';
import { useAuth } from './AuthProvider';

type AuthFetchContext = {
    authApi: AxiosInstance;
};

export const authFetchContext = React.createContext<AuthFetchContext>({} as AuthFetchContext);

export const AuthFetchProvider: React.FC = ({ children }) => {
    const authContext = useAuth();
    const authApi = axios.create({
        baseURL: API_BASE_URL,
    });

    authApi.interceptors.request.use(
        (config) => {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${authContext.authState.token}`,
                },
            };
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return <authFetchContext.Provider value={{ authApi }}>{children}</authFetchContext.Provider>;
};
