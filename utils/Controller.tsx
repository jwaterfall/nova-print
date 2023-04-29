'use client';

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider, UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import PollConnector from './PollConnector';
import { ModelKey, ModelValue } from './Model';

const connector = new PollConnector();

interface ControllerContext {
  apiLevel: number;
  sessionTimeout: number;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  useModel: <T extends ModelKey>(key: T, refetch?: boolean) => UseQueryResult<ModelValue<T> | null>;
}

export const ModelContext = createContext({} as ControllerContext);

const queryClient = new QueryClient();

export const ControllerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [apiLevel, setApiLevel] = useState(0);
  const [sessionTimeout, setSessionTimeout] = useState(8000);
  const [pollInterval, setPollInterval] = useState(1000);

  const connect = async () => {
    const response = await connector.connect();

    setConnected(true);
    setApiLevel(response.apiLevel);
    setSessionTimeout(response.sessionTimeout);
  };

  const disconnect = async () => {
    try {
      await connector.disconnect();
    } finally {
      setConnected(false);
    }
  };

  const useModel = <T extends ModelKey>(key: T, refetch?: boolean) =>
    useQuery(['model', key], async () => connector.getModel(key), {
      enabled: connected,
      refetchInterval: refetch ? pollInterval : false,
      onError: disconnect,
    });

  return (
    <ModelContext.Provider value={{ connected, apiLevel, sessionTimeout, connect, disconnect, useModel }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ModelContext.Provider>
  );
};

const useController = () => useContext(ModelContext);

export default useController;
