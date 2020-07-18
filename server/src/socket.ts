import socketIo from "socket.io";
import { Server } from "http";

let socket: socketIo.Server;

const setup = (server: Server): socketIo.Server => {
    if (socket) return socket;

    socket = socketIo(server);
    return socket;
};

const io = (): socketIo.Server => socket;

export default {
    setup,
    io,
};
