export enum AnalogSensorType {
  thermistor = 'thermistor',
  pt1000 = 'pt1000',
  max31865 = 'rtdmax31865',
  max31855 = 'thermocouplemax31855',
  max31856 = 'thermocouplemax31856',
  linearAnalog = 'linearanalog',
  dht21 = 'dht21',
  dht22 = 'dht22',
  dhtHumidity = 'dhthumidity',
  currentLoop = 'currentloooppyro',
  mcuTemp = 'mcutemp',
  drivers = 'drivers',
  driversDuex = 'driversduex',
  unknown = 'unknown',
}

export enum TemperatureError {
  ok = 'ok',
  shortCircuit = 'shortCircuit',
  shortToVcc = 'shortToVcc',
  shortToGround = 'shortToGround',
  openCircuit = 'openCircuit',
  timeout = 'timeout',
  ioError = 'ioError',
  hardwareError = 'hardwareError',
  notReady = 'notReady',
  invalidOutputNumber = 'invalidOutputNumber',
  busBusy = 'busBusy',
  badResponse = 'badResponse',
  unknownPort = 'unknownPort',
  notInitialised = 'notInitialised',
  unknownSensor = 'unknownSensor',
  overOrUnderVoltage = 'overOrUnderVoltage',
  badVref = 'badVref',
  badVssa = 'badVssa',
  unknownError = 'unknownError',
}

export interface AnalogSensor {
  lastReading: number | null;
  name: string | null;
  state: TemperatureError;
  type: AnalogSensorType;
}

export enum EndstopType {
  InputPin = 'inputPin',
  ZProbeAsEndstop = 'zProbeAsEndstop',
  motorStallAny = 'motorStallAny',
  motorStallIndividual = 'motorStallIndividual',
  unknown = 'unknown',
}

export interface Endstop {
  highEnd: boolean;
  triggered: boolean;
  type: EndstopType;
}

export enum FilamentMonitorStatus {
  noMonitor = 'noMonitor',
  ok = 'ok',
  noDataReceived = 'noDataReceived',
  noFilament = 'noFilament',
  tooLittleMovement = 'tooLittleMovement',
  tooMuchMovement = 'tooMuchMovement',
  sensorError = 'sensorError',
}

export enum FilamentMonitorType {
  simple = 'simple',
  laser = 'laser',
  pulsed = 'pulsed',
  rotatingMagnet = 'rotatingMagnet',
  unknown = 'unknown',
}

export interface FilamentMonitorBase {
  enabled: boolean;
  status: FilamentMonitorStatus;
}

export interface LaserFilamentMonitorCalibrated {
  calibrationFactor: number;
  percentMax: number;
  percentMin: number;
  sensivity: number;
  totalDistance: number;
}

export interface LaserFilamentMonitorConfigured {
  allMoves: boolean;
  percentMax: number;
  percentMin: number;
  sampleDistance: number;
}

export interface LaserFilamentMonitor extends FilamentMonitorBase {
  type: FilamentMonitorType.laser;
  calibrated: LaserFilamentMonitorCalibrated;
  configured: LaserFilamentMonitorConfigured;
}

export interface PulsedFilamentMonitorCalibrated {
  mmPerPulse: number;
  percentMax: number;
  percentMin: number;
  totalDistance: number;
}

export interface PulsedFilamentMonitorConfigured {
  mmPerPulse: number;
  percentMax: number;
  percentMin: number;
  sampleDistance: number;
}

export interface PulsedFilamentMonitor extends FilamentMonitorBase {
  type: FilamentMonitorType.pulsed;
  calibrated: PulsedFilamentMonitorCalibrated;
  configured: PulsedFilamentMonitorConfigured;
}

export interface RotatingMagnetFilamentMonitorCalibrated {
  mmPerPulse: number;
  percentMax: number;
  percentMin: number;
  totalDistance: number;
}

export interface RotatingMagnetFilamentMonitorConfigured {
  allMoves: boolean;
  mmPerRev: number;
  percentMax: number;
  percentMin: number;
  sampleDistance: number;
}

export interface RotatingMagnetFilamentMonitor extends FilamentMonitorBase {
  type: FilamentMonitorType.rotatingMagnet;
  calibrated: RotatingMagnetFilamentMonitorCalibrated;
  configured: RotatingMagnetFilamentMonitorConfigured;
}

export interface SimpleFilamentMonitor extends FilamentMonitorBase {
  type: FilamentMonitorType.simple | FilamentMonitorType.unknown;
}

export type FilamentMonitor = LaserFilamentMonitor | PulsedFilamentMonitor | RotatingMagnetFilamentMonitor | SimpleFilamentMonitor;

export interface GpInputPort {
  value: number;
}

export enum ProbeType {
  none = 0,
  analog = 1,
  dumbModulated = 2,
  alternateAnalog = 3,
  endstopSwitch_obsolete = 4,
  digital = 5,
  e1Switch_obsolete = 6,
  zSwitch_obsolete = 7,
  unfilteredDigital = 8,
  blTouch = 9,
  zMotorStall = 10,
}

export interface Probe {
  calibrationTemperature: number;
  deployedByUser: boolean;
  disablesHeaters: boolean;
  diveHeight: number;
  lastStopHeight: number;
  maxProbeCount: number;
  offsets: number[];
  recoveryTime: number;
  speeds: number[];
  temperatureCoefficients: number[];
  threshold: number;
  tolerance: number;
  travelSpeed: number;
  triggerHeight: number;
  type: ProbeType;
  value: number[];
}

export interface Sensors {
  analog: (AnalogSensor | null)[];
  endstops: (Endstop | null)[];
  filamentMonitors: (FilamentMonitor | null)[];
  gpIn: (GpInputPort | null)[];
  probes: (Probe | null)[];
}

export default Sensors;
