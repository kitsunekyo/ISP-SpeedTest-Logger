import React from 'react';

import { AuthProvider } from 'Auth/AuthProvider';
import { SocketProvider } from 'shared/Socket';
import { ToasterProvider } from 'Toaster';
import { AuthFetchProvider } from 'Auth/AuthFetchContext';

type Props = {
    children: React.ReactNode;
};
export const AppProvider = ({ children }: Props) => {
    return (
        <AuthProvider>
            <AuthFetchProvider>
                <SocketProvider>
                    <ToasterProvider>{children}</ToasterProvider>
                </SocketProvider>
            </AuthFetchProvider>
        </AuthProvider>
    );
};
