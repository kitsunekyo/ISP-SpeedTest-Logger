import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

type AuthState = {
    token: string | null;
    expiresAt: number | null;
    userInfo: any;
};

type AuthContext = {
    authState: AuthState;
    setAuthState: (authInfo: { token: string; userInfo: any; expiresAt: number }) => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
    logout: () => void;
};

const authContext = React.createContext({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const history = useHistory();

    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const [authState, setAuthState] = useState<AuthState>({
        token,
        expiresAt: expiresAt ? parseInt(expiresAt) : null,
        userInfo: userInfo ? JSON.parse(userInfo) : {},
    });

    const setAuthInfo = ({
        token,
        userInfo,
        expiresAt,
    }: {
        token: string;
        userInfo: any;
        expiresAt: number;
    }): void => {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresAt', expiresAt.toString());
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setAuthState({ token, userInfo, expiresAt });
    };

    const isAuthenticated = (): boolean => {
        if (!authState.token || !authState.expiresAt) return false;
        const isExpired = new Date().getTime() / 1000 >= authState.expiresAt;

        return !isExpired;
    };

    const isAdmin = (): boolean => {
        return authState.userInfo?.role === 'admin';
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('userInfo');
        setAuthState({ token: null, expiresAt: null, userInfo: {} });
        history.push('/login');
    };

    return (
        <authContext.Provider
            value={{
                authState,
                setAuthState: (authInfo) => setAuthInfo(authInfo),
                isAuthenticated,
                isAdmin,
                logout,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);
