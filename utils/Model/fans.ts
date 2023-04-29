export interface FanThermostaticControl {
  highTemperature: number | null;
  lowTemperature: number | null;
  sensors: number[];
}

interface Fan {
  actualValue: number;
  blip: number;
  frequency: number;
  max: number;
  min: number;
  name: string;
  requestedValue: number;
  rpm: number;
  thermostatic: FanThermostaticControl;
}

export default Fan;
