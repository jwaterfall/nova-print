export interface Accelerometer {
  points: number;
  runs: number;
}

export enum BoardState {
  unknown = 'unknown',
  flashing = 'flashing',
  flashFailed = 'flashFailed',
  resetting = 'resetting',
  running = 'running',
}

export interface ClosedLoop {
  points: number;
  runs: number;
}

export interface MinMaxCurrent {
  current: number;
  min: number;
  max: number;
}

export interface DirectDisplay {
  pulsesPerClick: number;
  spiFreq: number;
  typeName: string;
}

interface Board {
  accelerometer: Accelerometer | null;
  bootloaderFileName: string;
  canAddress: number;
  closedLoop: ClosedLoop | null;
  directDisplay: DirectDisplay | null;
  firmwareDate: string;
  firmwareFileName: string;
  firmwareName: string;
  firmwareVersion: string;
  iapFileNameSBC: string | null;
  iapFileNameSD: string | null;
  maxHeaters: number;
  maxMotors: number;
  mcuTemp: MinMaxCurrent | null;
  name: string;
  shortName: string;
  state: BoardState;
  supportsDirectDisplay: boolean;
  uniqueId: string | null;
  v12: MinMaxCurrent | null;
  vIn: MinMaxCurrent | null;
  wifiFirmwareFileName: string | null;
}

export default Board;
