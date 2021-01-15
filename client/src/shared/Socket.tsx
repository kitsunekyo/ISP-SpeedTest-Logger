import React from 'react';
import io from 'socket.io-client';

type SocketContext = {
    socket: any;
};

const HOST = 'http://localhost:3000';

export const socketContext = React.createContext({} as SocketContext);

const socket = io(HOST);

export const SocketProvider: React.FC = ({ children }) => {
    return <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>;
};
