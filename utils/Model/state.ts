export interface BeepRequest {
  duration: number;
  frequency: number;
}

export interface GpOutputPort {
  freq: number;
  pwm: number;
}

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  off = 'off',
}

export enum MessageBoxMode {
  noButtons,
  closeOnly,
  okOnly,
  okCancel,
  multipleChoice,
  intInput,
  floatInput,
  stringInput,
}

export interface MessageBox {
  axisControls: number | null;
  cancelButton: boolean;
  choices: string[] | null;
  default: number | string | null;
  max: number | null;
  message: string;
  min: number | null;
  mode: MessageBoxMode;
  seq: number;
  timeout: number;
  title: string;
}

export enum MachineMode {
  fff = 'FFF',
  cnc = 'CNC',
  laser = 'Laser',
}

export interface RestorePoint {
  coords: number[];
  extruderPos: number;
  fanPwm: number;
  feedRate: number;
  ioBits: number | null;
  laserPwm: number | null;
  spindleSpeeds: number[];
  toolNumber: number;
}

export interface StartupError {
  file: string;
  line: number;
  message: string;
}

export enum MachineStatus {
  disconnected = 'disconnected',
  starting = 'starting',
  updating = 'updating',
  off = 'off',
  halted = 'halted',
  pausing = 'pausing',
  paused = 'paused',
  resuming = 'resuming',
  cancelling = 'cancelling',
  processing = 'processing',
  simulating = 'simulating',
  busy = 'busy',
  changingTool = 'changingTool',
  idle = 'idle',
}

interface State {
  atxPower: boolean | null;
  atxPowerPort: string | null;
  beep: BeepRequest | null;
  currentTool: number;
  deferredPowerDown: boolean | null;
  displayMessage: string;
  gpOut: (GpOutputPort | null)[];
  laserPwm: number | null;
  logFile: string | null;
  logLevel: LogLevel;
  messageBox: MessageBox;
  machineMode: MachineMode;
  macroRestarted: boolean;
  msUpTime: number;
  nextTool: number;
  pluginsStarted: boolean;
  powerFailScript: string;
  previousTool: number;
  restorePoints: RestorePoint[];
  startupError: StartupError | null;
  status: MachineStatus;
  thisInput: number | null;
  time: string | null;
  upTime: number;
}

export default State;
