import { Server as SocketIoServer } from "socket.io";
import { Server } from "http";

let socket: SocketIoServer;

const setup = (server: Server): SocketIoServer => {
  if (socket) return socket;

  socket = new SocketIoServer(server, {
    cors: { origin: ["http://localhost:3000"] },
  });
  return socket;
};

const io = (): SocketIoServer => socket;

export default {
  setup,
  io,
};
