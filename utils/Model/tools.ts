export enum ToolState {
  off = 'off',
  active = 'active',
  standby = 'standby',
}

interface Tool {
  active: Number[];
  axes: Number[][];
  extruders: Number[];
  fans: Number[];
  feedForward: Number[];
  filamentExtruder: number;
  heaters: Number[];
  isRetracted: boolean;
  mix: Number[];
  name: string;
  number: number;
  offsets: Number[];
  offsetsProbed: boolean;
  spindle: number;
  spindleRpm: number;
  standby: Number[];
  state: ToolState;
}

export default Tool;
