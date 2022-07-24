import { PrinterTemperatures, Profile } from '@nova-print/nova-print-libs';
import { FC, useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import Button from '@/components/Button';

import { Flexbox } from './Box';
import { HomeIcon, PauseIcon, StopIcon } from './Icon';

interface PrinterProps {
  printer: Profile;
}

const Printer: FC<PrinterProps> = ({ printer }) => {
  const [socket, setSocket] = useState<Socket>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3001', {
      query: {
        printer: JSON.stringify(printer),
      },
    });

    socket.on('console', (line: string) => {
      console.log(line);
    });

    socket.on('temperatures', (temperatures: PrinterTemperatures) => {
      console.log(temperatures);
    });

    setSocket(socket);
  }, []);

  const autoHome = () => {
    socket?.emit('autoHome', true, true, true);
  };

  const autoHomeX = () => {
    socket?.emit('autoHome', true, false, false);
  };

  const autoHomeY = () => {
    socket?.emit('autoHome', false, true, false);
  };

  const autoHomeZ = () => {
    socket?.emit('autoHome', false, false, true);
  };

  const printFile = () => {
    if (!file) return;
    socket?.emit('printFile', file);
  };

  const stopPrint = () => {
    socket?.emit('stopPrint');
  };

  const pausePrint = () => {
    socket?.emit('pausePrint');
  };

  return (
    <div>
      <h4>{printer.name}</h4>
      <Flexbox gap="0.5rem">
        <Button onClick={autoHome}>
          <HomeIcon />
          Auto Home
        </Button>
        <Button onClick={autoHomeX}>
          <HomeIcon />
          Auto Home X
        </Button>
        <Button onClick={autoHomeY}>
          <HomeIcon />
          Auto Home Y
        </Button>
        <Button onClick={autoHomeZ}>
          <HomeIcon />
          Auto Home Z
        </Button>
      </Flexbox>
      <Flexbox gap="0.5rem">
        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <Button onClick={printFile}>
          <HomeIcon />
          Print File
        </Button>
        <Button onClick={stopPrint} color="secondary">
          <StopIcon />
          Stop Print
        </Button>
        <Button onClick={pausePrint}>
          <PauseIcon />
          Pause Print
        </Button>
      </Flexbox>
    </div>
  );
};

export default Printer;
