import {
  Axis,
  OperationalStatuses,
  PrinterTemperatures,
  PrintingStatuses,
  Profile,
  Status,
} from '@nova-print/nova-print-libs';
import { ReadlineParser } from '@serialport/parser-readline';
import chalk from 'chalk';
import fs from 'fs';
import { SerialPort } from 'serialport';
import { Socket } from 'socket.io';

class Controller {
  private queue: string[] = [];
  private sockets: Socket[] = [];
  private serialport: SerialPort;
  private parser: ReadlineParser;

  private Profile: Profile;
  private status = Status.Disconnected;
  private temperatureRecords: TemperatureRecord[] = [];

  constructor(Profile: Profile, sockets: Socket[]) {
    this.sockets = sockets;
    this.Profile = Profile;

    this.changeStatus(Status.Connecting);
    this.serialport = new SerialPort({ path: Profile.serialPort, baudRate: Profile.baudRate });
    this.parser = new ReadlineParser({ delimiter: '\n' });
    this.serialport.pipe(this.parser);

    this.serialport.on('open', () => {
      this.changeStatus(Status.Idle);
      this.log('Serial port opened!');
    });

    this.serialport.on('close', () => {
      this.changeStatus(Status.Disconnected);
      this.log('Serial port closed!');
    });

    this.serialport.on('error', (err) => {
      this.changeStatus(Status.Error);
      this.logError(`Serial port error: ${err}`);
    });

    this.parser.on('data', (data: string) => this.handleIncomingData(data));
  }

  private changeStatus(status: Status) {
    this.log(`State changed from ${this.status} to ${status}`);
    this.status = status;
  }

  private logSerialOutput(message: string) {
    this.emitToClients('serialOutput', message);
    console.log(chalk.white(`[${this.Profile.id} - SERIAL]` + message));
  }

  private log(message: string) {
    console.log(chalk.cyan(`[${this.Profile.id}]` + message));
  }

  private logError(message: string) {
    console.log(chalk.red(`[${this.Profile.id}]` + message));
  }

  public getStatus() {
    return this.status;
  }

  public getTemperatures() {
    return this.temperatures;
  }

  public getIsOperational() {
    return OperationalStatuses.includes(this.status);
  }

  public getIsPrinting() {
    return PrintingStatuses.includes(this.status);
  }

  public getIsStarting() {
    return this.status === Status.Starting;
  }

  public getIsPausing() {
    return this.status === Status.Pausing;
  }

  public getIsPaused() {
    return this.status === Status.Paused;
  }

  public getIsResuming() {
    return this.status === Status.Resuming;
  }

  public getIsStopping() {
    return this.status === Status.Stopping;
  }

  public getIsError() {
    return this.status === Status.Error;
  }

  private handlTemperatureUpdate(data: string) {
    const temperatures = data.match(/((T[0-9]?)|B|A|P|C):([0-9]+)(.([0-9]+))?\s?(\/([0-9]+)(.([0-9]+))?)?/g);

    if (!temperatures) return;

    temperatures?.forEach((temperature) => {
      const [heater, actual, target] = temperature.split(/:|\//);
      console.log(heater, actual, target);
    });
  }

  private emitToClients(event: string, ...args: any[]) {
    this.sockets.forEach((socket) => socket.emit(event, ...args));
  }

  private handleIncomingData(data: string) {
    this.logSerialOutput(data);
    this.handlTemperatureUpdate(data);

    if (data.includes('ok')) {
      this.isIdle = true;
      if (!this.isPaused) this.processCommand();
    }

    switch (data) {
      case 'start': {
        this.isConnected = true;

        setTimeout(() => {
          this.setLcdMessage('Connected to Nova!');
          this.queueCommands('M155 S1');
        }, 10000);

        break;
      }
      case 'Command not found!': {
        this.isIdle = true;
        if (!this.isPaused) this.processCommand();
        break;
      }
      case '// action:cancel': {
        this.stopPrint();
        break;
      }
      case '// action:pause': {
        this.pausePrint();
        break;
      }
    }
  }

  public autoHome(x: boolean, y: boolean, z: boolean) {
    this.queueCommands(`G28 ${x ? 'X' : ''} ${y ? 'Y' : ''} ${z ? 'Z' : ''} W`);
  }

  public startMeshBedLeveling() {
    this.queueCommands(`G28`);
  }

  public setHotendTemperature(temperature: number) {
    this.queueCommands(`M104 S${temperature}`);
  }

  public setBedTemperature(temperature: number) {
    this.queueCommands(`M140 S${temperature}`);
  }

  public setFanSpeed(speed: number) {
    this.queueCommands(`M106 S${speed}`);
  }

  public disableSteppers(x = true, y = true, z = true, e = true) {
    this.queueCommands(`M84 ${x ? 'X' : ''} ${y ? 'Y' : ''} ${z ? 'Z' : ''} ${e ? 'E' : ''}`);
  }

  public moveAxis(axis: Axis, distance: number, speed?: number) {
    this.queueCommands(`G1 ${axis}${distance} ${speed ? 'F' + speed : ''}`);
  }

  public setLcdMessage(message: string) {
    this.queueCommands(`M117 ${message}`);
  }

  public async printFile(file: Buffer) {
    try {
      await fs.promises.mkdir(`${__dirname}/gcode`);
    } catch (err) {
      console.log(chalk.yellow(`Folder already exists!`));
    }

    await fs.promises.writeFile(`${__dirname}/gcode/${this.Profile.id}.gcode`, file);

    const fileContent = await fs.promises.readFile(`${__dirname}/gcode/${this.Profile.id}.gcode`, 'utf8');
    const lines = fileContent.split('\n');

    const commands = lines.map((line) => line.split(';')[0].trim()).filter((line) => line.length > 0);
    this.queueCommands(...commands);

    this.isPrinting = true;
    console.log(chalk.green(`Started print!`));
  }

  public stopPrint() {
    if (!this.isPrinting) return;
    this.isStopping = true;
    this.queue = [];

    this.disableSteppers();
  }

  public pausePrint() {
    if (!this.isPrinting) return;

    this.isPaused = !this.isPaused;
    if (!this.isPaused) this.processCommand();
  }

  private queueCommands(...commands: string[]) {
    if (this.isPrinting) {
      console.log(chalk.yellow('Cannot queue commands while printing!'));
      return;
    }

    this.queue.push(...commands);
    if (this.isIdle) this.processCommand();
  }

  private sendCommand(command: string) {
    this.serialport.write(command + '\n');
  }

  private async processCommand() {
    const command = this.queue.shift();

    if (!this.isConnected || !command) {
      if (this.isStopping) {
        this.isStopping = false;
        this.isPrinting = false;

        this.setLcdMessage('Printing stopped!');
        this.isIdle = true;
      } else if (this.isPrinting) {
        this.isPrinting = false;
        console.log(chalk.green('Printing finished!'));
        this.setLcdMessage('Printing finished!');
        await fs.promises.unlink(`${__dirname}/print.gcode`);
      }

      return;
    }

    this.isIdle = false;
    this.serialport.write(command + '\n');
    console.log(chalk.cyan(command));
  }
}

export default Controller;
