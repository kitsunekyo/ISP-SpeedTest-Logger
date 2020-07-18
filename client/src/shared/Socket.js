import React from 'react';
import socketIOClient from 'socket.io-client';

const HOST = '//localhost:3000';

export const SocketContext = React.createContext({
	socket: null,
});

export const Socket = ({ children }) => {
	const socket = socketIOClient(HOST);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
