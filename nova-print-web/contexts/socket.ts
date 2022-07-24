import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';

interface SocketContext {
  socket?: Socket;
  setSocket: (socket: Socket) => void;
}

const socketContext = createContext<SocketContext>({} as SocketContext);

export const useSocket = () => useContext(socketContext);

export const SocketProvider = socketContext.Provider;

export default socketContext;
