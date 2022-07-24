import { Profile } from './profile';

export enum Status {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Idle = 'idle',
  Starting = 'starting',
  Printing = 'printing',
  Pausing = 'pausing',
  Paused = 'paused',
  Resuming = 'resuming',
  Stopping = 'stopping',
  Finished = 'finished',
  Error = 'error',
  TransferringFile = 'transferringFile',
}

export const OperationalStatuses = [
  Status.Idle,
  Status.Starting,
  Status.Printing,
  Status.Pausing,
  Status.Paused,
  Status.Resuming,
  Status.Stopping,
  Status.Finished,
  Status.TransferringFile,
];

export const PrintingStatuses = [
  Status.Starting,
  Status.Printing,
  Status.Pausing,
  Status.Paused,
  Status.Resuming,
  Status.Stopping,
];

export interface HeaterTemperatureRecord {
  current: number;
  target: number;
}

export interface TemperatureRecord {
  tools: {
    [tool: number]: HeaterTemperatureRecord;
  };
  bed: HeaterTemperatureRecord;
  ambient?: number;
  probe?: number;
  chamber?: number;
}

export interface CurrentPrint {
  fileName: string;
  startedAt: Date;
  estimatedFinishAt: Date;
}

export interface Printer extends Profile {
  status: Status;
  currentTemperatures: TemperatureRecord;
  currentPrint: CurrentPrint;
}
