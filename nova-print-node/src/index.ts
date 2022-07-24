import { Axis, Profile } from '@nova-print/nova-print-libs';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { SerialPort } from 'serialport';
import { Server, Socket } from 'socket.io';

import Controller from './Controller';

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
};

const main = async () => {
  const controllers: Controller[] = [];
  const sockets: Socket[] = [];

  const app = express();
  app.use(cors(corsOptions));

  app.get('/serialports', async (req, res) => {
    res.json(await SerialPort.list());
  });

  const server = http.createServer(app);
  const io = new Server(server, {
    maxHttpBufferSize: 100000000,
    cors: corsOptions,
  });

  const getController = (printer: Profile): Controller => {
    const controller = controllers.find((c) => c.printer.id === printer.id);
    if (controller) return controller;

    const newController = new Controller(printer, sockets);
    controllers.push(newController);
    return newController;
  };

  io.on('connection', (socket) => {
    const printer: Profile = JSON.parse(socket.handshake.query.printer as string);
    const controller = getController(printer);

    if (!controller) {
      console.log(chalk.red(`No controller found for printer ${printer.id}`));
      return;
    }

    sockets.push(socket);
    console.log(chalk.green('Connected to client!'));

    socket.on('disconnect', () => {
      sockets.splice(sockets.indexOf(socket), 1);
      console.log(chalk.red('Disconnected from client!'));
    });

    socket.on('autoHome', (x: boolean, y: boolean, z: boolean) => {
      controller.autoHome(x, y, z);
    });

    socket.on('startMeshBedLeveling', () => {
      controller.startMeshBedLeveling();
    });

    socket.on('setHotendTemperature', (temperature: number) => {
      controller.setHotendTemperature(temperature);
    });

    socket.on('setBedTemperature', (temperature: number) => {
      controller.setBedTemperature(temperature);
    });

    socket.on('setFanSpeed', (speed: number) => {
      controller.setFanSpeed(speed);
    });

    socket.on('disableSteppers', (x: boolean, y: boolean, z: boolean, e: boolean) => {
      controller.disableSteppers(x, y, z, e);
    });

    socket.on('moveAxis', (axis: Axis, distance: number) => {
      controller.moveAxis(axis, distance);
    });

    socket.on('setLcdMessage', (message: string) => {
      controller.setLcdMessage(message);
    });

    socket.on('printFile', (file: Buffer) => {
      controller.printFile(file);
    });

    socket.on('stopPrint', () => {
      controller.stopPrint();
    });

    socket.on('pausePrint', () => {
      controller.pausePrint();
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(chalk.green(`Server started on port ${port}`));
  });
};

main();
