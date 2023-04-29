export enum HeaterState {
  off = 'off',
  standby = 'standby',
  active = 'active',
  fault = 'fault',
  tuning = 'tuning',
  offline = 'offline',
}

export interface HeaterModelPID {
  d: number;
  i: number;
  overridden: boolean;
  p: number;
  used: boolean;
}

export interface HeaterModel {
  coolingExp: number;
  coolingRate: number;
  deadTime: number;
  enabled: boolean;
  fanCoolingRate: number;
  heatingRate: number;
  inverted: boolean;
  maxPwm: number;
  pid: HeaterModelPID;
  standardVoltage: number;
}

export enum HeaterMonitorAction {
  generateFault = 0,
  permanentSwitchOff = 1,
  temporarySwitchOff = 2,
  shutDown = 3,
}

export enum HeaterMonitorCondition {
  disabled = 'disabled',
  tooHigh = 'tooHigh',
  tooLow = 'tooLow',
}

export interface HeaterMonitor {
  action: HeaterMonitorAction | null;
  condition: HeaterMonitorCondition;
  limit: number | null;
}

export interface Heater {
  active: number;
  avgPwm: number;
  current: number;
  max: number;
  maxBadReadings: number;
  maxHeatingFaultTime: number;
  maxTempExcursion: number;
  min: number;
  model: HeaterModel;
  monitors: HeaterMonitor[];
  sensor: number;
  standby: number;
  state: HeaterState;
}

interface Heat {
  bedHeaters: number[];
  chamberHeaters: number[];
  coldExtrudeTemperature: number;
  coldRetractTemperature: number;
  heaters: Heater[];
}

export default Heat;
