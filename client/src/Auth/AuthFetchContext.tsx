import axios, { AxiosInstance } from 'axios';
import React from 'react';
import { API_BASE_URL } from 'shared/utils/api';
import { useAuth } from './AuthProvider';

type AuthFetchContext = {
    authAxios: AxiosInstance;
};

export const authFetchContext = React.createContext<AuthFetchContext>({} as AuthFetchContext);

export const AuthFetchProvider: React.FC = ({ children }) => {
    const authContext = useAuth();
    const authAxios = axios.create({
        baseURL: API_BASE_URL,
    });

    authAxios.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${authContext.authState.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return <authFetchContext.Provider value={{ authAxios }}>{children}</authFetchContext.Provider>;
};
