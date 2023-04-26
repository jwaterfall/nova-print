'use client';

import { useEffect, useMemo, useState } from 'react';

import StandaloneConnector from '@/utils/StandaloneConnector';
import { ConnectStatus, DisconnectStatus } from '@/utils/Connector';

function useController(host: string, password?: string) {
    const connector = useMemo(() => new StandaloneConnector(host), [host]);
    const [connected, setConnected] = useState(false);
    const [mcuTemp, setMcuTemp] = useState(-1);

    async function connect() {
        const response = await connector.connect(password);
        if (response.status === ConnectStatus.SUCCESS) setConnected(true);

        console.log(response);
    }

    async function disconnect() {
        const response = await connector.disconnect();
        if (response === DisconnectStatus.SUCCESS) setConnected(false);

        console.log(response);
    }

    useEffect(() => {
        if (!connected) return;

        const interval = setInterval(() => {
            connector.getMcuTemp().then((temp) => {
                setMcuTemp(temp);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [connector, connected]);

    return {
        connected,
        mcuTemp,
        connect,
        disconnect,
    };
}

export default function Home() {
    const { connected, mcuTemp, connect, disconnect } = useController('', '');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
            <button className="p-4 bg-white rounded-full" onClick={connect}>
                Connect
            </button>
            <h1 className="text-white">{mcuTemp}</h1>
            <h2 className="text-white">{connected ? 'Connected' : 'Disconnected'}</h2>
            <button className="p-4 bg-red-500 rounded-full" onClick={disconnect}>
                Disconnect
            </button>
        </main>
    );
}
